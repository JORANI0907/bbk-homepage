"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { REGIONS, POPULAR_REGIONS } from "@/lib/regions";

type Props = {
  /** 초기 선택 상태: "서울 강남구" 형태 */
  value?: string;
  /** 세부 지역까지 클릭하면 호출 */
  onSelect: (fullRegion: string) => void;
  /** 컨테이너 높이(px). 채팅 300, 모달 420 등 */
  height?: number;
};

/**
 * 좌측 광역 · 우측 세부 시·군·구 2단 지역 선택.
 * 채팅 인콰이어리와 히어로 지역 모달에서 공유.
 */
export function RegionPicker({ value, onSelect, height = 300 }: Props) {
  // value 파싱: "서울 강남구" → activeCity: "서울"
  const initialCity = useMemo(() => {
    if (value) {
      const first = value.split(" ")[0];
      if (REGIONS.some((r) => r.name === first)) return first;
    }
    return POPULAR_REGIONS[0] ?? REGIONS[0].name;
  }, [value]);

  const [activeCity, setActiveCity] = useState(initialCity);

  // value가 외부에서 바뀌면 activeCity도 동기화
  useEffect(() => {
    setActiveCity(initialCity);
  }, [initialCity]);

  const activeRegion = useMemo(
    () => REGIONS.find((r) => r.name === activeCity) ?? REGIONS[0],
    [activeCity],
  );

  const currentSub = value?.split(" ").slice(1).join(" ") ?? null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[11px] text-ink-400 font-semibold">
        <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
        <span>좌측에서 광역 선택 → 우측에서 세부 지역 클릭</span>
      </div>
      <div
        className="grid grid-cols-[110px_1fr] rounded-2xl border border-ink-100 overflow-hidden"
        style={{ height }}
      >
        {/* 좌 · 광역 리스트 */}
        <div className="bg-ink-50 overflow-y-auto border-r border-ink-100">
          {REGIONS.map((r) => {
            const active = r.name === activeCity;
            return (
              <button
                key={r.name}
                onClick={() => setActiveCity(r.name)}
                className={`w-full text-left px-4 py-3 text-sm font-medium border-l-2 transition-colors ${
                  active
                    ? "bg-white border-l-brand-500 text-ink-900 font-bold"
                    : "border-l-transparent text-ink-600 hover:bg-white/50 hover:text-ink-900"
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>
        {/* 우 · 세부 리스트 */}
        <div className="bg-white overflow-y-auto">
          {activeRegion.subs.map((sub) => {
            const isCurrent =
              activeRegion.name === value?.split(" ")[0] && sub === currentSub;
            return (
              <button
                key={sub}
                onClick={() => onSelect(`${activeRegion.name} ${sub}`)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between gap-2 border-b border-ink-100 last:border-b-0 ${
                  isCurrent
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-ink-900 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <span className="truncate">
                  {activeRegion.name} · {sub}
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 text-ink-300 shrink-0"
                  strokeWidth={2}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
