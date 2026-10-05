"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Camera,
  Bell,
  FileBarChart,
  History,
  Shield,
  ArrowRight,
  ArrowUpRight,
  Home,
  Store,
  Settings,
  CheckCircle2,
  Circle,
  TrendingUp,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { Bridge } from "./Bridge";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";
import { useSectionEdit } from "@/components/admin/SectionEditContext";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: Calendar,
    title: "다음 시공 일정 · 도착 알림",
    desc: "언제 오는지, 몇 분 뒤 도착인지 앱에서 바로",
  },
  {
    icon: Camera,
    title: "시공 사진 · 월간 리포트",
    desc: "결과 사진부터 위생 등급 리포트까지 자동 정리",
  },
  {
    icon: Shield,
    title: "위생 이력 · 다점포 통합",
    desc: "여러 지점 · 6개월 이력을 한 화면에서",
  },
];

const CYCLE_MS = 4200;

export default function AppSectionV4() {
  return (
    <EditableSection className="relative bg-ink-900 overflow-hidden">
      <AppSectionInner />
    </EditableSection>
  );
}

function AppSectionInner() {
  const { editing } = useSectionEdit();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (editing) {
      setActiveIdx(1);
      return;
    }
    setActiveIdx(0);
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % FEATURES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [editing]);

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 85% 30%, rgba(44,167,241,0.25), transparent 55%), radial-gradient(ellipse 45% 45% at 10% 70%, rgba(44,167,241,0.12), transparent 55%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-24 lg:py-36">
        {/* ──────────── 모바일 전용 레이아웃 (설명 → 폰 중앙 → 하단 pill 탭 → CTA) ──────────── */}
        <div className="lg:hidden flex flex-col gap-6 md:gap-8">
          <Bridge
            contentKeyPrefix="app"
            tone="dark"
            step="07 · 시공 후에도 이어지는 관리"
            bridge="차이의 마지막 조각. 저희는 시공만 하고 끝내지 않아요."
            titleMain="시공 이후에도,"
            titleAccent="앱으로 계속 지켜드립니다."
            subtitle="정기 계약을 하시면 BBK 전용 앱을 무료로 드려요. 사장님이 매장에 없어도 실시간으로 확인하실 수 있어요."
          />

          {/* 폰 목업 중앙에 배치 · 모바일 전용 크기 */}
          <div className="flex justify-center">
            <PhoneMockup activeIdx={activeIdx} compact />
          </div>

          {/* 하단 pill 탭 · 3개 기능 가로 (활성화된 것만 progress 표시) */}
          <MobilePillTabs
            features={FEATURES}
            activeIdx={activeIdx}
            onSelect={setActiveIdx}
          />

          {/* Badge + 다운로드 버튼 */}
          <div className="flex flex-col gap-3 items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <EditableText
                contentKey="app.badge"
                defaultText="정기 계약 시 무료 제공"
              />
            </span>
            <a
              href={SITE.app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98] shadow-[0_16px_40px_-15px_rgba(44,167,241,0.6)]"
            >
              <Smartphone className="w-4 h-4" strokeWidth={1.75} />
              {SITE.app.label}
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <EditableText
              contentKey="app.note"
              defaultText="iOS · Android 모두 지원, 앱 없이 웹으로도 확인 가능해요."
              multiline
              className="text-[11px] text-white/50 leading-[1.5] break-keep text-center"
            />
          </div>
        </div>

        {/* ──────────── 데스크톱 전용 레이아웃 (기존 좌우 분할 유지) ──────────── */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
          <div className="col-span-6 flex flex-col gap-12">
            <Bridge
              contentKeyPrefix="app"
              tone="dark"
              step="07 · 시공 후에도 이어지는 관리"
              bridge="차이의 마지막 조각. 저희는 시공만 하고 끝내지 않아요."
              titleMain="시공 이후에도,"
              titleAccent="앱으로 계속 지켜드립니다."
              subtitle="정기 계약을 하시면 BBK 전용 앱을 무료로 드려요. 언제 오는지, 어떻게 되고 있는지, 앞으로 어떻게 관리되는지 사장님이 매장에 없어도 실시간으로 확인하실 수 있어요."
            />

            <div className="flex flex-col gap-3">
              {FEATURES.map((f, i) => (
                <FeatureCard
                  key={i}
                  feature={f}
                  isActive={activeIdx === i}
                  onClick={() => setActiveIdx(i)}
                  contentKey={`app.feature.${i}`}
                />
              ))}
            </div>

            <div className="flex flex-row gap-3 items-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <EditableText
                  contentKey="app.badge"
                  defaultText="정기 계약 시 무료 제공"
                />
              </span>
              <EditableText
                contentKey="app.note"
                defaultText="iOS · Android 모두 지원, 앱 없이 웹으로도 확인 가능해요."
                multiline
                className="text-[13px] text-white/50 leading-[1.6] max-w-xs break-keep"
              />
            </div>

            <a
              href={SITE.app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-brand-500 text-white text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98] shadow-[0_16px_40px_-15px_rgba(44,167,241,0.6)] self-start"
            >
              <Smartphone className="w-4 h-4" strokeWidth={1.75} />
              {SITE.app.label}
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="col-span-6 flex justify-end">
            <PhoneMockup activeIdx={activeIdx} />
          </div>
        </div>
      </div>
    </>
  );
}

