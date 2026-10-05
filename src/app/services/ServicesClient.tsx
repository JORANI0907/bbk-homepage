"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Plus, Minus, Home, Trees } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CategoryLogo } from "@/components/ui/CategoryLogo";
import InfoModal from "@/components/ui/InfoModal";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";
import { useSectionEdit } from "@/components/admin/SectionEditContext";
import { useHomepageContent } from "@/components/admin/HomepageContentProvider";
import {
  SERVICE_CATEGORIES,
  getCategoryLogoSrc,
  type ServiceCategory,
  type ServiceCategoryKey,
} from "@/lib/service-categories";
import { SITE } from "@/lib/site";

export function ServicesClient() {
  const [activeKey, setActiveKey] = useState<ServiceCategoryKey>(
    SERVICE_CATEGORIES[0].key,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveKey(visible[0].target.id as ServiceCategoryKey);
        }
      },
      { rootMargin: "-160px 0px -55% 0px", threshold: 0 },
    );

    SERVICE_CATEGORIES.forEach((c) => {
      const el = document.getElementById(c.key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      window.setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        250,
      );
    }
  }, []);

  function jumpTo(key: ServiceCategoryKey) {
    const el = document.getElementById(key);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${key}`);
    }
  }

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero */}
        <EditableSection
          className="relative bg-white overflow-hidden"
          buttonPosition="top-20 right-4 md:top-24 md:right-6"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 80% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-14 md:pb-16">
            <Bridge
              contentKeyPrefix="services.hero"
              step="Services"
              bridge="청소는 하나입니다. 다만 매장 상황에 따라 6가지로 전문화됐어요."
              titleMain="6가지 방식으로,"
              titleAccent="하나의 청소."
              subtitle="위에 있는 6개 카테고리 버튼을 눌러 필요한 서비스로 바로 이동하거나, 아래로 스크롤하며 전체를 훑어보세요."
            />
          </div>
        </EditableSection>

        {/* 상단 스티키 탭 바 */}
        <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-y border-ink-100">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {SERVICE_CATEGORIES.map((c) => {
                const isActive = activeKey === c.key;
                const miniSrc = getCategoryLogoSrc(
                  c.key,
                  isActive ? "mini-white" : "mini",
                );
                return (
                  <button
                    key={c.key}
                    onClick={() => jumpTo(c.key)}
                    className={`shrink-0 inline-flex items-center gap-1.5 pl-2.5 pr-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? "bg-ink-900 text-white border-ink-900"
                        : "bg-white text-ink-600 border-ink-200 hover:border-ink-400 hover:text-ink-900"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={miniSrc}
                      alt=""
                      aria-hidden="true"
                      className="w-5 h-5 object-contain"
                    />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 본문 · 왼쪽 콘텐츠 + 오른쪽 sticky TOC */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-10 lg:gap-14">
            <div className="flex flex-col gap-24 md:gap-32 min-w-0">
              {SERVICE_CATEGORIES.map((c, i) => (
                <CategorySection key={c.key} category={c} index={i} />
              ))}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-40 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-semibold px-3 pb-3">
                  이 페이지에서
                </span>
                {SERVICE_CATEGORIES.map((c) => {
                  const isActive = activeKey === c.key;
                  const miniSrc = getCategoryLogoSrc(c.key, "mini");
                  return (
                    <button
                      key={c.key}
                      onClick={() => jumpTo(c.key)}
                      className={`text-left px-3 py-2.5 rounded-lg text-sm border-l-2 transition-all inline-flex items-center gap-2 ${
                        isActive
                          ? "bg-brand-50 text-brand-700 border-brand-500 font-semibold"
                          : "text-ink-600 border-transparent hover:bg-ink-50 hover:text-ink-900 font-medium"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={miniSrc}
                        alt=""
                        aria-hidden="true"
                        className="w-5 h-5 object-contain shrink-0"
                      />
                      {c.label}
                    </button>
                  );
                })}
                <div className="mt-4 pt-4 border-t border-ink-100 flex flex-col gap-2 px-3">
                  <Link
                    href="/quick-inquiry"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    무료 견적 받기
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                  <a
                    href={SITE.contact.telHref}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 hover:text-ink-900"
                  >
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {SITE.contact.telDisplay}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const iconTextClass = category.iconColor.split(" ")[1] ?? "text-brand-600";
  const hasProducts =
    category.relatedProducts && category.relatedProducts.length > 0;
  const prefix = `services.${category.key}`;

  return (
    <EditableSection
      id={category.key}
      className="scroll-mt-40 flex flex-col gap-6 md:gap-8"
    >
      {/* 헤더 · 사진 위 오버레이 */}
      <div className="relative overflow-hidden rounded-3xl border border-ink-100">
        <div className="aspect-[21/9] relative">
          <EditableImage
            contentKey={`${prefix}.bg`}
            placeholder={
              <ImagePlaceholder
                ratio="21/9"
                tone="brand"
                rounded="none"
                label={category.label}
              />
            }
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            wrapperClassName="absolute inset-0"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/45 to-ink-900/10 pointer-events-none" />
        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end gap-2 md:gap-3 text-white pointer-events-none [&_*]:pointer-events-auto [&_[aria-hidden=true]]:!pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="w-16 h-16 rounded-2xl bg-white/95 flex items-center justify-center shadow-lg">
              <CategoryLogo category={category.key} size={48} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold">
              0{index + 1} · Category
            </span>
          </div>
          <EditableText
            as="h2"
            contentKey={`${prefix}.label`}
            defaultText={category.label}
            className="text-2xl md:text-4xl font-bold leading-[1.15] tracking-tight break-keep"
          />
          <EditableText
            as="p"
            contentKey={`${prefix}.tagline`}
            defaultText={category.tagline}
            multiline
            className="text-sm md:text-lg font-semibold text-brand-300 break-keep"
          />
          <EditableText
            as="p"
            contentKey={`${prefix}.longDesc`}
            defaultText={category.longDesc}
            multiline
            className="text-[12px] md:text-sm text-white/85 leading-[1.55] break-keep max-w-2xl line-clamp-2 md:line-clamp-none"
          />
        </div>
      </div>

      {/* Situations · 텍스트 카드 3장 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {category.situations.map((s, i) => {
          const SIcon = s.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-ink-100 bg-ink-50 p-5 flex flex-col gap-2.5"
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${category.iconColor}`}
              >
                <SIcon className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <EditableText
                as="p"
                contentKey={`${prefix}.situation.${i}.title`}
                defaultText={s.title}
                multiline
                className="text-[15px] font-semibold text-ink-900 leading-snug break-keep"
              />
              <EditableText
                as="p"
                contentKey={`${prefix}.situation.${i}.desc`}
                defaultText={s.desc}
                multiline
                className="text-[13px] text-ink-600 leading-[1.55] break-keep"
              />
            </div>
          );
        })}
      </div>

      {/* 타입 A · 운영 방식 리본 (1회 / 정기 + 품목확인 모달) or 타입 B · 품목 */}
      {hasProducts ? (
        <ServicePlanRibbon categoryKey={category.key} />
      ) : (
        <ItemsEditable prefix={prefix} defaultItems={category.items!} />
      )}

      {/* 섹션별 CTA */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        <Link
          href={`/quick-inquiry?category=${category.key}`}
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
        >
          무료 견적 받기
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-ink-200 text-ink-900 text-sm font-semibold hover:border-ink-900 transition-colors"
        >
          문의하기
        </Link>
        <a
          href={SITE.contact.telHref}
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full text-ink-600 text-sm font-semibold hover:text-ink-900 transition-colors"
        >
          <Phone className="w-4 h-4" strokeWidth={1.75} />
          {SITE.contact.telDisplay}
        </a>
      </div>
    </EditableSection>
  );
}

