"use client";

import { useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import {
  Pencil,
  Loader2,
  Check,
  X,
  Move,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { useHomepageContent } from "./HomepageContentProvider";
import { useSectionEdit } from "./SectionEditContext";
import { resizeImage } from "@/lib/image-resize";

type Props = {
  /** 이 편집 지점의 고유 key. 예: "service.deepcare.a" */
  contentKey: string;
  /** DB 값이 없을 때 사용할 기본 사진 경로 (선택) */
  defaultSrc?: string;
  /** src가 없을 때 렌더할 대체 노드 (예: 그라디언트 프리뷰) */
  placeholder?: ReactNode;
  /** 관리자여도 편집 오버레이를 숨김 (외부 에디터에서 관리) */
  hideEditor?: boolean;
  alt?: string;
  className?: string;
  /** img 부모에 씌울 클래스 (편집 오버레이 배치용) */
  wrapperClassName?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
  /** 편집 버튼(사진 편집 · 위치 조정) 그룹의 위치 override.
   *  기본: "top-16 right-4 md:top-20 md:right-6". EditableSection "편집 완료" 버튼(top-4/6)과 겹치지 않도록 아래로 배치됨.
   *  Hero처럼 fixed header 뒤로 더 숨겨야 하는 경우에만 "top-28 right-4 md:top-32" 식으로 override. */
  buttonsPosition?: string;
  /** 업로드 전 리사이즈 최대 가로 (기본 1600). Hero 배경처럼 큰 사진은 2560 등. */
  maxResizeWidth?: number;
  /** JPEG 품질 (기본 0.82). 큰 배경 사진은 0.88~0.9 권장. */
  maxResizeQuality?: number;
};

function parseObjectPosition(value: string | undefined): { x: number; y: number } {
  if (!value) return { x: 50, y: 50 };
  const parts = value.trim().split(/\s+/);
  const x = parseFloat(parts[0]);
  const y = parseFloat(parts[1] ?? parts[0]);
  return {
    x: isNaN(x) ? 50 : Math.max(0, Math.min(100, x)),
    y: isNaN(y) ? 50 : Math.max(0, Math.min(100, y)),
  };
}

export default function EditableImage({
  contentKey,
  defaultSrc,
  placeholder,
  hideEditor,
  alt = "",
  className,
  wrapperClassName,
  imgProps,
  buttonsPosition = "top-16 right-4 md:top-20 md:right-6",
  maxResizeWidth,
  maxResizeQuality,
}: Props) {
  const { admin } = useAdmin();
  const { editing: sectionEditing } = useSectionEdit();
  const { get, update } = useHomepageContent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<"success" | null>(null);

  const stored = get(contentKey);
  const src = stored?.src ?? defaultSrc;
  const storedObjectPosition = stored?.objectPosition as string | undefined;

  // 위치 조정 모드
  const [positionMode, setPositionMode] = useState(false);
  const initialPos = parseObjectPosition(storedObjectPosition);
  const [posX, setPosX] = useState(initialPos.x);
  const [posY, setPosY] = useState(initialPos.y);
  const [savingPos, setSavingPos] = useState(false);

  const isEditable = !!admin && !hideEditor && sectionEditing;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const optimized = await resizeImage(file, {
        maxWidth: maxResizeWidth,
        quality: maxResizeQuality,
      });
      const form = new FormData();
      form.append("file", optimized);
      form.append("key", contentKey);
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "업로드 실패");
      update(contentKey, { ...(stored ?? {}), src: data.url, alt });
      setFlash("success");
      setTimeout(() => setFlash(null), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "업로드 실패";
      setError(msg);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function savePosition() {
    setSavingPos(true);
    setError(null);
    try {
      const objectPosition = `${posX}% ${posY}%`;
      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: contentKey,
          value: { objectPosition },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      update(contentKey, { ...(stored ?? {}), objectPosition });
      setPositionMode(false);
      setFlash("success");
      setTimeout(() => setFlash(null), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSavingPos(false);
    }
  }

  function cancelPosition() {
    const reset = parseObjectPosition(storedObjectPosition);
    setPosX(reset.x);
    setPosY(reset.y);
    setPositionMode(false);
  }

  // 실시간 프리뷰: 위치 조정 모드면 로컬 state, 아니면 저장된 값
  const effectivePosition = positionMode
    ? `${posX}% ${posY}%`
    : storedObjectPosition;

  const mergedImgStyle: React.CSSProperties = {
    ...(imgProps?.style ?? {}),
    ...(effectivePosition ? { objectPosition: effectivePosition } : {}),
  };

  const inner = src
    ? // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        {...imgProps}
        style={mergedImgStyle}
      />
    : (placeholder ?? null);

  if (!isEditable) {
    return <>{inner}</>;
  }

  const wrapperClass = wrapperClassName
    ? `group/edit ${wrapperClassName}`
    : "relative group/edit";

  return (
    <div className={wrapperClass}>
      {inner}

      {/* 편집 오버레이 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 호버 테두리 */}
        <div className="absolute inset-0 border-2 border-brand-500/0 group-hover/edit:border-brand-500/70 transition-colors rounded-[inherit]" />

        {positionMode ? (
          /* 위치 조정 패널 */
          <div className={`pointer-events-auto absolute ${buttonsPosition} z-50 flex flex-col gap-2 bg-ink-900/95 backdrop-blur-sm rounded-2xl p-3 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 w-[180px]`}>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/50 font-bold">
                사진 위치
              </p>
              <p className="text-[11px] font-semibold text-white tabular-nums mt-0.5">
                X: {posX}% · Y: {posY}%
              </p>
            </div>

            {/* 4방향 버튼 그리드 */}
            <div className="grid grid-cols-3 gap-1">
              <div />
              <PosButton
                onClick={() => setPosY((y) => Math.max(0, y - 5))}
                label="위로"
              >
                <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />
              </PosButton>
              <div />

              <PosButton
                onClick={() => setPosX((x) => Math.max(0, x - 5))}
                label="왼쪽"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              </PosButton>
              <PosButton
                onClick={() => {
                  setPosX(50);
                  setPosY(50);
                }}
                label="중앙으로"
                variant="muted"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
              </PosButton>
              <PosButton
                onClick={() => setPosX((x) => Math.min(100, x + 5))}
                label="오른쪽"
              >
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </PosButton>

              <div />
              <PosButton
                onClick={() => setPosY((y) => Math.min(100, y + 5))}
                label="아래로"
              >
                <ArrowDown className="w-3.5 h-3.5" strokeWidth={2.5} />
              </PosButton>
              <div />
            </div>

            <p className="text-[9px] text-white/40 text-center leading-tight">
              화살표 = 사진 안에서 보고 싶은 지점 이동
            </p>

            {/* 저장/취소 */}
            <div className="flex gap-1">
              <button
                type="button"
                onClick={cancelPosition}
                disabled={savingPos}
                className="flex-1 h-7 text-[10px] font-semibold text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                onClick={savePosition}
                disabled={savingPos}
                className="flex-1 h-7 text-[10px] font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-md transition-colors inline-flex items-center justify-center gap-1 disabled:opacity-60"
              >
                {savingPos ? (
                  <Loader2 className="w-3 h-3 animate-spin" strokeWidth={2.5} />
                ) : (
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                )}
                저장
              </button>
            </div>
          </div>
        ) : (
          /* 기본 버튼 (사진 편집 + 위치 조정) */
          <div className={`pointer-events-auto absolute ${buttonsPosition} z-50 flex flex-col gap-1.5 items-end`}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileRef.current?.click();
              }}
              disabled={uploading}
              aria-label="사진 편집"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-ink-900 text-white text-[11px] font-semibold shadow-lg hover:bg-brand-600 transition-colors disabled:opacity-80"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                  업로드 중
                </>
              ) : flash === "success" ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  완료
                </>
              ) : (
                <>
                  <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                  사진 편집
                </>
              )}
            </button>

            {/* 위치 조정 버튼: src가 있을 때만 */}
            {src && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPositionMode(true);
                }}
                aria-label="사진 위치 조정"
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white text-ink-900 text-[11px] font-semibold shadow-lg hover:bg-brand-50 hover:text-brand-700 transition-colors border border-ink-200"
              >
                <Move className="w-3.5 h-3.5" strokeWidth={2} />
                위치 조정
              </button>
            )}
          </div>
        )}

        {/* 에러 뱃지 */}
        {error && (
          <div className="pointer-events-auto absolute bottom-2 left-2 right-2 bg-red-600 text-white text-xs rounded-lg px-3 py-2 flex items-center justify-between gap-2">
            <span className="truncate">{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="에러 닫기"
              className="shrink-0"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function PosButton({
  onClick,
  children,
  label,
  variant = "default",
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  variant?: "default" | "muted";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        variant === "muted"
          ? "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          : "bg-brand-500 text-white hover:bg-brand-400 active:scale-95"
      }`}
    >
      {children}
    </button>
  );
}
