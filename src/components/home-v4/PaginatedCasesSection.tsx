"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BeforeAfterCardsGrid from "./BeforeAfterCardsGrid";
import type { Case } from "@/lib/data/cases";

type Props = {
  initialCases: Case[];
  initialTotalPages: number;
  pageSize: number;
};

/**
 * 더 많은 시공 사례 섹션 — 번호 페이지네이션 + lazy load.
 * 초기 1페이지는 서버에서 미리 받고, 2페이지부터 fetch.
 */
export default function PaginatedCasesSection({
  initialCases,
  initialTotalPages,
  pageSize,
}: Props) {
  const [page, setPage] = useState(1);
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  async function goToPage(target: number) {
    if (target === page || target < 1 || target > totalPages || loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cases/paginated?page=${target}&pageSize=${pageSize}`,
        { cache: "no-store" },
      );
      const data = await res.json();
      if (res.ok) {
        setCases(data.cases);
        setPage(target);
        setTotalPages(data.totalPages);
      } else {
        console.error("[PaginatedCases] fetch failed:", data.error);
      }
    } catch (err) {
      console.error("[PaginatedCases] fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  const pageNumbers = buildPageNumbers(page, totalPages, 7);

  // 공개된 non-featured 사례가 없으면 섹션 자체를 숨김
  if (totalPages < 1 || cases.length === 0) return null;

  return (
    <section className="bg-brand-50 py-24 md:py-32 border-y border-brand-100">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-16">
        <div className="flex flex-col gap-5 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
            Cases
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight break-keep text-ink-900">
            말보다 결과로,
            <br />
            <span className="text-ink-400">보여드릴게요.</span>
          </h2>
          <p className="text-base md:text-lg leading-[1.65] break-keep max-w-2xl text-ink-600">
            BBK가 함께한 매장들을 순서대로 만나보세요. 번호를 눌러 다음 사례로 넘어갈 수 있어요.
          </p>
        </div>

        <div
          className={`transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}
          aria-busy={loading}
        >
          <BeforeAfterCardsGrid cases={cases} />
        </div>

        {totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-1 md:gap-2"
            aria-label="시공 사례 페이지네이션"
          >
            <PageButton
              onClick={() => goToPage(page - 1)}
              disabled={page === 1 || loading}
              aria-label="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </PageButton>

            {pageNumbers.map((n, idx) =>
              n === "..." ? (
                <span
                  key={`gap-${idx}`}
                  className="w-9 h-9 flex items-center justify-center text-ink-400 text-sm"
                >
                  …
                </span>
              ) : (
                <PageButton
                  key={n}
                  onClick={() => goToPage(n)}
                  disabled={loading}
                  active={n === page}
                  aria-label={`${n} 페이지로 이동`}
                  aria-current={n === page ? "page" : undefined}
                >
                  {n}
                </PageButton>
              ),
            )}

            <PageButton
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages || loading}
              aria-label="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </PageButton>

            {loading && (
              <Loader2
                className="w-4 h-4 text-brand-500 animate-spin ml-2"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </nav>
        )}
      </div>
    </section>
  );
}

function PageButton({
  children,
  onClick,
  disabled,
  active,
  ...rest
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
        active
          ? "bg-ink-900 text-white"
          : "bg-white border border-ink-200 text-ink-700 hover:border-ink-900 disabled:opacity-40 disabled:hover:border-ink-200"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * 페이지 번호 리스트 생성 — 최대 maxShown개까지.
 * 예: 현재 5, 전체 20 → [1, "...", 4, 5, 6, "...", 20]
 */
function buildPageNumbers(
  current: number,
  total: number,
  maxShown: number,
): Array<number | "..."> {
  if (total <= maxShown) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const result: Array<number | "..."> = [];
  const sideCount = Math.floor((maxShown - 3) / 2);
  result.push(1);
  if (current - sideCount > 2) result.push("...");
  const start = Math.max(2, current - sideCount);
  const end = Math.min(total - 1, current + sideCount);
  for (let i = start; i <= end; i++) result.push(i);
  if (current + sideCount < total - 1) result.push("...");
  if (total > 1) result.push(total);
  return result;
}
