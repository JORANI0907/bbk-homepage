const APP_FEATURES = [
  {
    label: '일정 자동화',
    desc: '작업 스케줄을 달력 뷰로 한눈에 관리. 날짜별 현장 배정 현황을 실시간으로 파악합니다.',
  },
  {
    label: '고객사 통합 관리',
    desc: '계약 정보·서비스 이력·요청사항까지 고객사별로 정리. 여러 곳을 동시에 관리해도 놓치는 것 없습니다.',
  },
  {
    label: '알림 자동 발송',
    desc: '작업 일정 SMS를 버튼 하나로 발송. 일용직·팀장급 맞춤 메시지 템플릿으로 현장 소통을 자동화합니다.',
  },
  {
    label: '서비스 현황 파악',
    desc: '계약 건수·매출·진행 상태를 한 화면에서 확인. 사업 전체 그림을 언제 어디서나 볼 수 있습니다.',
  },
  {
    label: '현장 케어 추적',
    desc: '시공 전 요청사항·고객 연락처·출입 방법까지 기록. 현장에서 따로 물어볼 필요가 없습니다.',
  },
  {
    label: '1인 운영 최적화',
    desc: '영업·배정·현장·정산까지 혼자서도 가능한 구조. 직원 없이 여러 고객사를 동시에 운영합니다.',
  },
] as const

export default function AcademyApp() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32 bg-[#111117]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* 섹션 레이블 */}
        <p className="font-mono text-xs tracking-widest uppercase text-[#8e8e8a] mb-8">
          SECTION 05 — BBK앱
        </p>

        {/* 워드마크 */}
        <div
          aria-hidden
          className="overflow-hidden select-none pointer-events-none mb-6 -mx-6 md:-mx-12"
        >
          <p
            className="text-[#00ff66] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-4 md:pl-8 opacity-15"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)' }}
          >
            APP.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
          <div className="flex-1">
            <h2
              className="text-white font-black leading-tight break-keep"
              style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
            >
              영업·현장·정산까지
              <br />
              앱 하나로 끝냅니다
            </h2>
          </div>
          <p className="text-[#8e8e8a] leading-relaxed break-keep text-sm max-w-sm md:text-right">
            맥스 패키지 수강생에게 BBK앱을 평생 무료로 제공합니다.
            대표가 직접 만든 청소 사업 전용 운영 툴입니다.
          </p>
        </div>

        {/* 피처 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {APP_FEATURES.map(({ label, desc }) => (
            <div
              key={label}
              className="bg-[#111117] p-6 md:p-8 flex flex-col gap-3 hover:bg-[#1a1a22] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#00ff66] flex-shrink-0" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#00ff66]">
                  {label}
                </p>
              </div>
              <p className="text-[#8e8e8a] text-sm leading-relaxed break-keep">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 강조 */}
        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-white font-bold break-keep">
            맥스 패키지 수강 시 BBK앱 평생 무료 제공
          </p>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e8a] sm:ml-auto">
            대표 직접 제작 · 청소 사업 전용
          </span>
        </div>
      </div>
    </section>
  )
}