function FeatureCard({
  feature,
  isActive,
  onClick,
  contentKey,
}: {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
  contentKey: string;
}) {
  const Icon = feature.icon;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`text-left rounded-xl md:rounded-2xl p-3.5 md:p-5 border transition-all duration-300 flex items-start gap-3 md:gap-4 cursor-pointer ${
        isActive
          ? "bg-brand-500/10 border-brand-400/50 shadow-[0_16px_40px_-25px_rgba(44,167,241,0.4)]"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
      }`}
    >
      <span
        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isActive
            ? "bg-brand-500 text-white"
            : "bg-brand-500/20 border border-brand-400/30 text-brand-400"
        }`}
      >
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-0.5 md:gap-1 flex-1 min-w-0">
        <EditableText
          as="p"
          contentKey={`${contentKey}.title`}
          defaultText={feature.title}
          className={`text-xs md:text-sm font-semibold transition-colors break-keep ${
            isActive ? "text-white" : "text-white/80"
          }`}
        />
        <EditableText
          as="p"
          contentKey={`${contentKey}.desc`}
          defaultText={feature.desc}
          multiline
          className="text-[11px] md:text-[13px] text-white/60 leading-[1.45] md:leading-[1.55] break-keep"
        />
        {isActive && (
          <div className="mt-2 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              key={`prog-${feature.title}`}
              className="h-full bg-brand-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 모바일 전용 가로 pill 탭 · 폰 하단에 배치.
 * 3개 FeatureCard의 세로 설명을 압축해서 아이콘+제목만 노출,
 * 활성 pill 아래에 progress bar가 자동 순환 시간을 시각화.
 */
function MobilePillTabs({
  features,
  activeIdx,
  onSelect,
}: {
  features: Feature[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {features.map((f, i) => {
          const Icon = f.icon;
          const isActive = activeIdx === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 h-11 px-2 rounded-full border text-[11px] font-semibold transition-colors ${
                isActive
                  ? "bg-brand-500 text-white border-brand-500"
                  : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08]"
              }`}
            >
              <Icon
                className="w-3.5 h-3.5 shrink-0"
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="truncate">
                {/* 제목에서 첫 줄만 (· 기준 분리된 첫 어구) */}
                {f.title.split("·")[0].trim()}
              </span>
            </button>
          );
        })}
      </div>
      {/* 활성 pill 하단 progress bar · 자동 순환 시간을 시각화 */}
      <div className="flex gap-2 px-1">
        {features.map((f, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
            {activeIdx === i && (
              <motion.div
                key={`mobile-prog-${f.title}-${activeIdx}`}
                className="h-full bg-brand-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMockup({ activeIdx, compact = false }: { activeIdx: number; compact?: boolean }) {
  return (
    <div className={`relative w-full ${compact ? "max-w-[220px] sm:max-w-[260px]" : "max-w-[300px] md:max-w-[340px] lg:max-w-[380px]"}`}>
      <div className="relative aspect-[9/17] rounded-[44px] bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-3 shadow-[0_40px_100px_-30px_rgba(44,167,241,0.4)]">
        <div className="w-full h-full rounded-[34px] bg-white overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0 border-b border-ink-100">
            <div className="flex items-center gap-2">
              <Image
                src="/app-logo.png"
                alt="BBK 앱"
                width={26}
                height={26}
                className="rounded-lg"
              />
              <span className="text-sm font-bold text-ink-900">BBK</span>
            </div>
            <span className="text-[10px] text-ink-400 uppercase tracking-wider">
              성남시 A매장
            </span>
          </div>

          {/* Content · 순환 화면 */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 overflow-y-auto"
              >
                {activeIdx === 0 && <ScreenSchedule />}
                {activeIdx === 1 && <ScreenPhotos />}
                {activeIdx === 2 && <ScreenStores />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Tab Bar */}
          <BottomTabBar activeIdx={activeIdx} />
        </div>
      </div>

      <SideNotification activeIdx={activeIdx} />
    </div>
  );
}

function ScreenSchedule() {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-4">
      {/* 인사 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-ink-500">안녕하세요, 사장님</p>
          <p className="text-[15px] font-bold text-ink-900 leading-tight">
            오늘 일정
          </p>
        </div>
        <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-bold flex items-center justify-center">
          A
        </span>
      </div>

      {/* 다음 시공 카드 */}
      <div className="rounded-2xl bg-brand-500 text-white p-4 flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/70 font-semibold">
          다음 시공
        </p>
        <p className="text-xl font-bold leading-tight">오늘 밤 22:30</p>
        <p className="text-[10px] text-white/75">
          후드 · 튀김기 · 냉장고 상단
        </p>
      </div>

      {/* 캘린더 미니 */}
      <div className="rounded-2xl bg-ink-50 p-3">
        <p className="text-[9px] uppercase tracking-[0.14em] text-ink-400 font-semibold mb-2">
          이번 주
        </p>
        <div className="grid grid-cols-7 gap-1">
          {[
            { d: "월", n: 15 },
            { d: "화", n: 16 },
            { d: "수", n: 17 },
            { d: "목", n: 18, active: true },
            { d: "금", n: 19 },
            { d: "토", n: 20 },
            { d: "일", n: 21 },
          ].map((day) => (
            <div
              key={day.d}
              className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg ${
                day.active ? "bg-brand-500 text-white" : "text-ink-500"
              }`}
            >
              <span className="text-[9px] font-medium">{day.d}</span>
              <span className="text-[10px] font-bold">{day.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 오늘 할 일 */}
      <div className="rounded-2xl bg-ink-50 p-3">
        <p className="text-[9px] uppercase tracking-[0.14em] text-ink-400 font-semibold mb-2">
          오늘 할 일
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="w-3.5 h-3.5 text-emerald-500 shrink-0"
              strokeWidth={2}
            />
            <span className="text-[11px] text-ink-700 line-through">
              후드 필터 사전 청소 요청 전달
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Circle
              className="w-3.5 h-3.5 text-ink-300 shrink-0"
              strokeWidth={2}
            />
            <span className="text-[11px] text-ink-700">
              주방 정리 (22:00 까지)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Circle
              className="w-3.5 h-3.5 text-ink-300 shrink-0"
              strokeWidth={2}
            />
            <span className="text-[11px] text-ink-700">시공팀 응대 담당자 지정</span>
          </div>
        </div>
      </div>

      {/* 알림 · 탭 리플 */}
      <div className="relative rounded-2xl bg-brand-50 border border-brand-100 p-3 flex items-center gap-2">
        <Bell
          className="w-3.5 h-3.5 text-brand-600 shrink-0"
          strokeWidth={1.75}
        />
        <p className="text-[11px] text-brand-700 font-medium">
          팀이 매장 3분 뒤 도착 예정
        </p>
        <TapRipple />
      </div>
    </div>
  );
}

function ScreenPhotos() {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-ink-500">08-14 · 김재현 팀장</p>
          <p className="text-[15px] font-bold text-ink-900 leading-tight">
            지난 시공 결과
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
          <CheckCircle2 className="w-2.5 h-2.5" strokeWidth={2.5} />
          완료
        </div>
      </div>

      {/* 사진 갤러리 6장 */}
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200"
          >
            <EditableImage
              contentKey={`app.phone.photos.${i}`}
              placeholder={
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera
                    className="w-4 h-4 text-brand-600/50"
                    strokeWidth={1.5}
                  />
                </div>
              }
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              wrapperClassName="absolute inset-0"
              maxResizeWidth={400}
              maxResizeQuality={0.85}
            />
          </div>
        ))}
      </div>
      <p className="text-[10px] text-ink-400 text-center -mt-1">
        총 12장 · 탭하면 전체 갤러리
      </p>

      {/* KPI 3개 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-ink-50 p-2.5 flex flex-col items-center gap-0.5">
          <p className="text-base font-bold text-ink-900 leading-tight tabular-nums">
            12
          </p>
          <p className="text-[10px] text-ink-400 leading-tight">사진</p>
        </div>
        <div className="rounded-xl bg-ink-50 p-2.5 flex flex-col items-center gap-0.5">
          <p className="text-base font-bold text-ink-900 leading-tight">
            3시간
          </p>
          <p className="text-[10px] text-ink-400 leading-tight">시공 시간</p>
        </div>
        <div className="rounded-xl bg-ink-50 p-2.5 flex flex-col items-center gap-0.5">
          <p className="text-base font-bold text-ink-900 leading-tight tabular-nums">
            4회
          </p>
          <p className="text-[10px] text-ink-400 leading-tight">이번 달</p>
        </div>
      </div>

      {/* 리포트 · 탭 리플 */}
      <div className="relative rounded-2xl bg-ink-50 p-3 flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shrink-0">
          <FileBarChart className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-ink-900">
            8월 관리 리포트
          </p>
          <p className="text-[10px] text-ink-400">
            위생 등급 A · 시공 4회 완료
          </p>
        </div>
        <ArrowRight
          className="w-3.5 h-3.5 text-ink-400"
          strokeWidth={2}
        />
        <TapRipple />
      </div>
    </div>
  );
}

function ScreenStores() {
  const stores = [
    { name: "성남시 A매장", initial: "A", grade: "A", visits: "4회" },
    { name: "서울 B매장", initial: "B", grade: "A+", visits: "6회" },
    { name: "수원 C매장", initial: "C", grade: "A", visits: "3회" },
  ];
  return (
    <div className="flex flex-col gap-2.5 px-4 py-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-ink-500">통합 관리</p>
          <p className="text-[15px] font-bold text-ink-900 leading-tight">
            내 매장 3곳
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold">
          <TrendingUp className="w-2.5 h-2.5" strokeWidth={2.5} />
          +13회
        </div>
      </div>

      {/* 지점 리스트 */}
      {stores.map((s) => (
        <div
          key={s.name}
          className="rounded-2xl bg-ink-50 p-3 flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-600 text-[11px] font-bold shrink-0">
            {s.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-ink-900 leading-tight">
              {s.name}
            </p>
            <p className="text-[10px] text-ink-400">이번 달 {s.visits}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0">
            위생 {s.grade}
          </span>
        </div>
      ))}

      {/* 최근 이력 · 미니 타임라인 */}
      <div className="rounded-2xl bg-ink-50 p-3">
        <p className="text-[9px] uppercase tracking-[0.14em] text-ink-400 font-semibold mb-2">
          최근 이력
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { d: "08-14", txt: "A매장 · 시공 완료", active: true },
            { d: "08-11", txt: "B매장 · 사진 12장 등록" },
            { d: "08-07", txt: "C매장 · 8월 리포트 발행" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  item.active ? "bg-brand-500" : "bg-ink-300"
                }`}
              />
              <span className="text-[10px] text-ink-500 font-medium tabular-nums">
                {item.d}
              </span>
              <span
                className={`text-[10px] ${
                  item.active ? "text-ink-800 font-medium" : "text-ink-500"
                }`}
              >
                · {item.txt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA · 탭 리플 */}
      <div className="relative rounded-2xl bg-brand-500 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4" strokeWidth={2} />
          <p className="text-[12px] font-semibold">6개월 이력 전체 보기</p>
        </div>
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        <TapRipple tone="light" />
      </div>
    </div>
  );
}

function BottomTabBar({ activeIdx }: { activeIdx: number }) {
  const tabs = [
    { icon: Home, label: "홈", targetIdx: 0 },
    { icon: Camera, label: "사진", targetIdx: 1 },
    { icon: Store, label: "지점", targetIdx: 2 },
    { icon: Settings, label: "설정", targetIdx: -1 },
  ];
  return (
    <div className="shrink-0 border-t border-ink-100 bg-white px-2 pt-2 pb-3 flex items-center justify-around">
      {tabs.map((t, i) => {
        const isActive = t.targetIdx === activeIdx;
        const Icon = t.icon;
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-0.5 py-1 px-3"
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                isActive ? "text-brand-600" : "text-ink-400"
              }`}
              strokeWidth={isActive ? 2 : 1.75}
            />
            <span
              className={`text-[9px] transition-colors ${
                isActive ? "text-brand-600 font-bold" : "text-ink-400 font-medium"
              }`}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TapRipple({ tone = "brand" }: { tone?: "brand" | "light" }) {
  const ring = tone === "light" ? "border-white/80" : "border-brand-500";
  const finger =
    tone === "light"
      ? "bg-white/30 border-white/80"
      : "bg-brand-400/30 border-brand-500";
  return (
    <>
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], scale: [0.6, 1, 1, 0.9] }}
        transition={{
          duration: 1.4,
          times: [0, 0.15, 0.7, 1],
          delay: 1.4,
        }}
        className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full backdrop-blur pointer-events-none border-2 shadow-lg ${finger}`}
      />
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.3, 2.6, 3.2] }}
        transition={{
          duration: 1.1,
          delay: 1.55,
        }}
        className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 pointer-events-none ${ring}`}
      />
    </>
  );
}

function SideNotification({ activeIdx }: { activeIdx: number }) {
  const notes = [
    {
      title: "3분 뒤 도착",
      body: "김재현 팀장이 매장에 도착합니다",
    },
    {
      title: "시공 완료",
      body: "사진 12장 확인해보세요",
    },
    {
      title: "월간 리포트",
      body: "위생 등급 A로 유지 중",
    },
  ];
  const n = notes[activeIdx];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, x: -20, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -14, scale: 0.94 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="hidden md:flex absolute -left-8 top-1/3 bg-white rounded-2xl border border-ink-200 shadow-[0_20px_50px_-15px_rgba(10,15,26,0.25)] px-4 py-3 gap-3 items-center max-w-[240px]"
      >
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
          <Bell className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-[11px] font-semibold text-ink-900">{n.title}</p>
          <p className="text-[10px] text-ink-400 truncate">{n.body}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
