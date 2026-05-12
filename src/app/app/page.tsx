"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Camera,
  CalendarCheck,
  BarChart3,
  Shield,
  Smartphone,
  Download,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    desc: "iOS·Android·PC 전용 앱으로 이동 중에도 위생 상태를 확인합니다.",
  },
];

const BENEFITS = [
  "정기 계약 고객에게 무료 제공",
  "별도 앱스토어 다운로드 불필요",
  "iOS · Android · PC 모두 지원",
  "업데이트 자동 적용",
];

export default function AppPage() {
  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-bbk-black pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden relative">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none"
          >
            <p
              className="text-white/[0.03] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-6 md:pl-12"
              style={{ fontSize: "clamp(100px, 20vw, 320px)" }}
            >
              APP.
            </p>
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 mb-6">
              BBK KOREA — SPACE CARE APP
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-white font-black leading-[1.05] tracking-[-0.03em] break-keep mb-6"
                  style={{ fontSize: "clamp(38px, 7vw, 100px)" }}
                >
                  스마트폰 하나로
                  <br />
                  공간 위생을
                  <br />
                  <span className="text-bbk-pink">관리하세요.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/45 text-base md:text-lg max-w-md break-keep leading-relaxed mb-8"
                >
                  시공 일정부터 전후 사진, 위생 이력 리포트까지 — BBK 전용 앱
                  하나로 우리 공간의 위생 상태를 언제 어디서나 확인할 수
                  있습니다.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <a
                    href="https://app.bbkorea.co.kr/install"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-bbk-pink text-white px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    앱 설치하기
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-white/8 active:scale-[0.98] transition-all"
                  >
                    도입 문의하기
                  </Link>
                </motion.div>
              </div>

              {/* 폰 목업 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="hidden md:flex items-center justify-center"
              >
                <div className="relative">
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
                        "radial-gradient(ellipse at 50% 50%, rgba(0,170,255,0.1) 0%, rgba(255,46,99,0.06) 50%, transparent 75%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 혜택 배지 바 */}
        <section className="bg-bbk-pink py-5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-wrap gap-x-8 gap-y-2 items-center justify-center md:justify-start">
            {BENEFITS.map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/90"
              >
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* 주요 기능 */}
        <section className="bg-bbk-black py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                FEATURES
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-black leading-tight tracking-[-0.02em] break-keep mb-12 md:mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              앱 하나로 모든 걸 확인합니다.
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06]">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
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
              ))}
            </div>
          </div>
        </section>

        {/* 설치 방법 */}
        <section className="bg-bbk-cool-white py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
                HOW TO INSTALL
              </span>
              <div className="flex-1 h-px bg-bbk-concrete" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bbk-black font-black leading-tight tracking-[-0.02em] break-keep mb-12 md:mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              버튼 하나로 설치 완료됩니다.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* 설명 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ul className="space-y-5 mb-10">
                  {[
                    { platform: "Android · PC Chrome", desc: "설치 버튼 탭 → 브라우저 팝업 → 설치 완료" },
                    { platform: "iPhone · iPad", desc: "설치 버튼 탭 → 화면 안내에 따라 홈 화면에 추가" },
                  ].map(({ platform, desc }) => (
                    <li key={platform} className="flex gap-5 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-bbk-black text-white font-mono text-[10px] font-bold flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-bbk-pink" />
                      </span>
                      <div>
                        <p className="text-bbk-black font-bold text-sm">{platform}</p>
                        <p className="text-bbk-stone-6 text-sm leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://app.bbkorea.co.kr/install"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-bbk-pink text-white px-10 py-4 font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  앱 설치 페이지로 이동
                </a>
                <p className="mt-4 font-mono text-[10px] text-bbk-stone-4">
                  * 브라우저가 자동으로 최적 설치 방법을 안내합니다.
                </p>
              </motion.div>

              {/* 시각적 강조 카드 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="bg-bbk-black p-10 md:p-12 flex flex-col gap-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bbk-pink">
                  INSTALL URL
                </p>
                <p
                  className="text-white font-black leading-tight tracking-[-0.02em] break-all"
                  style={{ fontSize: "clamp(16px, 2.5vw, 24px)" }}
                >
                  app.bbkorea.co.kr
                  <span className="text-bbk-pink">/install</span>
                </p>
                <p className="text-white/40 text-sm leading-relaxed break-keep">
                  링크 하나로 모든 기기에서 설치 가능합니다.
                  Android, iPhone, PC — 어떤 기기든 자동으로 최적 방법을 안내합니다.
                </p>
                <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.08]">
                  {["Android Chrome — 원클릭 설치", "iPhone Safari — 홈 화면 추가 안내", "PC Chrome — 데스크탑 앱 설치"].map((t) => (
                    <p key={t} className="flex items-center gap-2 font-mono text-[10px] text-white/30 uppercase tracking-wider">
                      <span className="text-bbk-pink">›</span> {t}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 앱 정보 요약 */}
        <section className="bg-bbk-black py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                APP INFO
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
              {[
                { label: "지원 플랫폼", value: "iOS · Android · PC" },
                { label: "설치 방법", value: "브라우저에서 바로 설치 (PWA)" },
                { label: "제공 대상", value: "정기 계약 고객 무료 제공" },
                { label: "앱 주소", value: "app.bbkorea.co.kr" },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#111116] px-7 py-8 flex flex-col gap-2"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
                    {label}
                  </p>
                  <p className="text-white font-bold text-sm break-keep leading-relaxed">
                    {value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 하단 CTA */}
        <section className="bg-bbk-pink py-14 md:py-16">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-white font-black text-xl md:text-2xl break-keep">
                BBK 앱, 지금 바로 시작하세요.
              </h2>
              <p className="text-white/70 text-sm mt-1 break-keep">
                정기 계약 고객이라면 추가 비용 없이 사용할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://app.bbkorea.co.kr/install"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-bbk-pink px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                앱 설치하기
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                서비스 문의
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
