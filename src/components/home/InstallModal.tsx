"use client";

import { useState } from "react";
import { X, Smartphone, Monitor } from "lucide-react";

const PLATFORMS = [
  {
    id: "ios" as const,
    label: "iPhone / iPad",
    Icon: Smartphone,
    steps: [
      "Safari 브라우저로 app.bbkorea.co.kr 접속",
      "화면 하단 공유 버튼 (□↑) 탭",
      '"홈 화면에 추가" 선택',
      '"추가" 버튼 탭 → 설치 완료',
    ],
    note: "Safari 브라우저에서만 설치 가능합니다.",
  },
  {
    id: "android" as const,
    label: "Android",
    Icon: Smartphone,
    steps: [
      "Chrome 브라우저로 app.bbkorea.co.kr 접속",
      "주소창 오른쪽 설치 아이콘(⊕) 탭",
      '또는 우측 상단 ⋮ 메뉴 → "앱 설치" 선택',
      '"설치" 버튼 탭 → 설치 완료',
    ],
    note: "Chrome에서 접속 시 설치 팝업이 자동으로 뜨기도 합니다.",
  },
  {
    id: "pc" as const,
    label: "PC",
    Icon: Monitor,
    steps: [
      "Chrome 브라우저로 app.bbkorea.co.kr 접속",
      "주소창 오른쪽 설치 아이콘(⊕) 클릭",
      '"BBK 공간케어 설치" 클릭',
      "설치 완료 — 바탕화면에서 실행 가능",
    ],
    note: '설치 아이콘이 없으면 ⋮ 메뉴 → "앱 설치"를 클릭하세요.',
  },
];

type PlatformId = (typeof PLATFORMS)[number]["id"];

export function InstallModal({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<PlatformId>("ios");
  const platform = PLATFORMS.find((p) => p.id === active)!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#0d0d12] border border-white/10 text-white rounded-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-bbk-pink mb-1">
              APP INSTALL
            </p>
            <p className="font-bold text-base">BBK 공간케어 앱 설치하기</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-white/[0.08]">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`flex-1 py-3 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                active === p.id
                  ? "text-bbk-pink border-b-2 border-bbk-pink"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* 단계별 안내 */}
        <div className="px-6 py-6">
          <ol className="space-y-4">
            {platform.steps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bbk-pink/15 text-bbk-pink font-mono text-[11px] flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-white/75 text-sm leading-relaxed break-keep pt-0.5">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-white/30 font-mono text-[10px] leading-relaxed border-t border-white/[0.06] pt-4">
            * {platform.note}
          </p>
        </div>

        {/* 앱 바로가기 */}
        <div className="px-6 pb-6">
          <a
            href="https://app.bbkorea.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-4 bg-bbk-pink text-white font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all"
          >
            app.bbkorea.co.kr 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}
