"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Phone,
  Sparkles,
  Send,
  MapPin,
} from "lucide-react";
import { RegionPicker } from "./RegionPicker";

// ===== 단계 정의 =====

type ChoiceStep = {
  kind: "choice";
  key: string;
  botMessage: string;
  options: readonly string[];
  cols?: 1 | 2 | 3;
};

type RegionStep = {
  kind: "region";
  key: string;
  botMessage: string;
};

type TextStep = {
  kind: "text";
  key: string;
  botMessage: string;
  placeholder: string;
  inputType?: "text" | "tel" | "textarea";
  optional?: boolean;
};

type Step = ChoiceStep | RegionStep | TextStep;

const STEPS: Step[] = [
  {
    kind: "choice",
    key: "service",
    botMessage: "안녕하세요, 사장님! BBK입니다. 어떤 청소가 필요하세요?",
    options: [
      "1회성 청소",
      "정기 청소",
      "식품안심업소 (위생등급)",
      "향기 케어",
      "정리정돈",
      "특수 케어",
      "잘 모르겠어요",
    ],
    cols: 2,
  },
  {
    kind: "choice",
    key: "space",
    botMessage: "매장은 어떤 곳이세요?",
    options: [
      "외식·주점",
      "카페·베이커리",
      "의원·클리닉",
      "사무실·학원",
      "미용·네일",
      "숙박·게하",
      "마트·편의점",
      "기타 공간",
    ],
    cols: 2,
  },
  {
    kind: "region",
    key: "region",
    botMessage: "매장 지역을 알려주세요",
  },
  {
    kind: "choice",
    key: "timing",
    botMessage: "언제쯤 시공이 필요하세요?",
    options: ["이번 주", "이번 달", "다음 달", "상관없음"],
    cols: 2,
  },
  {
    kind: "choice",
    key: "scope",
    botMessage: "어느 정도 규모를 생각하세요?",
    options: ["공간 전체", "부분 청소"],
    cols: 2,
  },
  {
    kind: "text",
    key: "items",
    botMessage:
      "혹시 특별히 신경 쓰이는 곳이 있으세요? 자유롭게 적어주세요. (선택)",
    placeholder: "예) 후드에서 냄새가 나요, 화장실 타일이 누렇게 됐어요",
    inputType: "textarea",
    optional: true,
  },
  {
    kind: "text",
    key: "name",
    botMessage: "이제 거의 다 왔어요! 사장님 성함을 알려주세요",
    placeholder: "홍길동",
    inputType: "text",
  },
  {
    kind: "text",
    key: "phone",
    botMessage: "연락 받으실 번호를 남겨주세요",
    placeholder: "010-1234-5678",
    inputType: "tel",
  },
  {
    kind: "text",
    key: "message",
    botMessage: "마지막! 미리 말씀하고 싶은 내용 있으세요? (선택)",
    placeholder: "예) 이번 주 금요일 오후에 통화 가능해요",
    inputType: "text",
    optional: true,
  },
];

type Bubble =
  | { role: "bot"; text: string }
  | { role: "user"; text: string };

type ChatInquiryProps = {
  initialService?: string;
  initialRegion?: string;
  initialQuery?: string;
};

