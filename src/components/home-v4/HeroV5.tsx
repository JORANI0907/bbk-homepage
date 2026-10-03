"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Tag,
  MapPin,
} from "lucide-react";
import { useLiveCount } from "@/lib/hooks/useLiveCount";
import { SERVICE_CATEGORIES } from "@/lib/service-categories";
import { CategoryTextLogo } from "@/components/ui/CategoryTextLogo";
import EditableImage from "@/components/admin/EditableImage";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import { RegionPickerModal } from "./RegionPickerModal";

const PLACEHOLDERS = [
  "예: 매달 후드 청소 받고 싶어요",
  "예: 오픈 전 대청소 견적 궁금해요",
  "예: 매일 밤 마감 청소 위탁 가능한가요",
  "예: 매장 여러 개 통합 계약 문의",
];

const DEFAULT_REGION = "서울 강남구";

export default function HeroV5() {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [regionOpen, setRegionOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const liveCount = useLiveCount(5, 29, 12, 8000, 3);

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      region,
      query,
    });
    window.location.href = `/quick-inquiry?${params.toString()}`;
  }

  return (
    <EditableSection
      className="relative bg-white pb-16 md:pb-20"
      buttonPosition="top-20 right-4 md:top-24 md:right-6"
    >
      {/* Hero · 사진이 전체 배경이 되는 심플한 구조 */}
      <div className="relative bg-ink-900 text-white overflow-hidden min-h-[460px] md:min-h-[560px] flex flex-col justify-end">
        {/* 배경 사진 · 전체 커버 */}
        <EditableImage
          contentKey="hero.background"
          placeholder={
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-white/30 gap-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(44,167,241,0.5), rgba(10,15,26,0.9))",
              }}
            >
              <span className="text-xs uppercase tracking-[0.18em] font-semibold">
                Hero 배경 사진
              </span>
              <span className="text-xs uppercase tracking-[0.18em] font-semibold">
                권장 2560 × 640px · JPG
              </span>
            </div>
          }
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          wrapperClassName="absolute inset-0 pointer-events-auto"
          buttonsPosition="top-28 right-4 md:top-32 md:right-6"
          maxResizeWidth={2560}
          maxResizeQuality={0.9}
        />

        {/* 좌측 어두움 오버레이 · 글자 가독성 보장 (사진 어떤 색이든 작동) */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(to right, rgba(10,15,26,0.85) 0%, rgba(10,15,26,0.6) 25%, rgba(10,15,26,0.25) 50%, rgba(10,15,26,0.05) 75%, rgba(10,15,26,0) 100%)",
          }}
        />
        {/* 하단 fade · 검색 카드와 자연스럽게 */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(to top, rgba(10,15,26,0.7) 0%, rgba(10,15,26,0) 100%)",
          }}
        />
        {/* 상단 살짝 fade · header와 자연스럽게 */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,15,26,0.4) 0%, rgba(10,15,26,0) 100%)",
          }}
        />

        {/* 콘텐츠 · 사진 위에, 하단 정렬 + 아래 검색 카드와 살짝 간격 */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-24 pb-24 md:pb-28">
          <div className="flex flex-col gap-5 max-w-xl md:max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-medium text-white/60 tracking-[0.14em] uppercase">
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Live · 지금 {liveCount}명이 상담 진행 중
            </div>
            <h1 className="text-3xl md:text-6xl font-bold leading-[1.1] tracking-[-0.02em] break-keep text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              <EditableText
                contentKey="hero.title.main"
                defaultText="밤에 청소가 필요할 땐"
              />
              <EditableText
                contentKey="hero.title.accent"
                defaultText=" BBK."
                className="text-brand-400"
              />
            </h1>
            <EditableText
              as="p"
              contentKey="hero.subtitle"
              defaultText="전국 24시간 야간 청소 · 매달 500건 이상 고객님이 이용 중입니다."
              multiline
              className="text-sm md:text-base text-white/80 max-w-lg break-keep drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* 검색 · 아이콘 카테고리 카드 (검정 헤드 위에 얹기) */}
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 -mt-20 md:-mt-24 z-10">
        <div className="rounded-3xl bg-white border border-ink-100 shadow-[0_30px_80px_-30px_rgba(10,15,26,0.3)] p-6 md:p-10">
          {/* 지역 + 질문 */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-5 md:mb-6">
            <button
              onClick={() => setRegionOpen(true)}
              className="inline-flex items-center gap-1.5 text-xl md:text-3xl font-bold text-ink-900 hover:text-brand-600 transition-colors group"
            >
              <MapPin
                className="w-4 h-4 md:w-5 md:h-5 text-brand-500"
                strokeWidth={2}
              />
              <span className="underline decoration-brand-200 underline-offset-4 decoration-2 group-hover:decoration-brand-500">
                {region}
              </span>
              <ChevronDown
                className="w-5 h-5 md:w-6 md:h-6 text-ink-400 group-hover:text-brand-600 transition-colors"
                strokeWidth={2}
              />
            </button>
            <span className="text-xl md:text-3xl font-bold text-ink-900">
              에서
            </span>
            <span className="text-xl md:text-3xl font-bold text-ink-400">
              어떤 청소가 필요하세요?
            </span>
          </div>

          <RegionPickerModal
            open={regionOpen}
            value={region}
            onClose={() => setRegionOpen(false)}
            onSelect={(r) => setRegion(r)}
          />

          {/* 검색 바 */}
          <form
            onSubmit={submit}
            className="flex flex-col sm:flex-row gap-2 mb-8"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={PLACEHOLDERS[placeholderIdx]}
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-ink-200 bg-ink-50 text-ink-900 text-base placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 h-14 px-6 md:px-8 rounded-2xl bg-brand-500 text-white text-sm md:text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98] whitespace-nowrap"
            >
              빠른 견적 요청
            </button>
          </form>

          {/* 6개 서비스 유형 카테고리 · 클릭 시 상세 페이지로 이동 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-ink-900">
                또는, 필요한 청소부터 골라보세요
              </p>
              <Link
                href="/services"
                className="text-xs text-brand-600 font-semibold hover:underline hidden sm:inline-flex items-center gap-1"
              >
                전체 서비스 보기
                <ArrowRight className="w-3 h-3" strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {SERVICE_CATEGORIES.map((c) => (
                <Link
                  key={c.key}
                  href={c.href}
                  className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-ink-50 transition-colors"
                >
                  <span className="flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CategoryTextLogo category={c} size={80} />
                  </span>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs md:text-[13px] text-ink-900 font-semibold break-keep text-center leading-tight">
                      {c.label}
                    </span>
                    <span className="text-[10px] text-ink-400 hidden md:block text-center leading-tight break-keep">
                      {c.desc}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 프로모션 배너 */}
        <div className="mt-4 md:mt-5 rounded-2xl bg-ink-900 text-white p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-brand-500 flex items-center justify-center text-white shrink-0">
              <Tag className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col">
              <EditableText
                as="p"
                contentKey="hero.promo.label"
                defaultText="Launch Promo"
                className="text-[11px] uppercase tracking-[0.18em] text-brand-400 font-semibold"
              />
              <EditableText
                as="p"
                contentKey="hero.promo.headline"
                defaultText="이번 달 첫 시공 사장님, 20% 할인해드립니다."
                multiline
                className="text-base md:text-lg font-bold"
              />
            </div>
          </div>
          <Link
            href="/quick-inquiry"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-400 transition-colors shrink-0"
          >
            지금 채팅 상담
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>

        {/* 신뢰 스트립 */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-ink-400 font-medium">
          <EditableText
            contentKey="hero.trust.0"
            defaultText="매달 500건 이상 고객님이 공간 진행"
          />
          <span className="text-ink-200">·</span>
          <EditableText
            contentKey="hero.trust.1"
            defaultText="전국 24시 서비스"
          />
          <span className="text-ink-200">·</span>
          <EditableText
            contentKey="hero.trust.2"
            defaultText="건축물위생관리업 인증 기업"
          />
        </div>
      </div>
    </EditableSection>
  );
}
