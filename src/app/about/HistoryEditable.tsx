"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import EditableText from "@/components/admin/EditableText";
import { useSectionEdit } from "@/components/admin/SectionEditContext";
import { useHomepageContent } from "@/components/admin/HomepageContentProvider";

type EventDefault = { month: string; text: string };
type YearDefault = { year: string; events: EventDefault[] };

const DEFAULT_HISTORY: YearDefault[] = [
  {
    year: "2026",
    events: [
      { month: "—", text: "범빌드코리아 주식회사 설립 (법인)" },
      { month: "03월", text: "구독서비스 월 500건 이상 이용자수 증가" },
      { month: "06월", text: "BBK 공간케어 풀 패키지 서비스 출시" },
    ],
  },
  {
    year: "2025",
    events: [
      { month: "—", text: "범빌드코리아 아카데미 설립" },
      { month: "04월", text: "BBK 앱 출시 (고객·직원·본사·고객본사 일원화된 채널 소통)" },
    ],
  },
  {
    year: "2024",
    events: [
      { month: "—", text: "범빌드코리아 설립" },
      { month: "06월", text: "개인사업자 등록" },
      { month: "08월", text: "딥케어·엔드케어 청소 구독서비스 출시 (3개월 만에 월 100건 이상 케어)" },
      { month: "10월", text: "향기케어·정리수납·특수케어 서비스 출시" },
      { month: "12월", text: "위생등급(식품안심업소) 컨설팅 서비스 출시" },
    ],
  },
  {
    year: "2023",
    events: [
      { month: "—", text: "위생관리 표준 기획 및 연구" },
    ],
  },
];

const MAX_YEARS = 40;
const MAX_EVENTS_PER_YEAR = 24;

export default function HistoryEditable() {
  const { editing } = useSectionEdit();
  const { get, update } = useHomepageContent();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storedYearCount = get("about.history.years.count");
  const rawYearCount = storedYearCount?.text
    ? parseInt(String(storedYearCount.text), 10)
    : NaN;
  const yearCount = Number.isFinite(rawYearCount)
    ? Math.max(1, Math.min(MAX_YEARS, rawYearCount))
    : DEFAULT_HISTORY.length;

  async function saveKey(key: string, value: string) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          value: { text: value },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update(key, { text: value });
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  async function addYear() {
    if (yearCount >= MAX_YEARS) return;
    await saveKey("about.history.years.count", String(yearCount + 1));
  }

  async function removeLastYear() {
    if (yearCount <= 1) return;
    await saveKey("about.history.years.count", String(yearCount - 1));
  }

  const years = Array.from({ length: yearCount }, (_, y) => y);

  return (
    <div className="lg:col-span-8 flex flex-col">
      {years.map((y) => (
        <YearBlock key={y} yearIndex={y} />
      ))}

      {editing && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={addYear}
            disabled={saving || yearCount >= MAX_YEARS}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/40 bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            연도 추가
          </button>
          <button
            type="button"
            onClick={removeLastYear}
            disabled={saving || yearCount <= 1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-200 bg-white text-ink-600 text-sm font-semibold hover:bg-ink-50 disabled:opacity-50 transition-colors"
          >
            <Minus className="w-4 h-4" strokeWidth={2} />
            마지막 연도 삭제
          </button>
          <span className="text-xs text-ink-400 ml-1">
            현재 {yearCount}개 연도 · 최대 {MAX_YEARS}개
          </span>
          {error && (
            <span className="text-xs text-red-600 font-medium">{error}</span>
          )}
        </div>
      )}
    </div>
  );
}

function YearBlock({ yearIndex }: { yearIndex: number }) {
  const { editing } = useSectionEdit();
  const { get, update } = useHomepageContent();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultYear = DEFAULT_HISTORY[yearIndex];
  const yearDefault = defaultYear?.year ?? "YYYY";
  const eventsDefault = defaultYear?.events ?? [];

  const storedEventCount = get(`about.history.years.${yearIndex}.events.count`);
  const rawEventCount = storedEventCount?.text
    ? parseInt(String(storedEventCount.text), 10)
    : NaN;
  const eventCount = Number.isFinite(rawEventCount)
    ? Math.max(1, Math.min(MAX_EVENTS_PER_YEAR, rawEventCount))
    : Math.max(1, eventsDefault.length);

  async function saveKey(key: string, value: string) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          value: { text: value },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update(key, { text: value });
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  async function addEvent() {
    if (eventCount >= MAX_EVENTS_PER_YEAR) return;
    await saveKey(
      `about.history.years.${yearIndex}.events.count`,
      String(eventCount + 1),
    );
  }

  async function removeLastEvent() {
    if (eventCount <= 1) return;
    await saveKey(
      `about.history.years.${yearIndex}.events.count`,
      String(eventCount - 1),
    );
  }

  const events = Array.from({ length: eventCount }, (_, e) => ({
    month: eventsDefault[e]?.month ?? "00월",
    text: eventsDefault[e]?.text ?? "새 업적을 입력해주세요.",
  }));

  return (
    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-10 py-8 md:py-10 border-b border-ink-100 last:border-b-0">
      {/* 연도 (큰 글자) */}
      <div className="flex flex-col gap-1">
        <EditableText
          contentKey={`about.history.years.${yearIndex}.year`}
          defaultText={yearDefault}
          className="text-2xl md:text-4xl font-bold text-brand-600 tracking-tight tabular-nums"
        />
      </div>

      {/* 월별 이벤트 리스트 */}
      <div className="flex flex-col gap-4 md:gap-5">
        {events.map((ev, e) => (
          <div
            key={e}
            className="grid grid-cols-[52px_1fr] md:grid-cols-[64px_1fr] gap-3 md:gap-5 items-start"
          >
            <EditableText
              contentKey={`about.history.years.${yearIndex}.events.${e}.month`}
              defaultText={ev.month}
              className="text-[13px] md:text-sm font-bold text-ink-500 tracking-wider pt-0.5 tabular-nums"
            />
            <EditableText
              as="p"
              contentKey={`about.history.years.${yearIndex}.events.${e}.text`}
              defaultText={ev.text}
              multiline
              className="text-[15px] md:text-base text-ink-800 leading-[1.65] break-keep"
            />
          </div>
        ))}

        {editing && (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <button
              type="button"
              onClick={addEvent}
              disabled={saving || eventCount >= MAX_EVENTS_PER_YEAR}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-50 text-brand-700 text-[12px] font-semibold hover:bg-brand-100 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              월별 업적 추가
            </button>
            <button
              type="button"
              onClick={removeLastEvent}
              disabled={saving || eventCount <= 1}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-200 bg-white text-ink-500 text-[12px] font-semibold hover:bg-ink-50 disabled:opacity-50 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={2} />
              마지막 업적 삭제
            </button>
            <span className="text-[11px] text-ink-400 ml-0.5">
              {eventCount}개 · 최대 {MAX_EVENTS_PER_YEAR}
            </span>
            {error && (
              <span className="text-[11px] text-red-600 font-medium">
                {error}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
