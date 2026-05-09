"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "문의하기",
    desc: "전화 또는 폼으로 문의, 당일 확인 후 회신드립니다.",
    accent: "#ff2e63",
    bg: "#0b0b0f",
    textColor: "white",
  },
  {
    num: "02",
    title: "현장 견적",
    desc: "직접 방문 또는 원격으로 빠르게 견적을 제공합니다.",
    accent: "#ffffff",
    bg: "#ff2e63",
    textColor: "white",
  },
  {
    num: "03",
    title: "시공 진행",
    desc: "시공 일정 예약 및 시공을 받고 전·후 사진 결과물을 받습니다.",
    accent: "#ff2e63",
    bg: "#0b0b0f",
    textColor: "white",
  },
  {
    num: "04",
    title: "사후 관리",
    desc: "작업 완료 후 결제가 이뤄지며 정기 관리 서비스 문의 시 더욱 빠른 안내가 가능합니다.",
    accent: "#0b0b0f",
    bg: "#f6f6f4",
    textColor: "#0b0b0f",
  },
];

const PROCESS_TICKER = [
  "문의하기", "당일 확인", "현장 방문", "맞춤 견적", "야간 시공",
  "사진 기록", "사후 관리", "정기 연결",
];

export default function ProcessSection() {
  const doubled = [...PROCESS_TICKER, ...PROCESS_TICKER];

  return (
    <section className="bg-bbk-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
            SECTION 06 — 진행 과정
          </span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-black leading-tight tracking-[-0.02em] mb-14 md:mb-20 break-keep"
          style={{ fontSize: "clamp(30px, 4.5vw, 64px)" }}
        >
          이렇게 진행됩니다.
        </motion.h2>

        {/* 데스크탑: 가로 4단 */}
        <div className="hidden md:grid grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="px-8 lg:px-10 py-10 group relative"
              style={{ backgroundColor: step.bg }}
            >
              {/* 좌측 컬러 바 */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: step.accent + "60" }}
              />

              <p
                className="font-black leading-none mb-8"
                style={{
                  fontSize: "clamp(56px, 7vw, 96px)",
                  color: step.accent,
                  opacity: 0.3,
                }}
              >
                {step.num}
              </p>
              <p
                className="font-black text-xl leading-snug mb-3"
                style={{ color: step.textColor }}
              >
                {step.title}
              </p>
              <p
                className="text-sm leading-relaxed break-keep"
                style={{ color: step.textColor, opacity: 0.6 }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 모바일: 세로 4단 */}
        <div className="md:hidden flex flex-col gap-px">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-6 py-7 px-4"
              style={{ backgroundColor: step.bg }}
            >
              <p
                className="font-black leading-none shrink-0 text-5xl"
                style={{ color: step.accent, opacity: 0.35 }}
              >
                {step.num}
              </p>
              <div>
                <p
                  className="font-black text-lg mb-1.5"
                  style={{ color: step.textColor }}
                >
                  {step.title}
                </p>
                <p
                  className="text-sm leading-relaxed break-keep"
                  style={{ color: step.textColor, opacity: 0.6 }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 프로세스 키워드 티커 */}
        <div className="overflow-hidden -mx-6 md:-mx-12 mt-12">
          <div
            className="flex gap-0 w-max border-t border-b border-white/[0.06] py-3"
            style={{ animation: "marqueeReverse 25s linear infinite" }}
          >
            {doubled.map((item, i) => (
              <span
                key={i}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/20 whitespace-nowrap shrink-0 px-6 border-r border-white/[0.06]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
