"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_MAP,
  type BlogCategoryKey,
} from "@/lib/blog-categories";
import {
  getPostsByCategory,
  type BlogPost,
} from "@/lib/data/blog-posts";

type FilterKey = BlogCategoryKey | "all";

const ALL_TAB: { key: FilterKey; label: string } = { key: "all", label: "전체" };

export function BlogListClient() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const posts = useMemo(() => getPostsByCategory(filter), [filter]);
  const featured =
    filter === "all" ? posts.find((p) => p.featured) : undefined;
  const sidePosts =
    filter === "all" && featured
      ? posts.filter((p) => p.slug !== featured.slug).slice(0, 3)
      : [];
  // 하단 전체 그리드는 필터에 해당하는 모든 글을 노출. 상단 Featured/Side 와
  // 중복되어도 매거진 스타일로 자연스럽고 그리드가 풍성해진다.
  const rest = posts;

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero */}
        <section className="relative bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 78% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-10 md:pb-14">
            <Bridge
              step="Blog · Insight"
              bridge="청소만이 아니라, 매장 운영도 함께 챙깁니다."
              title={
                <>
                  사장님을 위한
                  <br />
                  <span className="text-ink-400">청소·매장 인사이트.</span>
                </>
              }
              subtitle="현장에서 검증된 노하우, 위생 규정 가이드, 실제 사장님 인터뷰까지 — 매장에 바로 도움 되는 이야기만 담습니다."
            />
          </div>
        </section>

        {/* 카테고리 탭 · sticky */}
        <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-y border-ink-100">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[ALL_TAB, ...BLOG_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))].map(
                (t) => {
                  const isActive = filter === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setFilter(t.key as FilterKey)}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                        isActive
                          ? "bg-ink-900 text-white border-ink-900"
                          : "bg-white text-ink-600 border-ink-200 hover:border-ink-400 hover:text-ink-900"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* Featured + 사이드 3장 (전체 탭에서만) */}
        {featured && (
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <FeaturedCard post={featured} />
              <div className="flex flex-col gap-3 md:gap-4">
                {sidePosts.map((p) => (
                  <SideCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 전체 글 그리드 */}
        <section className="bg-ink-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-8">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-ink-900">
                {filter === "all" ? "전체 글" : BLOG_CATEGORY_MAP[filter].label}
              </h2>
              <span className="text-sm text-ink-400 font-medium tabular-nums">
                {posts.length}편
              </span>
            </div>
            {rest.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {rest.map((p) => (
                  <GridCard key={p.slug} post={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white border border-ink-100 p-12 text-center flex flex-col items-center gap-3">
                <BookOpen className="w-8 h-8 text-ink-300" strokeWidth={1.5} />
                <p className="text-sm text-ink-500">
                  이 카테고리에는 아직 글이 없어요.
                </p>
              </div>
            )}
          </div>
        </section>

        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const cat = BLOG_CATEGORY_MAP[post.category];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white block"
    >
      <div className="transition-transform duration-500 group-hover:scale-[1.03]">
        <ImagePlaceholder
          ratio="4/3"
          tone="brand"
          rounded="none"
          label={post.coverLabel ?? post.title}
        />
      </div>
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full bg-white/95 text-[10px] uppercase tracking-[0.14em] font-bold text-brand-700">
          Featured
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${cat.badgeClass}`}
        >
          {cat.label}
        </span>
      </div>
      <div className="p-6 md:p-7 flex flex-col gap-3">
        <h3 className="text-xl md:text-2xl font-bold text-ink-900 leading-[1.3] tracking-tight break-keep group-hover:text-brand-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-ink-600 leading-[1.6] break-keep">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-ink-400 font-medium">
          <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" strokeWidth={2} />
            {post.readTime}분
          </span>
        </div>
      </div>
    </Link>
  );
}

function SideCard({ post }: { post: BlogPost }) {
  const cat = BLOG_CATEGORY_MAP[post.category];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl border border-ink-100 bg-white overflow-hidden flex items-stretch hover:border-brand-300 hover:shadow-[0_16px_40px_-25px_rgba(10,15,26,0.18)] transition-all"
    >
      <div className="w-[110px] md:w-[140px] shrink-0">
        <ImagePlaceholder
          ratio="1/1"
          tone="light"
          rounded="none"
          label={cat.label}
          className="h-full"
        />
      </div>
      <div className="flex-1 p-4 md:p-5 flex flex-col gap-2 min-w-0">
        <span
          className={`inline-flex w-fit px-2 py-0.5 rounded-full text-[10px] font-semibold ${cat.badgeClass}`}
        >
          {cat.label}
        </span>
        <h3 className="text-[14px] md:text-[15px] font-bold text-ink-900 leading-[1.35] break-keep group-hover:text-brand-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <div className="mt-auto flex items-center gap-2 text-[11px] text-ink-400 font-medium">
          <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" strokeWidth={2} />
            {post.readTime}분
          </span>
        </div>
      </div>
    </Link>
  );
}

function GridCard({ post }: { post: BlogPost }) {
  const cat = BLOG_CATEGORY_MAP[post.category];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl border border-ink-100 bg-white overflow-hidden flex flex-col hover:border-brand-300 hover:shadow-[0_16px_40px_-25px_rgba(10,15,26,0.18)] hover:-translate-y-1 transition-all duration-200"
    >
      <ImagePlaceholder
        ratio="16/9"
        tone="light"
        rounded="none"
        label={post.coverLabel ?? cat.label}
      />
      <div className="p-5 md:p-6 flex flex-col gap-2.5 flex-1">
        <span
          className={`inline-flex w-fit px-2 py-0.5 rounded-full text-[10px] font-semibold ${cat.badgeClass}`}
        >
          {cat.label}
        </span>
        <h3 className="text-[15px] md:text-base font-bold text-ink-900 leading-[1.35] break-keep group-hover:text-brand-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-[13px] text-ink-600 leading-[1.55] break-keep line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-ink-400 font-medium">
          <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" strokeWidth={2} />
            {post.readTime}분
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(iso: string) {
  return iso.replaceAll("-", ".");
}
