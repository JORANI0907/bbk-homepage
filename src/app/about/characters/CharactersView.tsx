"use client";

import Link from "next/link";
import { ImageIcon, ArrowRight, Sparkles } from "lucide-react";
import { Bridge } from "@/components/home-v4/Bridge";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";

type CharacterDef = {
  key: "jorani" | "rani" | "dungi";
  name: string;
  tagline: string;
  description: string;
  usage: string[];
};

const CHARACTERS: CharacterDef[] = [
  {
    key: "jorani",
    name: "조라니",
    tagline: "BBK의 공식 프론트맨",
    description:
      "현실적인 한국 남성 모델. 진회색 청바지 작업복에 티일색 포인트로 BBK의 신뢰감과 전문성을 전달합니다. 사장님과 처음 마주하는 자리에서는 늘 조라니가 먼저 인사드립니다.",
    usage: ["영업자료 · 제안서 표지", "광고 썸네일 · 유튜브 인트로", "홈페이지 Hero 사진"],
  },
  {
    key: "rani",
    name: "라니",
    tagline: "친근한 소통 담당",
    description:
      "일러스트 만화 캐릭터. 어려울 수 있는 위생·시공 설명을 부드럽게 풀어주는 역할입니다. 사장님과의 거리감을 줄여주는 BBK의 두 번째 얼굴.",
    usage: ["SMS 응대 삽화", "블로그 · 교육 자료", "인스타그램 피드 · 카드뉴스"],
  },
  {
    key: "dungi",
    name: "둥이",
    tagline: "귀여운 마스코트",
    description:
      "둥글둥글한 치비 캐릭터. 아이콘, 스티커, 알림 등 작은 순간에서 BBK를 기억하게 만듭니다. 캐릭터 중 가장 자유롭게 변형이 가능합니다.",
    usage: ["앱 알림 아이콘 · 스티커", "굿즈 · 사은품", "이모지 · 반응 아이콘"],
  },
];

const PORTFOLIO_COUNT = 10;

export default function CharactersView() {
  return (
    <>
      {/* Hero */}
      <EditableSection className="relative bg-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 80% 25%, rgba(44,167,241,0.08), transparent 60%)",
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-8">
              <Bridge
                contentKeyPrefix="characters.hero"
                step="Brand Character"
                bridge="브랜드를 사람처럼."
                titleMain="BBK를 상징하는"
                titleAccent="세 얼굴."
                subtitle="조라니, 라니, 둥이. 세 캐릭터는 각자의 자리에서 BBK를 전달합니다. 영업자료부터 작은 스티커까지, 매 순간 사장님께 BBK다움을 느끼시게 합니다."
              />
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <span className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-brand-50 text-brand-700 text-[13px] font-semibold">
                <Sparkles className="w-4 h-4" strokeWidth={1.75} />
                <EditableText
                  contentKey="characters.hero.badge"
                  defaultText="BBK Original Characters"
                />
              </span>
            </div>
          </div>
        </div>
      </EditableSection>

      {/* 캐릭터 스포트라이트 3개 */}
      {CHARACTERS.map((char, idx) => (
        <CharacterSpotlight
          key={char.key}
          char={char}
          reverse={idx % 2 === 1}
          index={idx}
        />
      ))}

      {/* 포트폴리오 마퀴 */}
      <EditableSection className="bg-ink-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-10 md:gap-14 mb-10 md:mb-14">
          <Bridge
            contentKeyPrefix="characters.portfolio"
            tone="dark"
            step="Portfolio"
            bridge="캐릭터가 실제로 쓰인 자리들."
            titleMain="세 캐릭터는 이렇게"
            titleAccent="사장님을 만났습니다."
          />
        </div>
        <PortfolioMarquee count={PORTFOLIO_COUNT} speed={80} />
      </EditableSection>

      {/* CTA */}
      <EditableSection className="bg-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl bg-ink-50 border border-ink-100 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
                Collab · Contact
              </span>
              <EditableText
                as="h3"
                contentKey="characters.cta.title"
                defaultText="캐릭터 콜라보, 캠페인 문의"
                className="text-2xl md:text-3xl font-bold text-ink-900 break-keep"
              />
              <EditableText
                as="p"
                contentKey="characters.cta.subtitle"
                defaultText="BBK 캐릭터를 활용한 공동 마케팅·굿즈·캠페인을 함께 만들어요."
                multiline
                className="text-sm md:text-base text-ink-600 leading-[1.7] max-w-xl break-keep"
              />
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-13 md:h-14 px-7 rounded-full bg-ink-900 text-white text-sm md:text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98] shrink-0"
            >
              콜라보 문의하기
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </EditableSection>
    </>
  );
}

