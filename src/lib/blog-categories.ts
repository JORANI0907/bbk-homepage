export type BlogCategoryKey =
  | "cleaning-tips"
  | "hygiene"
  | "store-story"
  | "operations"
  | "trends";

export type BlogCategory = {
  key: BlogCategoryKey;
  label: string;
  badgeClass: string;
  desc: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    key: "cleaning-tips",
    label: "청소 팁",
    badgeClass: "bg-brand-50 text-brand-700",
    desc: "현장에서 검증된 청소 실무 노하우",
  },
  {
    key: "hygiene",
    label: "위생 관리",
    badgeClass: "bg-amber-50 text-amber-700",
    desc: "위생등급제 · HACCP 대응 가이드",
  },
  {
    key: "store-story",
    label: "매장 스토리",
    badgeClass: "bg-pink-50 text-pink-700",
    desc: "BBK를 이용한 사장님들의 이야기",
  },
  {
    key: "operations",
    label: "운영 노하우",
    badgeClass: "bg-emerald-50 text-emerald-700",
    desc: "매장 운영에 도움 되는 실전 팁",
  },
  {
    key: "trends",
    label: "업계 트렌드",
    badgeClass: "bg-purple-50 text-purple-700",
    desc: "청소·외식 업계 최신 흐름",
  },
];

export const BLOG_CATEGORY_MAP = BLOG_CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.key]: c }),
  {} as Record<BlogCategoryKey, BlogCategory>,
);
