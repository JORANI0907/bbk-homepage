const PROBLEMS = [
  {
    num: '01',
    text: '청소를 기초부터 배우고 싶다',
  },
  {
    num: '02',
    text: '청소는 할 줄 아는데 어떻게 영업해야 할지 모르겠다',
  },
  {
    num: '03',
    text: '브랜드 없이 시작하면 단가를 낮출 수밖에 없다',
  },
  {
    num: '04',
    text: '고객이 생겨도 일정·정산 관리가 엉망이 된다',
  },
] as const

export default function AcademyProblem() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#0b0b0f]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          SECTION 01 — 고민
        </p>

        <h2
          className="text-white font-black leading-tight break-keep mb-12"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          혼자 청소업 시작하려는데
          <br />
          이런 고민 있으시죠?
        </h2>

        {/* 카드 4개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {PROBLEMS.map(({ num, text }) => (
            <div
              key={num}
              className="relative border border-white/10 p-6 md:p-8 overflow-hidden"
            >
              {/* 배경 번호 — outline 스타일 */}
              <p
                aria-hidden
                className="absolute bottom-3 right-4 font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(60px, 8vw, 100px)',
                  WebkitTextStroke: '1px #00ff66',
                  color: 'transparent',
                  opacity: 0.18,
                }}
              >
                {num}
              </p>

              <p className="font-mono text-xs tracking-widest uppercase text-[#00ff66] mb-4">
                {num}
              </p>
              <p className="text-white text-base leading-relaxed break-keep relative z-10">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* 섹션 말미 */}
        <p
          className="text-[#00ff66] font-bold break-keep"
          style={{ fontSize: 'clamp(16px, 2vw, 24px)' }}
        >
          이 모든 걸 BBK 아카데미가 해결합니다
        </p>
      </div>
    </section>
  )
}
