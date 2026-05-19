const FAQS = [
  {
    q: '청소 경험이 없어도 가능한가요?',
    a: '네, 이론 3일 + 현장 7일 실습으로 기초부터 배웁니다.',
  },
  {
    q: '교육은 어디서 진행되나요?',
    a: '100% 오프라인 1:1 진행입니다.',
  },
  {
    q: 'BBK앱은 맥스 패키지만 받을 수 있나요?',
    a: '네, BBK앱 세팅은 맥스 패키지에만 포함됩니다. 3개월 무료 후 월 6,930원(정가 30% 할인)이 영구 적용됩니다.',
  },
  {
    q: '할부나 분납이 가능한가요?',
    a: '현재는 일시불로만 운영됩니다.',
  },
  {
    q: '월 정원이 왜 3명인가요?',
    a: '완전한 1:1 교육 품질을 위해 월 최대 3명만 받습니다.',
  },
] as const

export default function AcademyFaq() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#0b0b0f]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          SECTION 06 — FAQ
        </p>

        <h2
          className="text-white font-black leading-tight break-keep mb-12"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          자주 묻는 질문
        </h2>

        <div className="flex flex-col divide-y divide-white/10">
          {FAQS.map(({ q, a }, idx) => (
            <div key={idx} className="py-7">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00ff66] mt-1 flex-shrink-0 w-5">
                  Q
                </span>
                <div>
                  <p className="text-white font-bold leading-snug break-keep mb-3">
                    {q}
                  </p>
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e8a] mt-0.5 flex-shrink-0">
                      A
                    </span>
                    <p className="text-[#8e8e8a] leading-relaxed break-keep text-sm">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
