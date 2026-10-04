import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { LiveTicker } from "@/components/home-v4/LiveTicker";
import CasesFeedGrid from "@/components/home-v4/CasesFeedGrid";
import PaginatedCasesSection from "@/components/home-v4/PaginatedCasesSection";
import {
  listAllCases,
  listAllCasesIncludingUnpublished,
  listUnifiedCases,
} from "@/lib/data/cases";

const CASES_PAGE_SIZE = 4;
import { getAdminSession } from "@/lib/admin-session";
import CasesAdminPanel from "@/components/admin/CasesAdminPanel";

const RECENT_UPLOADS = [
  "방금 · 성남시 치킨전문점 · 후드 시공 완료 사진 12장 업로드",
  "3분 전 · 서울 강남 카페 · 에스프레소 머신 청소 전후 등록",
  "12분 전 · 수원 이자카야 · 덕트 청소 영상 업로드",
  "28분 전 · 성남 분당 베이커리 · 오븐 대청소 사진 8장",
  "45분 전 · 안양 브런치카페 · 매장 전체 리셋 결과 등록",
  "1시간 전 · 광명 헬스장 · 바닥 왁싱 시공 영상 업로드",
  "2시간 전 · 부천 PC방 · 카펫 시공 전후 사진 등록",
  "3시간 전 · 화성 편의점 · 냉장 매대 청소 결과 6장",
];

export default async function CasesPage() {
  const session = await getAdminSession();
  const isAdmin = !!session;
  // 관리자: 비공개 포함 전체 / 공개: 공개 레코드만
  // 통합 사례 섹션은 1페이지(대표 or 일반)만 서버에서 미리 로드, 이후는 fetch
  const [cases, casesInitial] = await Promise.all([
    isAdmin ? listAllCasesIncludingUnpublished() : listAllCases(),
    listUnifiedCases(1, CASES_PAGE_SIZE),
  ]);
  const publicCases = isAdmin
    ? cases.filter((c) => c.is_published)
    : cases;

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        <section className="relative bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 78% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-20 md:pt-28 lg:pt-32 pb-6 md:pb-10 lg:pb-12">
            <LiveTicker items={RECENT_UPLOADS} intervalMs={4500} prefix="Now" />
          </div>
        </section>

        {isAdmin && <CasesAdminPanel cases={cases} />}

        <PaginatedCasesSection
          initialCases={casesInitial.cases}
          initialTotalPages={casesInitial.totalPages}
          pageSize={CASES_PAGE_SIZE}
        />

        <section className="relative bg-ink-50 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-24 lg:h-32 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgb(248 249 250) 0%, rgba(248,249,250,0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24 lg:h-32 z-10"
            style={{
              background:
                "linear-gradient(to top, rgb(248 249 250) 0%, rgba(248,249,250,0) 100%)",
            }}
          />
          <CasesFeedGrid cases={publicCases} />
        </section>

        <section className="bg-white py-14 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="rounded-2xl md:rounded-3xl bg-ink-50 border border-ink-100 p-5 md:p-10 lg:p-12 flex flex-col gap-4 md:gap-6">
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
                For Owners
              </span>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-ink-900 leading-[1.2] tracking-tight break-keep">
                사장님 매장도
                <br />
                이 피드에 오를 수 있어요.
              </h2>
              <p className="text-xs md:text-[15px] lg:text-base text-ink-600 leading-[1.55] md:leading-[1.7] break-keep">
                모든 사진은 사장님 동의를 받아 공개합니다. 시공 후 사례 등록에
                동의해주시면 매장 노출 효과와 함께 소정의 감사 리워드도 준비해
                드립니다.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-11 md:h-12 lg:h-13 px-5 md:px-6 lg:px-7 rounded-full bg-ink-900 text-white text-xs md:text-sm font-semibold hover:bg-brand-600 transition-colors w-fit"
              >
                지금 상담 시작하기
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </section>

        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}
