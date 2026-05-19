interface Package {
  id: string
  name: string
  price: string
  days: string
  features: string[]
  highlight: boolean
  chip?: string
}

const PACKAGES: Package[] = [
  {
    id: 'standard',
    name: '스탠다드',
    price: '790,000원',
    days: '총 13일',
    features: [
      '이론 교육 3일',
      '현장 실습 7일',
      '브랜딩 컨설팅 3일',
    ],
    highlight: false,
  },
  {
    id: 'pro',
    name: '프로',
    price: '990,000원',
    days: '총 16일',
    features: [
      '스탠다드 전체 포함',
      '홈페이지 제작',
      '명함 제작',
    ],
    highlight: true,
  },
  {
    id: 'max',
    name: '맥스',
    price: '1,560,000원',
    days: '총 19일',
    features: [
      '프로 전체 포함',
      'BBK앱 3개월 무료',
      '이후 월 6,930원 (정가 30% 할인 평생 적용)',
    ],
    highlight: false,
    chip: '3개월 무료 · 이후 30% 할인 평생 적용',
  },
]

export default function AcademyPackages() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#0b0b0f]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          SECTION 04 — 패키지
        </p>

        <h2
          className="text-white font-black leading-tight break-keep mb-12"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          패키지 선택
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col border p-6 md:p-8 ${
                pkg.highlight
                  ? 'border-[#00ff66]'
                  : 'border-white/10'
              }`}
            >
              {/* 추천 배지 */}
              {pkg.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#00ff66] text-black font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                    추천
                  </span>
                </div>
              )}

              {/* 패키지명 */}
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e8a] mb-3">
                {pkg.name}
              </p>

              {/* 가격 */}
              <p
                className="text-white font-black leading-none mb-1"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
              >
                {pkg.price}
              </p>

              {/* 교육일 */}
              <p className="font-mono text-xs text-[#00ff66] mb-6 tracking-wide">
                {pkg.days}
              </p>

              {/* 기능 목록 */}
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="text-[#00ff66] font-mono text-xs mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-[#8e8e8a] text-sm leading-relaxed break-keep">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* BBK앱 혜택 칩 (맥스 전용) */}
              {pkg.chip && (
                <div className="mb-6">
                  <span className="inline-block border border-[#00ff66] text-[#00ff66] font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 break-keep leading-relaxed">
                    {pkg.chip}
                  </span>
                </div>
              )}

              {/* CTA */}
              <a
                href="#"
                className="inline-flex items-center justify-center bg-[#00ff66] text-black font-bold text-sm uppercase tracking-[0.07em] px-5 py-3.5 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                카카오 오픈채팅 상담하기
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
