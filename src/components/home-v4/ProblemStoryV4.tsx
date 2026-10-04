"use client";

import { motion } from "framer-motion";
import { Clock, ShieldAlert, Users, FileSearch, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Bridge } from "./Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import EditableImage from "@/components/admin/EditableImage";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

type Pain = {
  icon: React.ElementType;
  title: string;
  keywords: string[];
  desc: string;
  /** Tailwind color class prefix · 감정 색상 (accent) */
  accent: {
    bar: string; // 상단 accent bar (bg-*)
    iconBg: string; // 아이콘 배경
    iconText: string; // 아이콘 색
    pill: string; // 키워드 pill (bg + text)
  };
};

const PAINS: Pain[] = [
  {
    icon: Clock,
    title: "시간이\n부족해요",
    keywords: ["#영업방해", "#야근"],
    desc: "낮에는 손님, 밤에는 청소.",
    accent: {
      bar: "bg-amber-400",
      iconBg: "bg-amber-50",
      iconText: "text-amber-600",
      pill: "bg-amber-50 text-amber-700 border-amber-100",
    },
  },
  {
    icon: ShieldAlert,
    title: "위생이\n걱정돼요",
    keywords: ["#손님시선", "#위생등급"],
    desc: "청소는 했는데 자꾸 신경 쓰여요.",
    accent: {
      bar: "bg-rose-400",
      iconBg: "bg-rose-50",
      iconText: "text-rose-600",
      pill: "bg-rose-50 text-rose-700 border-rose-100",
    },
  },
  {
    icon: Users,
    title: "직원이\n그만둬요",
    keywords: ["#인건비", "#퇴사"],
    desc: "마감청소까지 시키면 다들 힘들대요.",
    accent: {
      bar: "bg-indigo-400",
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-600",
      pill: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
  },
  {
    icon: FileSearch,
    title: "결과가\n안 보여요",
    keywords: ["#외주불신", "#재시공"],
    desc: "맡겨도 확인이 안 돼 다시 하게 돼요.",
    accent: {
      bar: "bg-slate-400",
      iconBg: "bg-slate-100",
      iconText: "text-slate-600",
      pill: "bg-slate-100 text-slate-700 border-slate-200",
    },
  },
];

export default function ProblemStoryV4() {
  return (
    <EditableSection className="relative bg-white py-14 md:py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8 md:gap-12 lg:gap-16">
        <Bridge
          contentKeyPrefix="problem"
          step="02 · 매장 사장님의 고민"
          bridge="사장님, 지금 이런 상태 아니세요?"
          titleMain="혹시 이런 고민,"
          titleAccent="하고 계시죠?"
        />

        {/* 상단 · 4개 고민 카드 (임팩트 강조) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 lg:gap-5">
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-3xl bg-white border border-ink-100 overflow-hidden shadow-[0_16px_40px_-25px_rgba(10,15,26,0.15)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgba(10,15,26,0.22)] transition-all duration-300"
              >
                {/* 상단 컬러 accent bar */}
                <div className={`h-1.5 ${p.accent.bar}`} />

                <div className="p-3.5 md:p-5 lg:p-7 flex flex-col gap-2.5 md:gap-3.5 lg:gap-4">
                  {/* 아이콘 + 번호 */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl ${p.accent.iconBg} ${p.accent.iconText} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-ink-300 font-bold">
                      0{i + 1}
                    </span>
                  </div>

                  {/* 제목 · 큼직하게 · 줄바꿈 유지 */}
                  <EditableText
                    as="p"
                    contentKey={`problem.pain.${i}.title`}
                    defaultText={p.title}
                    multiline
                    className="text-sm md:text-lg lg:text-2xl font-black text-ink-900 leading-[1.15] md:leading-[1.2] tracking-tight break-keep whitespace-pre-line"
                  />

                  {/* 키워드 pill · 굵고 컬러 강조 */}
                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    {p.keywords.map((k, ki) => (
                      <EditableText
                        key={ki}
                        contentKey={`problem.pain.${i}.keyword.${ki}`}
                        defaultText={k}
                        className={`inline-flex px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border text-[10px] md:text-[11px] font-bold ${p.accent.pill}`}
                      />
                    ))}
                  </div>

                  {/* 상황 설명 */}
                  <EditableText
                    as="p"
                    contentKey={`problem.pain.${i}.desc`}
                    defaultText={p.desc}
                    multiline
                    className="text-[11px] md:text-[13px] lg:text-[14px] text-ink-600 leading-[1.5] md:leading-[1.55] break-keep mt-0.5 md:mt-1"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 커넥터 · 세로선 (고민 → 케어) */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-10 md:h-16 bg-gradient-to-b from-ink-200 to-brand-500" />
          <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_0_6px_rgba(44,167,241,0.15)]" />
        </div>

        {/* 하단 · BBK 케어 이미지 히어로 (사진 + 오버레이 카피) */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-ink-100 shadow-[0_30px_80px_-30px_rgba(10,15,26,0.3)]"
        >
          {/* 배경 이미지 · 편집 가능 · 모바일은 4/3 비율, 데스크톱 와이드 */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]">
            <EditableImage
              contentKey="problem.solution-bg"
              placeholder={
                <ImagePlaceholder
                  ratio="21/9"
                  tone="dark"
                  rounded="none"
                  label="BBK가 지키는 매장의 밤"
                />
              }
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              wrapperClassName="absolute inset-0"
            />
          </div>

          {/* 다크 그라디언트 오버레이 · 모바일에서는 하단 전체 어둡게, 데스크톱은 좌측부터 */}
          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,15,26,0.4) 0%, rgba(10,15,26,0.85) 70%, rgba(10,15,26,0.95) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,15,26,0.85) 0%, rgba(10,15,26,0.55) 50%, rgba(10,15,26,0.25) 100%)",
            }}
          />

          {/* 오버레이 콘텐츠 · 모바일 하단 정렬, 데스크톱 좌측 중앙 */}
          <div className="absolute inset-0 flex items-end md:items-center pointer-events-none [&_*]:pointer-events-auto [&_[aria-hidden=true]]:!pointer-events-none">
            <div className="px-5 md:px-10 lg:px-14 py-5 md:py-8 lg:py-10 flex flex-col gap-2.5 md:gap-4 lg:gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-brand-500/95 backdrop-blur text-white text-[10px] md:text-[11px] uppercase tracking-[0.14em] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <EditableText
                  contentKey="problem.solution.badge"
                  defaultText="Solution"
                />
              </div>

              <h3 className="text-xl md:text-3xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight break-keep">
                <EditableText
                  contentKey="problem.solution.title"
                  defaultText={"BBK가\n케어합니다."}
                  multiline
                  className="whitespace-pre-line"
                />
              </h3>

              <EditableText
                as="p"
                contentKey="problem.solution.desc"
                defaultText={"매일 밤, 사장님이 자는 사이 매장을 지킵니다.\n청소·위생·리포트까지 통째로."}
                multiline
                className="text-xs md:text-base lg:text-lg text-white/85 leading-[1.55] md:leading-[1.6] break-keep max-w-lg whitespace-pre-line"
              />

              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 md:gap-2 self-start mt-1 md:mt-2 h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full bg-white text-ink-900 text-xs md:text-sm font-semibold hover:bg-brand-500 hover:text-white transition-colors group/cta"
              >
                어떻게 케어하는지 보기
                <ArrowRight
                  className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/cta:translate-x-0.5 transition-transform"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </EditableSection>
  );
}
