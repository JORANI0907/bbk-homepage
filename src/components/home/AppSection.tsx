"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Bell, Camera, CalendarCheck, BarChart3, Shield, Smartphone, ExternalLink, ArrowRight } from "lucide-react";

const FEATURES = [
  { icon: CalendarCheck, title: "정기 일정 확인" },
  { icon: Camera,        title: "시공 전후 사진" },
  { icon: Bell,          title: "실시간 알림" },
  { icon: BarChart3,     title: "관리 리포트" },
  { icon: Shield,        title: "위생 이력 관리" },
  { icon: Smartphone,    title: "언제 어디서나" },
];

const TICKER_ITEMS = [
  "정기 일정 관리", "시공 사진 자동 저장", "실시간 알림", "위생 이력 조회",
  "월별 리포트", "HACCP 연동", "전용 앱 제공", "다점포 통합 관리",
  "iOS · Android", "언제 어디서나",
];

export default function AppSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="bg-bbk-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
            SECTION 05 — 전용 앱
          </span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        {/* 헤드라인 + 스크린샷 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* 좌측: 헤드라인 + 기능 리스트 + 버튼 */}
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
            <p className="text-white/45 text-base leading-relaxed break-keep max-w-md mb-8">
              시공 일정부터 전후 사진, 위생 이력 리포트까지 — BBK 전용 앱
              하나로 우리 공간의 위생 상태를 언제 어디서나 확인할 수 있습니다.
            </p>

            {/* FEATURES 6개 제목 리스트 */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 max-w-md">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-center gap-2.5">
                  <span className="w-7 h-7 border border-bbk-pink/30 flex items-center justify-center shrink-0">
                    <f.icon className="w-3.5 h-3.5 text-bbk-pink" />
                  </span>
                  <span className="text-white text-sm font-bold break-keep">{f.title}</span>
                </li>
              ))}
            </ul>

            {/* 버튼 2개 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://app.bbkorea.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-bbk-pink text-white px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                웹앱 바로가기
              </a>
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-white/[0.08] active:scale-[0.98] transition-all"
              >
                앱 자세히 보기
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* 우측: 본사 포털 스크린샷 (미니멀 모니터 인포그래픽) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* 발광 배경 */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(0,170,255,0.12) 0%, rgba(255,46,99,0.06) 55%, transparent 78%)",
              }}
            />

            {/* 모니터 상단 좌표 라벨 (인포그래픽 힌트) */}
            <div className="relative w-full max-w-[560px] flex items-center justify-between mb-2 px-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                BBK / HQ PORTAL
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-white/25">
                <span className="w-1 h-1 rounded-full bg-bbk-pink/70" />
                LIVE
              </span>
            </div>

            {/* 모니터 화면 (베젤 + 카메라 + 스크린) */}
            <div className="relative w-full max-w-[560px] rounded-2xl bg-[#f5f5f7] border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.55)] p-2 pt-3">
              {/* 상단 카메라 dot */}
              <span
                aria-hidden
                className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black/25"
              />
              {/* 스크린 */}
              <div className="relative w-full aspect-[784/378] rounded-lg overflow-hidden bg-white ring-1 ring-black/[0.04]">
                <Image
                  src="/screenshots/home-app-preview.png"
                  alt="BBK 공간케어 본사 포털 대시보드"
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 스탠드: 목 + base */}
            <div aria-hidden className="relative w-full max-w-[560px] flex flex-col items-center">
              {/* 목 */}
              <div className="w-2 h-5 bg-white/15" />
              {/* 사다리꼴 → 위: 좁게, 아래: 넓게 */}
              <div
                className="w-24 h-1.5 bg-white/18"
                style={{ clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)" }}
              />
              {/* base 라인 */}
              <div className="w-40 h-[3px] rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              {/* 반사광 */}
              <div className="mt-3 w-56 h-6 rounded-full bg-bbk-pink/[0.05] blur-xl" />
            </div>

            {/* 하단 좌표 눈금 (인포그래픽 힌트) */}
            <div className="relative w-full max-w-[560px] flex items-center justify-center gap-1 mt-2">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className={`h-px ${i === 4 ? "w-4 bg-bbk-pink/50" : "w-2 bg-white/15"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* 앱 키워드 티커 */}
        <div className="overflow-hidden -mx-6 md:-mx-12 mt-20 md:mt-24">
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
      </div>
    </section>
  );
}
