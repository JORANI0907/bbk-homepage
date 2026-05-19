export default function AcademyCta() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#0b0b0f] overflow-hidden">
      {/* 풀블리드 워드마크 */}
      <div
        aria-hidden
        className="overflow-hidden select-none pointer-events-none mb-10"
      >
        <p
          className="text-[#00ff66] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-4 md:pl-8"
          style={{ fontSize: 'clamp(80px, 18vw, 280px)' }}
        >
          CONTACT.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2
          className="text-white font-black leading-tight break-keep mb-6"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          지금 바로 무료 상담 받으세요
        </h2>

        <p className="text-[#8e8e8a] leading-relaxed break-keep mb-10 max-w-lg"
          style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
        >
          1. 카카오 오픈채팅 입장 → 2. 대표 직접 상담 (당일 응답) → 3. 패키지 결정 후 시작일 조율
        </p>

        {/* 메인 CTA 버튼 */}
        <a
          href="http://pf.kakao.com/_JTNxin/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#00ff66] text-black font-black uppercase tracking-[0.08em] px-12 py-5 hover:brightness-110 active:scale-[0.98] transition-all mb-8"
          style={{ fontSize: 'clamp(14px, 1.6vw, 18px)' }}
        >
          카카오 채팅 상담하기
        </a>

        {/* 하단 모노 라벨 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] block">
          1:1 맞춤 교육 · 월 선착순 3명 한정
        </p>
      </div>
    </section>
  )
}
