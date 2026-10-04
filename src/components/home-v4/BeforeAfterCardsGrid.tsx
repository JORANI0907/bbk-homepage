"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { maskStoreName, type Case } from "@/lib/data/cases";

type Props = {
  cases: Case[];
};

export default function BeforeAfterCardsGrid({ cases }: Props) {
  if (cases.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-brand-200 bg-white/60 py-16 flex flex-col items-center gap-3 text-brand-700">
        <ImageOff className="w-8 h-8" strokeWidth={1.5} />
        <p className="text-sm font-semibold">아직 대표 시공사례가 없어요.</p>
        <p className="text-xs text-ink-500">
          시공사례 페이지에서 &quot;대표사례&quot;로 지정하면 여기에 노출됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      {cases.map((c, i) => {
        const beforeUrl = c.before_images?.[0] ?? null;
        const afterUrl = c.after_images?.[0] ?? null;
        const card = (
          <motion.article
            key={c.id}
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-ink-100 hover:shadow-[0_20px_50px_-25px_rgba(10,15,26,0.2)] hover:-translate-y-1 transition-all duration-200 h-full"
          >
            {/* 모바일: 4/3 비율로 세로 공간 확보 (각 이미지가 세로로 잘 보이도록) · 데스크톱: 16/9 */}
            <div className="grid grid-cols-2 aspect-[4/3] md:aspect-[16/9] border-b border-ink-100">
              <BeforeAfterSlot url={beforeUrl} label="Before" tone="ink" />
              <BeforeAfterSlot url={afterUrl} label="After" tone="brand" />
            </div>

            <div className="p-3.5 md:p-6 flex items-center justify-between gap-3 md:gap-4">
              <div className="flex flex-col gap-0.5 md:gap-1 min-w-0">
                <p className="text-xs md:text-sm font-semibold text-ink-900 truncate">
                  {c.store_name
                    ? maskStoreName(c.store_name)
                    : `${c.industry ?? ""} ${c.item ?? ""}`.trim()}
                </p>
                <p className="text-[10px] md:text-xs text-ink-400 truncate">
                  {[c.industry, c.region, c.timing].filter(Boolean).join(" · ")}
                </p>
              </div>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-ink-400 font-semibold shrink-0">
                {String(i + 1).padStart(2, "0")} / {cases.length}
              </span>
            </div>
          </motion.article>
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
    </div>
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
    <div
      className={`relative flex flex-col items-center justify-center gap-2 ${bgClass}`}
    >
      <ImageOff className="w-6 h-6" strokeWidth={1.5} />
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}
