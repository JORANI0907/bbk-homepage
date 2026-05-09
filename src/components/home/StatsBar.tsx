"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const STATS = [
  { numeric: 1200, suffix: "+", label: "누적 현장", sub: "전문 노하우, 팀원 운영" },
  { numeric: 98, suffix: "개", label: "딥케어 품목", sub: "최대 품목 골라서 청소" },
  { numeric: 46, suffix: "개", label: "엔드케어 품목", sub: "원하는 만큼 골라서 위탁" },
  { numeric: null, display: "24h", label: "운영 시간", sub: "언제든 원하는 시간에" },
] as const;

function CountStat({
  numeric,
  suffix,
  display,
  label,
  sub,
  delay,
}: {
  numeric: number | null;
  suffix?: string;
  display?: string;
  label: string;
  sub: string;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCount = useCallback(() => {
    if (numeric === null) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setAnimating(true);
    setCount(0);
    const steps = 45;
    const duration = 900;
    let step = 0;
    timerRef.current = setInterval(() => {
      step += 1;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numeric));
      if (step >= steps) {
        clearInterval(timerRef.current!);
        setCount(numeric);
        setAnimating(false);
      }
    }, duration / steps);
  }, [numeric]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const shown =
    numeric !== null ? `${count}${suffix ?? ""}` : (display ?? "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setTimeout(startCount, delay * 1000 + 300)}
      className="px-5 md:px-10 py-10 md:py-12 cursor-default select-none"
    >
      <p
        className="font-black leading-none tracking-[-0.04em] transition-colors duration-150"
        style={{
          fontSize: "clamp(32px, 5vw, 96px)",
          color: animating ? "#ff2e63" : "#0b0b0f",
          wordBreak: "keep-all",
        }}
      >
        {shown}
      </p>
      <div className="mt-4 space-y-0.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-bbk-stone-6">
          {label}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-bbk-stone-6/60">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-bbk-cool-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
            SECTION 02 — 실적
          </span>
          <div className="flex-1 h-px bg-bbk-concrete" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-bbk-concrete border border-bbk-concrete">
          {STATS.map((s, i) => (
            <CountStat
              key={s.label}
              numeric={s.numeric}
              suffix={"suffix" in s ? s.suffix : undefined}
              display={"display" in s ? s.display : undefined}
              label={s.label}
              sub={s.sub}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
