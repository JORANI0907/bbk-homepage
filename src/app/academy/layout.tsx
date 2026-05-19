import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BBK 청소창업 아카데미 — 저렴한 비용으로 월 1,000만원 사업 시작하기',
  description:
    '1:1 맞춤 교육부터 브랜딩, 운영 시스템까지. 대표가 직접 증명한 방법으로 단 13일 만에 사업 준비 완료.',
}

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return children
}
