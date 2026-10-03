"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin, Tag, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { maskStoreName, type Case } from "@/lib/data/cases";

type Props = {
  caseData: Case;
};

export default function CaseDetailView({ caseData: c }: Props) {
  const workDateDisplay = c.work_date
    ? new Date(c.work_date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Hero · 매장 정보 */}
      <section className="relative bg-white border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-12 md:pb-16 flex flex-col gap-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-400 hover:text-ink-900 font-semibold transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            시공사례로 돌아가기
          </Link>

          <div className="flex flex-col gap-5">
            <span className="text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
              Case
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-900 tracking-tight break-keep">
              {c.store_name ? maskStoreName(c.store_name) : "시공사례"}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] md:text-sm text-ink-600">
              {c.industry && (
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-500" strokeWidth={2} />
                  {c.industry}
                </span>
              )}
              {c.region && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" strokeWidth={2} />
                  {c.region}
                </span>
              )}
              {workDateDisplay && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-500" strokeWidth={2} />
                  {workDateDisplay}
                </span>
              )}
              {c.is_blog_registered && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold">
                  <FileText className="w-3 h-3" strokeWidth={2.5} />
                  블로그 등록
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 시공 전 캐러셀 */}
      <PhotoCarousel
        label="시공 전"
        subtitle="작업 시작 시점의 매장 상태"
        images={c.before_images}
        tone="light"
      />

      {/* 시공 후 캐러셀 */}
      <PhotoCarousel
        label="시공 후"
        subtitle="BBK 야간 시공 완료 상태"
        images={c.after_images}
        tone="dark"
      />

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 md:px-8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-900 break-keep">
            우리 매장도 이렇게 바꾸고 싶으시다면
          </h2>
          <p className="text-base text-ink-600 leading-[1.65] break-keep max-w-xl">
            BBK 야간 시공은 영업 종료 후 들어가서 다음 날 아침 전까지 끝냅니다.
            상담은 무료, 사장님께 부담 드리지 않아요.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/quick-inquiry"
              className="inline-flex items-center justify-center h-13 px-7 rounded-full bg-brand-500 text-white text-sm md:text-base font-semibold hover:bg-brand-600 transition-colors"
            >
              1분 견적 요청
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-13 px-7 rounded-full border border-ink-200 text-ink-900 text-sm md:text-base font-semibold hover:border-ink-900 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PhotoCarousel({
  label,
  subtitle,
  images,
  tone,
}: {
  label: string;
  subtitle: string;
  images: string[];
  tone: "light" | "dark";
}) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const total = images.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  const bg = tone === "dark" ? "bg-ink-900" : "bg-ink-50";
  const chipBg = tone === "dark" ? "bg-white/10 text-white" : "bg-white text-ink-900";
  const subTone = tone === "dark" ? "text-white/60" : "text-ink-500";
  const headTone = tone === "dark" ? "text-white" : "text-ink-900";
  const navBtn =
    tone === "dark"
      ? "bg-white/10 text-white hover:bg-white/20 border-white/15"
      : "bg-white text-ink-900 hover:bg-ink-100 border-ink-200";
  const thumbInactive =
    tone === "dark" ? "border-white/15 opacity-60" : "border-ink-200 opacity-70";
  const thumbActive =
    tone === "dark" ? "border-brand-400 opacity-100" : "border-brand-500 opacity-100";

  return (
    <section className={`${bg} py-16 md:py-24`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col gap-8 md:gap-10">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span
              className={`inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.14em] font-bold ${chipBg}`}
            >
              {label}
            </span>
            <p className={`text-sm ${subTone} break-keep`}>{subtitle}</p>
          </div>
          <span className={`text-xs font-mono tabular-nums ${subTone}`}>
            {idx + 1} / {total}
          </span>
        </div>

        {/* 메인 이미지 */}
        <div className="relative rounded-3xl overflow-hidden bg-black/5 aspect-[4/3] md:aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[idx]}
              src={images[idx]}
              alt={`${label} ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="이전 사진"
                className={`absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border inline-flex items-center justify-center transition-colors ${navBtn}`}
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="다음 사진"
                className={`absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border inline-flex items-center justify-center transition-colors ${navBtn}`}
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {/* 썸네일 strip */}
        {total > 1 && (
          <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 md:gap-2">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`${label} ${i + 1}번 사진`}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  i === idx ? thumbActive : thumbInactive
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
