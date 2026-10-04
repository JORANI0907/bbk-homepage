import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Bridge } from "./Bridge";
import { listFeaturedCases } from "@/lib/data/cases";
import { getContent } from "@/lib/homepage-content";
import BeforeAfterCardsGrid from "./BeforeAfterCardsGrid";

/**
 * 홈 Act 08 · 시공 전·후 결과 (대표 4건)
 * read-only. 텍스트/사진 편집은 /cases 관리 패널에서.
 */
export default async function BeforeAfterV4() {
  const [cases, footnoteContent] = await Promise.all([
    listFeaturedCases(4),
    getContent("beforeafter.footnote"),
  ]);
  const footnoteText =
    (footnoteContent?.text as string | undefined) ??
    "사장님 동의 하에 공개하는 실제 시공 사진이에요. 순차적으로 사례가 추가되고 있어요.";

  return (
    <section className="bg-brand-50 py-14 md:py-24 lg:py-36 border-y border-brand-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-10 md:gap-16 lg:gap-20">
        <Bridge
          contentKeyPrefix="beforeafter"
          step="08 · 시공 전 · 후 결과"
          bridge="여기까지 이야기만 있었죠. 이제 실제로 어떻게 바뀌는지 눈으로 확인하세요."
          titleMain="말보다 결과로,"
          titleAccent="보여드릴게요."
          subtitle="사장님들 동의하에 공개하는 실제 시공 전후 사진이에요. 사장님 매장도 곧 이 자리에 오를 수 있어요."
        />

        {/* 모바일 2열 가로형 · /cases 와 동일한 패턴 (볼 사람은 눌러서 상세 봄) */}
        <BeforeAfterCardsGrid cases={cases} mobileColumns={2} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 pt-2 md:pt-4">
          <p className="text-xs text-ink-400 max-w-md break-keep leading-[1.5]">{footnoteText}</p>
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 md:gap-2 h-10 md:h-11 px-4 md:px-5 rounded-full bg-white border border-ink-200 text-ink-900 text-xs md:text-sm font-semibold hover:border-ink-900 transition-colors self-stretch md:self-auto justify-center md:justify-start"
          >
            모든 사례 보기
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
