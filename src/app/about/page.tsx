import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";
import HistoryEditable from "./HistoryEditable";

export const metadata = {
  title: "회사 소개 — BBK 공간케어",
  description:
    "범빌드코리아는 야간 청소 전문 기업으로, 1,200+ 매장을 관리해온 상업 공간 위생 관리 파트너입니다.",
};

const CORE_VALUES = [
  {
    label: "Reliability",
    title: "약속한 시간에",
    desc: "야간 시공은 시간이 곧 신뢰. 정해진 시간에 도착해 정해진 결과를 남깁니다.",
  },
  {
    label: "Craft",
    title: "장비만이 아니라 사람으로",
    desc: "설비 분해 세척은 숙련도가 곧 결과. 사람에 대한 투자를 이어갑니다.",
  },
  {
    label: "Transparency",
    title: "숨기지 않는 관리",
    desc: "전용 앱으로 시공 전후 사진과 리포트를 매번 그대로 전달합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero */}
        <EditableSection
          className="relative bg-white overflow-hidden"
          buttonPosition="top-20 right-4 md:top-24 md:right-6"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 78% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20 md:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 flex flex-col gap-8">
                <Bridge
                  contentKeyPrefix="about.hero"
                  step="About"
                  bridge="영업이 끝난 시간, 공간을 대신 지켜온 팀입니다."
                  titleMain="공간을 정리하는"
                  titleAccent="사람들이 있습니다."
                  subtitle="범빌드코리아는 2019년 성남에서 시작한 야간 상업 청소 전문 회사입니다. 1,247개 매장을 관리해오면서 저희가 지켜온 원칙은 단 하나 — 사장님이 자면서도 안심하실 수 있는 매장."
                />
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(10,15,26,0.15)]">
                  <EditableImage
                    contentKey="about.hero.image"
                    placeholder={
                      <ImagePlaceholder
                        ratio="4/5"
                        tone="light"
                        rounded="none"
                        label="Team at work"
                      />
                    }
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    wrapperClassName="absolute inset-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </EditableSection>

        {/* 핵심 가치 */}
        <EditableSection className="bg-ink-50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              contentKeyPrefix="about.values"
              step="Values"
              bridge="회사가 커져도 바꾸지 않을 3가지."
              titleMain="이 3가지가"
              titleAccent="저희를 만듭니다."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {CORE_VALUES.map((v, i) => (
                <article
                  key={v.title}
                  className="rounded-3xl bg-white border border-ink-100 p-8 md:p-10 flex flex-col gap-5"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
                    0{i + 1} ·{" "}
                    <EditableText
                      contentKey={`about.value.${i}.label`}
                      defaultText={v.label}
                    />
                  </span>
                  <EditableText
                    as="h3"
                    contentKey={`about.value.${i}.title`}
                    defaultText={v.title}
                    multiline
                    className="text-2xl font-bold text-ink-900 leading-tight break-keep"
                  />
                  <EditableText
                    as="p"
                    contentKey={`about.value.${i}.desc`}
                    defaultText={v.desc}
                    multiline
                    className="text-[15px] text-ink-600 leading-[1.6] break-keep"
                  />
                </article>
              ))}
            </div>
          </div>
        </EditableSection>

        {/* 연혁 타임라인 */}
        <EditableSection className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Bridge
                contentKeyPrefix="about.history"
                step="History"
                bridge="7년의 시간이 만든 신뢰."
                titleMain="작게 시작해서,"
                titleAccent="꾸준히 걸어왔어요."
              />
            </div>
            <HistoryEditable />
          </div>
        </EditableSection>

        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}
