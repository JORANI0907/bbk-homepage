"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Pencil, Check } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { SectionEditContext } from "./SectionEditContext";

type Props = {
  /** 섹션 태그에 적용할 클래스 */
  className?: string;
  /** 섹션 id (선택) */
  id?: string;
  /** 편집 버튼 위치 override. 기본은 우상단이지만, fixed header에 가리는 최상단 섹션(예: HeroV5)에서는 top offset을 늘려야 함 */
  buttonPosition?: string;
  children: ReactNode;
};

/**
 * 각 섹션을 감싸는 편집 컨테이너.
 * - 관리자에게만 우상단 "섹션 편집" 토글 버튼 노출
 * - 편집 모드일 때 자식의 EditableImage/EditableText 편집 UI가 활성화됨
 */
export default function EditableSection({
  className,
  id,
  buttonPosition,
  children,
}: Props) {
  const { admin } = useAdmin();
  const [editing, setEditing] = useState(false);

  const value = useMemo(() => ({ editing }), [editing]);
  const buttonPos =
    buttonPosition ?? "top-4 right-4 md:top-6 md:right-6";

  return (
    <SectionEditContext.Provider value={value}>
      <section
        id={id}
        className={`relative ${className ?? ""} ${
          editing
            ? "outline outline-4 outline-brand-500/40 outline-offset-[-4px]"
            : ""
        }`}
      >
        {admin && (
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            aria-label={editing ? "편집 완료" : "섹션 편집"}
            className={`absolute ${buttonPos} z-30 inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold shadow-lg transition-colors ${
              editing
                ? "bg-brand-500 text-white hover:bg-brand-600"
                : "bg-ink-900 text-white hover:bg-brand-600"
            }`}
          >
            {editing ? (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                편집 완료
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                섹션 편집
              </>
            )}
          </button>
        )}
        {children}
      </section>
    </SectionEditContext.Provider>
  );
}
