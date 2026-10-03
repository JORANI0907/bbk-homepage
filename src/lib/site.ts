export const SITE = {
  brand: {
    name: "범빌드코리아",
    shortName: "BBK",
    tagline: "공간케어 · 야간 청소 전문",
  },
  contact: {
    tel: "1522-9597",
    telDisplay: "1522-9597",
    telHref: "tel:1522-9597",
    email: "sunrise@bbkorea.co.kr",
    emailHref: "mailto:sunrise@bbkorea.co.kr",
    kakaoChannel: "#",
  },
  app: {
    label: "앱 열기",
    href: "https://app.bbkorea.co.kr",
  },
  company: {
    ceo: "조동환",
    reg: "398-81-04260",
    address: "성남시 둔촌대로268번길 22 201호",
  },
  socials: [
    { label: "인스타그램", href: "#" },
    { label: "네이버 블로그", href: "#" },
    { label: "유튜브", href: "#" },
  ],
  nav: [
    {
      label: "서비스",
      href: "/services",
      children: [
        { label: "딥 케어", href: "/services#deepcare", desc: "새것처럼 깨끗하게" },
        { label: "엔드 케어", href: "/services#endcare", desc: "오늘 마감, 내일 오픈 위탁" },
        { label: "향기 케어", href: "/services#scentcare", desc: "매장 첫인상은 향기" },
        { label: "위생 등급", href: "/services#hygiene", desc: "식품안심업소 컨설팅" },
        { label: "정리 수납", href: "/services#organizing", desc: "공간 창출, 동선 효율" },
        { label: "특수 케어", href: "/services#special", desc: "일반 청소로 안 되는 문제" },
      ],
    },
    { label: "시공사례", href: "/cases" },
    {
      label: "회사소개",
      href: "/about",
      children: [
        { label: "회사 소개", href: "/about", desc: "미션·연혁·팀" },
        { label: "대표 인사말", href: "/about/ceo", desc: "왜 이 사업을 시작했나" },
        { label: "브랜드(CI)", href: "/about/ci", desc: "로고·컬러·규정" },
        { label: "브랜드 캐릭터", href: "/about/characters", desc: "조라니·라니·둥이" },
      ],
    },
    { label: "문의하기", href: "/contact" },
    { label: "블로그", href: "/blog" },
  ],
  trust: {
    metrics: [
      { value: "1,200+", label: "누적 시공 매장" },
      { value: "86", label: "대청소 가능 품목" },
      { value: "42", label: "일상청소 가능 품목" },
      { value: "24시", label: "야간 시공 가능" },
    ],
    strip: "매달 500건 이상 고객님이 공간 진행 · 전국 24시 서비스 · 건축물위생관리업 인증 기업",
  },
  services: [
    {
      slug: "deep-care-subscription",
      head: "정기 대청소",
      sub: "매달 주방·설비를 뜯어서 세척",
      tags: ["#딥케어", "#구독"],
      popular: true,
      description:
        "후드·덕트, 가스레인지, 냉장고 등 오래 묶인 오염을 매달 한 번씩 뜯어서 청소합니다.",
    },
    {
      slug: "deep-care-onetime",
      head: "1회 대청소",
      sub: "딱 한 번, 원하는 품목만 뜯어서",
      tags: ["#딥케어", "#1회"],
      description:
        "오픈 전, 계절 대청소, 또는 정기 청소 체험용으로 한 번만 이용합니다.",
    },
    {
      slug: "end-care-regular",
      head: "정기 일상청소",
      sub: "매일·주간 마감 청소를 통째로 위탁",
      tags: ["#엔드케어", "#정기"],
      description:
        "테이블, 바닥, 화장실까지 매일 나오는 청소를 통째로 맡깁니다.",
    },
    {
      slug: "end-care-onetime",
      head: "1회 일상청소",
      sub: "오픈/행사 전 공간 전체 리셋",
      tags: ["#엔드케어", "#1회"],
      description:
        "오픈, 행사, 계절 대청소 전에 공간 전체를 한 번에 초기화합니다.",
    },
  ],
} as const;
