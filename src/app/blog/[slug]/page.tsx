import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BLOG_CATEGORY_MAP } from "@/lib/blog-categories";
import {
  BLOG_POSTS,
  BLOG_POSTS_BY_SLUG,
  getRelatedPosts,
} from "@/lib/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS_BY_SLUG[slug];
  if (!post) return {};
  return {
    title: `${post.title} — BBK 블로그`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS_BY_SLUG[slug];
  if (!post) notFound();
  const cat = BLOG_CATEGORY_MAP[post.category];
  const related = getRelatedPosts(post, 3);

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero · 제목 영역 */}
        <section className="relative bg-white">
          <div className="max-w-3xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-8 md:pb-10 flex flex-col gap-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-400 hover:text-ink-900 font-semibold transition-colors w-fit"
            >
              <ArrowLeft className="w-3 h-3" strokeWidth={2} />
              블로그 목록으로
            </Link>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${cat.badgeClass}`}
              >
                {cat.label}
              </span>
              {post.featured && (
                <span className="inline-flex px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-[0.14em]">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-[1.2] tracking-tight break-keep">
              {post.title}
            </h1>
            <p className="text-[15px] md:text-base text-ink-600 leading-[1.7] break-keep">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 text-[12px] text-ink-400 font-medium pt-2 border-t border-ink-100">
              <span className="text-ink-600 font-semibold">BBK 팀</span>
              <span className="text-ink-200">·</span>
              <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
              <span className="text-ink-200">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={2} />
                {post.readTime}분 읽기
              </span>
            </div>
          </div>
        </section>

        {/* 커버 이미지 */}
        <section className="bg-white pb-10 md:pb-14">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <div className="rounded-3xl overflow-hidden border border-ink-100">
              <ImagePlaceholder
                ratio="21/9"
                tone="brand"
                rounded="none"
                label={post.coverLabel ?? post.title}
              />
            </div>
          </div>
        </section>

        {/* 본문 */}
        <section className="bg-white pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <article className="flex flex-col">
              {renderContent(post.content)}
            </article>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-ink-100 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex px-3 py-1 rounded-full bg-ink-50 border border-ink-100 text-[12px] text-ink-600 font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* 저자 카드 */}
            <div className="mt-10 md:mt-14 rounded-2xl bg-ink-50 border border-ink-100 p-6 md:p-7 flex items-center gap-5">
              <span className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-lg font-black shrink-0">
                BBK
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[15px] font-bold text-ink-900">BBK 팀</p>
                <p className="text-[13px] text-ink-600 leading-[1.55] break-keep">
                  범빌드코리아 공간케어팀. 서울·경기 24시간 야간 청소 시공팀의
                  현장 노하우를 정리해 나눕니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 글 */}
        {related.length > 0 && (
          <section className="bg-ink-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-8">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-ink-900">
                  같은 카테고리 · 관련 글
                </h2>
                <Link
                  href="/blog"
                  className="text-[13px] font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
                >
                  전체 보기
                  <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {related.map((p) => {
                  const rCat = BLOG_CATEGORY_MAP[p.category];
                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group rounded-2xl border border-ink-100 bg-white overflow-hidden flex flex-col hover:border-brand-300 hover:shadow-[0_16px_40px_-25px_rgba(10,15,26,0.18)] hover:-translate-y-1 transition-all duration-200"
                    >
                      <ImagePlaceholder
                        ratio="16/9"
                        tone="light"
                        rounded="none"
                        label={p.coverLabel ?? rCat.label}
                      />
                      <div className="p-5 flex flex-col gap-2 flex-1">
                        <span
                          className={`inline-flex w-fit px-2 py-0.5 rounded-full text-[10px] font-semibold ${rCat.badgeClass}`}
                        >
                          {rCat.label}
                        </span>
                        <h3 className="text-[15px] font-bold text-ink-900 leading-[1.35] break-keep line-clamp-2 group-hover:text-brand-700 transition-colors">
                          {p.title}
                        </h3>
                        <div className="mt-auto pt-2 flex items-center gap-2 text-[11px] text-ink-400 font-medium">
                          <span className="tabular-nums">
                            {formatDate(p.publishedAt)}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" strokeWidth={2} />
                            {p.readTime}분
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}

/** 최소 마크다운 렌더 · `## ` 헤더 + `_ _` 인용 + 나머지는 p. MVP 용. */
function renderContent(content: string) {
  const blocks: React.ReactNode[] = [];
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed === "") return;
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2
          key={i}
          className="text-xl md:text-2xl font-bold text-ink-900 leading-tight tracking-tight mt-10 mb-3 break-keep"
        >
          {trimmed.slice(3)}
        </h2>,
      );
    } else if (trimmed.startsWith("_") && trimmed.endsWith("_")) {
      blocks.push(
        <p
          key={i}
          className="text-[13px] text-ink-400 italic mt-6 border-l-2 border-ink-200 pl-4"
        >
          {trimmed.slice(1, -1)}
        </p>,
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push(
        <p
          key={i}
          className="text-[15px] md:text-base text-ink-800 leading-[1.7] break-keep pl-4"
        >
          {trimmed}
        </p>,
      );
    } else {
      blocks.push(
        <p
          key={i}
          className="text-[15px] md:text-base text-ink-700 leading-[1.75] my-4 break-keep"
        >
          {trimmed}
        </p>,
      );
    }
  });
  return blocks;
}

function formatDate(iso: string) {
  return iso.replaceAll("-", ".");
}
