const TIMELINE = [
  {
    days: 'Day 1–3',
    icon: '📖',
    title: '이론 교육',
    items: ['약품 이해', '안전 교육', '청소 원리'],
  },
  {
    days: 'Day 4–10',
    icon: '🏢',
    title: '현장 실습 (7일)',
    items: ['실제 현장 동행', '케어 노하우 전수'],
  },
  {
    days: 'Day 11–13',
    icon: '🎨',
    title: '브랜딩 컨설팅',
    items: ['상호명', 'SNS 셋업', '포지셔닝 전략'],
  },
] as const

const ADD_ONS = [
  { package: 'PRO / MAX', desc: '+3일 홈페이지 + 명함 제작' },
  { package: 'MAX 전용', desc: '+3일 BBK앱 세팅 교육' },
] as const

export default function AcademyCurriculum() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#0b0b0f]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          SECTION 03 — 커리큘럼
        </p>

        <h2
          className="text-white font-black leading-tight break-keep mb-14"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          13일이면 사업 준비 완료
        </h2>

        {/* 타임라인 */}
        <div className="relative">
          {/* 좌측 형광 녹색 수직 라인 */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00ff66]" />

          <div className="flex flex-col gap-0 pl-8 md:pl-12">
            {TIMELINE.map(({ days, icon, title, items }, idx) => (
              <div
                key={days}
                className={`relative pb-10 ${idx === TIMELINE.length - 1 ? 'pb-0' : ''}`}
              >
                {/* 타임라인 도트 */}
                <div className="absolute -left-[23px] md:-left-[27px] top-1 w-3 h-3 rounded-full bg-[#00ff66] border-2 border-[#0b0b0f]" />

                <p className="font-mono text-[10px] uppercase tracking-widest text-[#00ff66] mb-2">
                  {days}
                </p>

                <div className="border border-white/10 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{icon}</span>
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[11px] text-[#8e8e8a] border border-white/10 px-2.5 py-1 tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 옵션 */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e8a] mb-5">
            추가 옵션
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {ADD_ONS.map(({ package: pkg, desc }) => (
              <div key={pkg} className="flex items-start gap-3 border border-white/10 p-4 flex-1">
                <span
                  className="inline-block font-mono text-[10px] uppercase tracking-widest text-[#00ff66] border border-[#00ff66] px-2 py-1 whitespace-nowrap mt-0.5"
                >
                  {pkg}
                </span>
                <p className="text-white text-sm leading-relaxed break-keep">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
