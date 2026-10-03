"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LiveTickerProps = {
  items: readonly string[];
  intervalMs?: number;
  tone?: "light" | "dark";
  prefix?: string;
};

export function LiveTicker({
  items,
  intervalMs = 5000,
  tone = "light",
  prefix = "LIVE",
}: LiveTickerProps) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const bg =
    tone === "dark"
      ? "bg-white/[0.06] border border-white/10 text-white"
      : "bg-ink-50 border border-ink-100 text-ink-900";
  const prefixColor =
    tone === "dark" ? "text-brand-400" : "text-brand-600";
  const dot = tone === "dark" ? "bg-brand-400" : "bg-brand-500";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full px-4 py-2 text-[12px] md:text-[13px] font-medium ${bg}`}
    >
      <span className="relative inline-flex shrink-0">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <span
          className={`absolute inset-0 w-1.5 h-1.5 rounded-full ${dot} animate-ping`}
        />
      </span>
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${prefixColor}`}
      >
        {prefix}
      </span>
      <span className="text-ink-200 hidden sm:inline">·</span>
      <div className="relative h-[18px] overflow-hidden flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="block truncate"
          >
            {items[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
