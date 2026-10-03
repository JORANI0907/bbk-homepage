import Link from "next/link";
import { Download, X, Check } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import { Bridge } from "@/components/home-v4/Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";

export const metadata = {
  title: "브랜드 아이덴티티 — BBK 공간케어",
  description:
    "BBK 로고, 컬러, 타이포그래피 사용 규정과 다운로드 자산.",
};

const MAIN_LOGOS = [
  {
    label: "한글 · 흰 배경",
    note: "기본 사용 · 밝은 배경 위",
    cardBg: "bg-white",
    cardBorder: "border-ink-100",
    labelTone: "text-ink-900",
    noteTone: "text-ink-500",
    stepTone: "text-brand-600",
    placeholderTone: "light" as const,
  },
  {
    label: "한글 · 검정 배경",
    note: "다크 모드 · 검정 배너 위",
    cardBg: "bg-ink-900",
    cardBorder: "border-ink-800",
    labelTone: "text-white",
    noteTone: "text-white/60",
    stepTone: "text-brand-400",
    placeholderTone: "dark" as const,
  },
  {
    label: "영문 · 흰 배경",
    note: "해외 · 영문 제안서용",
    cardBg: "bg-white",
    cardBorder: "border-ink-100",
    labelTone: "text-ink-900",
    noteTone: "text-ink-500",
    stepTone: "text-brand-600",
    placeholderTone: "light" as const,
  },
  {
    label: "영문 · 검정 배경",
    note: "다크 모드 · 영문 배너용",
    cardBg: "bg-ink-900",
    cardBorder: "border-ink-800",
    labelTone: "text-white",
    noteTone: "text-white/60",
    stepTone: "text-brand-400",
    placeholderTone: "dark" as const,
  },
];

const BRAND_LOGOS = [
  { label: "딥 케어", note: "주방·설비 분해 세척" },
  { label: "엔드 케어", note: "일상 마감 청소" },
  { label: "향기 케어", note: "방향·탈취 시스템" },
  { label: "위생 등급", note: "식품안심업소 컨설팅" },
  { label: "정리 수납", note: "공간 창출·동선 효율" },
  { label: "특수 케어", note: "일반 청소로 안 되는 문제" },
];

const COLORS = [
  { name: "Brand Blue", hex: "#2CA7F1", role: "메인 브랜드 컬러 · CTA·강조" },
  { name: "Ink Black", hex: "#0A0F1A", role: "본문 텍스트·헤드라인" },
  { name: "White", hex: "#FFFFFF", role: "기본 배경" },
  { name: "Brand Light", hex: "#EBF6FE", role: "섹션 대체 배경·소프트 UI" },
];

const TYPO = [
  {
    label: "표제 (Display)",
    size: "64 / 800",
    sample: "청소 걱정, 안 하셔도 돼요.",
    cls: "text-4xl md:text-6xl font-bold",
  },
  {
    label: "중제목 (H2)",
    size: "36 / 700",
    sample: "정기 대청소",
    cls: "text-3xl font-bold",
  },
  {
    label: "본문 (Body)",
    size: "16 / 400",
    sample: "매일 밤, 저희가 대신 다녀갑니다.",
    cls: "text-base",
  },
];

const RULES = [
  { ok: true, text: "충분한 여백 확보 후 사용 (로고 높이의 50% 이상)" },
  { ok: true, text: "지정된 컬러 조합 안에서만 사용" },
  { ok: true, text: "종횡비 그대로 확대·축소" },
  { ok: false, text: "임의 색상 변경 금지" },
  { ok: false, text: "회전·기울임·왜곡 금지" },
  { ok: false, text: "다른 이미지 위에 반투명 오버레이 없이 얹기 금지" },
];

