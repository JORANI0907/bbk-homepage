"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import EditableImage from "@/components/admin/EditableImage";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import { Bridge } from "./Bridge";

const METRICS = [
  { value: "500", suffix: "건 이상", label: "매달 시공 건수" },
  { value: "128", suffix: "개 이상", label: "케어 서비스 품목" },
];

/**
 * 배경 사진 경로. 준비되면 여기에 실제 경로 입력.
 *   예: "/images/proof-bg.jpg"
 * 값이 비어 있으면 다크 그라디언트 배경으로 fallback.
 */
const BG_IMAGE = "";

function Counter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const raw = value.replace(/,/g, "");
    const target = parseInt(raw, 10);
    if (Number.isNaN(target)) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const cur = Math.round(target * eased);
      setDisplay(cur.toLocaleString());
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setDisplay("0");
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div className="flex items-baseline gap-2 md:gap-3">
      <span
        ref={ref}
        className="text-[68px] md:text-[128px] font-black text-white leading-none tracking-[-0.03em] tabular-nums drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
      >
        {display}
      </span>
      <span className="text-lg md:text-2xl text-white/80 font-semibold">
        {suffix}
      </span>
    </div>
  );
}

export default function StatsBarV4() {
  return (
    <EditableSection className="relative overflow-hidden bg-ink-900">
      {/* 배경 사진 · 편집 가능 */}
      <div className="absolute inset-0">
        <EditableImage
          contentKey="stats.background"
          defaultSrc={BG_IMAGE || undefined}
          placeholder={
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950" />
          }
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          wrapperClassName="absolute inset-0"
        />
        {/* 어두운 오버레이 · 사진을 어둡게 → 글자 대비 확보 */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        {/* 브랜드 컬러 톤 가미 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 20% 20%, rgba(44,167,241,0.35), transparent 55%), radial-gradient(ellipse 55% 55% at 85% 80%, rgba(44,167,241,0.18), transparent 55%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
        {/* 헤드 */}
        <div className="mb-14 md:mb-20">
          <Bridge
            contentKeyPrefix="stats"
            tone="dark"
            step="04 · 실제 시공 실적"
            bridge="국내 탑 법인 청소 업체와 함께 하고 계십니다."
            titleMain="압도적인 케어건수."
            titleAccent="서비스 품목."
          />
        </div>

        {/* 2개 메트릭 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col gap-4 md:pl-8 md:border-l-2 md:border-white/20"
            >
              <Counter value={m.value} suffix={m.suffix} />
              <EditableText
                contentKey={`stats.metric.${i}.label`}
                defaultText={m.label}
                className="text-sm md:text-base text-white/85 font-medium"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA · 문의 버튼 */}
        <div className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="/quick-inquiry"
            className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full bg-brand-500 text-white text-sm md:text-base font-semibold hover:bg-brand-600 transition-colors active:scale-[0.98] shadow-[0_16px_40px_-15px_rgba(44,167,241,0.6)]"
          >
            빠른 견적 요청
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full border border-white/40 bg-white/5 backdrop-blur text-white text-sm md:text-base font-semibold hover:bg-white/10 hover:border-white/70 transition-colors"
          >
            문의하기
          </Link>
          <a
            href={SITE.contact.telHref}
            className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-6 rounded-full text-white/80 text-sm md:text-base font-semibold hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={1.75} />
            {SITE.contact.telDisplay}
          </a>
        </div>
      </div>
    </EditableSection>
  );
}
