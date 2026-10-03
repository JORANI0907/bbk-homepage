"use client";

import { motion } from "framer-motion";
import { Quote, ImageIcon } from "lucide-react";
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

export default function TestimonialsV4() {
  return (
    <EditableSection className="bg-brand-50 py-24 md:py-36 border-y border-brand-100">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
        <Bridge
          contentKeyPrefix="testimonial"
          step="05 · 사장님 후기"
          bridge="같은 고민으로 걱정했던 사장님들의 감사 후기."
          titleMain="믿고 서비스 이용 중인"
          titleAccent="사장님들의 진짜 후기."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* 메인 후기 · 좌 큰 카드 */}
          <motion.article
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 bg-white rounded-3xl border border-ink-100 overflow-hidden shadow-[0_20px_50px_-25px_rgba(10,15,26,0.15)] flex flex-col md:flex-row"
          >
            {/* 사진 · 카드 세로 전체 fill */}
            <div className="relative md:w-2/5 min-h-[220px] md:min-h-[420px]">
              <PhotoFill
                contentKey="testimonial.primary.photo"
                src={PRIMARY.photo}
                label="Owner"
                tone="brand"
              />
            </div>

            {/* 텍스트 */}
            <div className="md:w-3/5 p-6 md:p-9 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 md:w-7 md:h-7 text-brand-500" strokeWidth={1.5} />
                <EditableText
                  contentKey="testimonial.primary.category"
                  defaultText={PRIMARY.category}
                  className="text-[11px] uppercase tracking-[0.14em] text-brand-600 font-semibold"
                />
              </div>
              <EditableText
                as="p"
                contentKey="testimonial.primary.story"
                defaultText={PRIMARY.story}
                multiline
                className="text-lg md:text-2xl font-semibold text-ink-900 leading-[1.5] break-keep"
                wrap={(t) => <>&ldquo;{t}&rdquo;</>}
              />
              <div className="mt-auto pt-5 border-t border-ink-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    <EditableText
                      contentKey="testimonial.primary.name"
                      defaultText={PRIMARY.name}
                    />{" "}
                    사장님
                  </p>
                  <EditableText
                    as="p"
                    contentKey="testimonial.primary.role"
                    defaultText={PRIMARY.role}
                    className="text-xs text-ink-400"
                  />
                </div>
                <span className="text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-100 rounded-full px-3 py-1.5 whitespace-nowrap">
                  <EditableText
                    contentKey="testimonial.primary.period"
                    defaultText={PRIMARY.period}
                  />{" "}
                  ·{" "}
                  <EditableText
                    contentKey="testimonial.primary.service"
                    defaultText={PRIMARY.service}
                  />
                </span>
              </div>
            </div>
          </motion.article>

          {/* 서브 후기 2개 · 우 */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            {OTHERS.map((o, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="flex-1 bg-white rounded-3xl border border-ink-100 overflow-hidden flex items-stretch min-h-[180px]"
              >
                {/* 사진 · 카드 세로 fill */}
                <div className="relative w-[35%] shrink-0">
                  <PhotoFill
                    contentKey={`testimonial.other.${i}.photo`}
                    src={o.photo}
                    tone="light"
                  />
                </div>

                {/* 텍스트 */}
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-3 min-w-0">
                  <EditableText
                    contentKey={`testimonial.other.${i}.category`}
                    defaultText={o.category}
                    className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-semibold"
                  />
                  <EditableText
                    as="p"
                    contentKey={`testimonial.other.${i}.story`}
                    defaultText={o.story}
                    multiline
                    className="text-[14px] md:text-[15px] text-ink-900 leading-[1.55] break-keep font-medium"
                    wrap={(t) => <>&ldquo;{t}&rdquo;</>}
                  />
                  <div className="mt-auto pt-3 border-t border-ink-100 flex items-center justify-between gap-3">
                    <p className="text-[12px] font-semibold text-ink-900">
                      <EditableText
                        contentKey={`testimonial.other.${i}.name`}
                        defaultText={o.name}
                      />{" "}
                      사장님
                    </p>
                    <span className="text-[11px] text-ink-400 font-medium whitespace-nowrap">
                      <EditableText
                        contentKey={`testimonial.other.${i}.period`}
                        defaultText={o.period}
                      />{" "}
                      ·{" "}
                      <EditableText
                        contentKey={`testimonial.other.${i}.service`}
                        defaultText={o.service}
                      />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
