"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Bridge } from "./Bridge";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

const ROWS = [
  {
    label: "야간 시공",
    bbk: "21시~08시 정기 스케줄",
    other: "주간 위주 · 야간 불가한 곳 다수",
  },
  {
    label: "디테일 케어 시스템",
    bbk: "보이지 않는 곳까지 케어",
    other: "겉만 표면 청소",
  },
  {
    label: "전용 앱 리포트",
    bbk: "매 시공 전후 사진·리포트 자동 전송",
    other: "종이·문자로 부정기 보고",
  },
  {
    label: "가격 투명성",
    bbk: "품목별 정찰 · 사전 견적서",
    other: "현장에서 협상 · 추가 비용 잦음",
  },
  {
    label: "다점포 통합 관리",
    bbk: "본사 일괄 계약 · 지점별 동일 기준",
    other: "지점별 개별 계약 · 기준 편차",
  },
  {
    label: "국가 인증",
    bbk: "법인 · 건축물위생관리업 정식 등록",
    other: "개인 사업자 · 인증 미보유가 다수",
  },
];

export default function ComparisonV4() {
  return (
    <EditableSection className="bg-white py-14 md:py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8 md:gap-16 lg:gap-20">
        <Bridge
          contentKeyPrefix="comparison"
          step="06 · 다른 청소업체와의 차이"
          bridge="후기가 좋은 이유가 뭘까요? 다른 청소업체와 저희를 나란히 놓고 비교해봤어요."
          titleMain="그냥 청소가 아니라,"
          titleAccent="공간 관리 파트너 입니다."
        />

        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl md:rounded-3xl border-2 border-ink-200 overflow-hidden shadow-[0_20px_50px_-30px_rgba(10,15,26,0.15)]"
        >
          {/* 헤더 · 모바일 라벨 좁게(3), BBK 넓게(5), 타사(4) */}
          <div className="grid grid-cols-12 border-b-2 border-ink-200">
            <div className="col-span-3 md:col-span-4 px-2.5 md:px-8 py-3.5 md:py-6 bg-white flex items-center">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-ink-500 font-bold">
                항목
              </span>
            </div>
            <div className="col-span-5 md:col-span-4 px-2.5 md:px-8 py-3.5 md:py-6 bg-ink-900 border-l-2 border-ink-200 flex items-center gap-1.5 md:gap-2 text-white">
              <span className="text-brand-400 font-bold text-sm md:text-lg tracking-tight">
                BBK
              </span>
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.14em] text-white/60 font-semibold hidden md:inline">
                Space Care
              </span>
            </div>
            <div className="col-span-4 md:col-span-4 px-2.5 md:px-8 py-3.5 md:py-6 bg-ink-100 border-l-2 border-ink-200 flex items-center">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-ink-600 font-bold break-keep">
                일반 청소업체
              </span>
            </div>
          </div>

          {/* 로우 */}
          {ROWS.map((r, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className="grid grid-cols-12 border-b border-ink-200 last:border-b-0"
              >
                {/* 항목 */}
                <div
                  className={`col-span-3 md:col-span-4 px-2.5 md:px-8 py-3.5 md:py-7 flex items-center ${
                    isEven ? "bg-white" : "bg-ink-50/70"
                  }`}
                >
                  <EditableText
                    contentKey={`comparison.row.${i}.label`}
                    defaultText={r.label}
                    className="text-[11px] md:text-sm font-bold text-ink-900 break-keep leading-snug"
                  />
                </div>
                {/* BBK · 브랜드 파스텔 톤 배경으로 열 구분 */}
                <div
                  className={`col-span-5 md:col-span-4 px-2.5 md:px-8 py-3.5 md:py-7 border-l-2 border-ink-200 flex items-start gap-1.5 md:gap-3 ${
                    isEven ? "bg-brand-50/50" : "bg-brand-50"
                  }`}
                >
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check
                      className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                      strokeWidth={3}
                    />
                  </span>
                  <EditableText
                    contentKey={`comparison.row.${i}.bbk`}
                    defaultText={r.bbk}
                    multiline
                    className="text-[11px] md:text-sm text-ink-900 leading-[1.5] md:leading-[1.55] break-keep font-medium"
                  />
                </div>
                {/* 일반 청소업체 · 회색 톤 배경 */}
                <div
                  className={`col-span-4 md:col-span-4 px-2.5 md:px-8 py-3.5 md:py-7 border-l-2 border-ink-200 flex items-start gap-1.5 md:gap-3 ${
                    isEven ? "bg-ink-50" : "bg-ink-100/60"
                  }`}
                >
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-ink-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" strokeWidth={3} />
                  </span>
                  <EditableText
                    contentKey={`comparison.row.${i}.other`}
                    defaultText={r.other}
                    multiline
                    className="text-[11px] md:text-sm text-ink-600 leading-[1.5] md:leading-[1.55] break-keep"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

        <EditableText
          as="p"
          contentKey="comparison.footnote"
          defaultText="위 비교는 BBK가 실제 시공 현장에서 관찰한 업계 평균에 기반합니다. 모든 청소업체가 그렇다는 뜻은 아니며, 참고용으로 봐주세요."
          multiline
          className="text-[11px] md:text-xs text-ink-400 max-w-2xl break-keep leading-[1.5]"
        />
      </div>
    </EditableSection>
  );
}
