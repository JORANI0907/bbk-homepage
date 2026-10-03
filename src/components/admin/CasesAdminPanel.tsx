"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Star, Eye, EyeOff, Loader2, ImageIcon, FolderInput } from "lucide-react";
import type { Case } from "@/lib/data/cases";
import CaseEditor from "./CaseEditor";
import HomeSectionTextEditor from "./HomeSectionTextEditor";

type Props = {
  cases: Case[];
};

export default function CasesAdminPanel({ cases }: Props) {
  const router = useRouter();
  const [editorTarget, setEditorTarget] = useState<Case | null | "new">(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function quickPatch(id: string, patch: Partial<Case>) {
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/cases/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "수정 실패");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "수정 실패");
    } finally {
      setPendingId(null);
    }
  }

  const featuredCount = cases.filter((c) => c.is_featured).length;
  const publishedCount = cases.filter((c) => c.is_published).length;

  return (
    <>
      <section className="bg-brand-50/60 border-b border-brand-100 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] uppercase tracking-[0.18em] font-bold">
                  관리자 모드
                </span>
                <span className="text-[11px] text-ink-500">
                  전체 {cases.length}건 · 대표 {featuredCount}건 · 공개 {publishedCount}건
                </span>
              </div>
              <p className="text-sm text-ink-700 leading-relaxed">
                여기서 시공사례를 관리하면 홈 Act 08(대표 4건), Act 08.5(최근 32건), 이 페이지 전체에 자동으로 반영됩니다.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <Link
                href="/admin/cases/import"
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-white border border-ink-200 text-ink-900 text-sm font-semibold hover:border-ink-900 transition-colors"
              >
                <FolderInput className="w-4 h-4" strokeWidth={2} />
                Drive 임포트
              </Link>
              <button
                type="button"
                onClick={() => setEditorTarget("new")}
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                새 사례 추가
              </button>
            </div>
          </div>

          <HomeSectionTextEditor />

          <div className="rounded-2xl bg-white border border-ink-100 overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-3 border-b border-ink-100 bg-ink-50 text-[11px] uppercase tracking-[0.14em] text-ink-500 font-bold">
              <div className="col-span-1">사진</div>
              <div className="col-span-5">업종 · 항목 · 지역</div>
              <div className="col-span-2 text-center">대표</div>
              <div className="col-span-2 text-center">공개</div>
              <div className="col-span-2 text-right">동작</div>
            </div>

            <div className="max-h-[520px] overflow-y-auto divide-y divide-ink-100">
              {cases.map((c) => {
                const isPending = pendingId === c.id;
                const thumb = c.after_images?.[0] ?? c.before_images?.[0] ?? null;
                return (
                  <div
                    key={c.id}
                    className={`grid grid-cols-12 items-center px-4 py-3 hover:bg-ink-50/50 transition-colors ${
                      !c.is_published ? "opacity-60" : ""
                    }`}
                  >
                    <div className="col-span-1">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-ink-100 flex items-center justify-center text-ink-400">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    <div className="col-span-5 flex flex-col gap-0.5 min-w-0">
                      <p className="text-sm font-semibold text-ink-900 truncate">
                        {c.store_name ?? `${c.industry ?? ""} ${c.item ?? ""}`.trim() ?? "(이름 없음)"}
                      </p>
                      <p className="text-xs text-ink-400 truncate">
                        {[c.industry, c.region, c.timing].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          quickPatch(c.id, { is_featured: !c.is_featured })
                        }
                        disabled={isPending}
                        aria-label={c.is_featured ? "대표 해제" : "대표 지정"}
                        className={`inline-flex items-center gap-1 h-8 px-3 rounded-full text-[11px] font-semibold transition-colors ${
                          c.is_featured
                            ? "bg-brand-500 text-white hover:bg-brand-600"
                            : "bg-ink-100 text-ink-500 hover:bg-ink-200"
                        }`}
                      >
                        <Star
                          className="w-3 h-3"
                          strokeWidth={2}
                          fill={c.is_featured ? "currentColor" : "none"}
                        />
                        {c.is_featured ? "대표" : "일반"}
                      </button>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          quickPatch(c.id, { is_published: !c.is_published })
                        }
                        disabled={isPending}
                        aria-label={c.is_published ? "비공개로" : "공개로"}
                        className={`inline-flex items-center gap-1 h-8 px-3 rounded-full text-[11px] font-semibold transition-colors ${
                          c.is_published
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-ink-100 text-ink-500 hover:bg-ink-200"
                        }`}
                      >
                        {c.is_published ? (
                          <Eye className="w-3 h-3" strokeWidth={2} />
                        ) : (
                          <EyeOff className="w-3 h-3" strokeWidth={2} />
                        )}
                        {c.is_published ? "공개" : "비공개"}
                      </button>
                    </div>
                    <div className="col-span-2 flex justify-end gap-1">
                      {isPending && (
                        <Loader2
                          className="w-4 h-4 text-brand-500 animate-spin self-center"
                          strokeWidth={2}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setEditorTarget(c)}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-ink-900 text-white text-[11px] font-semibold hover:bg-brand-600 transition-colors"
                      >
                        <Pencil className="w-3 h-3" strokeWidth={2} />
                        편집
                      </button>
                    </div>
                  </div>
                );
              })}

              {cases.length === 0 && (
                <div className="p-8 text-center text-sm text-ink-500">
                  아직 사례가 없어요. 우측 상단 &quot;새 사례 추가&quot; 버튼으로 시작하세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {editorTarget !== null && (
        <CaseEditor
          target={editorTarget === "new" ? null : editorTarget}
          onClose={() => setEditorTarget(null)}
        />
      )}
    </>
  );
}
