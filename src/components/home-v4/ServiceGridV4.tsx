"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ImageIcon, Pencil } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/service-categories";
import { CategoryLogo } from "@/components/ui/CategoryLogo";
import EditableImage from "@/components/admin/EditableImage";
import { useAdmin } from "@/components/admin/AdminProvider";
import ServiceCardEditor from "@/components/admin/ServiceCardEditor";
import EditableSection from "@/components/admin/EditableSection";
import { useSectionEdit } from "@/components/admin/SectionEditContext";
import { Bridge } from "./Bridge";

export default function ServiceGridV4() {
  return (
    <EditableSection className="bg-ink-50 py-24 md:py-36">
      <ServiceGridInner />
    </EditableSection>
  );
}

function ServiceGridInner() {
  const { admin } = useAdmin();
  const { editing: sectionEditing } = useSectionEdit();
  const [editKey, setEditKey] = useState<string | null>(null);
  const editingCategory =
    editKey ? SERVICE_CATEGORIES.find((c) => c.key === editKey) ?? null : null;

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
        <Bridge
          contentKeyPrefix="service"
          step="03 · 저희가 준비한 서비스"
          bridge="이런 고민을 풀려고, 저희가 6가지로 준비했어요."
          titleMain="사장님 매장에 맞게,"
          titleAccent="골라서 이용하세요."
        />

        {/* 6개 카테고리 카드 · 데스크톱 2열 3행 / 모바일 1열 6행 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SERVICE_CATEGORIES.map((c, i) => {
            const isPopular = i === 0;
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="h-full"
              >
                <Link
                  href={c.href}
                  className="block h-full group relative"
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-5 z-20 px-3 py-1.5 rounded-full bg-brand-500 text-white text-[11px] font-semibold shadow-[0_8px_20px_-8px_rgba(44,167,241,0.6)]">
                      가장 많이 선택
                    </div>
                  )}

                  <article
                    className={`h-full rounded-3xl bg-white overflow-hidden grid grid-cols-[1.15fr_1fr] transition-all duration-200 hover:-translate-y-1 ${
                      isPopular
                        ? "border-2 border-brand-500 hover:shadow-[0_20px_50px_-15px_rgba(44,167,241,0.35)]"
                        : "border border-ink-100 hover:border-ink-300 hover:shadow-[0_16px_40px_-20px_rgba(10,15,26,0.15)]"
                    }`}
                  >
                    {/* 좌 · 콘텐츠 (흰 배경 유지) */}
                    <div className="p-5 md:p-7 flex flex-col gap-5 md:gap-6 relative z-10 bg-white min-h-[220px] md:min-h-[240px]">
                      <div className="flex items-start justify-between">
                        <span className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                          <CategoryLogo category={c.key} size={56} />
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-ink-400">
                          0{i + 1}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-ink-900 leading-[1.25] tracking-tight break-keep">
                          {c.label}
                        </h3>
                        <p className="text-[13px] md:text-sm text-ink-600 leading-[1.55] break-keep">
                          {c.tagline}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400 font-semibold">
                          자세히 보기
                        </span>
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5 ${
                            isPopular
                              ? "bg-brand-500 text-white"
                              : "bg-ink-900 text-white group-hover:bg-brand-600"
                          }`}
                        >
                          <ArrowUpRight
                            className="w-3.5 h-3.5"
                            strokeWidth={1.75}
                          />
                        </span>
                      </div>
                    </div>

                    {/* 우 · 사진 슬롯 (2장 · hover 스왑) */}
                    <div className="relative overflow-hidden">
                      {/* 좌 → 우 그라디언트 · 좌측 흰 콘텐츠와 자연스럽게 이어짐 */}
                      <div
                        className="absolute inset-y-0 left-0 w-20 md:w-28 z-10 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
                        }}
                        aria-hidden="true"
                      />

                      {/* 사진 A · 평상시 */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0"
                        aria-hidden="true"
                      >
                        <PhotoSlot
                          categoryKey={c.key}
                          variant="a"
                          isPopular={isPopular}
                          hideEditor={!!admin}
                        />
                      </div>

                      {/* 사진 B · Hover */}
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <PhotoSlot
                          categoryKey={c.key}
                          variant="b"
                          isPopular={isPopular}
                          hideEditor={!!admin}
                        />
                      </div>
                    </div>

                    {/* 관리자 편집 진입 · 섹션 편집 모드일 때만 · 카드 우상단 */}
                    {admin && sectionEditing && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditKey(c.key);
                        }}
                        className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-ink-900 text-white text-[11px] font-semibold shadow-lg hover:bg-brand-600 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                        사진 편집
                      </button>
                    )}
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {editingCategory && (
          <ServiceCardEditor
            categoryKey={editingCategory.key}
            categoryLabel={editingCategory.label}
            onClose={() => setEditKey(null)}
          />
        )}

        {/* 하단 CTA */}
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
          >
            전체 서비스 자세히 보기
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
          <p className="text-sm text-ink-400 text-center">
            어떤 게 맞는지 헷갈리시면{" "}
            <Link
              href="/quick-inquiry"
              className="text-brand-600 font-semibold hover:underline"
            >
              30초 채팅 상담
            </Link>
            으로 문의 주세요.
          </p>
        </div>
      </div>
  );
}

/**
 * 사진 자리 슬롯. 관리자 로그인 상태면 편집 오버레이가 자동 등장.
 * DB(homepage_content)의 `service.{key}.{variant}` 에 사진 URL이 저장되면 그걸 우선 사용,
 * 없으면 IMAGE_MAP의 defaultSrc, 그것도 없으면 그라디언트 placeholder.
 */
function PhotoSlot({
  categoryKey,
  variant,
  isPopular,
  hideEditor,
}: {
  categoryKey: string;
  variant: "a" | "b";
  isPopular: boolean;
  hideEditor?: boolean;
}) {
  const defaultSrc = IMAGE_MAP[categoryKey]?.[variant];
  const paletteA = isPopular
    ? "from-brand-100 via-brand-50 to-brand-200"
    : "from-ink-100 via-ink-50 to-ink-200";
  const paletteB = isPopular
    ? "from-brand-200 via-brand-100 to-brand-300"
    : "from-ink-200 via-ink-100 to-ink-300";
  const palette = variant === "a" ? paletteA : paletteB;

  const placeholder = (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${palette} flex items-center justify-center`}
    >
      <div className="flex flex-col items-center gap-2 text-ink-400">
        <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold">
          사진 {variant.toUpperCase()}
        </span>
      </div>
    </div>
  );

  return (
    <EditableImage
      contentKey={`service.${categoryKey}.${variant}`}
      defaultSrc={defaultSrc}
      placeholder={placeholder}
      hideEditor={hideEditor}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      wrapperClassName="absolute inset-0"
    />
  );
}

/**
 * 사진 파일 경로 매핑. 파일 준비되면 여기에 추가.
 *   public/images/services/{key}-a.jpg  · 평상시
 *   public/images/services/{key}-b.jpg  · hover
 */
const IMAGE_MAP: Record<string, { a?: string; b?: string }> = {
  deepcare: {},
  endcare: {},
  scentcare: {},
  hygiene: {},
  organizing: {},
  special: {},
};
