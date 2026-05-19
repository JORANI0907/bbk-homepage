const STATS = [
  { label: '월 매출', value: '1,000만원', sub: '달성' },
  { label: '운영 시스템', value: 'BBK앱', sub: '직접 개발' },
] as const

export default function AcademyFounder() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#111117]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-12">
          SECTION 02 — 대표 소개
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* 왼쪽: 텍스트 */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#00ff66] mb-4">
              FOUNDER
            </p>

            <h2
              className="text-white font-black leading-tight break-keep mb-6"
              style={{ fontSize: 'clamp(22px, 3vw, 40px)' }}
            >
              저도 맨바닥에서 시작했습니다
            </h2>

            <p className="text-[#8e8e8a] leading-relaxed break-keep mb-8"
              style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
            >
              현재 BBK 청소 서비스를 직접 운영하며 월 매출 1,000만원을 달성했습니다.
              직접 만든 운영 시스템(BBK앱)으로 혼자 관리 중입니다.
            </p>

            <p
              className="text-white font-bold break-keep border-l-2 border-[#00ff66] pl-4"
              style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}
            >
              제가 증명한 방법 그대로 알려드립니다
            </p>
          </div>

          {/* 오른쪽: 성과 수치 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map(({ label, value, sub }) => (
              <div
                key={label}
                className="border border-white/10 p-6 md:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e8a] mb-3">
                  {label}
                </p>
                <p
                  className="text-[#00ff66] font-black leading-none mb-1"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
                >
                  {value}
                </p>
                <p className="text-[#8e8e8a] font-mono text-xs tracking-wide">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
