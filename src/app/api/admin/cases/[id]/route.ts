import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/server";

const ALLOWED_RATIOS = ["1/1", "4/5", "3/4", "9/16", "16/9"] as const;

const UPDATABLE_FIELDS = [
  "store_name",
  "industry",
  "item",
  "region",
  "timing",
  "ratio",
  "is_video",
  "is_featured",
  "is_published",
  "is_blog_registered",
  "before_images",
  "after_images",
  "work_date",
  "slug",
  "drive_folder_id",
  "likes",
  "saves",
  "sort_order",
] as const;

/**
 * PATCH /api/admin/cases/[id]
 * 부분 업데이트. body에 담긴 필드만 갱신.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }

    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "body가 필요합니다." }, { status: 400 });
    }

    const patch: Record<string, unknown> = {};
    for (const key of UPDATABLE_FIELDS) {
      if (key in body) {
        patch[key] = body[key];
      }
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json(
        { error: "업데이트할 필드가 없습니다." },
        { status: 400 },
      );
    }

    if (
      "ratio" in patch &&
      !ALLOWED_RATIOS.includes(patch.ratio as (typeof ALLOWED_RATIOS)[number])
    ) {
      return NextResponse.json(
        { error: `ratio는 ${ALLOWED_RATIOS.join(", ")} 중 하나여야 합니다.` },
        { status: 400 },
      );
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("cases")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: `수정 실패: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, case: data });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/cases/[id]
 * 시공사례 삭제. 관련 이미지는 Storage에서 별도로 정리하지 않음(공유 가능성 대비).
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("cases").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: `삭제 실패: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
