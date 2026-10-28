"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ImageIcon, PlayCircle, Star } from "lucide-react";
import { Bridge } from "./Bridge";
import EditableImage from "@/components/admin/EditableImage";
import EditableText from "@/components/admin/EditableText";
import EditableSection from "@/components/admin/EditableSection";

type Testimonial = {
  category: string;
  story: string;
  name: string;
  role: string;
  period: string;
  service: string;
  /** 실제 사진 경로. 없으면 placeholder 렌더 */
  photo?: string;
};

/** 숨고 리뷰 스크롤 캡처 영상 · public/videos/ 에 이 이름으로 넣으면 자동 재생 */
const REVIEW_VIDEO_SRC = "/videos/soomgo-reviews.mp4";

const PRIMARY: Testimonial = {
  category: "외식·주점",
  story:
    "매일 새벽까지 마감청소하던 스트레스가 사라졌어요. 직원들도 정시 퇴근할 수 있게 되면서 이직률이 확 줄었습니다. 매장 위생도 전보다 훨씬 좋아졌고요.",
  name: "김수철",
  role: "한식당 운영",
  period: "이용 8개월",
  service: "엔드 케어",
};

const OTHERS: Testimonial[] = [
  {
    category: "헬스장",
    story:
      "운동기구·매트 위생을 정기로 관리받으니 회원 이탈률이 확 줄었어요. 특히 샤워실 청결이 후기로 이어지더라고요.",
    name: "정민호",
    role: "헬스장 운영",
    period: "이용 1년",
    service: "딥 케어",
  },
  {
    category: "이자카야",
    story:
      "위생등급 심사를 무사히 통과했어요. 서류 대응부터 실사 준비까지 도움을 받아 매우우수 받았습니다.",
    name: "박정민",
    role: "이자카야 운영",
    period: "이용 6개월",
    service: "위생 등급",
  },
];

/** 사진 자리 · fill 모드 · 카드 세로 전체를 채움 */
function PhotoFill({
  contentKey,
  src,
  label,
  tone = "brand",
}: {
  contentKey: string;
  src?: string;
  label?: string;
  tone?: "brand" | "light";
}) {
  const bgClass =
    tone === "brand"
      ? "bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 text-brand-500"
      : "bg-gradient-to-br from-ink-50 via-ink-100 to-ink-200 text-ink-400";

  const placeholder = (
    <div
      className={`absolute inset-0 ${bgClass} flex flex-col items-center justify-center gap-2`}
    >
      <ImageIcon
        className="w-8 h-8 md:w-10 md:h-10 opacity-60"
        strokeWidth={1.5}
      />
      {label && (
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-semibold opacity-70">
          {label}
        </span>
      )}
    </div>
  );

  return (
    <EditableImage
      contentKey={contentKey}
      defaultSrc={src}
      placeholder={placeholder}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      wrapperClassName="absolute inset-0"
    />
  );
}

/** 좌측 · 숨고 리뷰 스크롤 영상 카드 */
function ReviewVideoCard() {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="h-full bg-white rounded-2xl md:rounded-3xl border border-ink-100 overflow-hidden shadow-[0_20px_50px_-25px_rgba(10,15,26,0.15)] flex flex-col"
    >
      {/* 상단 라벨 */}
      <div className="px-4 md:px-5 py-3 md:py-3.5 border-b border-ink-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-brand-500 text-white text-[10px] font-bold shrink-0">
            숨
          </span>
          <p className="text-[12px] md:text-[13px] font-semibold text-ink-900 truncate">
            숨고 실제 고객 리뷰
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-100 rounded-full px-2 md:px-2.5 py-1 whitespace-nowrap">
          <Star className="w-3 h-3 fill-current" strokeWidth={1.5} />
          실시간 캡처
        </span>
      </div>

      {/* 영상 · 원본 비율(998×838 ≈ 6:5) 그대로 · 잘림 없음 */}
      <div className="relative bg-ink-900 aspect-[6/5]">
        {!failed ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={REVIEW_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink-50 via-ink-100 to-ink-200 text-ink-400 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <PlayCircle className="w-9 h-9 md:w-11 md:h-11 opacity-60" strokeWidth={1.5} />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-semibold opacity-70">
              Review Video
            </span>
            <span className="text-[11px] md:text-xs opacity-70 break-keep">
              public/videos/soomgo-reviews.mp4 파일을 넣으면 자동 재생됩니다
            </span>
          </div>
        )}
      </div>

      {/* 하단 설명 · 우측 카드 높이와 맞추기 위해 남는 공간을 채움 */}
      <div className="flex-1 px-4 md:px-5 py-4 md:py-5 flex flex-col justify-center gap-1.5 md:gap-2">
        <EditableText
          as="p"
          contentKey="testimonial.video.title"
          defaultText="숨고에서 받은 후기, 그대로 보여드립니다."
          className="text-sm md:text-base font-semibold text-ink-900 leading-[1.5] break-keep"
        />
        <EditableText
          as="p"
          contentKey="testimonial.video.caption"
          defaultText="편집 없이 숨고 리뷰 화면을 그대로 캡처했습니다. 사장님들이 직접 남긴 평가를 확인해 보세요."
          multiline
          className="text-[12px] md:text-[13px] text-ink-500 leading-[1.55] break-keep"
        />
      </div>
    </motion.div>
  );
}

