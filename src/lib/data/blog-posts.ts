import type { BlogCategoryKey } from "@/lib/blog-categories";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryKey;
  publishedAt: string;
  readTime: number;
  coverLabel?: string;
  featured?: boolean;
  tags?: string[];
  /** 본문 · MVP 는 문자열 초안, 이후 MDX 로 마이그레이션 */
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "seongnam-a-cafe-32hours",
    title: "성남시 A카페 사장님이 매달 32시간을 되찾은 방법",
    excerpt:
      "매주 10시간씩 마감청소에 쏟던 시간을 정기 위탁으로 돌려 매장 운영에 집중한 A카페의 3개월 변화 기록.",
    category: "store-story",
    publishedAt: "2026-08-19",
    readTime: 4,
    coverLabel: "A카페 · 매장 스토리",
    featured: true,
    tags: ["카페", "정기청소", "매장운영"],
    content: `본문은 이후 실제 콘텐츠로 대체 예정입니다.

## 시작 · 하루 3시간의 청소 시간
성남시 판교의 A카페 사장님은 매일 마감 후 평균 2~3시간을 청소에 쏟고 있었습니다. 주방·홀·화장실을 혼자 정리하다 보니 11시에 문을 닫아도 새벽 1시가 넘어야 퇴근할 수 있었죠.

## 변화 · BBK 정기 일상청소 도입
정기 일상청소를 주 5회로 전환한 뒤, 사장님은 매일 마감 시간에 문만 잠그고 퇴근하기 시작했습니다.

## 결과 · 32시간 확보
매주 10시간, 매달 40시간에 가까운 시간이 되돌아왔습니다. 그 시간은 신메뉴 개발, 인스타 콘텐츠 촬영, 그리고 무엇보다 사장님의 휴식으로 이어졌습니다.

_(placeholder — 이후 실제 인터뷰 콘텐츠로 대체)_`,
  },
  {
    slug: "hygiene-grade-a-five-principles",
    title: "위생 등급 A 유지하는 5가지 원칙",
    excerpt:
      "식품안심업소 지정을 받은 매장들이 공통적으로 지키는 관리 원칙을 정리했습니다. 심사 준비부터 유지까지.",
    category: "hygiene",
    publishedAt: "2026-08-12",
    readTime: 5,
    coverLabel: "위생 등급 · 가이드",
    tags: ["위생등급", "HACCP", "식품안심업소"],
    content: `본문은 이후 실제 콘텐츠로 대체 예정입니다.

## 원칙 1 · 그리스트랩 주기 관리
가장 자주 지적받는 부분입니다. 월 1회 이상 분해 세척이 권장됩니다.

## 원칙 2 · 냉장·냉동 온도 기록
심사관은 기록의 지속성을 봅니다.

## 원칙 3 · 원재료 표기
공급 원산지·소비 기한 표기가 정확해야 합니다.

## 원칙 4 · 종사자 위생 교육
연 1회 이상 교육 이수 증빙 필수.

## 원칙 5 · 시설 청결 상태의 상시 유지
심사 당일에만 청소한 것과 상시 유지한 것은 티가 납니다.

_(placeholder — 이후 실제 가이드 콘텐츠로 대체)_`,
  },
  {
    slug: "night-hood-duct-cleaning",
    title: "후드·덕트 청소, 왜 야간에 해야 할까요",
    excerpt:
      "영업 시간을 침해하지 않고 화재 위험도 낮추는 야간 시공의 이유. 시공팀이 야간을 선호하는 3가지 이유.",
    category: "cleaning-tips",
    publishedAt: "2026-07-28",
    readTime: 6,
    coverLabel: "후드·덕트 · 청소 팁",
    tags: ["후드", "덕트", "야간시공"],
    content: `본문은 이후 실제 콘텐츠로 대체 예정입니다.

## 이유 1 · 영업 방해 없음
낮에 시공하면 손님 접근이 어렵고 소음·냄새가 매장에 남습니다.

## 이유 2 · 완전 건조 시간 확보
세척 후 완전 건조까지 6~8시간이 필요합니다. 야간 시공은 다음 날 오전 오픈에 딱 맞습니다.

## 이유 3 · 화재 위험 감소
낮 시간 시공 중 화기가 남아있으면 위험도가 올라갑니다.

_(placeholder — 이후 실제 콘텐츠로 대체)_`,
  },
  {
    slug: "cleaning-checklist-10",
    title: "외식 사장님이 놓치기 쉬운 청소 체크리스트 10",
    excerpt:
      "겉으로는 깨끗해 보여도 놓치기 쉬운 10가지 포인트. BBK 시공팀이 현장에서 자주 발견하는 문제를 정리.",
    category: "operations",
    publishedAt: "2026-07-14",
    readTime: 7,
    coverLabel: "체크리스트 · 운영 노하우",
    tags: ["체크리스트", "운영", "청소"],
    content: `본문은 이후 실제 콘텐츠로 대체 예정입니다.

## 자주 놓치는 10곳
1. 냉장고 하단 배수구
2. 후드 필터 뒷면
3. 그리스트랩 내부
4. 싱크대 배관 접합부
5. 벽면 타일 줄눈
6. 인덕션·하이라이트 하단
7. 카운터 뒷면
8. 홀 테이블 다리
9. 화장실 환풍구
10. 외부 배기팬

_(placeholder — 이후 실제 콘텐츠로 대체)_`,
  },
  {
    slug: "2026-sanitation-regulation-update",
    title: "2026년 외식업 위생 규정 변화 정리",
    excerpt:
      "2026년부터 바뀌는 식품위생법 시행령 요약. 사장님이 미리 준비해야 할 3가지.",
    category: "trends",
    publishedAt: "2026-06-30",
    readTime: 5,
    coverLabel: "2026 · 업계 트렌드",
    tags: ["법령", "위생", "2026"],
    content: `본문은 이후 실제 콘텐츠로 대체 예정입니다.

## 준비 사항 1 · 표기 의무 확대
2026년 1월부터 원재료 원산지 표기 기준이 엄격해집니다.

## 준비 사항 2 · 교육 시간 증가
연 4시간 → 6시간으로 증가.

## 준비 사항 3 · 자율 점검 기록 의무화
자율 점검표를 매월 작성·보관해야 합니다.

_(placeholder — 이후 실제 콘텐츠로 대체)_`,
  },
];

export const BLOG_POSTS_BY_SLUG = BLOG_POSTS.reduce(
  (acc, p) => ({ ...acc, [p.slug]: p }),
  {} as Record<string, BlogPost>,
);

/** 최신순 정렬 · publishedAt DESC */
export function getSortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

/** 카테고리 필터 */
export function getPostsByCategory(
  categoryKey: BlogPost["category"] | "all",
): BlogPost[] {
  const sorted = getSortedPosts();
  if (categoryKey === "all") return sorted;
  return sorted.filter((p) => p.category === categoryKey);
}

/** 관련 글 · 같은 카테고리 최신 N개 (자기 자신 제외) */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getSortedPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, limit);
}
