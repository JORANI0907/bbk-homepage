"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { ChatInquiry } from "./ChatInquiry";

/**
 * 전 페이지 우측 하단 플로팅 액션 2개:
 *  1) 1분 견적 (채팅형 모달)
 *  2) 앱 열기 (외부 링크)
 * - 둘 다 bob 애니메이션으로 생동감
 * - 각 버튼 좌측에 말풍선 (데스크톱 상시, 모바일 숨김)
 * - 모바일 하단 MobileStickyCta와 겹치지 않도록 bottom offset 조정
 */
export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);

  // 모달 열릴 때 바디 스크롤 잠금
  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [chatOpen]);

  return (
    <>
      <div className="fixed right-3 md:right-6 bottom-24 md:bottom-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* 앱 열기 */}
        <FloatRow
          bubble="앱으로 더 편하게"
          delay={0}
        >
          <motion.a
            href={SITE.app.href}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="BBK 앱 열기"
            className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-[0_12px_30px_-8px_rgba(44,167,241,0.5)] overflow-hidden border-2 border-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/app-logo.png"
              alt="BBK 앱"
              className="w-full h-full object-cover scale-110"
            />
          </motion.a>
        </FloatRow>

        {/* 1분 견적 */}
        <FloatRow
          bubble="1분 견적 받아보세요"
          delay={0.4}
          highlight
        >
          <motion.button
            type="button"
            onClick={() => setChatOpen(true)}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="빠른 견적 요청"
            className="pointer-events-auto relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-ink-900 flex items-center justify-center shadow-[0_12px_30px_-8px_rgba(251,191,36,0.6)] border-2 border-white"
          >
            {/* 외부 pulse ring · CTA 유도 */}
            <span
              className="absolute inset-0 rounded-full bg-amber-400 opacity-50 animate-ping"
              aria-hidden="true"
            />

            {/* 메인 아이콘 */}
            <MessageCircle
              className="relative w-5 h-5 md:w-6 md:h-6"
              strokeWidth={2}
            />

            {/* 코너 AI 뱃지 */}
            <span className="absolute -top-1 -right-1 h-5 md:h-[22px] px-1.5 rounded-full bg-ink-900 border-2 border-white flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
              <span className="text-[8px] md:text-[9px] font-black text-white tracking-wider leading-none">
                AI
              </span>
            </span>
          </motion.button>
        </FloatRow>
      </div>

      <AnimatePresence>
        {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function FloatRow({
  children,
  bubble,
  delay,
  highlight,
}: {
  children: React.ReactNode;
  bubble: string;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* 말풍선 · 데스크톱만 노출 */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 + delay, duration: 0.35 }}
        className="hidden md:block pointer-events-none"
      >
        <div
          className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-[0_8px_20px_-6px_rgba(10,15,26,0.2)] whitespace-nowrap ${
            highlight
              ? "bg-amber-400 text-ink-900"
              : "bg-white text-ink-900 border border-ink-100"
          }`}
        >
          {bubble}
          {/* 꼬리 */}
          <span
            className={`absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 ${
              highlight
                ? "bg-amber-400"
                : "bg-white border-r border-b border-ink-100"
            }`}
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {children}
    </div>
  );
}

/** 채팅형 견적창 모달 */
function ChatModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6"
    >
      {/* 백드롭 */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 본체 */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden max-h-[92vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100 bg-white">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-600 font-bold">
              1분 견적
            </p>
            <h2 className="text-base md:text-lg font-bold text-ink-900 mt-0.5">
              채팅으로 간편하게 상담받기
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ChatInquiry />
        </div>
      </motion.div>
    </motion.div>
  );
}
