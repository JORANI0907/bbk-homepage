"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industries";
import { useIndustry } from "./IndustryContext";
import { useLiveCount } from "@/lib/hooks/useLiveCount";

// 실시간 문의 티커 — 3초마다 순환하여 활성화된 서비스처럼 보이게 함.
// 지역·업종·액션을 다양하게 섞어 반복 인상 최소화.
const LIVE_TICKER: readonly string[] = [
  "성남시 · 치킨전문점, 후드 정기 문의",
  "서울 강남 · 카페, 야간 청소 상담",
  "수원 · 이자카야, 배기 덕트 견적 요청",
  "안양 · 브런치카페, 매장 대청소 상담",
  "용인 · 삼겹살집, 그리스트랩 세척 문의",
  "서울 마포 · 파스타집, 정기 케어 상담",
  "부천 · PC방, 야간 정기 계약 문의",
  "인천 · 한식당, 화장실 위생 청소",
  "광명 · 헬스장, 바닥 왁싱 견적",
  "화성 · 편의점, 냉장 쇼케이스 청소",
  "하남 · 이자카야, 후드+덕트 패키지",
  "시흥 · 노래방, 카펫 오염 제거 상담",
  "서울 성동 · 사무실, 개업 청소 문의",
  "안산 · 뷔페, 주방 전체 청소",
  "평택 · 라멘집, 후드 청소 견적",
  "오산 · 학원, 정기 방역·청소 상담",
  "서울 서초 · 의원, 로비·화장실 케어",
  "성남 분당 · 초밥집, 배기·덕트 문의",
  "수원 영통 · 삼겹살집, 야간 상주 견적",
  "서울 송파 · 베이커리, 오븐·후드 청소",
  "서울 관악 · 호프집, 마감 청소 상담",
  "인천 부평 · 중식당, 웍 화구·후드 청소",
  "고양 · 요양병원, 화장실 위생 정기",
  "김포 · 카페, 창문·유리 세척 견적",
  "안양 평촌 · 학원, 방학 전 대청소",
  "성남시 · 오피스, 야간 청소 정기 문의",
  "서울 종로 · 한정식, 주방 대청소 상담",
  "수원 · 프랜차이즈 본사, 협력사 검토",
  "인천 송도 · 스터디카페, 상시 청소 견적",
  "용인 수지 · 이자카야, 후드 재청소 A/S",
  "화성 동탄 · 카페, 야간 케어 문의",
  "서울 성동 · 공유오피스, 화장실 정기",
  "안산 · 갈비집, 후드·덕트·트랩 통합",
  "부천 · 만두집, 후드 청소 문의",
  "광주 광명 · 마트, 냉장·냉동 청소 상담",
  "서울 강서 · 필라테스, 바닥·유리 케어",
  "성남 판교 · 스타트업 오피스, 청소 계약",
  "수원 · 유치원, 방역+청소 패키지",
  "서울 동대문 · 원단시장 사무실, 대청소",
  "인천 계양 · PC방, 카펫·바닥 상담",
  "안양 · 세탁소, 유리·간판 청소 견적",
  "서울 마포 · 라멘집, 개업 대청소 상담",
  "평택 · 삼계탕, 주방 종합 케어",
  "성남시 · 스터디카페, 24시간 정기 견적",
  "서울 강북 · 노래방, 카펫 세척 A/S",
  "군포 · 카페, 유리·후드·바닥 패키지",
  "의왕 · 치킨전문점, 그리스트랩 상담",
  "서울 성동 · 브루어리, 주방·홀 대청소",
  "수원 광교 · 요양원, 위생 정기 계약",
  "서울 노원 · 학원, 방학 대청소 견적",
];

