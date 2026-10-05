"use client";

import { Bridge } from "./Bridge";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

const ROW_1 = [
  "치킨전문점", "한식당", "고깃집", "중식당", "일식당", "이자카야",
  "분식", "패스트푸드", "뷔페", "단체급식", "호텔 레스토랑", "푸드코트",
];
const ROW_2 = [
  "카페", "베이커리", "브런치", "디저트", "베이글", "버블티",
  "내과·소아과", "치과", "피부과·성형", "한의원", "동물병원", "약국",
];
const ROW_3 = [
  "학원", "독서실", "사무실", "공유오피스", "어린이집·유치원",
  "미용실", "네일샵", "편의점", "마트", "노래방", "PC방", "호텔·모텔", "게스트하우스",
];

function Marquee({
  items,
  reverse,
  speed,
}: {
  items: string[];
  reverse?: boolean;
  speed: number;
}) {
  return (
    <div className="overflow-hidden group">
      <div
        className="flex gap-2 md:gap-3 whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {[...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-ink-200 bg-white text-ink-900 text-xs md:text-sm font-medium"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function IndustriesV4() {
  return (
    <EditableSection className="bg-ink-50 py-14 md:py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8 md:gap-16 lg:gap-20">
        <Bridge
          contentKeyPrefix="industries"
          step="10 · 업종별 맞춤 시공"
          bridge="사장님 매장 업종도 이 안에 있을 거예요. 이미 이 업종들이 저희와 함께해요."
          titleMain="어떤 공간이든,"
          titleAccent="저희가 갑니다."
          subtitle="6개 산업군, 50+ 업종에서 1,200개 이상 매장을 관리해왔어요. 목록에 없어도 무료 방문 상담부터 편하게 시작하시면 돼요."
        />

        <div className="flex flex-col gap-2 md:gap-3">
          <Marquee items={ROW_1} speed={40} />
          <Marquee items={ROW_2} speed={48} reverse />
          <Marquee items={ROW_3} speed={44} />
        </div>

        <div className="rounded-2xl md:rounded-3xl bg-white border border-ink-200 p-4 md:p-7 lg:p-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 shadow-[0_16px_40px_-25px_rgba(10,15,26,0.1)]">
          <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-brand-500 flex items-center justify-center text-white font-bold text-xs md:text-sm shrink-0">
            F&B
          </div>
          <div className="flex-1">
            <EditableText
              as="p"
              contentKey="industries.franchise.label"
              defaultText="프랜차이즈 · 다점포"
              className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-brand-600 font-semibold mb-1.5 md:mb-2"
            />
            <EditableText
              as="h3"
              contentKey="industries.franchise.title"
              defaultText="본사 한 번의 계약으로, 전 지점을 같은 기준으로."
              multiline
              className="text-base md:text-xl lg:text-2xl font-bold text-ink-900 mb-1.5 md:mb-2 break-keep leading-snug"
            />
            <EditableText
              as="p"
              contentKey="industries.franchise.desc"
              defaultText="지점별로 신경 쓰실 필요 없이 통합 리포트로 확인하실 수 있어요."
              multiline
              className="text-xs md:text-sm lg:text-base text-ink-600 leading-[1.55] md:leading-[1.6] break-keep"
            />
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
