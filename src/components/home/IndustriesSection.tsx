"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ROW_1 = [
  "치킨전문점", "한식당", "고깃집", "중식당", "일식당", "이자카야",
  "분식점", "패스트푸드", "뷔페", "단체급식", "호텔 레스토랑", "푸드코트",
];
const ROW_2 = [
  "내과·소아과", "치과", "피부과·성형", "한의원", "동물병원",
  "헬스장", "필라테스·요가", "스파·마사지", "에스프레소 바", "디저트 카페",
  "베이커리", "브런치카페",
];
const ROW_3 = [
  "학원", "독서실·스터디카페", "사무실", "공유오피스", "어린이집·유치원",
  "미용실", "네일샵", "약국", "편의점", "마트", "노래방", "PC방", "스크린골프",
];

function MarqueeRow({ items, speed = 40 }: { items: string[]; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-1.5">
      <div
        className="flex w-max"
        style={{ animation: `marqueeReverse ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="border border-bbk-stone-4/30 text-bbk-stone-6 font-mono text-[12px] px-4 py-2 whitespace-nowrap mr-2.5 hover:border-bbk-pink/40 hover:text-bbk-black transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const IMPACT_STATS = [
  { num: "6", unit: "개", label: "산업군" },
  { num: "50", unit: "+", label: "업종" },
  { num: "1,200", unit: "+", label: "현장 완료" },
] as const;

export default function IndustriesSection() {
  return (
    <section className="bg-bbk-concrete py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
            SECTION 07 — 업종
          </span>
          <div className="flex-1 h-px bg-bbk-stone-4/30" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-bbk-black font-black leading-tight tracking-[-0.02em] mb-10 break-keep"
          style={{ fontSize: "clamp(36px, 6.5vw, 96px)" }}
        >
          어떤 공간이든.
        </motion.h2>

        {/* 임팩트 스탯 블록 */}
        <div className="grid grid-cols-3 border border-bbk-black/12">
          {IMPACT_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-6 py-8 md:px-10 md:py-10 flex flex-col gap-1 border-r border-bbk-black/12 last:border-r-0"
            >
              <p
                className="font-black leading-none tracking-[-0.04em] text-bbk-black"
                style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
              >
                {s.num}
                <span className="text-bbk-pink">{s.unit}</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mt-2">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 마퀴 — 풀블리드 (좌→우 단방향) */}
      <div className="flex flex-col gap-2.5 mb-14 md:mb-20 mt-12 md:mt-16">
        <MarqueeRow items={ROW_1} speed={38} />
        <MarqueeRow items={ROW_2} speed={44} />
        <MarqueeRow items={ROW_3} speed={36} />
      </div>

      {/* 프랜차이즈 하이라이트 */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-bbk-black/15 bg-bbk-cool-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
        >
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-2">
              FRANCHISE &amp; MULTI-BRANCH
            </p>
            <h3 className="text-bbk-black font-black text-xl md:text-2xl leading-snug mb-3 break-keep">
              프랜차이즈 · 다점포도 함께합니다
            </h3>
            <p className="text-bbk-stone-6 text-sm leading-relaxed break-keep max-w-lg">
              본사 일괄 계약부터 개별 지점 관리까지 — 전 지점 동일 기준으로
              위생 수준을 유지합니다.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-bbk-black text-white px-7 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-bbk-black/80 active:scale-[0.98] transition-all"
          >
            다점포 상담 →
          </Link>
        </motion.div>

        <p className="text-center font-mono text-[11px] text-bbk-stone-6 mt-8">
          목록에 없어도 괜찮습니다. 어떤 공간이든 상담해 드립니다.
        </p>
      </div>
    </section>
  );
}
