"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Bell, Camera, CalendarCheck, BarChart3, Shield, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "정기 일정 확인",
    desc: "다음 방문 일정과 작업 내역을 앱에서 바로 확인합니다.",
  },
  {
    icon: Camera,
    title: "시공 전후 사진",
    desc: "매 시공 전후 사진을 앱에 자동 업로드. 현장 없이 결과를 확인합니다.",
  },
  {
    icon: Bell,
    title: "실시간 알림",
    desc: "시공 시작·완료 알림을 실시간으로 받아보세요.",
  },
  {
    icon: BarChart3,
    title: "관리 리포트",
    desc: "월별 시공 내역과 청소 상태 리포트를 자동으로 생성합니다.",
  },
  {
    icon: Shield,
    title: "위생 이력 관리",
    desc: "HACCP 등 위생 점검에 필요한 시공 이력을 앱 하나로 관리합니다.",
  },
  {
    icon: Smartphone,
    title: "언제 어디서나",
    desc: "iOS·Android 전용 앱으로 이동 중에도 위생 상태를 확인합니다.",
  },
];

const TICKER_ITEMS = [
  "정기 일정 관리", "시공 사진 자동 저장", "실시간 알림", "위생 이력 조회",
  "월별 리포트", "HACCP 연동", "전용 앱 제공", "다점포 통합 관리",
  "iOS · Android", "언제 어디서나",
];

// 각 카드가 폰 중앙에서 퍼져나오는 방향 벡터 (3×2 그리드)
const CARD_OFFSETS = [
  { x: -60, y: -40 }, // 0: top-left
  { x: 0,   y: -60 }, // 1: top-center
  { x: 60,  y: -40 }, // 2: top-right
  { x: -60, y: 40  }, // 3: bottom-left
  { x: 0,   y: 60  }, // 4: bottom-center
  { x: 60,  y: 40  }, // 5: bottom-right
];

export default function AppSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-bbk-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
            SECTION 05 — 전용 앱
          </span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        {/* 헤드라인 + 폰 목업 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bbk-pink mb-4">
              BBK SPACE CARE APP
            </p>
            <h2
              className="text-white font-black leading-tight tracking-[-0.02em] break-keep mb-5"
              style={{ fontSize: "clamp(28px, 4.5vw, 60px)" }}
            >
              스마트폰 하나로
              <br />
              공간 위생을 관리하세요.
            </h2>
            <p className="text-white/45 text-base leading-relaxed break-keep max-w-md">
              시공 일정부터 전후 사진, 위생 이력 리포트까지 — BBK 전용 앱
              하나로 우리 공간의 위생 상태를 언제 어디서나 확인할 수 있습니다.
            </p>
          </motion.div>

          {/* 폰 목업 (플로팅 뱃지 없음) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-52 h-[420px] rounded-[2.8rem] border-[3px] border-white/15 bg-[#0d0d12] flex flex-col items-center pt-10 pb-8 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-white/10" />
              <div className="flex-1 flex flex-col items-center justify-center gap-5 w-full px-6">
                <div
                  className="rounded-[22px] overflow-hidden shadow-[0_8px_32px_rgba(0,170,255,0.35)]"
                  style={{ width: 100, height: 100 }}
                >
                  <Image
                    src="/app-logo.png"
                    alt="BBK 공간케어 앱"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                  BBK 공간케어
                </p>
                <div className="w-full space-y-2 mt-2">
                  {[80, 60, 70].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full bg-white/[0.06]"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="w-20 h-1 rounded-full bg-white/20" />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(0,170,255,0.08) 0%, rgba(255,46,99,0.05) 50%, transparent 75%)",
              }}
            />
          </motion.div>
        </div>

        {/* 피처 그리드 — 폰에서 퍼져나오는 애니메이션 */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06] mb-16">
          {FEATURES.map((f, i) => {
            const offset = CARD_OFFSETS[i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.82 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : { opacity: 0, x: offset.x, y: offset.y, scale: 0.82 }
                }
                transition={{
                  delay: i * 0.07,
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
                className="bg-[#111116] p-6 md:p-8 flex flex-col gap-3 group hover:bg-[#161619] transition-colors"
              >
                <div className="w-9 h-9 border border-bbk-pink/30 flex items-center justify-center group-hover:border-bbk-pink/60 transition-colors">
                  <f.icon className="w-4 h-4 text-bbk-pink" />
                </div>
                <p className="text-white font-bold">{f.title}</p>
                <p className="text-white/45 text-sm leading-relaxed break-keep">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 앱 키워드 티커 */}
        <div className="overflow-hidden -mx-6 md:-mx-12 mb-14">
          <div
            className="flex w-max py-2"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            {doubled.map((item, i) => (
              <span
                key={i}
                className="font-mono text-[11px] uppercase tracking-widest text-bbk-pink/40 whitespace-nowrap shrink-0 px-3 mr-4"
              >
                {item}
                <span className="ml-4 text-white/10">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-bbk-pink text-white px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all"
          >
            앱 사용 문의하기
          </Link>
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
            정기 계약 고객에게 무료 제공
          </p>
        </motion.div>
      </div>
    </section>
  );
}
