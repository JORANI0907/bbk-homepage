"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Heart, Play, MapPin, ImageOff } from "lucide-react";
import { maskStoreName, type Case } from "@/lib/data/cases";

const COLUMN_DURATIONS_DESKTOP = [48, 62, 54, 70];
const COLUMN_DURATIONS_MOBILE = [50, 68];

// Fisher-Yates shuffle (불변 — 원본 배열 보존)
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Props = {
  cases: Case[];
};

export default function CasesFeedGrid({ cases }: Props) {
  // 초기 렌더링: 서버와 동일하게 원본 순서 (hydration mismatch 방지)
  // 마운트 후: 랜덤 셔플 적용 → 매 세션/F5 마다 다른 순서
  const [shuffled, setShuffled] = useState<Case[]>(cases);
  useEffect(() => {
    setShuffled(shuffleArray(cases));
  }, [cases]);

  const desktopColumns = useMemo(() => splitIntoColumns(shuffled, 4), [shuffled]);
  const mobileColumns = useMemo(() => splitIntoColumns(shuffled, 2), [shuffled]);

  if (cases.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 bg-white/60 py-16 flex flex-col items-center gap-3 text-ink-500">
        <ImageOff className="w-8 h-8" strokeWidth={1.5} />
        <p className="text-sm font-semibold">아직 시공사례가 없어요.</p>
        <p className="text-xs">
          시공사례 페이지에서 사례를 추가하면 자동으로 여기에 노출됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="bbk-feed-wrapper w-full max-w-7xl mx-auto px-3 md:px-6 py-10 md:py-14">
      <div className="hidden md:grid grid-cols-4 gap-4 h-[860px] overflow-hidden">
        {desktopColumns.map((items, i) => (
          <FeedColumn
            key={`d-${i}`}
            items={items}
            duration={COLUMN_DURATIONS_DESKTOP[i % COLUMN_DURATIONS_DESKTOP.length]}
          />
        ))}
      </div>
      <div className="grid md:hidden grid-cols-2 gap-2.5 h-[720px] overflow-hidden">
        {mobileColumns.map((items, i) => (
          <FeedColumn
            key={`m-${i}`}
            items={items}
            duration={COLUMN_DURATIONS_MOBILE[i % COLUMN_DURATIONS_MOBILE.length]}
          />
        ))}
      </div>
    </div>
  );
}

function FeedColumn({ items, duration }: { items: Case[]; duration: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative">
      <div
        className="bbk-feed-column flex flex-col gap-2.5 md:gap-4"
        style={{
          animation: `bbkScrollUp ${duration}s linear infinite`,
        }}
      >
        {doubled.map((c, i) => (
          <FeedCard key={`${c.id}-${i}`} c={c} />
        ))}
      </div>
    </div>
  );
}

const RATIO_CLASS: Record<Case["ratio"], string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "9/16": "aspect-[9/16]",
  "16/9": "aspect-video",
};

function FeedCard({ c }: { c: Case }) {
  const displayUrl = c.after_images?.[0] ?? c.before_images?.[0] ?? null;
  const ratioClass = RATIO_CLASS[c.ratio] ?? "aspect-square";
  const maskedName = c.store_name ? maskStoreName(c.store_name) : null;
  const title = maskedName ?? c.industry ?? "시공사례";
  const altText = maskedName ?? c.item ?? "시공사례";

  // 로컬 토글 상태 — 세션 단위, DB에 저장 안 함
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const likeCount = c.likes + (liked ? 1 : 0);
  const saveCount = c.saves + (saved ? 1 : 0);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((v) => !v);
  };
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((v) => !v);
  };

  const card = (
    <article className="relative rounded-2xl overflow-hidden border border-ink-100 bg-white group">
      <div className={`relative w-full ${ratioClass}`}>
        {displayUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayUrl}
            alt={altText}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${
              c.is_video
                ? "bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 text-brand-500"
                : "bg-gradient-to-br from-ink-50 via-ink-100 to-ink-200 text-ink-400"
            }`}
          >
            <ImageOff className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
              {c.item ?? ""}
            </span>
          </div>
        )}
      </div>

      {c.industry && (
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur text-[10px] font-semibold text-ink-900">
            #{c.industry}
          </span>
        </div>
      )}

      {c.is_video && (
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white">
          <Play className="w-3.5 h-3.5" strokeWidth={2} fill="white" />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent">
        <div className="flex items-end justify-between text-white">
          <div className="min-w-0">
            <p className="text-[12px] font-bold truncate">{title}</p>
            {c.region && (
              <p className="text-[10px] flex items-center gap-1 text-white/85 mt-0.5">
                <MapPin className="w-3 h-3" strokeWidth={1.75} />
                {c.region}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] shrink-0 tabular-nums">
            <button
              type="button"
              onClick={toggleLike}
              aria-pressed={liked}
              aria-label={liked ? "좋아요 취소" : "좋아요"}
              className={`flex items-center gap-0.5 transition-all duration-200 active:scale-125 ${
                liked ? "text-red-500" : "text-white hover:text-red-300"
              }`}
            >
              <Heart
                className="w-3 h-3 transition-all duration-200"
                strokeWidth={2}
                fill={liked ? "currentColor" : "none"}
              />
              {likeCount}
            </button>
            <button
              type="button"
              onClick={toggleSave}
              aria-pressed={saved}
              aria-label={saved ? "저장 취소" : "저장"}
              className={`flex items-center gap-0.5 transition-all duration-200 active:scale-125 ${
                saved ? "text-yellow-400" : "text-white hover:text-yellow-200"
              }`}
            >
              <Bookmark
                className="w-3 h-3 transition-all duration-200"
                strokeWidth={2}
                fill={saved ? "currentColor" : "none"}
              />
              {saveCount}
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  return c.slug ? (
    <Link href={`/cases/${c.slug}`} className="block">
      {card}
    </Link>
  ) : (
    card
  );
}

function splitIntoColumns<T>(items: T[], columns: number): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => {
    result[i % columns].push(item);
  });
  return result;
}