/** 우측 · 후기 카드 한 장 (사진 좌 · 텍스트 우) */
function ReviewCard({
  keyPrefix,
  data,
  featured = false,
  delay = 0,
}: {
  keyPrefix: string;
  data: Testimonial;
  featured?: boolean;
  delay?: number;
}) {
  const storyClass = featured
    ? "text-sm md:text-base lg:text-lg font-semibold text-ink-900 leading-[1.5] break-keep"
    : "text-[12px] md:text-[14px] lg:text-[15px] text-ink-900 leading-[1.5] md:leading-[1.55] break-keep font-medium line-clamp-4 md:line-clamp-none";

  return (
    <motion.article
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={`flex-1 bg-white rounded-2xl md:rounded-3xl border border-ink-100 overflow-hidden flex items-stretch min-h-[140px] md:min-h-[170px] ${
        featured ? "shadow-[0_20px_50px_-25px_rgba(10,15,26,0.15)]" : ""
      }`}
    >
      {/* 사진 · 카드 세로 fill */}
      <div className="relative w-[32%] md:w-[34%] shrink-0">
        <PhotoFill
          contentKey={`${keyPrefix}.photo`}
          src={data.photo}
          label={featured ? "Owner" : undefined}
          tone={featured ? "brand" : "light"}
        />
      </div>

      {/* 텍스트 */}
      <div className="flex-1 p-3.5 md:p-5 lg:p-6 flex flex-col gap-2 md:gap-3 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <EditableText
            contentKey={`${keyPrefix}.category`}
            defaultText={data.category}
            className={`text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-semibold ${
              featured ? "text-brand-600" : "text-ink-400"
            }`}
          />
          {featured && (
            <Quote className="w-4 h-4 md:w-5 md:h-5 text-brand-500" strokeWidth={1.5} />
          )}
        </div>
        <EditableText
          as="p"
          contentKey={`${keyPrefix}.story`}
          defaultText={data.story}
          multiline
          className={storyClass}
          wrap={(t) => <>&ldquo;{t}&rdquo;</>}
        />
        <div className="mt-auto pt-2 md:pt-3 border-t border-ink-100 flex items-center justify-between gap-2 md:gap-3">
          <div className="min-w-0">
            <p className="text-[11px] md:text-[12px] font-semibold text-ink-900">
              <EditableText contentKey={`${keyPrefix}.name`} defaultText={data.name} /> 사장님
            </p>
            <EditableText
              as="p"
              contentKey={`${keyPrefix}.role`}
              defaultText={data.role}
              className="text-[10px] md:text-[11px] text-ink-400"
            />
          </div>
          <span className="text-[10px] md:text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-100 rounded-full px-2 md:px-2.5 py-1 whitespace-nowrap">
            <EditableText contentKey={`${keyPrefix}.period`} defaultText={data.period} /> ·{" "}
            <EditableText contentKey={`${keyPrefix}.service`} defaultText={data.service} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsV4() {
  return (
    <EditableSection className="bg-brand-50 py-14 md:py-24 lg:py-36 border-y border-brand-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-10 md:gap-16 lg:gap-20">
        <Bridge
          contentKeyPrefix="testimonial"
          step="05 · 사장님 후기"
          bridge="같은 고민으로 걱정했던 사장님들의 감사 후기."
          titleMain="믿고 서비스 이용 중인"
          titleAccent="사장님들의 진짜 후기."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 md:items-stretch">
          {/* 좌 · 숨고 리뷰 스크롤 영상 */}
          <div className="md:col-span-5">
            <ReviewVideoCard />
          </div>

          {/* 우 · 후기 카드 3장 세로 배치 */}
          <div className="md:col-span-7 flex flex-col gap-3 md:gap-6">
            <ReviewCard keyPrefix="testimonial.primary" data={PRIMARY} featured />
            {OTHERS.map((o, i) => (
              <ReviewCard
                key={i}
                keyPrefix={`testimonial.other.${i}`}
                data={o}
                delay={0.1 + i * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
