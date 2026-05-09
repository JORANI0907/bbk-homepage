"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const DEEP_ITEMS = [
  "후드·덕트", "가스레인지", "간택기", "튀김기", "식기세척기",
  "냉장고", "선반형밧드냉장고", "밧드냉장고", "쇼케이스", "전자레인지", "오븐",
  "인덕션", "밥솥", "커피머신", "에스프레소머신", "제빙기",
  "냉동고", "정수기", "주방바닥", "주방벽면", "주방보조선반", "작업대",
  "싱크대", "트렌치·트랩", "그리스트랩", "배수구", "주방환풍기",
  "테이블·의자", "홀바닥", "유리창·창틀", "입구유리문", "장식장·진열장", "에어컨 실내기",
  "테이블덕트", "카운터", "양변기", "소변기", "세면대",
  "거울", "화장실타일", "화장실환풍기", "천장·조명", "배기팬",
];

const END_ITEMS = [
  "설거지", "조리도구 정리", "식자재 정리", "싱크대 정리", "가스레인지 닦기",
  "작업대 소독", "주방 선반 정리", "냉장고 닦기", "전자레인지 닦기", "인덕션 닦기", "주방 바닥",
  "주방 벽면", "트렌치 정리",
  "테이블 소독", "의자 정리", "카운터 닦기", "메뉴판 닦기", "선반 닦기", "장식장 닦기", "홀 바닥",
  "매트 청소", "소파·쿠션",
  "쓰레기 배출", "음식물 처리", "분리수거",
  "양변기 청소", "소변기 청소", "세면대 닦기", "거울 닦기", "화장실 청소",
  "화장실 타일", "환풍기 그릴", "화장실 소모품",
  "입구 유리문", "현관 바닥", "간판 닦기", "재떨이 정리",
  "손잡이 소독", "포스기 닦기", "소모품 보충", "행주 세탁", "에어컨 점검",
];

const AXES = [
  {
    id: "01",
    code: "DEEP",
    name: "딥케어",
    tagline: "상가 전체 or 부분 누적 오염 대청소",
    desc: "후드·덕트, 가스레인지, 냉장고, 에어컨 등 공간 속 깊은 오염을 분해 세척합니다. 전문 장비와 안전 세제로 일반 청소로는 닿지 않는 곳까지.",
    count: DEEP_ITEMS.length,
    countLabel: "서비스 품목",
    items: DEEP_ITEMS,
    links: [
      { label: "딥케어 구독 →", href: "/services/deep-care-subscription" },
      { label: "딥케어 1회 →", href: "/services/deep-care-onetime" },
    ],
  },
  {
    id: "02",
    code: "END",
    name: "엔드케어",
    tagline: "내일 오픈을 위한 마감정리 및 청소",
    desc: "영업 종료 후 내일의 오픈을 준비합니다. 설거지, 쓰레기 배출부터 화장실 소독, 홀 바닥 물청소까지 매일의 마감 업무를 전문팀이 처리합니다.",
    count: END_ITEMS.length,
    countLabel: "서비스 품목",
    items: END_ITEMS,
    links: [
      { label: "엔드케어 정기 →", href: "/services/end-care-regular" },
      { label: "엔드케어 1회 →", href: "/services/end-care-onetime" },
    ],
  },
];

function ItemMarquee({ items, speed = 35 }: { items: string[]; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden my-6 -mx-6 md:-mx-12">
      <div
        className="flex w-max"
        style={{ animation: `marqueeReverse ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="border border-bbk-concrete text-bbk-stone-6 font-mono text-[11px] px-4 py-2 whitespace-nowrap shrink-0 mr-2 hover:border-bbk-pink/50 hover:text-bbk-black transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServiceAxesSection() {
  return (
    <section className="bg-bbk-cool-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
            SECTION 04 — 서비스
          </span>
          <div className="flex-1 h-px bg-bbk-concrete" />
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {AXES.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              {/* 워드마크 */}
              <p
                className="text-bbk-pink font-black leading-[0.85] tracking-[-0.04em] mb-5"
                style={{ fontSize: "clamp(64px, 11vw, 144px)" }}
              >
                {svc.code}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                {/* 좌: 설명 */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-2">
                    {svc.id} / {svc.name}
                  </p>

                  <h3
                    className="text-bbk-black font-black leading-tight tracking-[-0.02em] mb-4 break-keep"
                    style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
                  >
                    {svc.tagline}
                  </h3>

                  <p className="text-bbk-stone-6 text-sm md:text-base leading-relaxed mb-6 break-keep max-w-md">
                    {svc.desc}
                  </p>

                  {/* 품목 수 강조 */}
                  <div className="inline-flex items-baseline gap-3 border border-bbk-concrete px-5 py-3 mb-6">
                    <span className="font-black text-bbk-black text-3xl leading-none">
                      {svc.count}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-bbk-stone-6">
                      {svc.countLabel}
                    </span>
                  </div>
                </div>

                {/* 우: 링크 */}
                <div className="flex flex-col gap-2.5 md:pt-16">
                  {svc.links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="inline-flex items-center gap-3 text-bbk-black font-bold text-[13px] uppercase tracking-wider hover:text-bbk-pink transition-colors group"
                    >
                      <span className="w-5 h-px bg-current transition-all duration-300 group-hover:w-10" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 품목 마퀴 — 좌→우 무한 반복 */}
              <ItemMarquee items={svc.items} />

              {/* 하단 구분 */}
              {i < AXES.length - 1 && (
                <div className="h-px bg-bbk-concrete mt-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
