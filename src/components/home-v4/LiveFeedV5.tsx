"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

type Event = {
  time: string;
  region: string;
  industry: string;
  store: string;
  owner: string;
  action: string;
};

type LiveEvent = Event & { uid: number };

const EVENTS: Event[] = [
  { time: "방금 전", region: "성남시", industry: "치킨전문점", store: "치**", owner: "김**", action: "후드·덕트 청소 문의" },
  { time: "3분 전", region: "서울 강남", industry: "카페", store: "브**", owner: "이**", action: "야간 청소 상담 접수" },
  { time: "8분 전", region: "수원", industry: "이자카야", store: "쿠**", owner: "박**", action: "덕트 견적 요청" },
  { time: "12분 전", region: "안양", industry: "브런치카페", store: "봄**", owner: "정**", action: "대청소 상담 문의" },
  { time: "15분 전", region: "용인", industry: "삼겹살집", store: "고**", owner: "최**", action: "그리스트랩 견적 접수" },
  { time: "22분 전", region: "서울 마포", industry: "파스타집", store: "라**", owner: "조**", action: "정기 케어 상담 접수" },
  { time: "28분 전", region: "부천", industry: "PC방", store: "게**", owner: "윤**", action: "야간 정기 상담 문의" },
  { time: "35분 전", region: "인천", industry: "한식당", store: "한**", owner: "장**", action: "화장실 위생 청소 접수" },
  { time: "41분 전", region: "광명", industry: "헬스장", store: "핏**", owner: "강**", action: "바닥 왁싱 견적 요청" },
  { time: "48분 전", region: "화성", industry: "편의점", store: "세**", owner: "한**", action: "냉장 매대 청소 접수" },
  { time: "55분 전", region: "하남", industry: "이자카야", store: "달**", owner: "오**", action: "후드+덕트 패키지 상담" },
  { time: "1시간 전", region: "시흥", industry: "노래방", store: "메**", owner: "신**", action: "카펫 오염 제거 상담" },
  { time: "1시간 전", region: "서울 성동", industry: "베이커리", store: "파**", owner: "서**", action: "오븐 대청소 문의" },
  { time: "1시간 전", region: "안산", industry: "중식당", store: "황**", owner: "권**", action: "웍 화구·후드 견적" },
  { time: "2시간 전", region: "서울 송파", industry: "치과의원", store: "미**", owner: "황**", action: "홀·화장실 정기 상담" },
  { time: "2시간 전", region: "김포", industry: "카페", store: "스**", owner: "안**", action: "창문·유리 청소 상담" },
  { time: "2시간 전", region: "성남 판교", industry: "오피스", store: "코**", owner: "송**", action: "야간 청소 상담 접수" },
  { time: "3시간 전", region: "안양 평촌", industry: "학원", store: "명**", owner: "류**", action: "방학 대청소 접수" },
  { time: "3시간 전", region: "수원 광교", industry: "요양병원", store: "새**", owner: "전**", action: "위생 정기 상담 문의" },
  { time: "4시간 전", region: "서울 강서", industry: "필라테스", store: "코**", owner: "홍**", action: "매트·유리 청소 상담" },
  { time: "4시간 전", region: "부산 광안", industry: "회식당", store: "조**", owner: "이**", action: "실외 청소 상담 문의" },
  { time: "5시간 전", region: "대구 수성", industry: "한식당", store: "명**", owner: "박**", action: "정기 케어 문의" },
  { time: "5시간 전", region: "인천 송도", industry: "카페", store: "별**", owner: "김**", action: "매장 리셋 견적 요청" },
  { time: "6시간 전", region: "광주 상무", industry: "삼겹살집", store: "화**", owner: "이**", action: "후드 상담 접수" },
  { time: "6시간 전", region: "대전 서구", industry: "편의점", store: "새**", owner: "최**", action: "냉장고 청소 요청" },
  { time: "7시간 전", region: "울산 남구", industry: "이자카야", store: "밤**", owner: "정**", action: "덕트 견적 문의" },
  { time: "8시간 전", region: "제주시", industry: "게스트하우스", store: "파**", owner: "강**", action: "객실 청소 상담" },
  { time: "9시간 전", region: "창원 성산", industry: "동물병원", store: "청**", owner: "황**", action: "위생 정기 문의" },
  { time: "10시간 전", region: "청주 흥덕", industry: "미용실", store: "봄**", owner: "서**", action: "원장실 청소 견적" },
  { time: "11시간 전", region: "전주 완산", industry: "한정식", store: "유**", owner: "오**", action: "마감청소 상담 문의" },
  { time: "12시간 전", region: "서울 종로", industry: "사무실", store: "큐**", owner: "문**", action: "야간 청소 상담" },
  { time: "13시간 전", region: "서울 홍대", industry: "카페", store: "미**", owner: "남**", action: "커피머신 청소 접수" },
  { time: "14시간 전", region: "서울 신촌", industry: "노래방", store: "스**", owner: "홍**", action: "카펫 딥클리닝 견적" },
  { time: "15시간 전", region: "성남 서현", industry: "요가원", store: "루**", owner: "백**", action: "매트 관리 상담" },
  { time: "16시간 전", region: "안산 상록", industry: "브런치", store: "다**", owner: "임**", action: "오븐 청소 접수" },
  { time: "17시간 전", region: "파주 운정", industry: "스터디카페", store: "라**", owner: "남**", action: "정기 계약 문의" },
  { time: "18시간 전", region: "화성 동탄", industry: "곱창집", store: "오**", owner: "배**", action: "덕트 청소 상담" },
  { time: "19시간 전", region: "광명 철산", industry: "필라테스", store: "하**", owner: "곽**", action: "유리 청소 견적" },
  { time: "20시간 전", region: "부천 상동", industry: "한의원", store: "나**", owner: "우**", action: "진료실 관리 문의" },
  { time: "21시간 전", region: "의정부", industry: "뷔페", store: "소**", owner: "예**", action: "주방 대청소 상담" },
  { time: "22시간 전", region: "남양주", industry: "학원", store: "초**", owner: "노**", action: "교실 정기 계약 문의" },
  { time: "23시간 전", region: "김포 장기", industry: "편의점", store: "아**", owner: "도**", action: "매대 청소 접수" },
  { time: "1일 전", region: "하남 미사", industry: "인테리어", store: "시**", owner: "표**", action: "상가 오픈 청소 문의" },
  { time: "1일 전", region: "서울 압구정", industry: "미용실", store: "채**", owner: "유**", action: "원장실 청소 접수" },
  { time: "1일 전", region: "서울 이태원", industry: "와인바", store: "리**", owner: "엄**", action: "글라스 관리 상담" },
  { time: "1일 전", region: "서울 잠실", industry: "스시야", store: "은**", owner: "도**", action: "냉장고 청소 요청" },
  { time: "1일 전", region: "성남 야탑", industry: "동물병원", store: "빈**", owner: "나**", action: "진료실 관리 문의" },
  { time: "1일 전", region: "수원 팔달", industry: "노래방", store: "별**", owner: "하**", action: "방음실 청소 접수" },
  { time: "1일 전", region: "안양 만안", industry: "학원", store: "청**", owner: "왕**", action: "마감청소 상담" },
  { time: "1일 전", region: "광명 하안", industry: "카페", store: "앤**", owner: "신**", action: "매장 리셋 상담" },
];

