import { NextRequest, NextResponse } from "next/server";
import { listUnifiedCases } from "@/lib/data/cases";

/**
 * GET /api/cases/paginated?page=1&pageSize=4
 * 공개 사례 통합 페이지네이션.
 * - 1페이지: 대표 사례 (있으면)
 * - 2페이지~: 일반 공개 사례
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const pageSize = Math.min(
      20,
      Math.max(1, parseInt(searchParams.get("pageSize") ?? "4", 10) || 4),
    );

    const result = await listUnifiedCases(page, pageSize);
    return NextResponse.json({
      cases: result.cases,
      page,
      pageSize,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
