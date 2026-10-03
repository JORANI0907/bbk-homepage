import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/server";
import { setContent } from "@/lib/homepage-content";

const BUCKET = "homepage-images";
const MAX_BYTES = 10 * 1024 * 1024;

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
    const key = formData.get("key") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 없습니다." },
        { status: 400 },
      );
    }
    if (!key || !key.trim()) {
      return NextResponse.json(
        { error: "콘텐츠 key가 필요합니다." },
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
    const safeKey = key.replace(/[^a-z0-9._-]/gi, "_");
    const path = `${safeKey}/${Date.now()}.${ext}`;

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

    await setContent(key, { src: publicUrl, alt: "" }, session.id);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
