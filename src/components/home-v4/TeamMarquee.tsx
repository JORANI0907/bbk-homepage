"use client";

import { ImageIcon } from "lucide-react";
import EditableImage from "@/components/admin/EditableImage";

type Props = {
  /** 사진 수 (기본 10장) */
  count?: number;
  /** 한 바퀴 도는 데 걸리는 시간(초). 작을수록 빠름 (기본 60) */
  speed?: number;
};

/**
 * 팀 사진을 작은 포토카드로 가로 흐르게 보여주는 섹션.
 * 우측에서 좌측으로 끊김 없이 흐름. hover 시 일시정지.
 * 1~N까지 돌아가면 자동으로 N 뒤에 다시 1이 붙어 무한 반복.
 *
 * 중요: flex `gap` 대신 각 카드에 `mr-*`를 주어
 * doubled 패턴의 `translateX(-50%)`가 수학적으로 정확히 반 바퀴 돌도록 보장.
 * `gap`을 쓰면 양 끝에만 gap이 생겨 반 바퀴 시 gap/2만큼 어긋남.
 */
export default function TeamMarquee({ count = 10, speed = 60 }: Props) {
  const photos = Array.from({ length: count }, (_, i) => i);
  // 끊김 없는 흐름을 위해 사진을 두 번 반복
  const doubled = [...photos, ...photos];

  return (
    <div className="overflow-hidden group">
      <div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((idx, i) => (
          <PhotoCard key={i} index={idx} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({ index }: { index: number }) {
  return (
    <div className="relative w-[160px] md:w-[200px] shrink-0 aspect-[4/5] rounded-2xl overflow-hidden border border-ink-100 bg-white shadow-[0_8px_30px_-15px_rgba(10,15,26,0.15)] mr-4 md:mr-6">
      <EditableImage
        contentKey={`about.team.photo.${index}`}
        placeholder={
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-50 via-ink-100 to-ink-200 text-ink-400">
            <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
              Team {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        }
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        wrapperClassName="absolute inset-0"
      />
    </div>
  );
}
