import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import { ChatInquiry } from "@/components/home-v4/ChatInquiry";

export const metadata = {
  title: "빠른 상담 — BBK 공간케어",
  description:
    "채팅으로 5초 만에 상담 시작. 대화하면서 사장님 매장에 맞는 청소를 안내해드려요.",
};

type Props = {
  searchParams: Promise<{
    service?: string;
    region?: string;
    query?: string;
  }>;
};

export default async function QuickInquiryPage({ searchParams }: Props) {
  const { service, region, query } = await searchParams;

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900 min-h-screen">
        <section className="pt-24 md:pt-28 pb-16 md:pb-24 px-5 md:px-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-3 text-center">
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
                Quick Inquiry
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-ink-900 leading-[1.2] tracking-tight break-keep">
                채팅으로 상담 시작해보세요.
              </h1>
              <p className="text-sm md:text-base text-ink-600 leading-[1.6] break-keep">
                버튼 몇 번 누르시면 접수 완료. 사장님 연락처로 직접 전화드릴게요.
              </p>
            </div>
            <ChatInquiry
              initialService={service}
              initialRegion={region}
              initialQuery={query}
            />
          </div>
        </section>
      </main>
      <FooterV4 />
    </>
  );
}
