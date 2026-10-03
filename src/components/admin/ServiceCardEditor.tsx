"use client";

import { useEffect, useRef, useState } from "react";
import { X, Upload, Loader2, Check, ImageIcon } from "lucide-react";
import { useHomepageContent } from "./HomepageContentProvider";
import { resizeImage } from "@/lib/image-resize";

type Props = {
  categoryKey: string;
  categoryLabel: string;
  onClose: () => void;
};

export default function ServiceCardEditor({
  categoryKey,
  categoryLabel,
  onClose,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-5">
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
              카드 사진 편집
            </p>
            <h2 className="text-xl font-bold text-ink-900 mt-1">
              {categoryLabel}
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

        <div className="p-6 md:p-8 overflow-y-auto">
          <p className="text-sm text-ink-500 mb-6 leading-relaxed">
            방문자가 카드에 마우스를 올리면 A → B 순서로 사진이 바뀝니다.
            두 사진을 각각 업로드해 주세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SlotEditor
              contentKey={`service.${categoryKey}.a`}
              label="사진 A"
              hint="평상시 노출되는 사진"
            />
            <SlotEditor
              contentKey={`service.${categoryKey}.b`}
              label="사진 B"
              hint="마우스 hover 시 노출"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-ink-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}

function SlotEditor({
  contentKey,
  label,
  hint,
}: {
  contentKey: string;
  label: string;
  hint: string;
}) {
  const { get, update } = useHomepageContent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const stored = get(contentKey);
  const src = stored?.src;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const optimized = await resizeImage(file);
      const form = new FormData();
      form.append("file", optimized);
      form.append("key", contentKey);
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "업로드 실패");
      update(contentKey, { src: data.url, alt: "" });
      setFlash(true);
      setTimeout(() => setFlash(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold text-ink-900">{label}</span>
        <span className="text-[11px] text-ink-400">{hint}</span>
      </div>

      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-ink-200 bg-ink-50">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-400">
            <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              사진 없음
            </span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-ink-900/40 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" strokeWidth={2} />
          </div>
        )}
        {flash && !uploading && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4" strokeWidth={2.5} />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="h-11 rounded-lg border border-ink-200 bg-white text-sm font-semibold text-ink-900 hover:border-ink-900 hover:shadow-soft transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Upload className="w-4 h-4" strokeWidth={1.75} />
        {src ? "사진 교체" : "사진 업로드"}
      </button>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
