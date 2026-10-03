"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RegionPicker } from "./RegionPicker";

type Props = {
  open: boolean;
  value?: string;
  onClose: () => void;
  onSelect: (region: string) => void;
};

export function RegionPickerModal({ open, value, onClose, onSelect }: Props) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 스크롤 락
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-xl bg-white rounded-3xl shadow-[0_30px_80px_-20px_rgba(10,15,26,0.4)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
              <div>
                <h2 className="text-lg font-bold text-ink-900">
                  매장 지역 선택
                </h2>
                <p className="text-xs text-ink-400 mt-0.5">
                  전국 어디든 선택 가능해요
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="w-9 h-9 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-600 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </header>
            <div className="p-5 md:p-6">
              <RegionPicker
                value={value}
                onSelect={(region) => {
                  onSelect(region);
                  onClose();
                }}
                height={420}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