export default function CIPage() {
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
                "radial-gradient(ellipse 55% 45% at 80% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-400 hover:text-ink-900 font-semibold transition-colors w-fit mb-8"
            >
              <span className="w-4 h-px bg-current" />
              <EditableText
                contentKey="ci.hero.backLink"
                defaultText="회사 소개로"
              />
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <div className="lg:col-span-8">
                <Bridge
                  contentKeyPrefix="ci.hero"
                  step="CI · Brand Identity"
                  bridge="언론사·파트너 계약 담당자님께 드리는 공식 CI 매뉴얼입니다."
                  titleMain="BBK 브랜드"
                  titleAccent="아이덴티티 매뉴얼."
                  subtitle="로고 파일과 사용 규정을 모두 여기서 다운로드하실 수 있습니다. 브랜드 사용 문의는 sunrise@bbkorea.co.kr로 부탁드립니다."
                />
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <a
                  href="/downloads/bbk-ci-manual.pdf"
                  className="inline-flex items-center justify-center gap-2 h-13 md:h-14 px-7 rounded-full bg-ink-900 text-white text-[15px] md:text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" strokeWidth={1.75} />
                  <EditableText
                    contentKey="ci.hero.downloadLabel"
                    defaultText="CI 매뉴얼 전체 다운로드"
                  />
                </a>
              </div>
            </div>
          </div>
        </EditableSection>

        {/* 기본 브랜드 로고 4종 */}
        <EditableSection className="bg-ink-50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              contentKeyPrefix="ci.mainLogo"
              step="Main Logo"
              bridge="한글·영문 각 2종, 배경 상황에 맞게 사용해주세요."
              titleMain="기본 브랜드"
              titleAccent="로고 4종."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {MAIN_LOGOS.map((v, i) => (
                <article
                  key={v.label}
                  className={`rounded-3xl border overflow-hidden flex flex-col ${v.cardBg} ${v.cardBorder}`}
                >
                  <div className="relative aspect-square">
                    <EditableImage
                      contentKey={`ci.mainLogo.${i}.image`}
                      placeholder={
                        <ImagePlaceholder
                          ratio="1/1"
                          tone={v.placeholderTone}
                          rounded="none"
                          label={v.label}
                        />
                      }
                      alt={v.label}
                      className="absolute inset-0 w-full h-full object-contain p-6"
                      wrapperClassName="absolute inset-0"
                    />
                  </div>
                  <div className={`p-5 md:p-6 flex flex-col gap-2 border-t ${v.cardBorder}`}>
                    <span className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${v.stepTone}`}>
                      0{i + 1} · Main
                    </span>
                    <EditableText
                      as="p"
                      contentKey={`ci.mainLogo.${i}.label`}
                      defaultText={v.label}
                      className={`text-[15px] font-bold ${v.labelTone}`}
                    />
                    <EditableText
                      as="p"
                      contentKey={`ci.mainLogo.${i}.note`}
                      defaultText={v.note}
                      multiline
                      className={`text-[13px] leading-[1.55] break-keep ${v.noteTone}`}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </EditableSection>

        {/* 브랜드별 로고 6종 */}
        <EditableSection className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              contentKeyPrefix="ci.brandLogo"
              step="Service Brand"
              bridge="BBK의 6개 서비스 브랜드가 각자의 얼굴을 가지고 있어요."
              titleMain="브랜드별"
              titleAccent="로고 6종."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {BRAND_LOGOS.map((v, i) => (
                <article
                  key={v.label}
                  className="rounded-2xl border border-ink-100 bg-ink-50 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square">
                    <EditableImage
                      contentKey={`ci.brandLogo.${i}.image`}
                      placeholder={
                        <ImagePlaceholder
                          ratio="1/1"
                          tone="brand"
                          rounded="none"
                          label={v.label}
                        />
                      }
                      alt={v.label}
                      className="absolute inset-0 w-full h-full object-contain p-5"
                      wrapperClassName="absolute inset-0"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1 border-t border-ink-100 bg-white">
                    <EditableText
                      as="p"
                      contentKey={`ci.brandLogo.${i}.label`}
                      defaultText={v.label}
                      className="text-[13px] font-bold text-ink-900"
                    />
                    <EditableText
                      as="p"
                      contentKey={`ci.brandLogo.${i}.note`}
                      defaultText={v.note}
                      multiline
                      className="text-[11px] text-ink-500 leading-[1.5] break-keep"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </EditableSection>

        {/* 컬러 팔레트 */}
        <EditableSection className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              contentKeyPrefix="ci.color"
              step="Color"
              bridge="브랜드 아이덴티티의 심장."
              titleMain="단 3색으로,"
              titleAccent="브랜드를 유지합니다."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {COLORS.map((c, i) => (
                <article
                  key={c.hex}
                  className="rounded-3xl border border-ink-100 bg-white overflow-hidden flex flex-col"
                >
                  <div
                    className="aspect-[4/3]"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="p-5 md:p-6 flex flex-col gap-2 border-t border-ink-100">
                    <EditableText
                      as="p"
                      contentKey={`ci.color.${i}.name`}
                      defaultText={c.name}
                      className="text-lg font-bold text-ink-900"
                    />
                    <p className="text-xs text-ink-400 font-mono tracking-wide">
                      {c.hex}
                    </p>
                    <EditableText
                      as="p"
                      contentKey={`ci.color.${i}.role`}
                      defaultText={c.role}
                      multiline
                      className="text-[13px] text-ink-600 leading-[1.55] break-keep mt-1"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </EditableSection>

        {/* 타이포그래피 */}
        <EditableSection className="bg-ink-50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              contentKeyPrefix="ci.typo"
              step="Typography"
              bridge="한글·영문 · Pretendard Variable."
              titleMain="모든 표기,"
              titleAccent="한 폰트 안에서."
            />
            <div className="rounded-3xl border border-ink-100 bg-white overflow-hidden">
              {TYPO.map((t, i) => (
                <div
                  key={t.label}
                  className={`grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-8 items-baseline p-6 md:p-8 ${
                    i > 0 ? "border-t border-ink-100" : ""
                  }`}
                >
                  <div>
                    <EditableText
                      as="p"
                      contentKey={`ci.typo.${i}.label`}
                      defaultText={t.label}
                      className="text-sm font-semibold text-ink-900"
                    />
                    <p className="text-xs text-ink-400 font-mono mt-1">
                      {t.size}
                    </p>
                  </div>
                  <EditableText
                    as="p"
                    contentKey={`ci.typo.${i}.sample`}
                    defaultText={t.sample}
                    multiline
                    className={`${t.cls} text-ink-900 break-keep`}
                  />
                </div>
              ))}
            </div>
          </div>
        </EditableSection>

        {/* 사용 규정 */}
        <EditableSection className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
            <Bridge
              contentKeyPrefix="ci.rules"
              step="Usage Rules"
              bridge="브랜드를 보호하기 위한 최소한의 규정."
              titleMain="이 규칙만 지키면"
              titleAccent="누구나 사용 가능합니다."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {RULES.map((r, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink-100 bg-white p-5 md:p-6 flex items-start gap-4"
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      r.ok
                        ? "bg-brand-50 text-brand-600"
                        : "bg-ink-50 text-ink-400"
                    }`}
                  >
                    {r.ok ? (
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <X className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </span>
                  <EditableText
                    as="p"
                    contentKey={`ci.rule.${i}.text`}
                    defaultText={r.text}
                    multiline
                    className="text-[15px] text-ink-900 leading-[1.55] break-keep font-medium"
                  />
                </div>
              ))}
            </div>
            <div className="rounded-3xl bg-ink-50 border border-ink-100 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <EditableText
                  as="p"
                  contentKey="ci.contact.label"
                  defaultText="Brand Contact"
                  className="text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold mb-2"
                />
                <EditableText
                  as="h3"
                  contentKey="ci.contact.title"
                  defaultText="브랜드 사용 · 협업 문의"
                  multiline
                  className="text-xl md:text-2xl font-bold text-ink-900 break-keep"
                />
                <EditableText
                  as="p"
                  contentKey="ci.contact.detail"
                  defaultText="sunrise@bbkorea.co.kr · 1522-9597"
                  multiline
                  className="text-sm text-ink-600 mt-2"
                />
              </div>
              <a
                href="mailto:sunrise@bbkorea.co.kr"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                <EditableText
                  contentKey="ci.contact.button"
                  defaultText="문의 이메일 보내기"
                />
              </a>
            </div>
          </div>
        </EditableSection>
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}
