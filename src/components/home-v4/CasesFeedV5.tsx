import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Bridge } from "./Bridge";
import { listRecentCases } from "@/lib/data/cases";
import { getContent } from "@/lib/homepage-content";
import CasesFeedGrid from "./CasesFeedGrid";

/**
 * 홈 Act 08.5 · 실시간 시공 피드 (최근 32건)
 * read-only. 텍스트/사진 편집은 /cases 관리 패널에서.
 */
export default async function CasesFeedV5() {
  const [cases, footnoteContent] = await Promise.all([
    listRecentCases(32),
    getContent("cases.footnote"),
  ]);
  const footnoteText =
    (footnoteContent?.text as string | undefined) ??
    "매장 사장님 동의 하에 공개하는 실제 시공 결과입니다.";

  return (
    <section className="bg-white py-14 md:py-24 lg:py-32 border-t border-ink-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-6 md:gap-10 lg:gap-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <Bridge
            contentKeyPrefix="cases"
            step="08.5 · 실시간 시공 사례"
            bridge="최근 시공한 매장들을 그대로 보여드릴게요."
            titleMain="진짜 매장, 진짜 결과."
            titleAccent="사장님도 이 자리에."
          />
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 h-10 md:h-11 px-4 md:px-5 rounded-full bg-ink-900 text-white text-xs md:text-sm font-semibold hover:bg-brand-600 transition-colors self-start md:self-end whitespace-nowrap"
          >
            모든 사례 보기
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.75} />
          </Link>
        </div>

        <CasesFeedGrid cases={cases} />

        <div className="flex items-center justify-center text-[11px] md:text-xs text-ink-400 text-center px-4 break-keep">
          <p>{footnoteText}</p>
        </div>
      </div>
    </section>
  );
}
