"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2, Check } from "lucide-react";
import { useHomepageContent } from "./HomepageContentProvider";

type FieldSpec = {
  key: string;
  label: string;
  defaultText: string;
  multiline?: boolean;
};

const ACT_08_FIELDS: FieldSpec[] = [
  { key: "beforeafter.step", label: "Step 라벨", defaultText: "08 · 시공 전 · 후 결과" },
  {
    key: "beforeafter.bridge",
    label: "브릿지",
    defaultText:
      "여기까지 이야기만 있었죠. 이제 실제로 어떻게 바뀌는지 눈으로 확인하세요.",
    multiline: true,
  },
  { key: "beforeafter.title.main", label: "타이틀 (윗줄)", defaultText: "말보다 결과로," },
  { key: "beforeafter.title.accent", label: "타이틀 (아랫줄 · 회색)", defaultText: "보여드릴게요." },
  {
    key: "beforeafter.subtitle",
    label: "부제",
    defaultText:
      "사장님들 동의하에 공개하는 실제 시공 전후 사진이에요. 사장님 매장도 곧 이 자리에 오를 수 있어요.",
    multiline: true,
  },
  {
    key: "beforeafter.footnote",
    label: "각주",
    defaultText:
      "사장님 동의 하에 공개하는 실제 시공 사진이에요. 순차적으로 사례가 추가되고 있어요.",
    multiline: true,
  },
];

const ACT_085_FIELDS: FieldSpec[] = [
  { key: "cases.step", label: "Step 라벨", defaultText: "08.5 · 실시간 시공 사례" },
  {
    key: "cases.bridge",
    label: "브릿지",
    defaultText: "최근 시공한 매장들을 그대로 보여드릴게요.",
    multiline: true,
  },
  { key: "cases.title.main", label: "타이틀 (윗줄)", defaultText: "진짜 매장, 진짜 결과." },
  { key: "cases.title.accent", label: "타이틀 (아랫줄 · 회색)", defaultText: "사장님도 이 자리에." },
  {
    key: "cases.footnote",
    label: "각주",
    defaultText: "매장 사장님 동의 하에 공개하는 실제 시공 결과입니다.",
  },
];

export default function HomeSectionTextEditor() {
  const [openSection, setOpenSection] = useState<"act08" | "act085" | null>(null);

  return (
    <div className="rounded-2xl bg-white border border-ink-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-ink-100 bg-ink-50">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-500 font-bold">
          홈 섹션 텍스트 관리
        </p>
        <p className="text-xs text-ink-400 mt-0.5">
          여기서 저장하면 홈 Act 08·08.5 섹션의 헤더·각주에 자동 반영됩니다.
        </p>
      </div>

      <AccordionSection
        title="홈 Act 08 · 시공 전·후 결과"
        subtitle="대표 4건 카드 위/아래 텍스트"
        open={openSection === "act08"}
        onToggle={() => setOpenSection(openSection === "act08" ? null : "act08")}
        fields={ACT_08_FIELDS}
      />
      <AccordionSection
        title="홈 Act 08.5 · 실시간 시공 사례"
        subtitle="흐르는 피드 위/아래 텍스트"
        open={openSection === "act085"}
        onToggle={() => setOpenSection(openSection === "act085" ? null : "act085")}
        fields={ACT_085_FIELDS}
      />
    </div>
  );
}

function AccordionSection({
  title,
  subtitle,
  open,
  onToggle,
  fields,
}: {
  title: string;
  subtitle: string;
  open: boolean;
  onToggle: () => void;
  fields: FieldSpec[];
}) {
  return (
    <div className="border-t border-ink-100 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-ink-50/50 transition-colors"
      >
        <div className="flex flex-col items-start gap-0.5 text-left">
          <span className="text-sm font-bold text-ink-900">{title}</span>
          <span className="text-[11px] text-ink-400">{subtitle}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-ink-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-3 bg-ink-50/30">
          {fields.map((f) => (
            <TextFieldRow key={f.key} field={f} />
          ))}
        </div>
      )}
    </div>
  );
}

function TextFieldRow({ field }: { field: FieldSpec }) {
  const { get, update } = useHomepageContent();
  const stored = get(field.key);
  const currentText = (stored?.text as string | undefined) ?? field.defaultText;

  const [draft, setDraft] = useState(currentText);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const initializedRef = useRef(false);

  // provider가 fetch 완료된 뒤 최신 값으로 동기화 (사용자가 아직 편집 시작 전일 때만)
  useEffect(() => {
    if (!initializedRef.current) {
      setDraft(currentText);
      initializedRef.current = true;
    }
  }, [currentText]);

  async function save() {
    if (draft === currentText) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: field.key, value: { text: draft } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update(field.key, { ...(stored ?? {}), text: draft });
      setFlash(true);
      setTimeout(() => setFlash(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  const commonClass =
    "w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition bg-white";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-[12px] font-semibold text-ink-700">{field.label}</label>
        <span className="text-[10px] text-ink-400 font-mono">{field.key}</span>
      </div>
      {field.multiline ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          disabled={saving}
          rows={Math.max(2, draft.split("\n").length)}
          className={`${commonClass} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          disabled={saving}
          className={commonClass}
        />
      )}
      <div className="min-h-[16px] flex items-center gap-1.5 text-[11px]">
        {saving && (
          <>
            <Loader2 className="w-3 h-3 animate-spin text-brand-500" strokeWidth={2} />
            <span className="text-brand-600">저장 중…</span>
          </>
        )}
        {flash && !saving && (
          <>
            <Check className="w-3 h-3 text-emerald-600" strokeWidth={2.5} />
            <span className="text-emerald-600">저장됨</span>
          </>
        )}
        {error && <span className="text-red-600">{error}</span>}
        {!saving && !flash && !error && (
          <span className="text-ink-400">포커스 벗어나면 자동 저장</span>
        )}
      </div>
    </div>
  );
}
