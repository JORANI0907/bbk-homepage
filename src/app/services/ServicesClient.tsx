"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Plus, Minus } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CategoryLogo } from "@/components/ui/CategoryLogo";
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

      {/* 타입 A · 운영 방식 리본 (1회 / 정기 두 가지 방식) or 타입 B · 품목 */}
      {hasProducts ? (
        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 px-5 md:px-6 py-4 md:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] uppercase tracking-[0.18em] text-brand-700 font-semibold">
              두 가지 운영 방식
            </span>
            <span className="text-[14px] md:text-[15px] text-ink-800 font-medium break-keep">
              매장 상황에 맞춰 1회성 · 정기 중 선택하세요
            </span>
          </div>
          <div className="flex gap-2 md:gap-3 sm:ml-auto shrink-0">
            <span className="inline-flex items-center justify-center px-5 md:px-6 py-3 md:py-3.5 rounded-full bg-white border-2 border-brand-200 text-ink-900 text-base md:text-lg font-bold break-keep">
              1회성 청소
            </span>
            <span className="inline-flex items-center justify-center px-5 md:px-6 py-3 md:py-3.5 rounded-full bg-ink-900 text-white text-base md:text-lg font-bold break-keep">
              정기 청소
            </span>
          </div>
        </div>
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