const MAX_ITEMS = 24;

function ItemsEditable({
  prefix,
  defaultItems,
}: {
  prefix: string;
  defaultItems: readonly string[];
}) {
  const { editing } = useSectionEdit();
  const { get, update } = useHomepageContent();
  const [savingCount, setSavingCount] = useState(false);
  const [countError, setCountError] = useState<string | null>(null);

  const storedCount = get(`${prefix}.items.count`);
  const rawCount = storedCount?.text ? parseInt(String(storedCount.text), 10) : NaN;
  const count = Number.isFinite(rawCount)
    ? Math.max(1, Math.min(MAX_ITEMS, rawCount))
    : defaultItems.length;

  async function saveCount(next: number) {
    setSavingCount(true);
    setCountError(null);
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: `${prefix}.items.count`,
          value: { text: String(next) },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update(`${prefix}.items.count`, { text: String(next) });
    } catch (err) {
      setCountError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSavingCount(false);
    }
  }

  async function addItem() {
    if (count >= MAX_ITEMS) return;
    await saveCount(count + 1);
  }

  async function removeItem() {
    if (count <= 1) return;
    await saveCount(count - 1);
  }

  const items = Array.from({ length: count }, (_, i) => defaultItems[i] ?? "새 품목");

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[13px] uppercase tracking-[0.14em] text-ink-400 font-semibold">
        포함 품목
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-ink-100 bg-ink-50 px-4 py-3 text-[13px] text-ink-900 font-medium break-keep"
          >
            <EditableText
              contentKey={`${prefix}.items.${i}`}
              defaultText={item}
            />
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={addItem}
            disabled={savingCount || count >= MAX_ITEMS}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/40 bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            품목 추가
          </button>
          <button
            type="button"
            onClick={removeItem}
            disabled={savingCount || count <= 1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-200 bg-white text-ink-600 text-sm font-semibold hover:bg-ink-50 disabled:opacity-50 transition-colors"
          >
            <Minus className="w-4 h-4" strokeWidth={2} />
            마지막 품목 삭제
          </button>
          <span className="text-xs text-ink-400 ml-1">
            현재 {count}개 · 최대 {MAX_ITEMS}개
          </span>
          {countError && (
            <span className="text-xs text-red-600 font-medium">
              {countError}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * 운영 방식 리본 · 1회성 / 정기 / 품목확인 3개 버튼 + 모달
 * ────────────────────────────────────────────────────────── */

type RibbonModalKey = "onetime" | "regular" | "items";

/**
 * 카테고리별 모달 콘텐츠 매핑.
 * 딥케어 / 엔드케어는 각각 다른 서비스 특성을 가지므로
 * 1회성 설명, 정기 설명, 품목 리스트 모두 분리.
 */
const RIBBON_CONTENT: Partial<
  Record<
    ServiceCategoryKey,
    {
      onetimeTitle: string;
      regularTitle: string;
      itemsTitle: string;
      onetime: React.ReactNode;
      regular: React.ReactNode;
      items: React.ReactNode;
    }
  >
> = {
  deepcare: {
    onetimeTitle: "1회성 딥케어",
    regularTitle: "정기 딥케어",
    itemsTitle: "BBK가 커버하는 공간",
    onetime: <DeepcareOnetimeContent />,
    regular: <DeepcareRegularContent />,
    items: <DeepcareItemsContent />,
  },
  endcare: {
    onetimeTitle: "1회성 엔드케어",
    regularTitle: "정기 엔드케어",
    itemsTitle: "BBK가 커버하는 마감 업무",
    onetime: <EndcareOnetimeContent />,
    regular: <EndcareRegularContent />,
    items: <EndcareItemsContent />,
  },
};

function ServicePlanRibbon({
  categoryKey,
}: {
  categoryKey: ServiceCategoryKey;
}) {
  const [openModal, setOpenModal] = useState<RibbonModalKey | null>(null);
  const content = RIBBON_CONTENT[categoryKey];
  if (!content) return null;

  return (
    <>
      <div className="rounded-2xl border border-brand-100 bg-brand-50/60 px-4 md:px-6 py-4 md:py-5 flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        {/* 좌 · 설명 (모바일 상단) */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.18em] text-brand-700 font-semibold">
            자세히 알아보기
          </span>
          <span className="text-[13px] md:text-[15px] text-ink-800 font-medium break-keep">
            궁금한 부분을 눌러 자세한 안내를 확인하세요
          </span>
        </div>

        {/* 우 · 3개 액션 버튼 (모바일에서도 가로 유지) */}
        <div className="flex gap-1.5 md:gap-2.5 md:ml-auto shrink-0">
          <RibbonActionButton
            label="1회성 청소"
            onClick={() => setOpenModal("onetime")}
            variant="outline"
          />
          <RibbonActionButton
            label="정기 청소"
            onClick={() => setOpenModal("regular")}
            variant="solid"
          />
          <RibbonActionButton
            label="품목 확인"
            onClick={() => setOpenModal("items")}
            variant="brand"
          />
        </div>
      </div>

      <InfoModal
        open={openModal === "onetime"}
        onClose={() => setOpenModal(null)}
        eyebrow="서비스 안내"
        title={content.onetimeTitle}
      >
        {content.onetime}
      </InfoModal>

      <InfoModal
        open={openModal === "regular"}
        onClose={() => setOpenModal(null)}
        eyebrow="서비스 안내"
        title={content.regularTitle}
      >
        {content.regular}
      </InfoModal>

      <InfoModal
        open={openModal === "items"}
        onClose={() => setOpenModal(null)}
        eyebrow="시공 범위"
        title={content.itemsTitle}
        maxWidth="max-w-2xl"
      >
        {content.items}
      </InfoModal>
    </>
  );
}

/**
 * 리본 액션 버튼. 👆 이모지가 호버 시 살짝 흔들려 "눌러도 돼요" 시그널.
 * - outline: 1회성 청소 (흰 배경 + 테두리)
 * - solid: 정기 청소 (검정 배경)
 * - brand: 품목 확인 (브랜드 블루)
 */
function RibbonActionButton({
  label,
  onClick,
  variant,
}: {
  label: string;
  onClick: () => void;
  variant: "outline" | "solid" | "brand";
}) {
  const base =
    "group inline-flex items-center justify-center gap-1 md:gap-1.5 px-2.5 md:px-5 py-2.5 md:py-3.5 rounded-full text-[11px] md:text-base font-bold break-keep whitespace-nowrap transition-all duration-200 active:scale-[0.97]";
  const variants = {
    outline:
      "bg-white border-2 border-brand-200 text-ink-900 hover:border-brand-500 hover:shadow-[0_8px_20px_-10px_rgba(44,167,241,0.5)]",
    solid:
      "bg-ink-900 text-white hover:bg-brand-600 hover:shadow-[0_8px_20px_-10px_rgba(10,15,26,0.5)]",
    brand:
      "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-[0_8px_20px_-10px_rgba(44,167,241,0.6)]",
  };

  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant]}`}>
      <span>{label}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-200 group-hover:translate-y-[-2px] group-hover:rotate-[-10deg]"
      >
        👆
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
 * 모달 콘텐츠 · 1회성 / 정기 / 품목
 * ────────────────────────────────────────────────────────── */

function DeepcareOnetimeContent() {
  return (
    <div className="flex flex-col gap-5 text-ink-700">
      <p className="text-sm md:text-base leading-[1.7] break-keep">
        <strong className="text-ink-900">1회성 청소</strong>는 매장이나 건물에
        누적된 오염을 전문 약품과 장비로 한 번에 해결하는{" "}
        <strong className="text-ink-900">단건 케어 서비스</strong>입니다. 일반
        청소로는 제거하기 어려운 기름때·찌든때·곰팡이·그을음을 BBK 전문팀이
        설비를 분해해 속까지 세척해드립니다.
      </p>

      <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 md:p-5 flex flex-col gap-3">
        <h4 className="text-sm md:text-base font-bold text-ink-900 break-keep">
          이런 분께 추천드립니다
        </h4>
        <ul className="flex flex-col gap-2 text-[13px] md:text-sm text-ink-700 leading-[1.6]">
          {[
            "매장 오픈 전 초기 위생 세팅이 필요하신 사장님",
            "몇 년간 누적된 오염을 한 번에 리셋하고 싶으신 분",
            "정기 계약 전 서비스 품질을 먼저 체험해보고 싶으신 분",
            "위생등급 심사 등 특별한 시점에 완벽한 상태가 필요한 매장",
          ].map((text, i) => (
            <li key={i} className="flex gap-2 break-keep">
              <span className="shrink-0 text-brand-600 font-bold">•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DeepcareRegularContent() {
  return (
    <div className="flex flex-col gap-5 text-ink-700">
      <p className="text-sm md:text-base leading-[1.7] break-keep">
        <strong className="text-ink-900">정기 청소</strong>는 1회성 딥케어와
        동일한 수준의 전문 분해 세척 서비스를{" "}
        <strong className="text-ink-900">
          매달 정해진 주기로 반복 제공
        </strong>
        하는 구독형 케어 서비스입니다. 오염이 누적되기 전에 선제적으로 관리하기
        때문에 매장이 항상 최상의 위생 상태를 유지할 수 있습니다.
      </p>

      <div className="rounded-2xl bg-ink-900 text-white p-4 md:p-5 flex flex-col gap-3">
        <h4 className="text-sm md:text-base font-bold break-keep">
          핵심 이점
        </h4>
        <ul className="flex flex-col gap-2 text-[13px] md:text-sm text-white/85 leading-[1.6]">
          {[
            "매장 위생 상태를 매일 안정적으로 유지",
            <>
              일회성 계약 대비{" "}
              <strong className="text-brand-400">최대 45% 비용 절감</strong>
            </>,
            "매번 청소 일정 조율의 번거로움 제거",
            "전용 앱으로 시공 결과 자동 리포트",
          ].map((text, i) => (
            <li key={i} className="flex gap-2 break-keep">
              <span className="shrink-0 text-brand-400 font-bold">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 md:p-5 flex flex-col gap-3">
        <h4 className="text-sm md:text-base font-bold text-ink-900 break-keep">
          이런 분께 추천드립니다
        </h4>
        <ul className="flex flex-col gap-2 text-[13px] md:text-sm text-ink-700 leading-[1.6]">
          {[
            "매장 위생을 항상 관리된 상태로 유지하고 싶으신 사장님",
            "다점포를 운영하며 통합 관리가 필요하신 운영자",
            "장기적으로 비용 효율까지 챙기고 싶으신 분",
          ].map((text, i) => (
            <li key={i} className="flex gap-2 break-keep">
              <span className="shrink-0 text-brand-600 font-bold">•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const INDOOR_ITEMS = [
  "상가·매장",
  "사무실",
  "빌딩",
  "공용공간",
  "공공시설",
  "창고",
  "공장",
  "식품시설",
];

const OUTDOOR_ITEMS = [
  "간판",
  "외창",
  "데크",
  "인조잔디",
  "놀이터",
  "야외 매트",
  "옥상",
];

function DeepcareItemsContent() {
  return (
    <div className="flex flex-col gap-5 text-ink-700">
      {/* ① 한 줄 요약 */}
      <p className="text-sm md:text-base leading-[1.7] break-keep">
        BBK는 <strong className="text-ink-900">공간 유형</strong>과{" "}
        <strong className="text-ink-900">시공 범위</strong>를 모두 자유롭게
        선택하실 수 있습니다. 아래 안내된 조합 중 어떤 형태든 가능합니다.
      </p>

      {/* ② 범위 자유 선택 */}
      <div className="rounded-2xl bg-ink-50 border border-ink-100 p-4 md:p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.14em] text-ink-500 font-semibold">
            Scope
          </span>
          <h4 className="text-sm md:text-base font-bold text-ink-900 break-keep">
            원하는 범위로 선택 가능
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-ink-100">
            <span className="shrink-0 px-2 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider">
              전체
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <strong className="text-[13px] md:text-sm text-ink-900 leading-tight">
                주방 전체 청소
              </strong>
              <p className="text-[11px] md:text-[12px] text-ink-500 leading-[1.5] break-keep">
                후드·덕트·가스레인지·냉장고까지 한 번에 시공
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-ink-100">
            <span className="shrink-0 px-2 py-0.5 rounded-md bg-ink-900 text-white text-[10px] font-bold uppercase tracking-wider">
              부분
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <strong className="text-[13px] md:text-sm text-ink-900 leading-tight">
                후드 청소 1건
              </strong>
              <p className="text-[11px] md:text-[12px] text-ink-500 leading-[1.5] break-keep">
                필요한 설비만 콕 찝어 단일 시공도 가능
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ③ 실내 / 실외 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {/* 실내 */}
        <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.14em] text-brand-700 font-semibold">
                Indoor
              </span>
              <h4 className="text-sm md:text-base font-bold text-ink-900">
                실내 청소
              </h4>
            </div>
          </div>
          <p className="text-[12px] md:text-[13px] text-ink-600 leading-[1.55] break-keep">
            업무·영업·보관·제조까지, 건물 안쪽의 모든 공간을 BBK 전문팀이
            책임집니다.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {INDOOR_ITEMS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-brand-200 text-[11px] md:text-xs font-semibold text-ink-800"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-[11px] md:text-[12px] text-brand-700 font-medium leading-[1.5] break-keep border-t border-brand-100 pt-2.5">
            ※ 리스트에 없어도 건물 내부 유사 공간이면 모두 시공 가능합니다
          </p>
        </div>

        {/* 실외 */}
        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Trees className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.14em] text-emerald-700 font-semibold">
                Outdoor
              </span>
              <h4 className="text-sm md:text-base font-bold text-ink-900">
                실외 청소
              </h4>
            </div>
          </div>
          <p className="text-[12px] md:text-[13px] text-ink-600 leading-[1.55] break-keep">
            건물 자체뿐 아니라 외부에 딸린 부수 시설까지 전부 커버합니다. 평소
            손이 닿기 어려운 공간도 전문 장비로 안전하게 관리합니다.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {OUTDOOR_ITEMS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-[11px] md:text-xs font-semibold text-ink-800"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-[11px] md:text-[12px] text-emerald-700 font-medium leading-[1.5] break-keep border-t border-emerald-100 pt-2.5">
            ※ 리스트에 없어도 건물에 딸린 유사 공간이면 모두 시공 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * 엔드케어 전용 모달 콘텐츠 (딥케어와 완전 다른 성격)
 * - 1회성: 긴급·단기 상황 대응 (인력 결원·행사·팝업)
 * - 정기: 주 단위 반복 마감 (일상 유지)
 * - 품목: 상주 직원이 하던 업무 전체 대체 (매장 내/외 업무)
 * ────────────────────────────────────────────────────────── */

function EndcareOnetimeContent() {
  return (
    <div className="flex flex-col gap-5 text-ink-700">
      <p className="text-sm md:text-base leading-[1.7] break-keep">
        <strong className="text-ink-900">1회성 엔드케어</strong>는 매장이나
        시설의{" "}
        <strong className="text-ink-900">마감 청소를 단발성으로 제공</strong>
        하는 서비스입니다. 평상시 자체 운영 중이지만 특정 시점에만 외부 인력
        지원이 필요하신 매장을 위해 설계되었습니다.
      </p>

      <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 md:p-5 flex flex-col gap-3">
        <h4 className="text-sm md:text-base font-bold text-ink-900 break-keep">
          이런 상황에 적합합니다
        </h4>
        <ul className="flex flex-col gap-2 text-[13px] md:text-sm text-ink-700 leading-[1.6]">
          {[
            "갑작스런 마감 인력 결원이 발생한 매장",
            "행사·팝업 스토어 등 단기 운영 공간",
            "특별 이벤트 전후 매장 리셋이 필요한 경우",
            "정기 계약 전 서비스 품질을 먼저 체험해보고 싶으신 분",
          ].map((text, i) => (
            <li key={i} className="flex gap-2 break-keep">
              <span className="shrink-0 text-brand-600 font-bold">•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EndcareRegularContent() {
  return (
    <div className="flex flex-col gap-5 text-ink-700">
      <p className="text-sm md:text-base leading-[1.7] break-keep">
        <strong className="text-ink-900">정기 엔드케어</strong>는 매주 지정된
        요일에 반복적으로 마감 청소를 제공하는{" "}
        <strong className="text-ink-900">구독형 케어 서비스</strong>입니다.
        일상적으로 발생하는 먼지·발자국·정리정돈 업무를 BBK 전문팀이 상시
        관리하여, 매장이 항상 깔끔한 상태를 유지합니다.
      </p>

      <div className="rounded-2xl bg-ink-900 text-white p-4 md:p-5 flex flex-col gap-3">
        <h4 className="text-sm md:text-base font-bold break-keep">
          핵심 이점
        </h4>
        <ul className="flex flex-col gap-2 text-[13px] md:text-sm text-white/85 leading-[1.6]">
          {[
            "매장 운영 흐름에 맞춘 요일 선택 가능",
            <>
              1회성 엔드케어와{" "}
              <strong className="text-brand-400">동일한 품질</strong>
            </>,
            <>
              1회성 계약 대비{" "}
              <strong className="text-brand-400">최대 45% 비용 절감</strong>
            </>,
            "매번 인력 수급 걱정에서 자유로움",
          ].map((text, i) => (
            <li key={i} className="flex gap-2 break-keep">
              <span className="shrink-0 text-brand-400 font-bold">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 md:p-5 flex flex-col gap-3">
        <h4 className="text-sm md:text-base font-bold text-ink-900 break-keep">
          이런 분께 추천드립니다
        </h4>
        <ul className="flex flex-col gap-2 text-[13px] md:text-sm text-ink-700 leading-[1.6]">
          {[
            "매일 반복되는 마감 업무를 전문팀에 위탁하고 싶으신 사장님",
            "상주 인력 운영보다 외주화가 효율적인 매장",
            "장기적으로 비용 효율까지 챙기고 싶으신 분",
          ].map((text, i) => (
            <li key={i} className="flex gap-2 break-keep">
              <span className="shrink-0 text-brand-600 font-bold">•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ENDCARE_INDOOR_TASKS = [
  "설거지",
  "비품 리필",
  "바닥 청소",
  "테이블·의자 정리",
  "쓰레기 처리",
  "정리정돈",
  "화장실 청소",
  "유리·거울 닦기",
];

const ENDCARE_OUTDOOR_TASKS = [
  "매장 앞 바닥",
  "간판 주변 정리",
  "외부 쓰레기 수거",
  "외부 창문",
  "주차장 정리",
];

function EndcareItemsContent() {
  return (
    <div className="flex flex-col gap-5 text-ink-700">
      {/* ① 한 줄 요약 */}
      <p className="text-sm md:text-base leading-[1.7] break-keep">
        BBK 엔드케어는{" "}
        <strong className="text-ink-900">
          상주 직원이 처리하던 모든 마감 업무를 대체
        </strong>
        합니다. 매장 운영에 필요한 어떤 품목이든 자유롭게 커스터마이즈
        가능합니다.
      </p>

      {/* ② 범위 자유 선택 */}
      <div className="rounded-2xl bg-ink-50 border border-ink-100 p-4 md:p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.14em] text-ink-500 font-semibold">
            Scope
          </span>
          <h4 className="text-sm md:text-base font-bold text-ink-900 break-keep">
            원하는 범위로 선택 가능
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-ink-100">
            <span className="shrink-0 px-2 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider">
              전체
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <strong className="text-[13px] md:text-sm text-ink-900 leading-tight">
                매장 마감 올인원
              </strong>
              <p className="text-[11px] md:text-[12px] text-ink-500 leading-[1.5] break-keep">
                설거지부터 비품 리필까지 마감 업무 통째로
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-ink-100">
            <span className="shrink-0 px-2 py-0.5 rounded-md bg-ink-900 text-white text-[10px] font-bold uppercase tracking-wider">
              부분
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <strong className="text-[13px] md:text-sm text-ink-900 leading-tight">
                설거지 1건
              </strong>
              <p className="text-[11px] md:text-[12px] text-ink-500 leading-[1.5] break-keep">
                필요한 품목만 콕 찝어 단일 요청 가능
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ③ 매장 내 / 매장 외 업무 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {/* 매장 내 */}
        <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.14em] text-brand-700 font-semibold">
                Indoor
              </span>
              <h4 className="text-sm md:text-base font-bold text-ink-900">
                매장 내 업무
              </h4>
            </div>
          </div>
          <p className="text-[12px] md:text-[13px] text-ink-600 leading-[1.55] break-keep">
            영업 종료 후 매장 안쪽에서 이루어지는 모든 마감 업무를 BBK
            전문팀이 대신 처리합니다.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ENDCARE_INDOOR_TASKS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-brand-200 text-[11px] md:text-xs font-semibold text-ink-800"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-[11px] md:text-[12px] text-brand-700 font-medium leading-[1.5] break-keep border-t border-brand-100 pt-2.5">
            ※ 리스트에 없어도 매장 운영에 필요한 업무는 모두 요청 가능합니다
          </p>
        </div>

        {/* 매장 외 */}
        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Trees className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.14em] text-emerald-700 font-semibold">
                Outdoor
              </span>
              <h4 className="text-sm md:text-base font-bold text-ink-900">
                매장 외부 업무
              </h4>
            </div>
          </div>
          <p className="text-[12px] md:text-[13px] text-ink-600 leading-[1.55] break-keep">
            매장 앞·주변·주차장 등 손님이 처음 마주하는 외부 공간까지 깔끔하게
            관리합니다.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ENDCARE_OUTDOOR_TASKS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-[11px] md:text-xs font-semibold text-ink-800"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-[11px] md:text-[12px] text-emerald-700 font-medium leading-[1.5] break-keep border-t border-emerald-100 pt-2.5">
            ※ 리스트에 없어도 매장 외부에 필요한 업무는 모두 요청 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
}
