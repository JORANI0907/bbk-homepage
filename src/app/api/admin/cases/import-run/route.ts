import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { getAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/server";
import {
  downloadFile,
  filterFolders,
  filterImages,
  getFolderMeta,
  listFolderChildren,
} from "@/lib/drive-import/drive-client";
import {
  isBeforeFolder,
  isAfterFolder,
  makeSlug,
  parseFolderName,
} from "@/lib/drive-import/folder-parser";
import { detectIndustry } from "@/lib/drive-import/industry-classifier";

export const maxDuration = 300; // Vercel: 최대 5분 실행 허용

const MAX_PHOTOS_PER_SIDE = 10;
const STORAGE_BUCKET = "homepage-images";

// 이미지 최적화 파라미터
const MAX_DIMENSION = 1920;  // 가장 긴 변 기준 (Full HD)
const JPEG_QUALITY = 85;     // 품질 (85 = 눈으로 거의 구분 안 되는 수준)

// 폴더 간 동시성 (한번에 3개 폴더까지 병렬 처리)
// 3 이상이면 메모리/Supabase rate limit 위험. 3이 성능과 안정성의 균형점.
const FOLDER_CONCURRENCY = 3;

/**
 * 동시성 제한 map — N명의 worker가 items를 하나씩 집어가며 처리.
 * 순서는 입력과 동일하게 유지됨 (results[i] = mapper(items[i])).
 */
async function mapConcurrent<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(concurrency, items.length);
  const workers = Array.from({ length: workerCount }, async () => {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      results[i] = await mapper(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * 원본 이미지 → 리사이즈 + 재압축.
 * - EXIF 회전 자동 적용 (스마트폰 세로/가로 사진 정상 회전)
 * - 최대 1920px (가로/세로 중 긴 변 기준)
 * - 원본이 작으면 확대하지 않음
 * - 모든 포맷을 JPEG로 통일 (progressive + mozjpeg 압축)
 * - 평균 3.4 MB → ~500 KB (약 6~7배 감소)
 */
async function optimizeImage(buffer: ArrayBuffer): Promise<Buffer> {
  return await sharp(Buffer.from(buffer))
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();
}

type ImportRequest = {
  folderIds: string[]; // 임포트할 작업 폴더 ID 목록
};

type ImportResult = {
  folderId: string;
  storeName: string;
  status: "created" | "skipped" | "failed" | "no_photos";
  caseId?: string;
  slug?: string;
  beforeCount?: number;
  afterCount?: number;
  error?: string;
};

/**
 * POST /api/admin/cases/import-run
 * body: { folderIds: string[] }
 *
 * 선택된 작업 폴더들을 순회하며:
 * 1. 폴더명 파싱
 * 2. 하위 "시공 전/후" 폴더 식별
 * 3. 각 앞 10장 Drive에서 다운로드 → Supabase Storage 업로드
 * 4. cases 테이블에 insert
 */
export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as ImportRequest;
    const folderIds = Array.isArray(body?.folderIds)
      ? body.folderIds.filter((v) => typeof v === "string")
      : [];

    if (folderIds.length === 0) {
      return NextResponse.json(
        { error: "folderIds 배열이 비어있습니다." },
        { status: 400 },
      );
    }

    const supabase = createServiceClient();

    // 폴더 간 동시성 FOLDER_CONCURRENCY 로 병렬 처리.
    // 폴더 내 사진 20장도 Promise.all 로 병렬 → 중첩 병렬.
    const results = await mapConcurrent(
      folderIds,
      FOLDER_CONCURRENCY,
      (folderId) => processOneFolder(supabase, folderId),
    );

    return NextResponse.json({
      total: folderIds.length,
      created: results.filter((r) => r.status === "created").length,
      skipped: results.filter((r) => r.status === "skipped").length,
      noPhotos: results.filter((r) => r.status === "no_photos").length,
      failed: results.filter((r) => r.status === "failed").length,
      results,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * 폴더 하나를 처리 → ImportResult 반환.
 * - 중복 체크 (이미 임포트됨 → skipped)
 * - 시공 전/후 폴더 조회
 * - 메타 파싱 → 매장명 / 업종 / 슬러그
 * - 사진 다운로드 + 최적화 + 업로드 (병렬)
 * - cases insert
 */
async function processOneFolder(
  supabase: ReturnType<typeof createServiceClient>,
  folderId: string,
): Promise<ImportResult> {
  try {
    // 1. 이미 임포트 되었는지 확인
    const { data: existing } = await supabase
      .from("cases")
      .select("id, slug, store_name")
      .eq("drive_folder_id", folderId)
      .maybeSingle();

    if (existing) {
      return {
        folderId,
        storeName: existing.store_name ?? "",
        status: "skipped",
        caseId: existing.id,
        slug: existing.slug ?? undefined,
      };
    }

    // 2. 작업 폴더의 하위 (시공 전/후 폴더) 조회
    const children = await listFolderChildren(folderId);
    const subFolders = filterFolders(children);

    const beforeFolder = subFolders.find((f) => isBeforeFolder(f.name));
    const afterFolder = subFolders.find((f) => isAfterFolder(f.name));

    if (!beforeFolder && !afterFolder) {
      return {
        folderId,
        storeName: "",
        status: "failed",
        error: "시공 전/후 하위 폴더를 찾을 수 없습니다.",
      };
    }

    // 3. 작업 폴더 자체의 이름을 파싱해 메타 추출
    const folderMeta = await getFolderMeta(folderId);
    if (!folderMeta) {
      return {
        folderId,
        storeName: "",
        status: "failed",
        error: "폴더 메타를 조회할 수 없습니다.",
      };
    }
    const parsed = parseFolderName(folderMeta.name);
    const industry = detectIndustry(parsed.storeName);
    const slug = makeSlug(parsed.storeName, parsed.workDate);

    // 4. 시공 전/후 폴더에서 각각 사진 다운로드 (두 폴더도 병렬 처리)
    const [beforeUrls, afterUrls] = await Promise.all([
      beforeFolder
        ? importPhotosFromFolder(
            supabase,
            beforeFolder.id,
            folderId,
            "before",
            MAX_PHOTOS_PER_SIDE,
          )
        : Promise.resolve([] as string[]),
      afterFolder
        ? importPhotosFromFolder(
            supabase,
            afterFolder.id,
            folderId,
            "after",
            MAX_PHOTOS_PER_SIDE,
          )
        : Promise.resolve([] as string[]),
    ]);

    // 4-1. 사진이 전혀 없으면 insert 생략
    if (beforeUrls.length === 0 && afterUrls.length === 0) {
      return {
        folderId,
        storeName: parsed.storeName,
        status: "no_photos",
      };
    }

    // 5. sort_order 자동 부여
    const { data: maxRow } = await supabase
      .from("cases")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sortOrder = (maxRow?.sort_order ?? 0) + 100;

    // 6. cases insert — 블로그(O) 플래그면 공개 ON
    //    인스타 감성용 가짜 engagement 숫자 (likes 50~500, saves 10~150)
    const insertRow = {
      store_name: parsed.storeName,
      industry,
      region: null,
      item: parsed.tag ?? null,
      timing: "야간 시공",
      ratio: "1/1",
      is_video: false,
      is_featured: false,
      is_published: parsed.isBlogRegistered,
      is_blog_registered: parsed.isBlogRegistered,
      before_images: beforeUrls,
      after_images: afterUrls,
      work_date: parsed.workDate,
      slug,
      drive_folder_id: folderId,
      sort_order: sortOrder,
      likes: Math.floor(Math.random() * 450) + 50,
      saves: Math.floor(Math.random() * 140) + 10,
    };

    const { data: inserted, error: insertError } = await supabase
      .from("cases")
      .insert(insertRow)
      .select("id,slug,store_name")
      .single();

    if (insertError) {
      return {
        folderId,
        storeName: parsed.storeName,
        status: "failed",
        error: `insert 실패: ${insertError.message}`,
      };
    }

    return {
      folderId,
      storeName: inserted.store_name ?? parsed.storeName,
      status: "created",
      caseId: inserted.id,
      slug: inserted.slug ?? undefined,
      beforeCount: beforeUrls.length,
      afterCount: afterUrls.length,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      folderId,
      storeName: "",
      status: "failed",
      error: msg,
    };
  }
}

/**
 * 하위 폴더에서 앞 N장을 다운로드 → Supabase Storage에 저장 → public URL 반환.
 */
async function importPhotosFromFolder(
  supabase: ReturnType<typeof createServiceClient>,
  photoFolderId: string,
  parentFolderId: string,
  side: "before" | "after",
  maxCount: number,
): Promise<string[]> {
  const children = await listFolderChildren(photoFolderId);
  const images = filterImages(children);

  // 파일명이 YYYYMMDD_HHMMSS 패턴 → 알파벳 정렬 = 시간순
  images.sort((a, b) => a.name.localeCompare(b.name));
  const picked = images.slice(0, maxCount);

  // 사진 N장을 병렬 처리 (각 다운로드/최적화/업로드가 I/O 바운드라 병렬이 효과적).
  // 각 작업은 독립적인 try-catch로 격리 → 하나 실패해도 나머지는 성공.
  // map은 입력 순서를 보존하므로 반환 URL 배열도 before-01, before-02... 순서 유지.
  const tasks = picked.map(async (file, i): Promise<string | null> => {
    try {
      const arrayBuffer = await downloadFile(file.id);

      const originalSize = arrayBuffer.byteLength;
      const optimized = await optimizeImage(arrayBuffer);
      const optimizedSize = optimized.byteLength;
      console.log(
        `[import] optimized ${file.name}: ${(originalSize / 1024).toFixed(0)}KB → ${(optimizedSize / 1024).toFixed(0)}KB`,
      );

      const storagePath = `drive-import/${parentFolderId}/${side}-${String(
        i + 1,
      ).padStart(2, "0")}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, optimized, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.error(
          `[import] upload failed: ${storagePath} - ${uploadError.message}`,
        );
        return null;
      }

      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(storagePath);
      return urlData.publicUrl;
    } catch (err) {
      console.error(
        `[import] failed photo: ${file.name} - ${err instanceof Error ? err.message : String(err)}`,
      );
      return null;
    }
  });

  const resolvedUrls = await Promise.all(tasks);
  return resolvedUrls.filter((url): url is string => url !== null);
}
