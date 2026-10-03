import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "v4.0 프리뷰 — BBK 리뉴얼 컴포넌트",
};

const brandSwatches = [
  { name: "50", hex: "#EBF6FE" },
  { name: "100", hex: "#D0EAFC" },
  { name: "200", hex: "#A5D6F8" },
  { name: "300", hex: "#7BC1F5" },
  { name: "400", hex: "#52B7F3" },
  { name: "500", hex: "#2CA7F1" },
  { name: "600", hex: "#1A8FD8" },
  { name: "700", hex: "#1573B2" },
  { name: "800", hex: "#10578A" },
  { name: "900", hex: "#0B3E63" },
];

const inkSwatches = [
  { name: "white", hex: "#FFFFFF" },
  { name: "ink-50", hex: "#F8FAFC" },
  { name: "ink-100", hex: "#F1F5F9" },
  { name: "ink-200", hex: "#E2E8F0" },
  { name: "ink-400", hex: "#94A3B8" },
  { name: "ink-600", hex: "#475569" },
  { name: "ink-900", hex: "#0A0F1A" },
];

const services = [
  {
    head: "정기 대청소",
    sub: "매달 주방·설비를 뜯어서 세척",
    tags: ["#딥케어", "#구독"],
    popular: true,
  },
  {
    head: "1회 대청소",
    sub: "딱 한 번, 원하는 품목만 뜯어서",
    tags: ["#딥케어", "#1회"],
  },
  {
    head: "정기 일상청소",
    sub: "매일·주간 마감 청소를 통째로 위탁",
    tags: ["#엔드케어", "#정기"],
  },
  {
    head: "1회 일상청소",
    sub: "오픈/행사 전 공간 전체 리셋",
    tags: ["#엔드케어", "#1회"],
  },
];

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-white text-ink-900">
      {/* 상단 안내 */}
      <div className="bg-brand-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">
            BBK 홈페이지 v4.0 · 디자인 토큰 & 프리미티브 프리뷰
          </p>
          <p className="text-xs opacity-90">
            RENEWAL-PLAN-v4.md 섹션 3~4 시각화
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24">
        {/* 1. 컬러 시스템 */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="01 · 컬러 시스템"
            title="딱 3색만 쓰는 팔레트"
            subtitle="브랜드 블루 #2CA7F1 + 화이트 + 짙은 슬레이트 블랙. 청량감 확장을 위해 브랜드 블루는 50~900까지 파생."
          />

          <div>
            <p className="text-sm font-semibold text-ink-600 mb-3">
              브랜드 블루 팔레트
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {brandSwatches.map((s) => (
                <div key={s.name} className="flex flex-col">
                  <div
                    className="h-16 rounded-lg border border-ink-200"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="mt-2 text-xs font-medium text-ink-900">
                    {s.name}
                  </p>
                  <p className="text-xs text-ink-400 font-mono">{s.hex}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-600 mb-3">
              뉴트럴 (화이트 → 블랙)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {inkSwatches.map((s) => (
                <div key={s.name} className="flex flex-col">
                  <div
                    className="h-16 rounded-lg border border-ink-200"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="mt-2 text-xs font-medium text-ink-900">
                    {s.name}
                  </p>
                  <p className="text-xs text-ink-400 font-mono">{s.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. 타이포 위계 */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="02 · 타이포그래피"
            title="서식별 글자 크기 위계"
            subtitle="Pretendard Variable · 데스크탑 기준 (모바일은 약 60% 축소)"
          />
          <div className="flex flex-col gap-6 border-t border-ink-200 pt-6">
            <TypeRow name="표제 (Display)" size="64px / 800" cls="text-[64px] font-extrabold leading-[1.15] tracking-tight">
              청소 걱정, 오늘부터 안 하셔도 돼요.
            </TypeRow>
            <TypeRow name="대제목 (H1)" size="48px / 700" cls="text-5xl font-bold leading-tight tracking-tight">
              결과로 보여드립니다.
            </TypeRow>
            <TypeRow name="중제목 (H2)" size="36px / 700" cls="text-4xl font-bold leading-snug">
              어떤 공간이든, 밤에 다녀갑니다
            </TypeRow>
            <TypeRow name="소제목 (H3)" size="24px / 600" cls="text-2xl font-semibold">
              정기 대청소
            </TypeRow>
            <TypeRow name="부제 (Sub)" size="18px / 500" cls="text-lg font-medium text-ink-600">
              매달 주방·설비를 뜯어서 세척
            </TypeRow>
            <TypeRow name="본문 (Body)" size="16px / 400" cls="text-base leading-relaxed">
              영업이 끝난 후 시작되는 청소. 다음 날 아침, 매장을 새것처럼 되돌립니다.
            </TypeRow>
            <TypeRow name="설명 (Small)" size="14px / 400" cls="text-sm text-ink-600">
              상담 후 원하지 않으시면 부담 없이 거절하셔도 됩니다.
            </TypeRow>
            <TypeRow name="각주 (Meta)" size="12px / 500" cls="text-xs text-ink-400 tracking-wide">
              1,200+ 매장 시공 · 서울/경기 24시간 대응 · 건축물위생관리업 인증
            </TypeRow>
          </div>
        </section>

        {/* 3. 버튼 */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="03 · 버튼"
            title="Button 프리미티브"
            subtitle="Primary(강조) / Secondary(외곽선) / Ghost(무배경) 3종 × Small · Medium · Large"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padded="lg">
              <p className="text-sm font-semibold text-ink-600 mb-4">Primary</p>
              <div className="flex flex-col gap-3 items-start">
                <Button size="sm">무료 상담 받기</Button>
                <Button size="md">무료 상담 받기</Button>
                <Button size="lg">무료 상담 받기</Button>
              </div>
            </Card>
            <Card padded="lg">
              <p className="text-sm font-semibold text-ink-600 mb-4">Secondary</p>
              <div className="flex flex-col gap-3 items-start">
                <Button variant="secondary" size="sm">서비스 둘러보기</Button>
                <Button variant="secondary" size="md">서비스 둘러보기</Button>
                <Button variant="secondary" size="lg">서비스 둘러보기</Button>
              </div>
            </Card>
            <Card padded="lg">
              <p className="text-sm font-semibold text-ink-600 mb-4">Ghost</p>
              <div className="flex flex-col gap-3 items-start">
                <Button variant="ghost" size="sm">자세히 보기</Button>
                <Button variant="ghost" size="md">자세히 보기</Button>
                <Button variant="ghost" size="lg">자세히 보기</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* 4. 배지 */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="04 · 배지"
            title="Badge 프리미티브"
            subtitle="4종 톤: 강조(brand) / 소프트(subtle) / 태그(tag) / 인기(popular)"
          />
          <div className="flex flex-wrap gap-3">
            <Badge tone="brand">추천</Badge>
            <Badge tone="brand" size="md">가장 인기 있는 서비스</Badge>
            <Badge tone="subtle">#딥케어</Badge>
            <Badge tone="subtle">#구독</Badge>
            <Badge tone="tag">#치킨전문점</Badge>
            <Badge tone="tag">#후드·덕트</Badge>
            <Badge tone="popular" size="md">인기</Badge>
          </div>
        </section>

        {/* 5. 실제 서비스 4종 미니 프리뷰 */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="05 · 실전 프리뷰"
            title="서비스 4종 카드 (홈 섹션 02 미리보기)"
            subtitle="통상 용어 → 부제 → 태그 순서 규칙 적용. 정기 대청소가 '인기' 배지로 시선 잡음."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <Card key={i} hoverable padded="lg">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-ink-900 tracking-tight">
                      {s.head}
                    </h3>
                    <p className="text-base text-ink-600 leading-relaxed">
                      {s.sub}
                    </p>
                  </div>
                  {s.popular && <Badge tone="popular">인기</Badge>}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map((t) => (
                    <Badge key={t} tone="subtle">{t}</Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" rightIcon={<span>→</span>}>
                  자세히 보기
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. 마지막 CTA 배너 프리뷰 */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="06 · CTA 배너"
            title="마지막 CTA 섹션 (홈 섹션 08 미리보기)"
            subtitle="brand-500 단색 배경 + 흰 글씨. 홈 전체에서 이 컬러 배너는 딱 한 곳만."
          />
          <div className="rounded-3xl bg-brand-500 text-white p-10 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4 break-keep">
              오늘 상담 받으면,<br />이번 주에 시공 가능합니다.
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl break-keep">
              전화 한 통이면 30초 안에 견적 안내가 시작됩니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-brand-600 border-white hover:bg-brand-50"
              >
                무료 상담 받기
              </Button>
              <a
                href="tel:010-5434-4877"
                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold border border-white/60 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                ☎ 010-5434-4877
              </a>
            </div>
            <p className="mt-6 text-sm text-white/80">
              상담 후 원하지 않으시면 부담 없이 거절하셔도 됩니다.
            </p>
          </div>
        </section>

        <footer className="border-t border-ink-200 pt-8 pb-16">
          <p className="text-sm text-ink-400">
            프리뷰 페이지 · 실제 홈페이지 컨텐츠와 무관 · Phase 2에서 홈 히어로부터 실제 적용 시작
          </p>
        </footer>
      </div>
    </main>
  );
}

function TypeRow({
  name,
  size,
  cls,
  children,
}: {
  name: string;
  size: string;
  cls: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-6 items-baseline">
      <div>
        <p className="text-sm font-semibold text-ink-900">{name}</p>
        <p className="text-xs text-ink-400 font-mono">{size}</p>
      </div>
      <div className={`${cls} text-ink-900 break-keep`}>{children}</div>
    </div>
  );
}
