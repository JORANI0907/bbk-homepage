"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Camera, Wrench, Award, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const STORY = [
  "상업 공간의 주방, 홀, 화장실에는 매일 쌓이는 오염이 있습니다. 기름때가 굳은 후드, 냄새가 배인 그리스트랩, 물때가 낀 세면대 — 영업 중에는 도저히 손 댈 수 없는 곳들입니다.",
  "BBK는 이 문제를 해결하기 위해 시작했습니다. 영업이 끝난 공간에서 전문 장비와 안전 세제로 깊은 오염을 제거하고, 다음 날 오픈을 준비합니다. 위생은 서비스 품질의 시작이라고 믿습니다.",
  "범빌드코리아는 수도권을 중심으로 식당, 병원, 헬스장, 카페, 사무실 등 다양한 업종의 공간 위생을 관리하고 있습니다. 매 시공마다 기록을 남기고, 고객이 결과를 직접 확인할 수 있도록 투명하게 운영합니다.",
];

const VALUES = [
  {
    num: "01",
    title: "야간 운영",
    desc: "영업이 끝난 시간에 찾아갑니다. 낮 시간 영업을 방해하지 않는 것이 우리의 기본입니다.",
  },
  {
    num: "02",
    title: "기록 관리",
    desc: "시공 전후 사진을 모두 기록합니다. 눈으로 확인할 수 없는 부분까지 투명하게 공유합니다.",
  },
  {
    num: "03",
    title: "전문 장비",
    desc: "고압 스팀, 초음파 세척, 산업용 흡입기 — 일반 청소로 닿지 않는 깊은 오염을 제거합니다.",
  },
  {
    num: "04",
    title: "안전 세제",
    desc: "식품 접촉 면에도 안전한 친환경 세제만 사용합니다. 식자재와 직원 건강을 최우선으로 생각합니다.",
  },
];

const CREDENTIALS = [
  {
    icon: Award,
    title: "건축물위생관리업 인증",
    desc: "관련 법령에 따른 공식 인증 업체입니다. 위생 관리 전 과정을 법적 기준에 맞춰 운영합니다.",
  },
  {
    icon: Shield,
    title: "HACCP 기준 준수",
    desc: "식품 위해요소 중점관리 기준에 맞춘 세척·소독 프로세스를 적용해 주방 위생을 관리합니다.",
  },
  {
    icon: Wrench,
    title: "산업용 전문 장비",
    desc: "고압 스팀, 초음파 세척기, 산업용 진공 흡입기 등 전문 장비로 일반 청소가 닿지 않는 오염을 제거합니다.",
  },
  {
    icon: Camera,
    title: "시공 기록 시스템",
    desc: "매 시공 전·후 사진을 촬영하고 전용 앱에 자동 저장합니다. 결과물을 투명하게 공유합니다.",
  },
  {
    icon: Clock,
    title: "야간 전용 운영",
    desc: "영업 종료 후 야간에만 시공합니다. 운영 중 불편 없이 다음 날 깨끗한 공간에서 오픈할 수 있습니다.",
  },
];

