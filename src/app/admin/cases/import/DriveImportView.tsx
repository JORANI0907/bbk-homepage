"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  FileText,
  Folder,
  ImageOff,
  Loader2,
  Search,
  Tag,
  XCircle,
} from "lucide-react";

type ScanItem = {
  folderId: string;
  folderName: string;
  workDate: string | null;
  storeName: string;
  isBlogRegistered: boolean;
  tag: string | null;
  industry: string;
  slug: string;
  alreadyImported: boolean;
};

type ImportResult = {
  folderId: string;
  storeName: string;
  status: "created" | "skipped" | "failed" | "no_photos";
  caseId?: string;
  slug?: string;
  beforeCount?: number;
  afterCount?: number;
  error?: string;
};

const DEFAULT_FOLDER_URL =
  "https://drive.google.com/drive/u/0/folders/16UywcHqJ1FVnYC4626HH4enrWbwMNUjn";

export default function DriveImportView() {
  const [folderUrl, setFolderUrl] = useState(DEFAULT_FOLDER_URL);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [items, setItems] = useState<ScanItem[]>([]);
  const [scanDebug, setScanDebug] = useState<unknown>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showOnlyUnimported, setShowOnlyUnimported] = useState(true);

  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [results, setResults] = useState<ImportResult[] | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const selectableItems = useMemo(
    () => items.filter((i) => !i.alreadyImported),
    [items],
  );
  const displayItems = useMemo(
    () => (showOnlyUnimported ? selectableItems : items),
    [items, selectableItems, showOnlyUnimported],
  );
  const allSelected =
    selectableItems.length > 0 &&
    selectableItems.every((i) => selected.has(i.folderId));

  // 사용자가 "스캔" 버튼으로 직접 호출: 전체 리셋 (결과까지 지움)
  async function doScan() {
    setResults(null);
    setSelected(new Set());
    await refreshScan();
  }

  // 내부용: 데이터만 다시 받아옴 (결과·선택 유지)
  async function refreshScan() {
    setScanning(true);
    setScanError(null);
    setScanDebug(null);
    try {
      const res = await fetch("/api/admin/cases/import-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "스캔 실패");
      setItems(data.items ?? []);
      if (data.debug) setScanDebug(data.debug);
    } catch (err) {
      setScanError(err instanceof Error ? err.message : "스캔 실패");
      setItems([]);
    } finally {
      setScanning(false);
    }
  }

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(selectableItems.map((i) => i.folderId)));
    }
  }

  function toggleOne(folderId: string) {
    const next = new Set(selected);
    if (next.has(folderId)) {
      next.delete(folderId);
    } else {
      next.add(folderId);
    }
    setSelected(next);
  }

  async function doImport() {
    if (selected.size === 0) return;
    if (
      !confirm(
        `${selected.size}개 폴더를 임포트할까요?\n각 폴더당 Before/After 10장씩, 최대 ${selected.size * 20}장 다운로드됩니다.\n네트워크 상황에 따라 수 분 걸릴 수 있어요.`,
      )
    ) {
      return;
    }
    setImporting(true);
    setImportError(null);
    setResults(null);
    try {
      const res = await fetch("/api/admin/cases/import-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderIds: Array.from(selected) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "임포트 실패");
      setResults(data.results ?? []);
      setSelected(new Set()); // 선택 해제 (중복 임포트 방지)
      // 결과 유지한 채로 리스트만 새로고침 (이미 임포트 상태 반영)
      await refreshScan();
      // 결과 섹션으로 자동 스크롤
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "임포트 실패");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 hover:text-ink-900 font-semibold transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
          시공사례로 돌아가기
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-ink-900">
          Google Drive 시공사례 임포트
        </h1>
        <p className="text-sm text-ink-600 leading-[1.6] max-w-2xl">
          Drive 공개 폴더 URL을 붙여넣고 스캔하면, 하위 작업 폴더가 자동 파싱됩니다.
          선택 후 임포트하면 각 폴더에서 <strong>시공 전/후 앞 10장</strong>이 자동으로
          Supabase에 저장되고 시공사례로 등록됩니다.
        </p>
      </div>

      {/* 1. 폴더 URL 입력 */}
      <section className="rounded-3xl bg-white border border-ink-100 p-6 md:p-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">
            1
          </span>
          <h2 className="text-lg font-bold text-ink-900">
            상위 폴더 URL 입력
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={folderUrl}
            onChange={(e) => setFolderUrl(e.target.value)}
            placeholder="https://drive.google.com/drive/folders/..."
            className="flex-1 h-11 px-4 rounded-lg border border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition font-mono text-sm"
          />
          <button
            type="button"
            onClick={doScan}
            disabled={scanning || !folderUrl.trim()}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-60"
          >
            {scanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                스캔 중...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" strokeWidth={2} />
                스캔
              </>
            )}
          </button>
        </div>
        {scanError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {scanError}
          </p>
        )}

        {!scanning && !scanError && items.length === 0 && scanDebug !== null && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex flex-col gap-2">
            <p className="text-sm font-semibold text-amber-900">
              ⚠️ 스캔은 성공했지만 작업 폴더가 0개 발견됐습니다.
            </p>
            <p className="text-xs text-amber-800">
              Drive API 응답은 받았지만 "폴더" 타입이 하나도 없었어요. 아래 디버그 정보를 보면 원인을 알 수 있습니다.
            </p>
            <pre className="text-[11px] bg-white border border-amber-100 rounded p-3 overflow-x-auto font-mono text-ink-800">
              {JSON.stringify(scanDebug, null, 2)}
            </pre>
            <p className="text-xs text-amber-700">
              <strong>흔한 원인:</strong> 공유 범위가 "링크가 있는 모든 사용자"가 아니거나,
              폴더가 바로가기(shortcut)로 추가된 경우입니다.
              Drive에서 폴더 → <strong>공유 → 일반 액세스 → "링크가 있는 모든 사용자"</strong> 로 설정했는지 확인해주세요.
            </p>
          </div>
        )}
      </section>

      {/* 2. 결과 리스트 + 선택 */}
      {items.length > 0 && (
        <section className="rounded-3xl bg-white border border-ink-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-ink-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h2 className="text-lg font-bold text-ink-900">
                발견된 작업 {items.length}건
                <span className="ml-2 text-sm font-normal text-ink-500">
                  (안 올린 것: {selectableItems.length}건 · 올린 것: {items.length - selectableItems.length}건)
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <label className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-ink-200 text-ink-700 text-xs font-semibold cursor-pointer hover:border-ink-900 transition-colors">
                <input
                  type="checkbox"
                  checked={showOnlyUnimported}
                  onChange={(e) => setShowOnlyUnimported(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-ink-300 text-brand-500 focus:ring-brand-500"
                />
                안 올린 것만 보기
              </label>
              <button
                type="button"
                onClick={toggleAll}
                disabled={selectableItems.length === 0}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-ink-200 text-ink-700 text-xs font-semibold hover:border-ink-900 transition-colors disabled:opacity-50"
              >
                {allSelected ? "전체 해제" : "전체 선택"}
              </button>
              <button
                type="button"
                onClick={doImport}
                disabled={selected.size === 0 || importing}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors disabled:opacity-60"
              >
                {importing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                    임포트 중 ({selected.size})
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" strokeWidth={2} />
                    선택한 {selected.size}건 임포트
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto divide-y divide-ink-100">
            {displayItems.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-ink-500">
                {showOnlyUnimported
                  ? "안 올린 폴더가 없습니다. 이미 전부 임포트되었어요. 🎉"
                  : "표시할 항목이 없습니다."}
              </div>
            )}
            {displayItems.map((item) => {
              const isChecked = selected.has(item.folderId);
              return (
                <label
                  key={item.folderId}
                  className={`flex items-start gap-4 px-6 py-4 cursor-pointer transition-colors ${
                    item.alreadyImported
                      ? "bg-ink-50/50 opacity-60 cursor-not-allowed"
                      : "hover:bg-brand-50/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={item.alreadyImported}
                    onChange={() => toggleOne(item.folderId)}
                    className="mt-1 w-4 h-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500"
                  />
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Folder className="w-3.5 h-3.5 text-ink-400" strokeWidth={2} />
                      <span className="text-sm font-semibold text-ink-900 truncate">
                        {item.storeName || item.folderName}
                      </span>
                      {item.isBlogRegistered && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold">
                          <FileText className="w-2.5 h-2.5" strokeWidth={2.5} />
                          블로그
                        </span>
                      )}
                      {item.alreadyImported && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink-100 text-ink-500 text-[10px] font-bold">
                          <CheckCircle2 className="w-2.5 h-2.5" strokeWidth={2.5} />
                          임포트 완료
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-ink-500">
                      {item.workDate && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" strokeWidth={2} />
                          {item.workDate}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Tag className="w-3 h-3" strokeWidth={2} />
                        {item.industry}
                      </span>
                      {item.tag && (
                        <span className="text-ink-400">({item.tag})</span>
                      )}
                    </div>
                    <p className="text-[11px] text-ink-400 font-mono truncate">
                      slug: {item.slug}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. 임포트 결과 */}
      {results && (
        <section
          ref={resultsRef}
          className="rounded-3xl bg-white border border-ink-100 p-6 md:p-8 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <h2 className="text-lg font-bold text-ink-900">임포트 결과</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatusCard
              label="생성"
              count={results.filter((r) => r.status === "created").length}
              tone="success"
            />
            <StatusCard
              label="스킵"
              count={results.filter((r) => r.status === "skipped").length}
              tone="neutral"
            />
            <StatusCard
              label="사진 없음"
              count={results.filter((r) => r.status === "no_photos").length}
              tone="warning"
            />
            <StatusCard
              label="실패"
              count={results.filter((r) => r.status === "failed").length}
              tone="error"
            />
          </div>

          <div className="divide-y divide-ink-100">
            {results.map((r) => (
              <div
                key={r.folderId}
                className="py-3 flex items-start gap-3 text-sm"
              >
                {r.status === "created" && (
                  <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" strokeWidth={2} />
                )}
                {r.status === "skipped" && (
                  <CheckCircle2 className="w-4 h-4 text-ink-400 mt-0.5 shrink-0" strokeWidth={2} />
                )}
                {r.status === "no_photos" && (
                  <ImageOff className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" strokeWidth={2} />
                )}
                {r.status === "failed" && (
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink-900">
                    {r.storeName || r.folderId}
                  </p>
                  {r.status === "created" && (
                    <p className="text-xs text-ink-500">
                      Before {r.beforeCount}장 · After {r.afterCount}장 저장됨
                      {r.slug && (
                        <>
                          {" · "}
                          <Link
                            href={`/cases/${r.slug}`}
                            target="_blank"
                            className="text-brand-600 hover:underline"
                          >
                            상세 보기
                          </Link>
                        </>
                      )}
                    </p>
                  )}
                  {r.status === "skipped" && (
                    <p className="text-xs text-ink-500">
                      이미 등록된 폴더 — 중복 insert 방지됨
                    </p>
                  )}
                  {r.status === "no_photos" && (
                    <p className="text-xs text-amber-700">
                      시공 전/후 폴더에 사진이 없어서 임포트를 생략했습니다.
                    </p>
                  )}
                  {r.status === "failed" && (
                    <p className="text-xs text-red-600">{r.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {importError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {importError}
        </p>
      )}
    </div>
  );
}

function StatusCard({
  label,
  count,
  tone,
}: {
  label: string;
  count: number;
  tone: "success" | "neutral" | "error" | "warning";
}) {
  const bg =
    tone === "success"
      ? "bg-brand-50 border-brand-200 text-brand-700"
      : tone === "error"
        ? "bg-red-50 border-red-200 text-red-700"
        : tone === "warning"
          ? "bg-amber-50 border-amber-200 text-amber-700"
          : "bg-ink-50 border-ink-200 text-ink-700";
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-1 ${bg}`}>
      <p className="text-[11px] uppercase tracking-[0.14em] font-semibold">
        {label}
      </p>
      <p className="text-2xl font-bold tabular-nums">{count}</p>
    </div>
  );
}
