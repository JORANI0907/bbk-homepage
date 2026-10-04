"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Bridge } from "./Bridge";
import { BLOG_CATEGORY_MAP } from "@/lib/blog-categories";
import { getSortedPosts, type BlogPost } from "@/lib/data/blog-posts";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

export default function BlogFeedV5() {
  const sorted = getSortedPosts();
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured.slug).slice(0, 3);

  return (
    <EditableSection className="relative bg-ink-50 py-14 md:py-24 lg:py-32">
      {/* 실제 콘텐츠 · 클릭 및 포커스 차단 */}
      <div
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-6 md:gap-10 lg:gap-14 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <Bridge
            contentKeyPrefix="blog"
            step="10.5 · 청소 · 매장 인사이트"
            bridge="청소만이 아니라, 매장 운영도 함께 챙깁니다."
            titleMain="사장님을 위한"
            titleAccent="청소·매장 인사이트."
          />
          <span className="inline-flex items-center gap-1.5 h-10 md:h-11 px-4 md:px-5 rounded-full bg-white border border-ink-200 text-ink-900 text-xs md:text-sm font-semibold self-start md:self-end whitespace-nowrap">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.75} />
            블로그 전체 보기
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6">
          <FeaturedHomeCard post={featured} />

          <div className="lg:col-span-5 flex flex-col gap-3 md:gap-4 lg:gap-6">
            {rest.map((p, i) => (
              <SideHomeCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* 어두운 오버레이 */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* 준비중 배지 */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-5">
        <div className="rounded-2xl md:rounded-3xl bg-white/95 backdrop-blur px-6 md:px-10 lg:px-12 py-6 md:py-9 lg:py-10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)] flex flex-col items-center gap-2.5 md:gap-3 text-center max-w-lg">
          <EditableText
            contentKey="blog.badge"
            defaultText="Coming Soon"
            className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-semibold text-brand-600"
          />
          <EditableText
            as="p"
            contentKey="blog.overlay.title"
            defaultText="블로그 준비중입니다."
            className="text-xl md:text-2xl lg:text-3xl font-bold text-ink-900 tracking-tight break-keep"
          />
          <EditableText
            as="p"
            contentKey="blog.overlay.desc"
            defaultText={"사장님을 위한 청소·매장 인사이트를 곧 오픈합니다.\n조금만 기다려 주세요."}
            multiline
            className="text-xs md:text-sm lg:text-base text-ink-600 leading-[1.55] md:leading-[1.65] break-keep whitespace-pre-line"
          />
        </div>
      </div>
    </EditableSection>
  );
}

function FeaturedHomeCard({ post }: { post: BlogPost }) {
  const cat = BLOG_CATEGORY_MAP[post.category];
  return (
    <motion.article
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-7 group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="h-full rounded-3xl bg-white border border-ink-100 overflow-hidden hover:shadow-[0_20px_50px_-25px_rgba(10,15,26,0.2)] hover:-translate-y-1 transition-all duration-200 flex flex-col">
          <div className="relative">
            <ImagePlaceholder
              ratio="16/9"
              tone="brand"
              rounded="none"
              label={post.coverLabel ?? cat.label}
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-500 text-white text-[11px] font-semibold">
              Featured
            </span>
          </div>
          <div className="p-5 md:p-8 lg:p-10 flex flex-col gap-3 md:gap-4 flex-1">
            <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-ink-400 flex-wrap">
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold ${cat.badgeClass}`}
              >
                {cat.label}
              </span>
              <span>·</span>
              <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={1.75} />
                {post.readTime}분
              </span>
            </div>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-ink-900 leading-[1.25] md:leading-[1.3] tracking-tight break-keep line-clamp-3 md:line-clamp-none">
              {post.title}
            </h3>
            <p className="text-xs md:text-[15px] text-ink-600 leading-[1.55] md:leading-[1.7] break-keep line-clamp-2 md:line-clamp-none">
              {post.excerpt}
            </p>
            <div className="mt-auto pt-3 md:pt-5 border-t border-ink-100 flex items-center justify-between">
              <span className="text-xs md:text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
                전문 읽기
              </span>
              <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-ink-900 text-white flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function SideHomeCard({ post, index }: { post: BlogPost; index: number }) {
  const cat = BLOG_CATEGORY_MAP[post.category];
  return (
    <motion.article
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.05 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="rounded-2xl md:rounded-3xl bg-white border border-ink-100 overflow-hidden hover:shadow-[0_16px_40px_-25px_rgba(10,15,26,0.15)] hover:-translate-y-0.5 transition-all duration-200 flex items-stretch">
          <div className="w-[90px] md:w-[110px] lg:w-[140px] shrink-0 relative">
            <ImagePlaceholder
              ratio="1/1"
              tone="light"
              rounded="none"
              label={cat.label}
              className="h-full"
            />
          </div>
          <div className="flex-1 p-3 md:p-4 lg:p-5 flex flex-col gap-1.5 md:gap-2">
            <span
              className={`inline-flex w-fit px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold ${cat.badgeClass}`}
            >
              {cat.label}
            </span>
            <h4 className="text-xs md:text-sm lg:text-[15px] font-bold text-ink-900 leading-[1.35] md:leading-[1.4] break-keep line-clamp-2 group-hover:text-brand-700 transition-colors">
              {post.title}
            </h4>
            <div className="mt-auto flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] text-ink-400">
              <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={1.75} />
                {post.readTime}분
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function formatDate(iso: string) {
  return iso.replaceAll("-", ".");
}
