import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/server";
import {
  extractFolderIdFromUrl,
  filterFolders,
  listFolderChildren,
} from "@/lib/drive-import/drive-client";
import {
  parseFolderName,
  makeSlug,
} from "@/lib/drive-import/folder-parser";
import { detectIndustry } from "@/lib/drive-import/industry-classifier";

export type ScanItem = {
  folderId: string;
  folderName: string;
  workDate: string | null;
  storeName: string;
  isBlogRegistered: boolean;
  tag: string | null;
  industry: string;
  slug: string;
  alreadyImported: boolean;
};

/**
 * POST /api/admin/cases/import-scan
 * body: { folderUrl: string }
 *
 * 상위 폴더의 모든 하위 작업 폴더를 스캔하고,
 * 각 폴더에 대해 메타 자동 파싱 결과를 반환.
 * 실제 임포트는 하지 않음 — 미리보기용.
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
    const body = await request.json();
    const folderUrl = typeof body?.folderUrl === "string" ? body.folderUrl : "";
    const rootFolderId = extractFolderIdFromUrl(folderUrl);

    if (!rootFolderId) {
      return NextResponse.json(
        { error: "유효한 Google Drive 폴더 URL이 아닙니다." },
        { status: 400 },
      );
    }

    // 1. 상위 폴더의 하위 폴더만 조회
    const children = await listFolderChildren(rootFolderId);
    const workFolders = filterFolders(children);

    // 디버그: 수신한 데이터 전수 로깅
    console.log(
      `[import-scan] rootFolderId=${rootFolderId} total children=${children.length} folders=${workFolders.length}`,
    );
    if (children.length > 0) {
      console.log(
        `[import-scan] mimeTypes:`,
        [...new Set(children.map((c) => c.mimeType))].join(", "),
      );
      console.log(
        `[import-scan] sample names:`,
        children.slice(0, 3).map((c) => `"${c.name}" (${c.mimeType})`).join(" | "),
      );
    }

    if (workFolders.length === 0) {
      return NextResponse.json({
        rootFolderId,
        totalFound: 0,
        items: [],
        debug: {
          totalChildren: children.length,
          mimeTypes: [...new Set(children.map((c) => c.mimeType))],
          sampleNames: children.slice(0, 5).map((c) => ({
            name: c.name,
            mimeType: c.mimeType,
          })),
        },
      });
    }

    // 2. 이미 임포트된 drive_folder_id 조회 (중복 체크)
    // 쿼리 방향: DB 전체의 drive_folder_id를 가져와 Set으로 체크.
    // 반대로 `.in("drive_folder_id", folderIds)` 쓰면 folderIds가 수백 개일 때
    // PostgREST URL 길이 제한(~8KB)에 걸려 쿼리 실패 → 전원 "안 올림"으로 표시되는 silent failure 발생.
    const supabase = createServiceClient();
    const { data: existing, error: existingErr } = await supabase
      .from("cases")
      .select("drive_folder_id")
      .not("drive_folder_id", "is", null);

    if (existingErr) {
      console.error("[import-scan] existing drive_folder_id 조회 실패:", existingErr.message);
    }

    const importedSet = new Set(
      (existing ?? [])
        .map((r) => r.drive_folder_id)
        .filter((v): v is string => typeof v === "string"),
    );
    console.log(
      `[import-scan] 이미 임포트된 폴더 ${importedSet.size}건 식별`,
    );

    // 3. 각 폴더 파싱
    const items: ScanItem[] = workFolders.map((f) => {
      const parsed = parseFolderName(f.name);
      const industry = detectIndustry(parsed.storeName);
      const slug = makeSlug(parsed.storeName, parsed.workDate);
      return {
        folderId: f.id,
        folderName: f.name,
        workDate: parsed.workDate,
        storeName: parsed.storeName,
        isBlogRegistered: parsed.isBlogRegistered,
        tag: parsed.tag,
        industry,
        slug,
        alreadyImported: importedSet.has(f.id),
      };
    });

    // 4. 날짜순 역정렬 (최신 위)
    items.sort((a, b) => {
      if (a.workDate && b.workDate) return b.workDate.localeCompare(a.workDate);
      if (a.workDate) return -1;
      if (b.workDate) return 1;
      return a.folderName.localeCompare(b.folderName);
    });

    return NextResponse.json({
      rootFolderId,
      totalFound: items.length,
      alreadyImported: items.filter((i) => i.alreadyImported).length,
      items,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
