const BENEFITS = [
  {
    label: '수료생 전용 커뮤니티',
    desc: '카카오 오픈채팅 수료생방',
  },
  {
    label: '월 1회 Q&A',
    desc: '대표 직접 참여',
  },
  {
    label: '성과 공유',
    desc: '수료생 월매출 달성 인증',
  },
] as const

export default function AcademyCommunity() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#111117]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          SECTION 05 — 수료 후 지원
        </p>

        <h2
          className="text-white font-black leading-tight break-keep mb-14"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          수료 후에도 끝나지 않습니다
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BENEFITS.map(({ label, desc }) => (
            <div key={label} className="border border-white/10 p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#00ff66] mb-3">
                {label}
              </p>
              <p className="text-white text-base leading-relaxed break-keep">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
