import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/server";

const BUCKET = "homepage-images";
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_SIDES = new Set(["before", "after"]);

/**
 * POST /api/admin/cases/upload
 * 시공사례용 이미지 업로드.
 * form: file (image), side ("before" | "after"), caseId (optional)
 * 반환: { url }. 저장 경로는 cases/{caseId ?? "new"}/{side}-{ts}.{ext}
 * cases 테이블에는 저장하지 않고 URL만 반환 → 클라이언트가 이후 POST/PATCH로 URL 반영.
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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const side = formData.get("side") as string | null;
    const caseId = formData.get("caseId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }
    if (!side || !ALLOWED_SIDES.has(side)) {
      return NextResponse.json(
        { error: "side는 before 또는 after 여야 합니다." },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "파일 크기가 10MB를 초과합니다." },
        { status: 413 },
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "이미지 파일만 업로드 가능합니다." },
        { status: 415 },
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const folder = caseId && /^[a-f0-9-]+$/i.test(caseId) ? caseId : "new";
    const path = `cases/${folder}/${side}-${Date.now()}.${ext}`;

    const supabase = createServiceClient();
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `업로드 실패: ${uploadError.message}` },
        { status: 500 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
