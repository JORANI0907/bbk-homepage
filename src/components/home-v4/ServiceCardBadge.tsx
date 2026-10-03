"use client";

import { TrendingUp } from "lucide-react";
import { useLiveCount } from "@/lib/hooks/useLiveCount";

type Props = {
  min?: number;
  max?: number;
  initial?: number;
  intervalMs?: number;
  tone?: "light" | "dark";
};

export function ServiceCardBadge({
  min = 5,
  max = 32,
  initial = 14,
  intervalMs = 9000,
  tone = "light",
}: Props) {
  const n = useLiveCount(min, max, initial, intervalMs, 2);

  const cls =
    tone === "dark"
      ? "bg-white/10 text-white border-white/15"
      : "bg-brand-50 text-brand-700 border-brand-100";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border tabular-nums ${cls}`}
    >
      <TrendingUp className="w-3 h-3" strokeWidth={2} />
      이번 주 {n}건 신청
    </span>
  );
}
