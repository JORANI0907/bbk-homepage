import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/server";

const ALLOWED_RATIOS = ["1/1", "4/5", "3/4", "9/16", "16/9"] as const;

function normalizeImages(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .slice(0, 10);
}

/**
 * POST /api/admin/cases
 * 시공사례 신규 생성.
 * body: {
 *   store_name, industry?, item?, region?, timing?, ratio?,
 *   is_video?, is_featured?, is_published?,
 *   before_images?: string[], after_images?: string[],
 *   work_date?, is_blog_registered?, slug?, drive_folder_id?,
 *   likes?, saves?,
 * }
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
    const storeName =
      typeof body?.store_name === "string" ? body.store_name.trim() : "";

    if (!storeName) {
      return NextResponse.json(
        { error: "store_name(매장명)은 필수입니다." },
        { status: 400 },
      );
    }

    const ratio = typeof body?.ratio === "string" ? body.ratio : "1/1";
    if (!ALLOWED_RATIOS.includes(ratio as (typeof ALLOWED_RATIOS)[number])) {
      return NextResponse.json(
        { error: `ratio는 ${ALLOWED_RATIOS.join(", ")} 중 하나여야 합니다.` },
        { status: 400 },
      );
    }

    const supabase = createServiceClient();

    // sort_order 자동 부여
    let sortOrder = typeof body?.sort_order === "number" ? body.sort_order : null;
    if (sortOrder === null) {
      const { data: maxRow } = await supabase
        .from("cases")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      sortOrder = (maxRow?.sort_order ?? 0) + 100;
    }

    const insertRow = {
      store_name: storeName,
      industry: typeof body?.industry === "string" ? body.industry.trim() : null,
      item: typeof body?.item === "string" ? body.item.trim() : null,
      region: typeof body?.region === "string" ? body.region.trim() : null,
      timing: typeof body?.timing === "string" ? body.timing : "야간 시공",
      ratio,
      is_video: !!body?.is_video,
      is_featured: !!body?.is_featured,
      is_published: body?.is_published !== false,
      is_blog_registered: !!body?.is_blog_registered,
      before_images: normalizeImages(body?.before_images),
      after_images: normalizeImages(body?.after_images),
      work_date:
        typeof body?.work_date === "string" && body.work_date.length > 0
          ? body.work_date
          : null,
      slug: typeof body?.slug === "string" && body.slug.length > 0 ? body.slug : null,
      drive_folder_id:
        typeof body?.drive_folder_id === "string" && body.drive_folder_id.length > 0
          ? body.drive_folder_id
          : null,
      likes: typeof body?.likes === "number" ? body.likes : 0,
      saves: typeof body?.saves === "number" ? body.saves : 0,
      sort_order: sortOrder,
    };

    const { data, error } = await supabase
      .from("cases")
      .insert(insertRow)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: `생성 실패: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, case: data });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