const VISIBLE_COUNT = 6;
const CYCLE_MS = 6300; // 이전 4200 → 1.5배 느리게

export default function LiveFeedV5() {
  const [items, setItems] = useState<LiveEvent[]>(() =>
    EVENTS.slice(0, VISIBLE_COUNT).map((e, i) => ({ ...e, uid: i })),
  );
  const nextSourceIdx = useRef(VISIBLE_COUNT);
  const nextUid = useRef(VISIBLE_COUNT);

  useEffect(() => {
    const id = setInterval(() => {
      const source = EVENTS[nextSourceIdx.current % EVENTS.length];
      const newItem: LiveEvent = { ...source, uid: nextUid.current };
      nextSourceIdx.current += 1;
      nextUid.current += 1;
      setItems((prev) => [newItem, ...prev.slice(0, VISIBLE_COUNT - 1)]);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <EditableSection className="bg-white py-10 md:py-16 lg:py-24 border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
        {/* 좌 · 헤드 */}
        <div className="lg:col-span-4 flex flex-col gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="inline-block w-5 md:w-6 h-px bg-ink-300" />
            <EditableText
              contentKey="live.step"
              defaultText="Live Feed"
              className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold"
            />
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-ink-900 leading-[1.2] tracking-tight break-keep">
            <EditableText
              contentKey="live.title.main"
              defaultText="지금 이 순간에도,"
            />
            <br />
            <EditableText
              contentKey="live.title.accent"
              defaultText="많은 사람이 찾는 이유 있다."
              className="text-ink-400"
            />
          </h2>
          <EditableText
            as="p"
            contentKey="live.subtitle"
            defaultText="BBK를 신뢰 한다면 우리매장의 신뢰를 쌓을 수 있습니다."
            multiline
            className="text-xs md:text-sm lg:text-base text-ink-600 leading-[1.55] md:leading-[1.65] break-keep"
          />
        </div>

        {/* 우 · 피드 리스트 */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl md:rounded-3xl border border-ink-100 bg-white overflow-hidden shadow-[0_16px_40px_-25px_rgba(10,15,26,0.12)] min-h-[420px] md:min-h-[520px]">
            <AnimatePresence initial={false}>
              {items.map((e, i) => (
                <motion.div
                  key={e.uid}
                  layout
                  initial={{ opacity: 0, y: -12, backgroundColor: "#EBF6FE" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundColor: "#FFFFFF",
                    transition: {
                      y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.35 },
                      backgroundColor: { duration: 1.4, delay: 0.2 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.25 },
                  }}
                  transition={{
                    layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="border-b border-ink-100 last:border-b-0"
                >
                  <div className="px-3.5 md:px-6 py-3 md:py-4 flex items-center gap-2.5 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-[13px] text-ink-900 font-semibold">
                        <span className="truncate">
                          <span className="text-brand-700 font-mono tracking-tight">
                            {e.store}
                          </span>
                          <span className="text-ink-400 font-normal">
                            {" "}
                            ({e.owner} 사장님)
                          </span>
                          <span className="text-ink-300 mx-1 md:mx-1.5">·</span>
                          {e.action}
                        </span>
                        {i === 0 && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-brand-500 text-white text-[9px] font-bold tracking-wider uppercase">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 mt-0.5 text-[10px] md:text-[11px] text-ink-400">
                        <MapPin className="w-3 h-3" strokeWidth={1.75} />
                        <span className="truncate">{e.region}</span>
                        <span className="text-ink-200">·</span>
                        <span className="truncate">{e.industry}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-0.5 md:gap-1">
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.14em] font-semibold text-brand-600 whitespace-nowrap hidden sm:inline">
                        접수 및 상담신청
                      </span>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.14em] font-semibold text-brand-600 whitespace-nowrap sm:hidden">
                        상담접수
                      </span>
                      <span className="text-[10px] md:text-[11px] text-ink-400 whitespace-nowrap">
                        {e.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