const TEAM = [
  {
    role: "CEO",
    name: "조동환",
    tag: "위생·식품·안전 전문가",
    desc: "위생 관리, 식품 안전, 작업 안전 분야를 아우르는 전문가로 BBK의 모든 시공 기준과 품질 방침을 총괄합니다. 현장 경험을 바탕으로 각 공간에 최적화된 위생 솔루션을 직접 설계합니다.",
  },
  {
    role: "OPERATIONS",
    name: "현장 운영팀",
    tag: "경력 5년 이상 전문 팀장·팀원",
    desc: "현장 경험이 풍부한 전문 팀장과 팀원으로 구성됩니다. 공간별 특성을 파악해 정해진 프로세스대로 일관된 퀄리티를 유지하며, 야간 시공 환경에 최적화된 안전 작업을 수행합니다.",
  },
  {
    role: "CUSTOMER SUPPORT",
    name: "고객지원팀",
    tag: "상시 응대 지원",
    desc: "문의부터 계약, 시공 후 피드백까지 고객 여정 전반을 지원합니다. 정기 고객의 일정 조율, 추가 케어 요청, 불만 사항 대응을 빠르고 친절하게 처리합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-bbk-black pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden relative">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none"
          >
            <p
              className="text-white/[0.035] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-6 md:pl-12"
              style={{ fontSize: "clamp(100px, 20vw, 320px)" }}
            >
              ABOUT.
            </p>
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 mb-6">
              BBK KOREA — ABOUT
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white font-black leading-[1.05] tracking-[-0.03em] break-keep mb-6"
              style={{ fontSize: "clamp(38px, 7vw, 100px)" }}
            >
              공간이 깨끗하면
              <br />
              사람이 건강합니다.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/45 text-base md:text-lg max-w-xl break-keep leading-relaxed"
            >
              범빌드코리아는 상업 공간의 위생을 야간에 전문적으로 관리합니다.
              위생은 선택이 아닌 표준이어야 한다고 믿습니다.
            </motion.p>
          </div>
        </section>

        {/* BBK 이야기 */}
        <section className="bg-bbk-cool-white py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
            <div className="md:sticky md:top-32">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-4">
                OUR STORY
              </p>
              <h2
                className="text-bbk-black font-black leading-tight tracking-[-0.02em] break-keep"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              >
                BBK가
                <br />
                시작된 이유
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {STORY.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-bbk-stone-6 text-base md:text-lg leading-relaxed break-keep border-l-2 border-bbk-concrete pl-6"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* 미션 & 핵심 가치 */}
        <section className="bg-white py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-6">
                MISSION
              </p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-bbk-black font-black leading-tight tracking-[-0.02em] break-keep mb-6"
                style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
              >
                영업이 끝난 공간에서
                <br />
                다음 날을 준비합니다.
              </motion.h2>
              <p className="text-bbk-stone-6 text-base leading-relaxed break-keep max-w-md">
                식당 주방의 후드 기름, 병원 처치실의 바닥 얼룩, 헬스장 탈의실의
                습기 오염 — 영업 중에는 치우기 어려운 오염들을 우리가
                야간에 해결합니다.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-bbk-concrete bg-bbk-cool-white px-6 py-5 flex gap-5 items-start"
                >
                  <p className="font-black text-bbk-pink/30 text-2xl leading-none shrink-0">
                    {v.num}
                  </p>
                  <div>
                    <p className="text-bbk-black font-bold mb-1">{v.title}</p>
                    <p className="text-bbk-stone-6 text-sm leading-relaxed break-keep">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 인증·자격 */}
        <section className="bg-bbk-black py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                CREDENTIALS
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
              믿을 수 있는 이유.
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06]">
              {CREDENTIALS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#111116] px-7 py-8 flex flex-col gap-4"
                >
                  <div className="w-9 h-9 border border-bbk-pink/30 flex items-center justify-center shrink-0">
                    <c.icon className="w-4 h-4 text-bbk-pink" />
                  </div>
                  <p className="text-white font-bold">{c.title}</p>
                  <p className="text-white/40 text-sm leading-relaxed break-keep">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 팀 */}
        <section className="bg-bbk-cool-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
                TEAM
              </span>
              <div className="flex-1 h-px bg-bbk-concrete" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bbk-black font-black leading-tight tracking-[-0.02em] break-keep mb-12 md:mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              사람이 경쟁력입니다.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM.map((t, i) => (
                <motion.div
                  key={t.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="border border-bbk-concrete bg-white p-8 flex flex-col gap-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
                    {t.role}
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-bbk-black font-black text-xl">{t.name}</p>
                    <span className="self-start bg-bbk-pink/10 text-bbk-pink font-mono text-[10px] uppercase tracking-wider px-2.5 py-1">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-bbk-stone-6 text-sm leading-relaxed break-keep">
                    {t.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 회사 정보 */}
        <section className="bg-bbk-concrete py-16 md:py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-10">
              COMPANY INFO
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "법인명", value: "범빌드코리아" },
                { label: "대표이사", value: "조동환" },
                { label: "사업자등록번호", value: "298-78-00455" },
                { label: "대표전화", value: "031-759-4877" },
                { label: "이메일", value: "sunrise@bbkorea.co.kr" },
                { label: "주소", value: "성남시 둔촌대로268번길 22 201호" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-start border-b border-bbk-stone-4/30 pb-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-bbk-stone-6 shrink-0 w-28 pt-0.5">
                    {label}
                  </p>
                  <p className="text-bbk-black font-medium text-sm break-keep">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 하단 CTA */}
        <section className="bg-bbk-pink py-14 md:py-16">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-white font-black text-xl md:text-2xl break-keep">
              지금 상담 신청하세요.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-bbk-pink px-8 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-white/90 active:scale-[0.98] transition-all shrink-0"
            >
              상담 신청하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
