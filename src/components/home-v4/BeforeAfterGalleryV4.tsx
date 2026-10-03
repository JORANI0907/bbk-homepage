"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { maskStoreName, type Case } from "@/lib/data/cases";

const PAGE_SIZE = 4;

type Props = {
  cases: Case[];
};

export default function BeforeAfterGalleryV4({ cases }: Props) {
  const [page, setPage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.max(1, Math.ceil(cases.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = cases.slice(start, start + PAGE_SIZE);

  const goto = (next: number) => {
    if (next < 0 || next >= totalPages) return;
    setPage(next);
    if (gridRef.current) {
      const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (cases.length === 0) {
    return (
      <section className="bg-brand-50 py-24 md:py-32 border-y border-brand-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8 rounded-3xl border border-dashed border-brand-200 bg-white/60 py-16 flex flex-col items-center gap-3 text-brand-700">
          <ImageOff className="w-8 h-8" strokeWidth={1.5} />
          <p className="text-sm font-semibold">아직 시공사례가 없어요.</p>
          <p className="text-xs text-ink-500">
            사례를 추가하면 이 페이지에 자동으로 노출됩니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-50 py-24 md:py-32 border-y border-brand-100">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-16">
        <div className="flex flex-col gap-5 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight break-keep text-ink-900">
            말보다 결과로,
            <br />
            <span className="text-ink-400">보여드릴게요.</span>
          </h2>
          <p className="text-base md:text-lg leading-[1.65] break-keep max-w-2xl text-ink-600">
            다양한 종류의 서비스 사례를 확인해보세요.
          </p>
        </div>

        <div ref={gridRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {visible.map((c, i) => {
                const beforeUrl = c.before_images?.[0] ?? null;
                const afterUrl = c.after_images?.[0] ?? null;
                const card = (
                  <article className="rounded-3xl overflow-hidden bg-white border border-ink-100 hover:shadow-[0_20px_50px_-25px_rgba(10,15,26,0.2)] hover:-translate-y-1 transition-all duration-200 h-full">
                    <div className="grid grid-cols-2 aspect-[16/9] border-b border-ink-100">
                      <BeforeAfterSlot url={beforeUrl} label="Before" tone="ink" />
                      <BeforeAfterSlot url={afterUrl} label="After" tone="brand" />
                    </div>

                    <div className="p-6 flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-sm font-semibold text-ink-900 truncate">
                          {c.store_name
                            ? maskStoreName(c.store_name)
                            : `${c.industry ?? ""} ${c.item ?? ""}`.trim()}
                        </p>
                        <p className="text-xs text-ink-400 truncate">
                          {[c.industry, c.region, c.timing].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400 font-semibold shrink-0">
                        {String(start + i + 1).padStart(2, "0")} / {cases.length}
                      </span>
                    </div>
                  </article>
                );
                return c.slug ? (
                  <Link key={c.id} href={`/cases/${c.slug}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  <div key={c.id} className="h-full">
                    {card}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 페이지네이션 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-ink-500">
            총 <span className="font-bold text-ink-900">{cases.length}</span>건
            &middot; 페이지{" "}
            <span className="font-bold text-ink-900">{page + 1}</span> /{" "}
            {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goto(page - 1)}
              disabled={page === 0}
              aria-label="이전 페이지"
              className="w-10 h-10 rounded-full border border-ink-200 bg-white flex items-center justify-center text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-ink-200 disabled:hover:text-ink-700"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const isActive = i === page;
              return (
                <button
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`${i + 1} 페이지`}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-w-10 h-10 px-3 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-ink-900 text-white"
                      : "bg-white border border-ink-200 text-ink-700 hover:border-ink-900 hover:text-ink-900"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}

            <button
              onClick={() => goto(page + 1)}
              disabled={page === totalPages - 1}
              aria-label="다음 페이지"
              className="w-10 h-10 rounded-full border border-ink-200 bg-white flex items-center justify-center text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-ink-200 disabled:hover:text-ink-700"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSlot({
  url,
  label,
  tone,
}: {
  url: string | null;
  label: string;
  tone: "ink" | "brand";
}) {
  const bgClass = tone === "brand" ? "bg-brand-100 text-brand-700" : "bg-ink-100 text-ink-400";
  if (url) {
    return (
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className={`relative flex flex-col items-center justify-center text-center gap-2 ${bgClass}`}>
      <ImageOff className="w-6 h-6" strokeWidth={1.5} />
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}