function CharacterSpotlight({
  char,
  reverse,
  index,
}: {
  char: CharacterDef;
  reverse: boolean;
  index: number;
}) {
  const bg = index % 2 === 0 ? "bg-ink-50" : "bg-white";
  return (
    <EditableSection className={`${bg} py-24 md:py-32`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* 대표 사진 */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-ink-100 border border-ink-100 shadow-[0_30px_80px_-30px_rgba(10,15,26,0.3)]">
              <EditableImage
                contentKey={`characters.${char.key}.main`}
                placeholder={
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-500/50">
                    <ImageIcon className="w-10 h-10" strokeWidth={1.25} />
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold">
                      {char.name} · Main
                    </span>
                    <span className="text-[10px] text-ink-400">
                      권장 1200 × 1500px
                    </span>
                  </div>
                }
                alt={`${char.name} 대표 사진`}
                className="absolute inset-0 w-full h-full object-cover"
                wrapperClassName="absolute inset-0"
                maxResizeWidth={1200}
                maxResizeQuality={0.9}
              />
            </div>
          </div>

          {/* 설명 + 보조 사진 3장 */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-600 font-semibold">
                <span className="w-6 h-px bg-brand-500" />
                0{index + 1} · Character
              </span>
              <EditableText
                as="h2"
                contentKey={`characters.${char.key}.name`}
                defaultText={char.name}
                className="text-4xl md:text-5xl font-bold text-ink-900 tracking-[-0.02em] break-keep"
              />
              <EditableText
                as="p"
                contentKey={`characters.${char.key}.tagline`}
                defaultText={char.tagline}
                className="text-base md:text-lg text-brand-600 font-semibold break-keep"
              />
              <EditableText
                as="p"
                contentKey={`characters.${char.key}.description`}
                defaultText={char.description}
                multiline
                className="text-[15px] md:text-base text-ink-600 leading-[1.75] max-w-xl break-keep"
              />
            </div>

            {/* 사용되는 곳 */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-semibold">
                Where it lives
              </p>
              <ul className="flex flex-col gap-2">
                {char.usage.map((u, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] md:text-[15px] text-ink-700 break-keep"
                  >
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <EditableText
                      contentKey={`characters.${char.key}.usage.${i}`}
                      defaultText={u}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* 보조 사진 3장 */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {[0, 1, 2].map((g) => (
                <div
                  key={g}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ink-100 border border-ink-200"
                >
                  <EditableImage
                    contentKey={`characters.${char.key}.gallery.${g}`}
                    placeholder={
                      <div className="absolute inset-0 flex items-center justify-center text-ink-400">
                        <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    }
                    alt={`${char.name} 보조 사진 ${g + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    wrapperClassName="absolute inset-0"
                    maxResizeWidth={800}
                    maxResizeQuality={0.85}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}

function PortfolioMarquee({ count, speed }: { count: number; speed: number }) {
  const items = Array.from({ length: count }, (_, i) => i);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden group">
      <div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((idx, i) => (
          <PortfolioCard key={i} index={idx} />
        ))}
      </div>
    </div>
  );
}

function PortfolioCard({ index }: { index: number }) {
  const label = String(index + 1).padStart(2, "0");
  return (
    <div className="relative w-[150px] md:w-[200px] shrink-0 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] mr-3 md:mr-4">
      <EditableImage
        contentKey={`characters.portfolio.${index}`}
        placeholder={
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-800 via-ink-900 to-black text-white/40">
            <ImageIcon className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
              No.{label}
            </span>
          </div>
        }
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        wrapperClassName="absolute inset-0"
        maxResizeWidth={800}
        maxResizeQuality={0.85}
      />
    </div>
  );
}
