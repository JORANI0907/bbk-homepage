"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import { SERVICES } from "@/lib/data/services";

const SERVICE_LIST = Object.values(SERVICES);

const DEEP_CHIPS = [
  "후드·덕트", "가스레인지", "간택기", "튀김기", "식기세척기",
  "냉장고", "선반형밧드냉장고", "밧드냉장고", "쇼케이스", "전자레인지", "오븐",
  "인덕션", "밥솥", "커피머신", "에스프레소머신", "제빙기",
  "냉동고", "정수기", "주방바닥", "주방벽면", "주방보조선반", "작업대",
  "싱크대", "트렌치·트랩", "그리스트랩", "배수구", "주방환풍기",
  "테이블·의자", "홀바닥", "유리창·창틀", "입구유리문", "장식장·진열장", "에어컨 실내기",
  "테이블덕트", "카운터", "양변기", "소변기", "세면대",
  "거울", "화장실타일", "화장실환풍기", "천장·조명", "배기팬",
];

const END_CHIPS = [
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

const PROCESS_STEPS = [
  { num: "01", title: "문의하기", desc: "전화 또는 폼으로 문의, 당일 확인 후 회신드립니다." },
  { num: "02", title: "현장 견적", desc: "직접 방문 또는 원격으로 빠르게 견적을 제공합니다." },
  { num: "03", title: "시공 진행", desc: "시공 일정 예약 및 시공을 받고 전·후 사진 결과물을 받습니다." },
  { num: "04", title: "사후 관리", desc: "작업 완료 후 결제가 이뤄지며 정기 관리 서비스 문의 시 더욱 빠른 안내가 가능합니다." },
];

const GUIDE = [
  {
    q: "주방 기름때, 에어컨, 후드 등 깊이 누적된 오염을 제거하고 싶다면",
    a: "딥케어",
    sub: "분해 세척이 필요한 품목 중심",
    href: "/services/deep-care-subscription",
    hrefLabel: "딥케어 구독 알아보기",
    hrefOnce: "/services/deep-care-onetime",
    hrefOnceLabel: "1회로 먼저 체험하기",
  },
  {
    q: "영업 후 매일의 마감청소를 전문팀에게 맡기고 싶다면",
    a: "엔드케어",
    sub: "설거지부터 홀 청소, 화장실까지",
    href: "/services/end-care-regular",
    hrefLabel: "엔드케어 정기 알아보기",
    hrefOnce: "/services/end-care-onetime",
    hrefOnceLabel: "1회로 먼저 체험하기",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-bbk-black pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden relative">
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none"
          >
            <p
              className="text-white/[0.035] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-6 md:pl-12"
              style={{ fontSize: "clamp(100px, 20vw, 320px)" }}
            >
              SERVICES.
            </p>
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 mb-6">
              BBK SPACE CARE — SERVICES
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white font-black leading-[1.05] tracking-[-0.03em] break-keep mb-5"
              style={{ fontSize: "clamp(38px, 7vw, 100px)" }}
            >
              깨끗한 공간,
              <br />
              두 가지 방법으로.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/45 text-base md:text-lg max-w-xl break-keep leading-relaxed"
            >
              딥케어와 엔드케어 — 오염의 깊이에 따라 서비스를 선택하세요.
              구독형과 1회형 모두 제공합니다.
            </motion.p>
          </div>
        </section>

        {/* 딥케어 */}
        <section className="bg-bbk-black py-24 md:py-32 overflow-hidden border-t border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bbk-pink font-black leading-[0.85] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(72px, 14vw, 180px)" }}
            >
              DEEP
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">
                  01 / 딥케어
                </p>
                <h2
                  className="text-white font-black leading-tight tracking-[-0.02em] mb-5 break-keep"
                  style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
                >
                  상가 전체 or 부분 누적 오염 대청소
                </h2>
                <p className="text-white/45 text-sm md:text-base leading-relaxed break-keep mb-8 max-w-md">
                  후드·덕트, 가스레인지, 냉장고, 에어컨 등 공간 속 깊은 오염을 분해 세척합니다.
                  전문 장비와 안전 세제로 일반 청소로는 닿지 않는 곳까지.
                </p>
                <div className="inline-flex items-baseline gap-3 border border-white/15 px-5 py-3">
                  <span className="font-black text-white text-3xl leading-none">
                    {SERVICES["deep-care-subscription"].items.length}+
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                    서비스 품목
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:pt-14">
                <Link
                  href="/services/deep-care-subscription"
                  className="group flex items-center justify-between border border-white/15 p-6 hover:border-bbk-pink/50 hover:bg-white/[0.03] transition-all"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bbk-pink block mb-1.5">
                      BEST · 구독형
                    </span>
                    <p className="text-white font-bold text-lg">딥케어 구독</p>
                    <p className="text-white/40 text-sm mt-1 break-keep">월 1~4회 정기 방문 · 품목 자유 선택</p>
                  </div>
                  <span className="text-white/30 group-hover:text-bbk-pink transition-colors font-mono">→</span>
                </Link>

                <Link
                  href="/services/deep-care-onetime"
                  className="group flex items-center justify-between border border-white/15 p-6 hover:border-white/40 hover:bg-white/[0.03] transition-all"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 block mb-1.5">
                      1회형
                    </span>
                    <p className="text-white font-bold text-lg">딥케어 1회</p>
                    <p className="text-white/40 text-sm mt-1 break-keep">원하는 품목만 · 단발성 시공</p>
                  </div>
                  <span className="text-white/30 group-hover:text-white transition-colors font-mono">→</span>
                </Link>
              </div>
            </div>

            <div className="overflow-hidden -mx-6 md:-mx-12 my-10">
              <div
                className="flex w-max"
                style={{ animation: "marqueeReverse 42s linear infinite" }}
              >
                {[...DEEP_CHIPS, ...DEEP_CHIPS].map((item, i) => (
                  <span
                    key={i}
                    className="border border-white/15 text-white/40 font-mono text-[11px] px-4 py-2 whitespace-nowrap shrink-0 mr-2 hover:border-bbk-pink/40 hover:text-white/70 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 엔드케어 */}
        <section className="bg-bbk-cool-white py-24 md:py-32 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bbk-pink font-black leading-[0.85] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(72px, 14vw, 180px)" }}
            >
              END
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-3">
                  02 / 엔드케어
                </p>
                <h2
                  className="text-bbk-black font-black leading-tight tracking-[-0.02em] mb-5 break-keep"
                  style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
                >
                  내일 오픈을 위한 마감정리 및 청소
                </h2>
                <p className="text-bbk-stone-6 text-sm md:text-base leading-relaxed break-keep mb-8 max-w-md">
                  영업 종료 후 내일의 오픈을 준비합니다. 설거지, 쓰레기 배출부터 화장실 소독,
                  홀 바닥 물청소까지 매일의 마감 업무를 전문팀이 처리합니다.
                </p>
                <div className="inline-flex items-baseline gap-3 border border-bbk-concrete px-5 py-3">
                  <span className="font-black text-bbk-black text-3xl leading-none">
                    {SERVICES["end-care-regular"].items.length}+
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-bbk-stone-6">
                    서비스 품목
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:pt-14">
                <Link
                  href="/services/end-care-regular"
                  className="group flex items-center justify-between border border-bbk-concrete bg-white p-6 hover:border-bbk-pink/40 transition-all"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bbk-pink block mb-1.5">
                      NEW · 정기형
                    </span>
                    <p className="text-bbk-black font-bold text-lg">엔드케어 정기</p>
                    <p className="text-bbk-stone-6 text-sm mt-1 break-keep">월 단위 협의 · 주방·홀·화장실 전체</p>
                  </div>
                  <span className="text-bbk-stone-6 group-hover:text-bbk-pink transition-colors font-mono">→</span>
                </Link>

                <Link
                  href="/services/end-care-onetime"
                  className="group flex items-center justify-between border border-bbk-concrete bg-white p-6 hover:border-bbk-black/40 transition-all"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bbk-stone-6 block mb-1.5">
                      1회형
                    </span>
                    <p className="text-bbk-black font-bold text-lg">엔드케어 1회</p>
                    <p className="text-bbk-stone-6 text-sm mt-1 break-keep">단발성 마감청소 · 행사·점검 전후</p>
                  </div>
                  <span className="text-bbk-stone-6 group-hover:text-bbk-black transition-colors font-mono">→</span>
                </Link>
              </div>
            </div>

            <div className="overflow-hidden -mx-6 md:-mx-12 my-10">
              <div
                className="flex w-max"
                style={{ animation: "marqueeReverse 36s linear infinite" }}
              >
                {[...END_CHIPS, ...END_CHIPS].map((item, i) => (
                  <span
                    key={i}
                    className="border border-bbk-concrete text-bbk-stone-6 font-mono text-[11px] px-4 py-2 whitespace-nowrap shrink-0 mr-2 hover:border-bbk-pink/40 hover:text-bbk-black transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 선택 가이드 */}
        <section className="bg-bbk-black py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                SERVICE GUIDE
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-black leading-tight tracking-[-0.02em] break-keep mb-12 md:mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              어떤 서비스가
              <br />
              나에게 맞을까요?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GUIDE.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="border border-white/[0.1] bg-white/[0.03] p-8 flex flex-col gap-6"
                >
                  <p className="text-white/55 text-base leading-relaxed break-keep">
                    {g.q}
                  </p>
                  <div>
                    <p className="text-bbk-pink font-black text-2xl mb-1">{g.a}</p>
                    <p className="text-white/30 font-mono text-[11px] uppercase tracking-wider">{g.sub}</p>
                  </div>
                  <div className="flex flex-col gap-3 pt-3 border-t border-white/[0.07]">
                    <Link
                      href={g.href}
                      className="inline-flex items-center gap-3 text-white font-bold text-[13px] uppercase tracking-wider hover:text-bbk-pink transition-colors group"
                    >
                      <span className="w-5 h-px bg-current transition-all duration-300 group-hover:w-10" />
                      {g.hrefLabel}
                    </Link>
                    <Link
                      href={g.hrefOnce}
                      className="inline-flex items-center gap-3 text-white/40 font-bold text-[13px] uppercase tracking-wider hover:text-white/70 transition-colors group"
                    >
                      <span className="w-5 h-px bg-current transition-all duration-300 group-hover:w-10" />
                      {g.hrefOnceLabel}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 전체 서비스 카드 */}
        <section className="bg-bbk-cool-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
                ALL SERVICES
              </span>
              <div className="flex-1 h-px bg-bbk-concrete" />
              <span className="font-mono text-[10px] text-bbk-stone-6">
                {SERVICE_LIST.length}가지
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICE_LIST.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="group border border-bbk-concrete bg-white p-8 md:p-10 flex flex-col gap-5 hover:border-bbk-black transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <p
                      className="font-black text-bbk-pink/20 leading-[0.85] tracking-[-0.04em] group-hover:text-bbk-pink/40 transition-colors"
                      style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
                    >
                      {svc.wordmark}
                    </p>
                    {svc.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-widest bg-bbk-pink text-white px-3 py-1">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-bbk-stone-6 mb-1.5">
                      {svc.name}
                    </p>
                    <h2 className="text-bbk-black font-black text-xl leading-snug break-keep">
                      {svc.tagline}
                    </h2>
                  </div>

                  <p className="text-bbk-stone-6 text-sm leading-relaxed break-keep">
                    {svc.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-1">
                    {svc.features.map((f) => (
                      <div
                        key={f.label}
                        className="border border-bbk-concrete px-4 py-2 flex gap-2 items-baseline"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-widest text-bbk-stone-6">
                          {f.label}
                        </span>
                        <span className="font-bold text-bbk-black text-[13px]">
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-wider text-bbk-stone-6 group-hover:text-bbk-pink transition-colors flex items-center gap-2">
                    <span className="w-5 h-px bg-current inline-block transition-all duration-300 group-hover:w-10" />
                    자세히 보기
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 진행 과정 */}
        <section className="bg-bbk-concrete py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
                HOW IT WORKS
              </span>
              <div className="flex-1 h-px bg-bbk-stone-4/30" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bbk-black font-black leading-tight tracking-[-0.02em] break-keep mb-12 md:mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              이렇게 진행됩니다.
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-bbk-stone-4/20">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-bbk-concrete px-7 py-8 flex flex-col gap-3"
                >
                  <p
                    className="font-black text-bbk-pink/30 leading-none"
                    style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                  >
                    {step.num}
                  </p>
                  <p className="text-bbk-black font-black text-lg">{step.title}</p>
                  <p className="text-bbk-stone-6 text-sm leading-relaxed break-keep">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
