"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useLiveCount } from "@/lib/hooks/useLiveCount";
import EditableImage from "@/components/admin/EditableImage";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

export default function CtaBannerV4() {
  const liveCount = useLiveCount(5, 29, 12, 8000, 3);

  return (
    <EditableSection className="relative bg-ink-900 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 92% 20%, rgba(44,167,241,0.28), transparent 55%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
          {/* 좌 · 카피 */}
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-8 lg:gap-10">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="inline-block w-5 md:w-6 h-px bg-white/30" />
              <EditableText
                contentKey="cta.step"
                defaultText="12 · 지금 시작하기"
                className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-400 font-semibold"
              />
            </div>

            <motion.p
              initial={{ opacity: 1, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base lg:text-lg font-medium text-white/70 leading-[1.55] break-keep"
            >
              <EditableText
                contentKey="cta.bridge"
                defaultText="여기까지 오셨다면, 이제 딱 한 통이면 돼요."
                multiline
              />
            </motion.p>

            <motion.h2
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-[1.15] md:leading-[1.1] tracking-[-0.02em] break-keep"
            >
              <EditableText
                contentKey="cta.title.main"
                defaultText="오늘 상담하시고,"
              />
              <br />
              <EditableText
                contentKey="cta.title.accent"
                defaultText="이번 주에 시공 받으세요."
                className="text-white/50"
              />
            </motion.h2>

            <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3">
              <Link
                href="/quick-inquiry"
                className="inline-flex items-center justify-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-full bg-white text-ink-900 font-semibold text-sm md:text-base hover:bg-brand-50 transition-colors duration-200 active:scale-[0.98]"
              >
                무료 상담 받기
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
              <a
                href={SITE.contact.telHref}
                className="inline-flex items-center justify-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-full border border-white/25 text-white font-semibold text-sm md:text-base hover:border-white/60 transition-colors duration-200 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" strokeWidth={1.75} />
                {SITE.contact.telDisplay}
              </a>
            </div>

            <div className="pt-6 md:pt-8 lg:pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
              <TrustLine contentKey="cta.trust.0" label="Availability" value="24시간 접수" />
              <TrustLine contentKey="cta.trust.1" label="Response" value="120분 이내 회신" />
              <TrustLine contentKey="cta.trust.2" label="Coverage" value="서울·경기 전역" />
              <TrustLine contentKey="cta.trust.3" label="License" value="위생관리업 인증" />
            </div>
          </div>

          {/* 우 · 이미지 · 편집 가능 · 모바일에서는 16/9 가로 비율로 짧게 */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[16/10] md:aspect-[4/3] lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_40px_100px_-30px_rgba(44,167,241,0.4)]">
              <EditableImage
                contentKey="cta.night-care"
                placeholder={
                  <ImagePlaceholder
                    ratio="4/5"
                    tone="dark"
                    rounded="none"
                    label="Night Care"
                  />
                }
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                wrapperClassName="absolute inset-0"
              />
              {/* Live 카운트 overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 pointer-events-none">
                <div className="rounded-xl md:rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 p-3 md:p-4 flex items-center gap-2.5 md:gap-3">
                  <span className="relative flex">
                    <span className="w-2 h-2 rounded-full bg-brand-400" />
                    <span className="absolute inset-0 w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-white/60">
                      Live
                    </span>
                    <span className="text-xs md:text-sm font-medium text-white tabular-nums">
                      지금 {liveCount}명 상담 진행 중
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}

function TrustLine({
  contentKey,
  label,
  value,
}: {
  contentKey: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 md:gap-1.5">
      <EditableText
        contentKey={`${contentKey}.label`}
        defaultText={label}
        className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium"
      />
      <EditableText
        contentKey={`${contentKey}.value`}
        defaultText={value}
        className="text-xs md:text-sm lg:text-base text-white font-medium break-keep"
      />
    </div>
  );
}