export function ChatInquiry({
  initialService,
  initialRegion,
  initialQuery,
}: ChatInquiryProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [bubbles, setBubbles] = useState<Bubble[]>([
    { role: "bot", text: STEPS[0].botMessage },
  ]);
  const [textInput, setTextInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const step = STEPS[stepIdx];
  const total = STEPS.length;

  // 히어로에서 넘어온 initialService가 첫 단계 옵션에 있으면 자동으로 선택
  useEffect(() => {
    if (initialService) {
      const first = STEPS[0];
      if (first.kind === "choice" && first.options.includes(initialService)) {
        pickAnswer(initialService);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [bubbles]);

  useEffect(() => {
    if (step?.kind === "text") {
      // items 단계에 initialQuery 프리필
      if (step.key === "items" && initialQuery && !textInput) {
        setTextInput(initialQuery);
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, step?.kind]);

  function advanceTo(nextIdx: number, answerText: string, answerKey: string) {
    const newAnswers = { ...answers, [answerKey]: answerText };
    setAnswers(newAnswers);

    const nextBubbles: Bubble[] = [
      ...bubbles,
      { role: "user", text: answerText },
    ];

    if (nextIdx < STEPS.length) {
      nextBubbles.push({ role: "bot", text: STEPS[nextIdx].botMessage });
      setBubbles(nextBubbles);
      setStepIdx(nextIdx);
      setTextInput("");
      setError(null);
    } else {
      setBubbles(nextBubbles);
      submitAll(newAnswers);
    }
  }

  function pickAnswer(text: string) {
    advanceTo(stepIdx + 1, text, step.key);
  }

  function sendText() {
    const trimmed = textInput.trim();
    if (step.kind !== "text") return;
    if (!trimmed && !step.optional) {
      setError("한 줄만 입력해 주세요.");
      return;
    }
    if (step.inputType === "tel" && trimmed) {
      const digits = trimmed.replace(/[^0-9]/g, "");
      if (digits.length < 9 || digits.length > 11) {
        setError("연락처를 정확히 입력해 주세요.");
        return;
      }
    }
    advanceTo(stepIdx + 1, trimmed || "(건너뜀)", step.key);
  }

  function goBack() {
    if (stepIdx === 0 || submitting) return;
    const prevIdx = stepIdx - 1;
    setBubbles((prev) => {
      const copy = [...prev];
      copy.pop();
      copy.pop();
      return copy;
    });
    setStepIdx(prevIdx);
    setError(null);
  }

  async function submitAll(final: Record<string, string>) {
    setSubmitting(true);
    try {
      const body = {
        service: final.service,
        space: final.space,
        region: final.region,
        timing: final.timing,
        scope: final.scope,
        items: final.items,
        name: final.name,
        phone: final.phone,
        message: [initialQuery, final.message].filter(Boolean).join(" · "),
      };
      const res = await fetch("/api/quick-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "접수 중 오류가 발생했어요.");
        setBubbles((prev) => [
          ...prev,
          {
            role: "bot",
            text: "죄송해요, 지금 잠시 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
          },
        ]);
      } else {
        setDone(true);
      }
    } catch (err) {
      console.error(err);
      setError("네트워크 오류예요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = Math.min(((stepIdx + (done ? 1 : 0)) / total) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto flex flex-col rounded-3xl border border-ink-100 bg-white shadow-[0_30px_80px_-30px_rgba(10,15,26,0.25)] overflow-hidden h-[min(760px,calc(100vh-160px))]">
      {/* 채팅 헤더 */}
      <header className="shrink-0 flex items-center gap-3 px-5 md:px-6 py-4 border-b border-ink-100 bg-white">
        <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-black text-sm">
          BBK
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-ink-900">BBK 상담팀</p>
          <p className="text-[11px] text-brand-600 font-semibold flex items-center gap-1.5">
            <span className="relative inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping" />
            </span>
            지금 답변 대기 중
          </p>
        </div>
        <a
          href="tel:1522-9597"
          className="shrink-0 inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-ink-200 text-ink-900 text-xs font-semibold hover:border-ink-900 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
          바로 전화
        </a>
      </header>

      {/* Progress bar */}
      <div className="shrink-0 h-1 bg-ink-100">
        <motion.div
          className="h-full bg-brand-500"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* 대화 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 md:px-6 py-6 bg-ink-50/40 flex flex-col gap-3"
      >
        <AnimatePresence initial={false}>
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${b.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {b.role === "bot" ? (
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-black">
                    BBK
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-white border border-ink-100 px-4 py-3 text-[14px] text-ink-900 leading-[1.55] break-keep shadow-[0_2px_8px_-4px_rgba(10,15,26,0.08)]">
                    {b.text}
                  </div>
                </div>
              ) : (
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-500 text-white px-4 py-3 text-[14px] leading-[1.55] break-keep font-medium">
                  {b.text}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 rounded-3xl bg-white border border-brand-200 p-6 flex flex-col items-center gap-4 text-center"
          >
            <span className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center">
              <Check className="w-6 h-6" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-lg font-bold text-ink-900">
                접수 완료됐어요.
              </p>
              <p className="text-sm text-ink-600 mt-1 leading-[1.6] break-keep">
                조동환 대표가 직접 확인 후 오늘 안에 전화드릴게요.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <a
                href="tel:1522-9597"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.75} />
                지금 전화 걸기
              </a>
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full border border-ink-200 text-ink-900 text-sm font-semibold hover:border-ink-900 transition-colors"
              >
                홈으로
              </Link>
            </div>
          </motion.div>
        )}

        {error && !submitting && (
          <p className="text-center text-xs text-system-danger font-medium">
            {error}
          </p>
        )}
      </div>

      {/* 하단 액션 */}
      {!done && (
        <div className="shrink-0 border-t border-ink-100 bg-white p-4 md:p-5">
          {stepIdx > 0 && !submitting && (
            <button
              onClick={goBack}
              className="mb-3 text-xs text-ink-400 hover:text-ink-900 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" strokeWidth={2} />
              이전 답변 수정
            </button>
          )}

          {/* choice */}
          {step?.kind === "choice" && !submitting && (
            <div
              className={`grid gap-2 ${
                step.cols === 3
                  ? "grid-cols-2 md:grid-cols-3"
                  : step.cols === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {step.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pickAnswer(opt)}
                  className="px-4 py-3 rounded-2xl border border-ink-200 bg-white text-ink-900 text-sm font-semibold hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 active:scale-[0.98] transition-all duration-150 text-left flex items-center justify-between gap-2"
                >
                  <span className="truncate">{opt}</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-ink-300 shrink-0"
                    strokeWidth={2}
                  />
                </button>
              ))}
            </div>
          )}

          {/* region (좌 광역 · 우 세부) — RegionPicker 공용 컴포넌트 사용 */}
          {step?.kind === "region" && !submitting && (
            <div className="flex flex-col gap-2">
              {initialRegion && (
                <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-2.5 text-[12px] text-brand-700 font-medium">
                  <MapPin
                    className="inline w-3.5 h-3.5 mr-1"
                    strokeWidth={2}
                  />
                  이전 화면에서 <b>{initialRegion}</b> 선택하셨어요. 그대로
                  진행하려면 우측에서 다시 눌러주세요.
                </div>
              )}
              <RegionPicker
                value={initialRegion}
                onSelect={(fullRegion) =>
                  advanceTo(stepIdx + 1, fullRegion, "region")
                }
                height={300}
              />
            </div>
          )}

          {/* text · textarea */}
          {step?.kind === "text" && !submitting && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendText();
              }}
              className="flex gap-2 items-start"
            >
              {step.inputType === "textarea" ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={step.placeholder}
                  rows={3}
                  className="flex-1 px-4 py-3 rounded-2xl border border-ink-200 bg-white text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition text-sm resize-none"
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={step.inputType === "tel" ? "tel" : "text"}
                  inputMode={step.inputType === "tel" ? "tel" : "text"}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={step.placeholder}
                  className="flex-1 h-12 px-4 rounded-2xl border border-ink-200 bg-white text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition text-sm"
                />
              )}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="submit"
                  className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 active:scale-[0.98] transition-all"
                  aria-label="보내기"
                >
                  <Send className="w-4 h-4" strokeWidth={1.75} />
                </button>
                {step.optional && (
                  <button
                    type="button"
                    onClick={() =>
                      advanceTo(stepIdx + 1, "(건너뜀)", step.key)
                    }
                    className="h-10 px-3 rounded-2xl border border-ink-200 text-ink-600 text-[11px] font-semibold hover:border-ink-400 transition-colors whitespace-nowrap"
                  >
                    건너뛰기
                  </button>
                )}
              </div>
            </form>
          )}

          {submitting && (
            <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-600 font-medium">
              <Sparkles
                className="w-4 h-4 text-brand-500 animate-pulse"
                strokeWidth={1.75}
              />
              접수 중이에요...
            </div>
          )}
        </div>
      )}

      <div className="shrink-0 border-t border-ink-100 bg-white px-5 py-2 flex items-center justify-between text-[11px] text-ink-400">
        <span>
          Step {Math.min(stepIdx + 1, total)} / {total}
        </span>
        <span>접수는 1분이면 끝나요</span>
      </div>
    </div>
  );
}
