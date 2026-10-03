"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Bridge } from "./Bridge";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";
import { useSectionEdit } from "@/components/admin/SectionEditContext";
import { useHomepageContent } from "@/components/admin/HomepageContentProvider";

const FAQS = [
  {
    q: "가격은 어떻게 되나요?",
    a: "공간 크기·품목·시공 방식에 따라 다릅니다. 방문 후 견적서를 드리고, 이후엔 추가 비용이 없도록 원칙을 지키고 있어요.",
  },
  {
    q: "밤에도 정말 시공 오시나요?",
    a: "네. BBK는 야간 시공을 전문으로 합니다. 대부분 21시~08시 사이, 24시간 매장은 새벽 시간대에 맞춰 팀을 배치해요.",
  },
  {
    q: "믿을 수 있는 업체인가요?",
    a: "건축물위생관리업 정식 등록 업체이며, 누적 1,200개 이상 매장에서 시공했어요. 시공 전후 사진과 리포트를 앱으로 전달드립니다.",
  },
  {
    q: "정기 계약, 언제든 해지되나요?",
    a: "네. 위약금·최소 계약 기간 없이 원하실 때 해지 가능합니다. 1개월 이용해보시고 결정하셔도 돼요.",
  },
  {
    q: "우리 매장 업종이 목록에 없어요.",
    a: "6개 산업군 50+ 업종 시공 경험이 있고, 특수 공간도 무료 방문 상담으로 확인해 드려요. 대부분 가능합니다.",
  },
  {
    q: "상담만 하고 결정 안 해도 되나요?",
    a: "전혀 부담 없으셔도 돼요. 상담 후 원치 않으시면 계약을 권유하지 않습니다.",
  },
];

const MAX_FAQS = 20;

export default function FaqV4() {
  return (
    <EditableSection className="bg-white py-24 md:py-36">
      <FaqInner />
    </EditableSection>
  );
}

function FaqInner() {
  const { editing } = useSectionEdit();
  const { get, update } = useHomepageContent();
  const [open, setOpen] = useState<number | null>(0);
  const [savingCount, setSavingCount] = useState(false);
  const [countError, setCountError] = useState<string | null>(null);

  const storedCount = get("faq.count");
  const rawCount = storedCount?.text ? parseInt(String(storedCount.text), 10) : NaN;
  const count = Number.isFinite(rawCount)
    ? Math.max(1, Math.min(MAX_FAQS, rawCount))
    : FAQS.length;

  async function saveCount(next: number) {
    setSavingCount(true);
    setCountError(null);
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "faq.count",
          value: { text: String(next) },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update("faq.count", { text: String(next) });
    } catch (err) {
      setCountError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSavingCount(false);
    }
  }

  async function addFaq() {
    if (count >= MAX_FAQS) return;
    const nextIdx = count;
    await saveCount(count + 1);
    setOpen(nextIdx);
  }

  async function removeFaq() {
    if (count <= 1) return;
    await saveCount(count - 1);
    if (open !== null && open >= count - 1) setOpen(null);
  }

  const items = Array.from({ length: count }, (_, i) => ({
    q: FAQS[i]?.q ?? "새로운 질문을 입력해주세요.",
    a: FAQS[i]?.a ?? "답변을 입력해주세요.",
  }));

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* 좌 · Bridge + 이미지 */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <Bridge
          contentKeyPrefix="faq"
          step="11 · 자주 묻는 질문"
          bridge="궁금하신 점, 미리 정리해드릴게요."
          titleMain="여기까지 오시면서"
          titleAccent="궁금한 게 있으시죠?"
        />
        <div className="hidden md:block relative aspect-[5/6] rounded-3xl overflow-hidden bg-brand-50 border border-brand-100">
          <EditableImage
            contentKey="faq.image"
            placeholder={
              <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-500/60 gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold">
                  Talk to us
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em]">
                  권장 1000 × 1200px · JPG
                </span>
              </div>
            }
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            wrapperClassName="absolute inset-0"
            maxResizeWidth={1000}
            maxResizeQuality={0.88}
          />
        </div>
      </div>

      {/* 우 · FAQ 아코디언 */}
      <div className="lg:col-span-7 flex flex-col">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="border-t border-ink-100 last:border-b last:border-b-ink-100"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(isOpen ? null : i);
                  }
                }}
                className="w-full text-left py-5 md:py-6 flex items-center justify-between gap-4 group cursor-pointer"
              >
                <EditableText
                  contentKey={`faq.item.${i}.q`}
                  defaultText={f.q}
                  className="text-base md:text-lg font-semibold text-ink-900 break-keep group-hover:text-brand-700 transition-colors"
                />
                <span className="shrink-0 w-8 h-8 rounded-full border border-ink-200 flex items-center justify-center text-ink-600 group-hover:border-ink-900 group-hover:text-ink-900 transition-colors">
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5" strokeWidth={1.75} />
                  ) : (
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                  )}
                </span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <EditableText
                      as="p"
                      contentKey={`faq.item.${i}.a`}
                      defaultText={f.a}
                      multiline
                      className="text-[14px] md:text-[15px] text-ink-600 leading-[1.7] pb-6 md:pb-8 max-w-[560px] break-keep"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {editing && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={addFaq}
              disabled={savingCount || count >= MAX_FAQS}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/40 bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              질문 추가
            </button>
            <button
              type="button"
              onClick={removeFaq}
              disabled={savingCount || count <= 1}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-200 bg-white text-ink-600 text-sm font-semibold hover:bg-ink-50 disabled:opacity-50 transition-colors"
            >
              <Minus className="w-4 h-4" strokeWidth={2} />
              마지막 질문 삭제
            </button>
            <span className="text-xs text-ink-400 ml-1">
              현재 {count}개 · 최대 {MAX_FAQS}개
            </span>
            {countError && (
              <span className="text-xs text-red-600 font-medium">
                {countError}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
