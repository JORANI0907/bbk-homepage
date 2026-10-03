import Link from "next/link";
import { Quote } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CtaBannerV4 from "@/components/home-v4/CtaBannerV4";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";

export const metadata = {
  title: "대표 인사말 — BBK 공간케어",
  description:
    "범빌드코리아 대표 조동환. 야간 청소 전문 회사를 만들게 된 이야기.",
};

const MESSAGE_PARAGRAPHS = [
  "안녕하세요. 범빌드코리아 대표 조동환입니다.",
  "저희 회사는 2019년 성남의 작은 사무실에서 시작했습니다. 상업 공간을 관리하시는 사장님들이 밤늦게 남아 직접 청소하고 계신 모습을 자주 보면서, 이 일을 대신 맡아드리면 사장님들의 시간과 에너지를 지켜드릴 수 있겠다고 생각했습니다.",
  "청소는 단순히 표면을 닦는 일이 아닙니다. 사장님이 다음 날 아침 매장 문을 열었을 때 “여기서 다시 시작할 수 있겠다”는 감정을 느끼실 수 있는 것 — 저희가 매일 밤 지키려는 것은 그 감정입니다.",
  "지난 7년 동안 1,247개 매장을 관리해오며 저희는 한 가지 원칙만은 놓치지 않았습니다. 약속한 시간에, 약속한 결과를, 숨김없이 전한다는 것. 앞으로도 이 원칙은 회사가 아무리 커져도 바꾸지 않을 저희의 뿌리입니다.",
  "사장님 매장을 저희에게 맡겨주시는 것 — 그 신뢰에 매일 밤 실력과 정성으로 답하겠습니다. 언제든 편하게 연락 주십시오.",
];

export default function CeoPage() {
  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero · CEO 사진 + 인용 헤드라인 */}
        <EditableSection
          className="relative bg-white overflow-hidden"
          buttonPosition="top-20 right-4 md:top-24 md:right-6"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 20% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-400 hover:text-ink-900 font-semibold transition-colors w-fit mb-8"
            >
              <span className="w-4 h-px bg-current" />
              회사 소개로
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(10,15,26,0.15)]">
                  <EditableImage
                    contentKey="ceo.hero.image"
                    placeholder={
                      <ImagePlaceholder
                        ratio="4/5"
                        tone="light"
                        rounded="none"
                        label="CEO · Cho Dong-hwan"
                      />
                    }
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    wrapperClassName="absolute inset-0"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-8">
                <EditableText
                  contentKey="ceo.hero.label"
                  defaultText="CEO Message"
                  className="text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold"
                />
                <Quote
                  className="w-10 h-10 text-brand-500"
                  strokeWidth={1.5}
                />
                <h1 className="text-[32px] md:text-[52px] font-bold text-ink-900 leading-[1.2] tracking-[-0.02em] break-keep">
                  &ldquo;
                  <EditableText
                    contentKey="ceo.hero.title.main"
                    defaultText="공간을 지킨다는 건,"
                  />
                  <br />
                  <EditableText
                    contentKey="ceo.hero.title.accent"
                    defaultText="사장님의 내일을 지키는 일입니다."
                    className="text-ink-400"
                  />
                  &rdquo;
                </h1>
                <div>
                  <EditableText
                    as="p"
                    contentKey="ceo.hero.name"
                    defaultText="조동환"
                    className="text-base md:text-lg font-bold text-ink-900"
                  />
                  <EditableText
                    as="p"
                    contentKey="ceo.hero.role"
                    defaultText="범빌드코리아 대표"
                    className="text-sm text-ink-600 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </EditableSection>

        {/* 인사말 본문 */}
        <EditableSection className="bg-ink-50 py-24 md:py-36">
          <div className="max-w-3xl mx-auto px-5 md:px-8 flex flex-col gap-10">
            <Bridge
              contentKeyPrefix="ceo.message"
              step="Message"
              bridge="사장님께 직접 드리는 말씀입니다."
              titleMain="왜 이 일을 하는가."
            />
            <div className="flex flex-col gap-6">
              {MESSAGE_PARAGRAPHS.map((p, i) => (
                <EditableText
                  key={i}
                  as="p"
                  contentKey={`ceo.message.paragraph.${i}`}
                  defaultText={p}
                  multiline
                  className={`leading-[1.85] break-keep ${
                    i === 0
                      ? "text-xl md:text-2xl font-semibold text-ink-900"
                      : "text-[15px] md:text-lg text-ink-600"
                  }`}
                />
              ))}
            </div>

            {/* 서명 */}
            <div className="mt-6 pt-8 border-t border-ink-200 flex items-end justify-between gap-6">
              <div>
                <EditableText
                  as="p"
                  contentKey="ceo.message.sign.role"
                  defaultText="범빌드코리아 대표"
                  className="text-sm text-ink-400 mb-2"
                />
                <EditableText
                  as="p"
                  contentKey="ceo.message.sign.name"
                  defaultText="조동환"
                  className="text-2xl font-bold text-ink-900"
                />
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-semibold">
                  Signature
                </p>
                <div className="relative aspect-[3/1] w-40 md:w-56 mt-2 rounded-2xl">
                  <EditableImage
                    contentKey="ceo.message.signature"
                    placeholder={
                      <ImagePlaceholder
                        ratio="16/9"
                        tone="light"
                        rounded="2xl"
                        label="Sign"
                      />
                    }
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain rounded-2xl"
                    wrapperClassName="absolute inset-0"
                    buttonsPosition="top-full right-0 mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </EditableSection>

        <CtaBannerV4 />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}
