import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import HeroV5 from "@/components/home-v4/HeroV5";
import LiveFeedV5 from "@/components/home-v4/LiveFeedV5";
import ProblemStoryV4 from "@/components/home-v4/ProblemStoryV4";
import ServiceGridV4 from "@/components/home-v4/ServiceGridV4";
import StatsBarV4 from "@/components/home-v4/StatsBarV4";
import TestimonialsV4 from "@/components/home-v4/TestimonialsV4";
import ComparisonV4 from "@/components/home-v4/ComparisonV4";
import AppSectionV4 from "@/components/home-v4/AppSectionV4";
import BeforeAfterV4 from "@/components/home-v4/BeforeAfterV4";
import CasesFeedV5 from "@/components/home-v4/CasesFeedV5";
import ProcessV4 from "@/components/home-v4/ProcessV4";
import IndustriesV4 from "@/components/home-v4/IndustriesV4";
import BlogFeedV5 from "@/components/home-v4/BlogFeedV5";
import FaqV4 from "@/components/home-v4/FaqV4";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import { IndustryProvider } from "@/components/home-v4/IndustryContext";

export default function Home() {
  return (
    <IndustryProvider>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Act 01 · Hero · 검정 헤드 + 검색·카테고리 카드 (숨고 스타일) */}
        <HeroV5 />
        {/* Act 01.5 · Live Feed · 라이브 활동 피드 (살아있는 사이트 인상) */}
        <LiveFeedV5 />
        {/* Act 02 · Empathy · 흰 배경 */}
        <ProblemStoryV4 />
        {/* Act 03 · Solutions · 회 배경 */}
        <ServiceGridV4 />
        {/* Act 04 · Proof (강조 훅) · 브랜드 파랑 */}
        <StatsBarV4 />
        {/* Act 05 · Testimonials · 하늘 배경 */}
        <TestimonialsV4 />
        {/* Act 06 · Difference · 흰 배경 */}
        <ComparisonV4 />
        {/* Act 07 · Care After (강조 훅) · 검정 배경 */}
        <AppSectionV4 />
        {/* Act 08 · Results Before/After · 하늘 배경 */}
        <BeforeAfterV4 />
        {/* Act 08.5 · Cases Feed · 인스타 그리드 (실제 매장 사진) */}
        <CasesFeedV5 />
        {/* Act 09 · How · 흰 배경 */}
        <ProcessV4 />
        {/* Act 10 · Coverage · 회 배경 */}
        <IndustriesV4 />
        {/* Act 10.5 · Blog · 청소·매장 인사이트 (전문성 각인) */}
        <BlogFeedV5 />
        {/* Act 11 · Q&A · 흰 배경 */}
        <FaqV4 />
        {/* Act 12 · CTA (강조 훅) · 검정 배경 */}
        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </IndustryProvider>
  );
}
