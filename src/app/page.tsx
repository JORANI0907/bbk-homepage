import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ProblemSection from "@/components/home/ProblemSection";
import ServiceAxesSection from "@/components/home/ServiceAxesSection";
import AppSection from "@/components/home/AppSection";
import ProcessSection from "@/components/home/ProcessSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import CtaBanner from "@/components/home/CtaBanner";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <ProblemSection />
        <ServiceAxesSection />
        <AppSection />
        <ProcessSection />
        <IndustriesSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
