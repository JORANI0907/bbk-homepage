import Link from "next/link";
import {
  Calendar,
  Camera,
  Bell,
  FileBarChart,
  History,
  Shield,
  Smartphone,
  Globe,
  ArrowRight,
} from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import AppSectionV4 from "@/components/home-v4/AppSectionV4";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata = {
  title: "BBK 앱 — 시공 이후에도, 앱으로 계속 지켜드립니다",
  description:
    "정기 계약 고객에게 무료로 제공되는 BBK 전용 앱. 시공 사진·리포트·실시간 알림을 매장 밖에서도 확인하세요.",
};

const DEEP_FEATURES = [
  {
    icon: Calendar,
    title: "다음 시공 일정",
    desc: "언제 오는지 캘린더에서 바로 확인. 팀 도착 3분 전 알림.",
  },
  {
    icon: Camera,
    title: "시공 전후 사진",
    desc: "매장에 없어도 결과를 실시간으로. 사진 리포트로 정리해 드립니다.",
  },
  {
    icon: Bell,
    title: "실시간 알림",
    desc: "팀 도착·시작·완료 순간 즉시 알림. 사장님이 안심하실 수 있게.",
  },
  {
    icon: FileBarChart,
    title: "월간 리포트",
    desc: "매달 시공 횟수·품목·위생 등급을 정리해서 자동 전송.",
  },
  {
    icon: History,
    title: "위생 이력 관리",
    desc: "지난 6개월 시공 내역이 앱에 그대로 보관. 감사·심사 대응 즉시.",
  },
  {
    icon: Shield,
    title: "다점포 통합 관리",
    desc: "지점이 여럿이어도 한 화면. 지점별 성과·이슈를 한눈에.",
  },
];

const PLATFORMS = [
  { icon: Smartphone, label: "iOS · Android", desc: "앱스토어·플레이스토어 정식 등록" },
  { icon: Globe, label: "웹 브라우저", desc: "앱 설치 없이 web.bbkorea.co.kr 접속" },
];

export default function AppPage() {
  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero */}
        <section className="relative bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 20% 30%, rgba(44,167,241,0.08), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col gap-8">
                <Bridge
                  step="BBK App"
                  bridge="시공만이 아니라, 관리까지."
                  title={
                    <>
                      매장에 없어도,
                      <br />
                      <span className="text-ink-400">매장을 지켜드립니다.</span>
                    </>
                  }
                  subtitle="BBK 전용 앱은 정기 계약 고객에게 무료로 제공됩니다. 시공 사진·월간 리포트·실시간 알림을 사장님 스마트폰으로 바로."
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full bg-ink-900 text-white text-[15px] md:text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98]"
                  >
                    앱 사용 상담 받기
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                  </Link>
                  <a
                    href="https://web.bbkorea.co.kr"
                    className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full border border-ink-200 text-ink-900 text-[15px] md:text-base font-semibold hover:border-ink-900 transition-colors duration-200 active:scale-[0.98]"
                  >
                    <Globe className="w-4 h-4" strokeWidth={1.75} />
                    웹앱으로 열기
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <ImagePlaceholder
                  ratio="9/16"
                  tone="brand"
                  rounded="3xl"
                  label="BBK App Screen"
                  className="max-w-[320px] mx-auto shadow-[0_30px_80px_-25px_rgba(44,167,241,0.4)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 홈 앱 섹션 재사용 · 상세 뷰 */}
        <AppSectionV4 />

        {/* 6개 기능 상세 */}
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              step="Features"
              bridge="앱 안에 이 6가지가 들어 있어요."
              title={<>매장 밖에서도 매장을 관리하는 방법.</>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {DEEP_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <article
                    key={f.title}
                    className="rounded-3xl bg-white border border-ink-100 p-8 flex flex-col gap-5 hover:border-ink-300 hover:shadow-[0_16px_40px_-25px_rgba(10,15,26,0.15)] transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-semibold">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-ink-900 leading-snug break-keep">
                      {f.title}
                    </h3>
                    <p className="text-[14px] text-ink-600 leading-[1.65] break-keep">
                      {f.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 플랫폼 */}
        <section className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Bridge
                step="Platforms"
                bridge="아이폰·안드로이드·웹, 어디서든."
                title={
                  <>
                    설치 없이도
                    <br />
                    <span className="text-ink-400">바로 시작하실 수 있어요.</span>
                  </>
                }
              />
            </div>
            <div className="lg:col-span-6 flex flex-col gap-4">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className="rounded-3xl bg-ink-50 border border-ink-100 p-6 md:p-8 flex items-center gap-6"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-bold text-ink-900">{p.label}</p>
                      <p className="text-sm text-ink-600 leading-[1.55] break-keep">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
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
