const META_ITEMS = [
  { label: '교육 방식', value: '1:1 오프라인' },
  { label: '기본 교육일', value: '13일' },
  { label: '월 정원', value: '3명 한정' },
  { label: '수료 후', value: '커뮤니티 무료 제공' },
] as const

const BADGES = [
  '현장 실습 7일 포함',
  '대표 직접 교육',
  '실제 오더까지 함께',
  'BBK앱 무료 제공 (맥스)',
  '수료생 커뮤니티',
] as const

export default function AcademyHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] pt-20 pb-0">
      {/* 배경 영상 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/academy-hero.mp4" type="video/mp4" />
      </video>
      {/* 어두운 오버레이 — 텍스트 가독성 + AI 어색함 완화 */}
      <div className="absolute inset-0 bg-black/65" />
      {/* 모노 상단 라벨 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          BBK ACADEMY · 청소창업 컨설팅
        </p>
      </div>

      {/* 풀블리드 워드마크 */}
      <div
        aria-hidden
        className="relative z-10 overflow-hidden select-none pointer-events-none mb-4"
      >
        <p
          className="text-[#00ff66] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-4 md:pl-8"
          style={{ fontSize: 'clamp(80px, 18vw, 280px)' }}
        >
          START.
        </p>
      </div>

      {/* 헤드라인 + 서브 + CTA */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-12">
        <h1
          className="text-white font-black leading-[1.08] tracking-[-0.02em] break-keep mb-4"
          style={{ fontSize: 'clamp(28px, 4.5vw, 64px)' }}
        >
          청소업 창업, 처음부터
          <br />
          월 매출 1,000만원까지 함께합니다
        </h1>

        <p
          className="text-[#8e8e8a] leading-relaxed break-keep mb-2 max-w-xl"
          style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
        >
          1:1 맞춤 교육부터 브랜딩, 실제 오더까지.
          <br />
          BBK앱으로 운영 자동화까지 단 13일 만에 사업 준비 완료
        </p>

        {/* 강조 문구 */}
        <p className="font-mono text-xs tracking-wide text-[#00ff66] mb-8 break-keep">
          실제 오더 받는 것까지 같이 합니다
        </p>

        {/* CTA + 배지 */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-12">
          <a
            href="http://pf.kakao.com/_JTNxin/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#00ff66] text-black font-bold text-sm uppercase tracking-[0.08em] px-8 py-4 hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap flex-shrink-0"
          >
            카카오 채팅으로 무료 상담하기
          </a>

          <div className="flex flex-wrap gap-2">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center border border-white/40 text-white font-mono text-[11px] px-3 py-2 tracking-wide break-keep"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* 모노 메타 그리드 */}
        <div className="border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          {META_ITEMS.map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8e8e8a] leading-none mb-1">
                {label}
              </p>
              <p className="font-mono text-[12px] text-white font-medium tracking-wide">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
