"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Loader2, Check, ImageIcon, Trash2, Plus } from "lucide-react";
import type { Case, CaseRatio } from "@/lib/data/cases";
import { resizeImage } from "@/lib/image-resize";

const RATIOS: { value: CaseRatio; label: string }[] = [
  { value: "1/1", label: "1:1 정사각" },
  { value: "4/5", label: "4:5 세로" },
  { value: "3/4", label: "3:4 세로" },
  { value: "9/16", label: "9:16 스토리" },
  { value: "16/9", label: "16:9 가로" },
];

const MAX_IMAGES = 10;

type Props = {
  target: Case | null;
  onClose: () => void;
};

export default function CaseEditor({ target, onClose }: Props) {
  const router = useRouter();
  const isEdit = !!target;

  const [storeName, setStoreName] = useState(target?.store_name ?? "");
  const [industry, setIndustry] = useState(target?.industry ?? "");
  const [item, setItem] = useState(target?.item ?? "");
  const [region, setRegion] = useState(target?.region ?? "");
  const [timing, setTiming] = useState(target?.timing ?? "야간 시공");
  const [ratio, setRatio] = useState<CaseRatio>(target?.ratio ?? "1/1");
  const [workDate, setWorkDate] = useState(target?.work_date ?? "");
  const [slug, setSlug] = useState(target?.slug ?? "");
  const [isVideo, setIsVideo] = useState(target?.is_video ?? false);
  const [isFeatured, setIsFeatured] = useState(target?.is_featured ?? false);
  const [isPublished, setIsPublished] = useState(target?.is_published ?? true);
  const [isBlogRegistered, setIsBlogRegistered] = useState(
    target?.is_blog_registered ?? false,
  );
  const [beforeImages, setBeforeImages] = useState<string[]>(
    target?.before_images ?? [],
  );
  const [afterImages, setAfterImages] = useState<string[]>(
    target?.after_images ?? [],
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSave() {
    setError(null);

    if (!storeName.trim()) {
      setError("매장명(store_name)은 필수입니다.");
      return;
    }

    setSaving(true);
    try {
      const body = {
        store_name: storeName.trim(),
        industry: industry.trim() || null,
        item: item.trim() || null,
        region: region.trim() || null,
        timing: timing.trim() || "야간 시공",
        ratio,
        is_video: isVideo,
        is_featured: isFeatured,
        is_published: isPublished,
        is_blog_registered: isBlogRegistered,
        before_images: beforeImages,
        after_images: afterImages,
        work_date: workDate || null,
        slug: slug.trim() || null,
      };

      const url = isEdit ? `/api/admin/cases/${target!.id}` : "/api/admin/cases";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!target) return;
    if (!confirm(`"${target.store_name ?? target.industry ?? ""}" 사례를 삭제할까요?`)) return;

    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/cases/${target.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "삭제 실패");
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제 실패");
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-5 py-8">
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
              {isEdit ? "시공사례 편집" : "새 시공사례 추가"}
            </p>
            <h2 className="text-xl font-bold text-ink-900 mt-1">
              {isEdit ? (target?.store_name ?? "사례 편집") : "새 사례 등록"}
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

        <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6">
          {/* 메타 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="매장명 *" hint="예: 하나마토 구월점">
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </Field>
            <Field label="시공 날짜" hint="YYYY-MM-DD">
              <input
                type="date"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </Field>
            <Field label="업종" hint="예: 외식 / 미용 / 교육">
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </Field>
            <Field label="지역" hint="예: 인천 구월동">
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </Field>
            <Field label="시공 품목" hint="예: 후드·덕트">
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </Field>
            <Field label="시공 시간대" hint="기본: 야간 시공">
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
            </Field>
            <Field label="상세 페이지 slug" hint="/cases/[slug] URL">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="hanamato-guwol-20260203"
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition font-mono text-sm"
              />
            </Field>
            <Field
              label="피드 카드 비율"
              hint="Act 08.5 실시간 피드 카드 모양"
            >
              <select
                value={ratio}
                onChange={(e) => setRatio(e.target.value as CaseRatio)}
                className="w-full h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition bg-white"
              >
                {RATIOS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="border-t border-ink-100 pt-5">
            <Field label="옵션" hint="여러 개 선택 가능">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Checkbox
                  checked={isFeatured}
                  onChange={setIsFeatured}
                  label="대표사례 (홈 Act 08에 노출)"
                />
                <Checkbox
                  checked={isPublished}
                  onChange={setIsPublished}
                  label="공개 (해제 시 임시 비공개)"
                />
                <Checkbox
                  checked={isBlogRegistered}
                  onChange={setIsBlogRegistered}
                  label="블로그 등록 완료"
                />
                <Checkbox
                  checked={isVideo}
                  onChange={setIsVideo}
                  label="영상 콘텐츠"
                />
              </div>
            </Field>
          </div>

          {/* 사진 */}
          <div className="border-t border-ink-100 pt-6">
            <MultiImageUploader
              label="시공 전"
              side="before"
              caseId={target?.id ?? null}
              images={beforeImages}
              onChange={setBeforeImages}
            />
          </div>
          <div className="border-t border-ink-100 pt-6">
            <MultiImageUploader
              label="시공 후"
              side="after"
              caseId={target?.id ?? null}
              images={afterImages}
              onChange={setAfterImages}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-ink-100 flex items-center justify-between gap-3">
          {isEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || saving}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
              ) : (
                <Trash2 className="w-4 h-4" strokeWidth={2} />
              )}
              삭제
            </button>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-full text-sm font-semibold text-ink-700 hover:bg-ink-100 transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || deleting}
              className="inline-flex items-center gap-1.5 h-10 px-6 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                  저장 중
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" strokeWidth={2} />
                  {isEdit ? "저장" : "등록"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold text-ink-900">{label}</span>
        {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500"
      />
      <span className="text-sm text-ink-700 group-hover:text-ink-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

function MultiImageUploader({
  label,
  side,
  caseId,
  images,
  onChange,
}: {
  label: string;
  side: "before" | "after";
  caseId: string | null;
  images: string[];
  onChange: (next: string[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bgClass = side === "before" ? "bg-ink-50" : "bg-brand-50";

  const canAdd = images.length < MAX_IMAGES;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const picked = Array.from(files).slice(0, MAX_IMAGES - images.length);
      const uploaded: string[] = [];
      for (const file of picked) {
        const optimized = await resizeImage(file);
        const form = new FormData();
        form.append("file", optimized);
        form.append("side", side);
        if (caseId) form.append("caseId", caseId);
        const res = await fetch("/api/admin/cases/upload", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "업로드 실패");
        uploaded.push(data.url);
      }
      onChange([...images, ...uploaded].slice(0, MAX_IMAGES));
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removeAt(idx: number) {
    const next = [...images];
    next.splice(idx, 1);
    onChange(next);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const next = [...images];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  }

  function moveDown(idx: number) {
    if (idx === images.length - 1) return;
    const next = [...images];
    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-ink-900">{label}</span>
          <span className="text-[11px] text-ink-400">
            {images.length} / {MAX_IMAGES}장
          </span>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading || !canAdd}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-ink-200 bg-white text-xs font-semibold text-ink-900 hover:border-ink-900 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
              업로드 중
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              사진 추가
            </>
          )}
        </button>
      </div>

      <div className={`grid grid-cols-5 gap-2 p-3 rounded-2xl ${bgClass}`}>
        {Array.from({ length: MAX_IMAGES }).map((_, i) => {
          const url = images[i];
          return (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden border border-ink-100 bg-white group"
            >
              {url ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`${label} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/50 transition-colors flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className="w-6 h-6 rounded-full bg-white text-ink-900 text-[10px] font-bold disabled:opacity-30 flex items-center justify-center"
                        aria-label="앞으로"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(i)}
                        disabled={i === images.length - 1}
                        className="w-6 h-6 rounded-full bg-white text-ink-900 text-[10px] font-bold disabled:opacity-30 flex items-center justify-center"
                        aria-label="뒤로"
                      >
                        →
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      className="inline-flex items-center gap-1 h-6 px-2 rounded-full bg-red-500 text-white text-[10px] font-semibold"
                    >
                      <Trash2 className="w-3 h-3" strokeWidth={2} />
                      제거
                    </button>
                  </div>
                  <span className="absolute top-1 left-1 text-[10px] font-bold text-white bg-ink-900/70 rounded px-1.5 py-0.5">
                    {i + 1}
                  </span>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-300">
                  <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
