import { createServiceClient } from "@/lib/supabase/server";

export type CaseRatio = "1/1" | "4/5" | "3/4" | "9/16" | "16/9";

export type Case = {
  id: string;
  industry: string | null;
  item: string | null;
  region: string | null;
  timing: string | null;
  before_images: string[];
  after_images: string[];
  ratio: CaseRatio;
  is_video: boolean;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  likes: number;
  saves: number;
  store_name: string | null;
  work_date: string | null;
  is_blog_registered: boolean;
  slug: string | null;
  drive_folder_id: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * 리스트/썸네일에서 쓰는 대표 이미지 선택.
 * 우선순위: before_images[0] → after_images[0] → null
 * (사장님이 사진 선정하지 않아도 자동으로 "가장 극명한 Before 상태"가 뽑힘)
 */
export function getCaseCoverImage(c: Case): string | null {
  return c.before_images?.[0] ?? c.after_images?.[0] ?? null;
}

/**
 * 매장명 개인정보 보호 마스킹 — 공개 영역 전용.
 * 뒷부분 과반수를 "*"로 치환, 공백은 그대로 유지.
 *   "씨엘쏭"            → "씨**"
 *   "카페씨떼"          → "카페**"
 *   "엽기떡볶이 이천증포점" → "엽기떡볶이 *****"
 *   "지금딱찜닭"        → "지금***"
 */
export function maskStoreName(name: string | null | undefined): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (!trimmed) return "";
  const len = trimmed.length;
  if (len <= 1) return trimmed;
  const visibleLen = Math.max(1, Math.floor(len / 2));
  return Array.from(trimmed)
    .map((ch, i) => (i < visibleLen ? ch : ch === " " ? " " : "*"))
    .join("");
}

/**
 * 홈 Act 08 BeforeAfterV4 · 대표 사례 4건
 */
export async function listFeaturedCases(limit = 4): Promise<Case[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_featured", true)
    .eq("is_published", true)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[listFeaturedCases]", error.message);
    return [];
  }
  return (data ?? []) as Case[];
}

/**
 * 홈 Act 08.5 CasesFeedV5 · 최근 사례 (기본 32건)
 */
export async function listRecentCases(limit = 32): Promise<Case[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[listRecentCases]", error.message);
    return [];
  }
  return (data ?? []) as Case[];
}

/**
 * /cases 페이지 · 전체 사례 (공개분만)
 */
export async function listAllCases(): Promise<Case[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[listAllCases]", error.message);
    return [];
  }
  return (data ?? []) as Case[];
}

/**
 * 통합 페이지네이션 — 1페이지는 대표, 그 이후는 일반 사례.
 * - 대표 사례 있으면 page=1에 대표 pageSize개
 * - 대표 사례 없으면 전체 일반 사례만 페이지네이션
 * - page=2부터는 is_featured=false 사례의 다음 묶음
 */
export async function listUnifiedCases(
  page: number,
  pageSize: number,
): Promise<{ cases: Case[]; totalPages: number; totalCount: number }> {
  const supabase = createServiceClient();

  const [{ count: featuredCount }, { count: nonFeaturedCount }] = await Promise.all([
    supabase
      .from("cases")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .eq("is_featured", true),
    supabase
      .from("cases")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .eq("is_featured", false),
  ]);

  const featured = featuredCount ?? 0;
  const nonFeatured = nonFeaturedCount ?? 0;
  const totalCount = featured + nonFeatured;

  // 대표 사례가 있으면 페이지 1에 할당 → 나머지는 2페이지부터
  // 대표 없으면 일반만 페이지네이션
  const hasFeaturedPage = featured > 0;
  const nonFeaturedPages = Math.ceil(nonFeatured / pageSize);
  const totalPages = Math.max(
    1,
    (hasFeaturedPage ? 1 : 0) + nonFeaturedPages,
  );

  // 페이지 1 & 대표 있음 → 대표 반환
  if (page === 1 && hasFeaturedPage) {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(pageSize);
    if (error) {
      console.error("[listUnifiedCases featured]", error.message);
      return { cases: [], totalPages, totalCount };
    }
    return { cases: (data ?? []) as Case[], totalPages, totalCount };
  }

  // 그 외: 일반 사례 페이지네이션
  // 대표 페이지 1을 뺀 오프셋 계산
  const effectivePage = hasFeaturedPage ? page - 1 : page;
  const from = (effectivePage - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", false)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("[listUnifiedCases normal]", error.message);
    return { cases: [], totalPages, totalCount };
  }
  return { cases: (data ?? []) as Case[], totalPages, totalCount };
}

/**
 * 관리자 전용 · 비공개 포함 전체.
 */
export async function listAllCasesIncludingUnpublished(): Promise<Case[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[listAllCasesIncludingUnpublished]", error.message);
    return [];
  }
  return (data ?? []) as Case[];
}

/**
 * /cases/[slug] 상세 페이지용.
 * 공개 레코드만 반환. 관리자용은 getCaseByIdIncludingUnpublished 사용.
 */
export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) {
    console.error("[getCaseBySlug]", error.message);
    return null;
  }
  return (data as Case) ?? null;
}

/**
 * 관리자 편집 UI용 · 비공개 포함.
 */
export async function getCaseById(id: string): Promise<Case | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[getCaseById]", error.message);
    return null;
  }
  return (data as Case) ?? null;
}

/**
 * 중복 임포트 방지용 · drive_folder_id로 조회.
 */
export async function getCaseByDriveFolderId(
  driveFolderId: string,
): Promise<Case | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("drive_folder_id", driveFolderId)
    .maybeSingle();
  if (error) {
    console.error("[getCaseByDriveFolderId]", error.message);
    return null;
  }
  return (data as Case) ?? null;
}