export default function HeroV4() {
  const { key, industry, setKey } = useIndustry();
  const isDefault = key === "restaurant";

  // 6초마다 다음 티커로 순환. 페이지 이탈 시 clearInterval 로 누수 방지.
  const [tickerIndex, setTickerIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((i) => (i + 1) % LIVE_TICKER.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // 실시간 상담 인원 · 5~29명 사이에서 부드럽게 유동. 8초 주기.
  const liveCount = useLiveCount(5, 29, 12, 8000, 3);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* 미세한 브랜드 톤 그라디언트 배경 */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 78% 30%, rgba(44,167,241,0.06), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* 좌 · 카피 & CTA */}
          <div className="lg:col-span-7 flex flex-col gap-7 md:gap-9 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[11px] font-medium text-ink-400 tracking-[0.14em] uppercase"
            >
              <span className="inline-flex w-1 h-1 rounded-full bg-brand-500" />
              Space Care for {industry.short}
              <span className="text-ink-200">·</span>
              <span>서울·경기 24시간 접수</span>
            </motion.div>

            <div className="flex flex-col gap-5">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="text-[38px] md:text-[64px] font-bold text-ink-900 leading-[1.1] tracking-[-0.02em] break-keep max-w-[720px]"
                >
                  {industry.personaHeadline}
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={key + "-sub"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-lg md:text-xl text-ink-600 leading-[1.55] max-w-[520px] break-keep"
                >
                  {industry.personaSub}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* 개인화 접점 · 업종 선택 */}
            <div className="flex flex-col gap-3">
              <p className="text-sm text-ink-400 font-medium">
                당신의 매장은 어떤 곳인가요?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {INDUSTRIES.map((i) => (
                  <button
                    key={i.key}
                    onClick={() => setKey(i.key)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                      key === i.key
                        ? "bg-ink-900 text-white border-ink-900"
                        : "bg-white text-ink-600 border-ink-200 hover:border-ink-400 hover:text-ink-900"
                    }`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full bg-ink-900 text-white text-[15px] md:text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98]"
              >
                무료 상담 받기
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
              <a
                href={SITE.contact.telHref}
                className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full border border-ink-200 text-ink-900 text-[15px] md:text-base font-semibold hover:border-ink-900 transition-colors duration-200 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" strokeWidth={1.75} />
                {SITE.contact.telDisplay}
              </a>
            </div>

            <div className="pt-8 md:pt-10 border-t border-ink-100 grid grid-cols-3 gap-4 md:gap-6">
              <TrustCell label="누적 시공" value="1,247" unit="매장" />
              <TrustCell label="응답 시간" value="120" unit="분 이내" />
              <TrustCell label="야간 시공" value="24" unit="시간" />
            </div>
          </div>

          {/* 우 · 비주얼 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[28px] overflow-hidden border border-ink-100 shadow-[0_20px_60px_-20px_rgba(10,15,26,0.15)] aspect-[4/5] md:aspect-[5/6]">
              <Image
                src="/hero-bg.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              {/* 살짝 어두운 하단 오버레이 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,15,26,0) 55%, rgba(10,15,26,0.55) 100%)",
                }}
              />

              {/* 좌하단 · 라이브 인디케이터 + 실시간 티커 */}
              <div className="absolute left-5 right-5 bottom-5 md:left-6 md:right-6 md:bottom-6 flex flex-col gap-2 text-white">
                <div className="flex items-center gap-2.5 text-white/90">
                  <span className="relative inline-flex shrink-0">
                    <span className="w-2 h-2 rounded-full bg-brand-400" />
                    <span className="absolute inset-0 w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] tracking-wide text-white/60">
                      LIVE
                    </span>
                    <span className="text-sm font-medium tabular-nums">
                      지금 {liveCount}명이 상담 진행 중
                    </span>
                  </div>
                </div>
                {/* 실시간 문의 티커 — 3초마다 순환 */}
                <div className="pl-4 relative h-[18px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={tickerIndex}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="text-[11px] text-white/70 truncate"
                    >
                      · {LIVE_TICKER[tickerIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* 우상단 · 미세 라벨 */}
              <div className="absolute right-5 top-5 md:right-6 md:top-6 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-semibold tracking-wide text-ink-900 uppercase">
                BBK · Night Care
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustCell({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400 font-medium">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl md:text-3xl font-semibold text-ink-900 tracking-tight">
          {value}
        </span>
        <span className="text-sm text-ink-400 font-medium">{unit}</span>
      </div>
    </div>
  );
}
