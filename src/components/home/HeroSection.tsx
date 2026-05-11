"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

const META_ITEMS = [
  { label: "서비스 지역", value: "서울·경기" },
  { label: "서비스 가능 시간", value: "24시" },
  { label: "청소 기준", value: "HACCP·위생등급제" },
  { label: "전용앱 모니터링", value: "BBK 앱 지원" },
  { label: "건축물위생관리업", value: "인증 취득" },
] as const;

const BADGES = ["야간 운영 가능", "상업·사무실 전문"] as const;

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-bbk-black">
      {/* 배경 이미지 */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* 검정 오버레이 55% — 이미지 위 텍스트 가독성 확보 */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Grain 노이즈 텍스처 */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* 거대 영문 워드마크 — Vivid Pink */}
      <div
        aria-hidden
        className="absolute inset-x-0 pointer-events-none select-none overflow-hidden top-[28%] md:top-[50%]"
        style={{ transform: "translateY(-58%)" }}
      >
        <motion.p
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-bbk-pink font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-4 md:pl-8"
          style={{ fontSize: "clamp(100px, 28vw, 480px)" }}
        >
          CLEAN
        </motion.p>
      </div>

      {/* 우측 세로 텍스트 */}
      <div
        aria-hidden
        className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <p
          className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-white/25 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          INDUSTRIAL — SYSTEMS — EST 1994
        </p>
      </div>

      {/* 하단 그라데이션 페이드 (메타 정보 가독성 확보) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #0b0b0f 85%)",
        }}
      />

      {/* 메인 콘텐츠 — 하단 정렬 */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-8 md:pb-12">
        {/* 헤드라인 + 서브카피 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <h1
            className="text-white font-black leading-[1.05] tracking-[-0.02em] break-keep"
            style={{ fontSize: "clamp(38px, 6.5vw, 88px)" }}
          >
            야간 청소를 구독
            <br />
            앱으로 쉽게 관리
          </h1>
          <p
            className="hidden sm:block text-white/55 leading-relaxed mt-4 max-w-[400px] break-keep"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            영업이 끝난 후 시작되는 전문 위생 솔루션.
            <br />
            대한민국 1% 고난도 공간케어 전문 팀이
            <br />
            귀사의 공간을 매일 아침 새것처럼 되돌립니다.
          </p>
        </motion.div>

        {/* CTA 버튼 + 배지 칩 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.72 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 md:mb-10"
        >
          {/* 버튼 2개 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-bbk-pink text-white px-7 py-4 font-bold text-[13px] uppercase tracking-[0.08em] hover:brightness-110 active:scale-[0.98] transition-all"
            >
              서비스 알아보기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/50 text-white px-7 py-4 font-bold text-[13px] uppercase tracking-[0.08em] hover:bg-white/8 active:scale-[0.98] transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              무료 상담 신청
            </Link>
          </div>

          {/* 배지 칩 */}
          <div className="flex flex-wrap gap-2 sm:ml-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 border border-white/35 text-white/70 font-mono text-[11px] px-3 py-[7px] tracking-wide"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-bbk-pink flex-shrink-0" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 모노 메타 그리드 — 신뢰도 시각화 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="border-t border-white/[0.08] pt-5 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-4"
        >
          {META_ITEMS.map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/35 leading-none">
                {label}
              </p>
              <p className="font-mono text-[11px] md:text-[12px] text-white mt-1 font-medium tracking-wide">
                {value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
