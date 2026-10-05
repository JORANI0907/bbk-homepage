"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** 모달 제목 상단에 들어가는 작은 라벨 (예: "서비스 안내") */
  eyebrow?: string;
  /** 모달 내용. JSX 자유롭게 */
  children: React.ReactNode;
  /** 모달 최대 너비. 기본 max-w-xl */
  maxWidth?: string;
};

/**
 * 재사용 가능한 정보 안내 모달.
 * - ESC 키 / 바깥 클릭 / 닫기 버튼으로 닫힘
 * - body 스크롤 잠금 (모달 열림 중)
 * - framer-motion fade+slide 애니메이션
 */
export default function InfoModal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  maxWidth = "max-w-xl",
}: Props) {
  // ESC 키로 닫기 + body 스크롤 잠금
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          {/* 백드롭 */}
          <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" />

          {/* 모달 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] max-h-[88vh] sm:max-h-[85vh] flex flex-col`}
          >
            {/* 헤더 */}
            <div className="shrink-0 flex items-start justify-between gap-4 px-5 md:px-7 pt-5 md:pt-6 pb-3 md:pb-4 border-b border-ink-100">
              <div className="flex flex-col gap-1 min-w-0">
                {eyebrow && (
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
                    {eyebrow}
                  </span>
                )}
                <h3 className="text-lg md:text-2xl font-bold text-ink-900 leading-tight tracking-tight break-keep">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
              </button>
            </div>

            {/* 콘텐츠 (스크롤 가능) */}
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-5 md:py-6">
              {children}
            </div>

            {/* 하단 CTA */}
            <div className="shrink-0 px-5 md:px-7 py-4 md:py-5 border-t border-ink-100 bg-ink-50/40">
              <button
                type="button"
                onClick={onClose}
                className="w-full h-11 md:h-12 rounded-full bg-ink-900 text-white text-sm md:text-base font-semibold hover:bg-brand-600 transition-colors"
              >
                확인했어요
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
