"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { Pencil, Loader2, Check } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { useHomepageContent } from "./HomepageContentProvider";
import { useSectionEdit } from "./SectionEditContext";

type Props = {
  /** 이 편집 지점의 고유 key. 예: "testimonial.primary.name" */
  contentKey: string;
  /** DB 값이 없을 때 사용할 기본 텍스트 */
  defaultText: string;
  /** 렌더할 태그 (기본 span) */
  as?: ElementType;
  /** 여러 줄 편집 허용 여부 (기본 false) */
  multiline?: boolean;
  className?: string;
  /** 편집 UI를 숨김 (관리자여도) */
  hideEditor?: boolean;
  /** 관리자 아닐 때 렌더 전에 텍스트를 감쌀 노드 (예: 따옴표) */
  wrap?: (text: string) => ReactNode;
};

export default function EditableText({
  contentKey,
  defaultText,
  as: Tag = "span",
  multiline = false,
  className,
  hideEditor,
  wrap,
}: Props) {
  const { admin } = useAdmin();
  const { editing: sectionEditing } = useSectionEdit();
  const { get, update } = useHomepageContent();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  const stored = get(contentKey);
  const text = (stored?.text as string) ?? defaultText;
  const isEditable = !!admin && !hideEditor && sectionEditing;
  const isEmpty = !text || text.trim() === "";

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if ("select" in inputRef.current) inputRef.current.select();
    }
  }, [editing]);

  function startEditing() {
    setDraft(text);
    setError(null);
    setEditing(true);
  }

  async function save() {
    if (draft === text) {
      setEditing(false);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: contentKey,
          value: { text: draft },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update(contentKey, { ...(stored ?? {}), text: draft });
      setEditing(false);
      setFlash(true);
      setTimeout(() => setFlash(false), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setDraft(text);
    setEditing(false);
    setError(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    } else if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      save();
    } else if (e.key === "Enter" && multiline && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      save();
    }
  }

  const displayNode = wrap
    ? wrap(text)
    : isEmpty && isEditable
      ? "클릭해서 입력"
      : text;

  if (!isEditable) {
    return <Tag className={className}>{displayNode}</Tag>;
  }

  if (editing) {
    const commonProps = {
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setDraft(e.target.value),
      onKeyDown: handleKeyDown,
      onBlur: save,
      disabled: saving,
      // 입력창은 흰 배경이므로 text 색을 ink-900으로 강제 override
      // (상위 className에 text-white 등이 있어도 가독성 유지)
      className: `${className ?? ""} bg-white !text-ink-900 outline-none ring-2 ring-brand-500 rounded px-1 -mx-1`,
    } as const;

    return (
      <Tag className="relative inline-block group/edit">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            {...commonProps}
            rows={Math.max(2, draft.split("\n").length)}
            className={`${commonProps.className} block w-full resize-y`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            {...commonProps}
          />
        )}
        {saving && (
          <span className="absolute -top-2 -right-6 text-brand-600">
            <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
          </span>
        )}
        {error && (
          <span className="absolute top-full left-0 mt-1 text-[11px] text-red-600 bg-red-50 border border-red-100 rounded px-2 py-0.5 whitespace-nowrap z-10">
            {error}
          </span>
        )}
      </Tag>
    );
  }

  return (
    <Tag
      className={`${className ?? ""} relative inline-block group/edit cursor-text ${
        isEmpty ? "min-w-[8ch] !text-ink-400/70 italic" : ""
      }`}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startEditing();
      }}
    >
      {displayNode}
      <span
        className="pointer-events-none absolute -inset-1 rounded border border-dashed border-brand-500/0 group-hover/edit:border-brand-500/70 transition-colors"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink-900 text-white flex items-center justify-center shadow"
        aria-hidden="true"
      >
        {flash ? (
          <Check className="w-3 h-3" strokeWidth={2.5} />
        ) : (
          <Pencil className="w-3 h-3" strokeWidth={2} />
        )}
      </span>
    </Tag>
  );
}
