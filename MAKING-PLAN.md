# BBK 공간케어 홈페이지 — 제작 계획서

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | BBK 공간케어 홈페이지 |
| 도메인 | care.bbkorea.co.kr (임시) → 추후 변경 예정 |
| 목적 | B2B 고객 대상 서비스 소개 및 상담 문의 유도 |
| 대상 고객 | 외식업 사장님, 의원·카페·사무실 운영자 |
| 디렉토리 | `C:\Users\user\BBK-Workspace\apps\bbk-homepage` |

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프레임워크 | Next.js 16+ (App Router) — create-next-app 최신버전 |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 (CSS-first, `@theme` 블록, `tailwind.config.ts` 없음) |
| 애니메이션 | Framer Motion v12 + CSS @keyframes (marquee) |
| 백엔드 | Supabase (신규 프로젝트 — bbk-app과 분리) |
| 배포 | Vercel (별도 프로젝트) |
| 폰트 | Pretendard Variable (CDN link tag) + Inter Black (next/font) |
| 아이콘 | Lucide React |

---

## Supabase 구성 (신규 프로젝트)

- bbk-app과 완전 분리 (보안 격리)
- 홈페이지 문의 폼 데이터 전용
- 필요 테이블: `contact_inquiries` (1개)

```sql
create table contact_inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text,
  business_type text,
  service_type text,
  message text,
  status text default 'new'
);
```

---

## Vercel 구성

- 별도 Vercel 프로젝트 생성 (bbk-homepage)
- 도메인: care.bbkorea.co.kr → DNS CNAME 설정
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 개발 단계

### Phase 1 — 프로젝트 초기화 및 공통 컴포넌트
- [x] Next.js 16+ 프로젝트 생성 (`create-next-app`)
- [x] Tailwind CSS v4, Framer Motion v12, Lucide 설치
- [x] BBK 브랜드 컬러 Tailwind 테마 설정 (`globals.css` `@theme` 블록)
- [x] 공통 레이아웃 (Header, Footer)
- [ ] 공통 UI 컴포넌트 별도 파일 (`src/components/ui/` — Button, Badge, Card, Section)
- [x] SEO 메타데이터 기본 설정 (루트 `layout.tsx`)

### Phase 2 — 메인 랜딩 페이지 (`/`)
- [x] 히어로 섹션 (슬로건 + CTA 버튼) — `HeroSection.tsx`
- [x] 서비스 2축 소개 (딥케어 / 엔드케어 카드 + 마퀴) — `ServiceAxesSection.tsx`
- [x] 숫자로 보는 BBK (호버 카운트업 + 핑크 컬러) — `StatsBar.tsx`
- [x] 서비스 플로우 (신청 → 상담 → 시공 → 관리) — `ProcessSection.tsx`
- [x] 업종별 추천 섹션 (3행 마퀴) — `IndustriesSection.tsx`
- [ ] 시공사례 하이라이트 (썸네일 3~4장) — `CasesHighlight.tsx` 미구현
- [x] 하단 CTA 배너 (상담 문의 유도) — `CtaBanner.tsx`
- [x] 전용 앱 모니터링 섹션 (추가) — `AppSection.tsx`
- [x] 문제 인식 섹션 — `ProblemSection.tsx`

### Phase 3 — 서비스 상세 페이지 (`/services`)
- [x] 서비스 목록 페이지 (`/services`)
- [x] 딥케어 구독 상세 (`/services/deep-care-subscription`) — `[slug]/page.tsx` SSG
- [x] 딥케어 1회 상세 (`/services/deep-care-onetime`) — `[slug]/page.tsx` SSG
- [x] 엔드케어 정기 상세 (`/services/end-care-regular`) — `[slug]/page.tsx` SSG
- [x] 엔드케어 1회 상세 (`/services/end-care-onetime`) — `[slug]/page.tsx` SSG
- [ ] 딥케어 vs 엔드케어 비교 섹션 (서비스 목록 페이지)

### Phase 4 — 시공사례 + 회사소개 + 문의
- [ ] 시공사례 갤러리 (`/cases`) — Before/After 슬라이더 미구현
- [x] 회사소개 (`/about`) — BBK 소개, 연혁, 운영 지역
- [x] 문의하기 (`/contact`) — 상담 신청 폼 (더미 submit, Supabase 연동 미완)
- [ ] 폼 제출 후 Slack 알림 연동

### Phase 5 — SEO 및 배포
- [ ] 페이지별 OG 이미지 생성
- [ ] sitemap.xml, robots.txt 설정
- [ ] Core Web Vitals 최적화
- [ ] Vercel 배포 및 도메인 연결
- [ ] Google Search Console 등록

---

## BBK 브랜드 컬러 (Tailwind 설정)

```js
// tailwind.config.ts
colors: {
  bbk: {
    blue: '#1E3A8A',      // 메인 블루 (신뢰, 전문성)
    cyan: '#0891B2',      // 포인트 (청결, 청량)
    dark: '#0F172A',      // 텍스트
    gray: '#64748B',      // 서브 텍스트
    light: '#F0F9FF',     // 배경
    white: '#FFFFFF',
  }
}
```

---

## 디렉토리 구조 (예정)

```
bbk-homepage/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   ├── page.tsx                # 메인 랜딩
│   │   ├── services/
│   │   │   ├── page.tsx            # 서비스 목록
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # 서비스 상세
│   │   ├── cases/
│   │   │   └── page.tsx            # 시공사례
│   │   ├── about/
│   │   │   └── page.tsx            # 회사소개
│   │   └── contact/
│   │       └── page.tsx            # 문의하기
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServiceCards.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── CasesHighlight.tsx
│   │   │   └── CtaBanner.tsx
│   │   ├── services/
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   └── CompareTable.tsx
│   │   ├── cases/
│   │   │   └── BeforeAfterSlider.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── SectionTitle.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   └── client.ts
│   │   └── constants/
│   │       └── services.ts         # 상품 데이터 (노션 기반)
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── MAKING-PLAN.md
└── SITE-STRUCTURE.md
```

---

## 카피 작성 가이드 (사용자 제공 예정)

아래 섹션의 카피는 사용자가 직접 제공합니다:
- 메인 히어로 슬로건 및 서브카피
- 각 서비스 페이지 헤드라인
- 회사 소개 본문
- CTA 문구

카피 수령 전까지 `[카피 필요]` 플레이스홀더 사용.

---

## 참고 데이터 소스

- 상품 데이터: Notion 📋 상품모델 DB (`collection://6fd001c5-939e-4539-a823-f423f1a47194`)
- 시공사례: Notion 시공사례 DB (`collection://b02d186e-5f26-4c5c-8106-efba3715f0ca`)
- 기존 bbk-app: `C:\Users\user\BBK-Workspace\apps\bbk-app`
