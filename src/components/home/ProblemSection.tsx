"use client";

import { motion } from "framer-motion";

const PROBLEMS = [
  {
    num: "01",
    problem: "야간 마감 청소 때문에 직원이 남아야 한다",
    solution:
      "21시~08시 야간 운영으로, 직원 없이 다음 날 아침 깨끗한 공간을 만듭니다.",
  },
  {
    num: "02",
    problem: "일반 청소로는 누적 오염이 반복된다",
    solution:
      "기기별 분해 세척 + 공간케어로 근본 오염을 제거하고 장기 비용을 줄입니다.",
  },
  {
    num: "03",
    problem: "청소 신경 쓰느라 본업에 집중 못한다",
    solution:
      "청소를 완전히 위탁하고, 메뉴·서비스·고객 경험에 집중하세요.",
  },
  {
    num: "04",
    problem: "직원 불만·피로도 증가로 서비스질 하락",
    solution:
      "전문 청소팀이 위탁 처리하면 직원 피로가 줄고, 본 업무 집중도와 서비스 품질이 함께 올라갑니다.",
  },
];

function ProblemCard({
  item,
  delay = 0,
}: {
  item: (typeof PROBLEMS)[number];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay }}
      className="relative bg-[#111116] border-2 border-white/[0.06] p-8 md:p-10 overflow-hidden group hover:border-bbk-pink transition-all duration-300"
      style={{ boxShadow: "inset 0 0 0 0 #ff2e6300" }}
    >
      {/* hover 시 내부 핑크 글로우 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,46,99,0.07) 0%, transparent 70%)" }}
      />

      {/* 배경 번호 */}
      <span
        aria-hidden
        className="absolute top-4 right-4 md:top-6 md:right-8 font-black text-white/[0.04] group-hover:text-bbk-pink/10 leading-none select-none pointer-events-none transition-colors duration-300"
        style={{ fontSize: "clamp(70px,10vw,130px)" }}
      >
        {item.num}
      </span>

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30 mb-4 group-hover:text-bbk-pink/60 transition-colors duration-300">
          PROBLEM {item.num}
        </p>
        <h3 className="text-white font-black leading-snug mb-5 break-keep text-lg md:text-xl">
          {item.problem}
        </h3>
        {/* 구분선 — hover 시 길이 증가 + 핑크 */}
        <div className="w-7 h-0.5 bg-bbk-pink mb-4 group-hover:w-16 transition-all duration-500" />
        <p className="text-white/55 text-sm md:text-base leading-relaxed break-keep">
          {item.solution}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className="bg-bbk-black py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
            SECTION 03 — 문제 해결
          </span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-black leading-tight tracking-[-0.02em] mb-12 md:mb-16 break-keep"
          style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
        >
          이런 고민,
          <br />
          BBK가 해결합니다.
        </motion.h2>

        {/* 2×2 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]">
          {PROBLEMS.map((p, i) => (
            <ProblemCard key={p.num} item={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
