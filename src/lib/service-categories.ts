import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Repeat,
  ShieldCheck,
  Flower2,
  Layers,
  Wrench,
  Clock,
  Sparkles,
  BookOpen,
  FileCheck,
  Wind,
  Star,
  Package,
  Boxes,
  Droplets,
  Bug,
} from "lucide-react";

export type ServiceCategoryKey =
  | "deepcare"
  | "endcare"
  | "scentcare"
  | "hygiene"
  | "organizing"
  | "special";

export type Situation = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type ServiceCategory = {
  key: ServiceCategoryKey;
  /** 한글 라벨 (텍스트로 노출) */
  label: string;
  /** 영문 라벨 (호버·강조용) */
  labelEn: string;
  short: string;
  /** 카테고리 텍스트 로고용 4글자 한글 (예: "대청소.") */
  shortHangul: string;
  /** 브랜드 로고 SVG fill 색상 · 텍스트 로고 outline/글자에도 사용 */
  brandColor: string;
  href: string;
  desc: string;
  iconColor: string;
  /** 카테고리를 상징하는 Lucide 아이콘 (상황 카드용) */
  icon: LucideIcon;
  tagline: string;
  longDesc: string;
  situations: Situation[];
  /** Deep/End 상품(services.ts) 매핑 */
  relatedProducts?: string[];
  /** 카테고리 자체 품목 리스트 */
  items?: string[];
};

/**
 * 로고 파일 경로 규칙 · 카테고리 key 와 파일명 일치.
 * · 근거리 (BBK 4사분면 대형 로고)
 *   /logos/categories/{key}.svg              · EN 컬러 (기본)
 *   /logos/categories/{key}-ko.svg           · KO 컬러 (호버)
 *   /logos/categories/{key}-on-dark.svg      · EN · 다크 배경
 *   /logos/categories/{key}-ko-on-dark.svg   · KO · 다크 배경
 * · 원거리/작은 사이즈용 심볼
 *   /logos/categories/{key}-mini.svg         · 컬러 (기본)
 *   /logos/categories/{key}-mini-black.svg   · 검정
 *   /logos/categories/{key}-mini-on-dark.svg · 다크 배경용
 *   /logos/categories/{key}-mini-white.svg   · 흰색
 */
export type LogoVariant =
  | "en"
  | "ko"
  | "en-dark"
  | "ko-dark"
  | "mini"
  | "mini-black"
  | "mini-on-dark"
  | "mini-white";

const VARIANT_SUFFIX: Record<LogoVariant, string> = {
  en: "",
  ko: "-ko",
  "en-dark": "-on-dark",
  "ko-dark": "-ko-on-dark",
  mini: "-mini",
  "mini-black": "-mini-black",
  "mini-on-dark": "-mini-on-dark",
  "mini-white": "-mini-white",
};

export function getCategoryLogoSrc(
  key: ServiceCategoryKey,
  variant: LogoVariant = "en",
): string {
  return `/logos/categories/${key}${VARIANT_SUFFIX[variant]}.svg`;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    key: "deepcare",
    label: "딥 케어",
    labelEn: "Deep Care",
    short: "딥케어",
    shortHangul: "대청소.",
    brandColor: "#1E4FD8",
    href: "/services#deepcare",
    desc: "새것처럼 깨끗하게",
    iconColor: "bg-brand-50 text-brand-600",
    icon: Zap,
    tagline: "새것처럼, 뜯어서 딥하게.",
    longDesc:
      "후드·덕트, 가스레인지, 냉장고 등 오래 쌓인 오염을 뜯어서 세척합니다. 1회부터 매달 정기까지, 매장 상태에 맞게 선택하세요.",
    situations: [
      {
        icon: Zap,
        title: "오픈 전 빠른 리셋",
        desc: "오프닝 앞두고 시간이 부족할 때",
      },
      {
        icon: Sparkles,
        title: "누적 오염 초기화",
        desc: "몇 년 묵은 때를 한 번에 제거",
      },
      {
        icon: Clock,
        title: "체험용으로 부담 없이",
        desc: "정기 계약 전 먼저 시공해보고 결정",
      },
    ],
    relatedProducts: ["deep-care-onetime", "deep-care-subscription"],
  },
  {
    key: "endcare",
    label: "엔드 케어",
    labelEn: "End Care",
    short: "엔드케어",
    shortHangul: "정기청소",
    brandColor: "#1FA971",
    href: "/services#endcare",
    desc: "오늘 마감, 내일 오픈",
    iconColor: "bg-emerald-50 text-emerald-600",
    icon: Repeat,
    tagline: "매일 마감청소, 통째로 위탁.",
    longDesc:
      "영업 종료 후 마감 정리·청소를 전문팀에 통째로 위탁합니다. 매일·주간 정기부터 오픈 전 1회 리셋까지 준비돼 있어요.",
    situations: [
      {
        icon: Repeat,
        title: "마감 시간 되돌리기",
        desc: "매일 새벽까지 이어지던 마감청소 위탁",
      },
      {
        icon: ShieldCheck,
        title: "매일 위생 상태 유지",
        desc: "손님 앞에 항상 깨끗한 매장",
      },
      {
        icon: Sparkles,
        title: "행사·오픈 전 리셋",
        desc: "특별한 날 앞두고 공간 전체 초기화",
      },
    ],
    relatedProducts: ["end-care-regular", "end-care-onetime"],
  },
  {
    key: "scentcare",
    label: "향기 케어",
    labelEn: "Scent Care",
    short: "향기",
    shortHangul: "향기케어",
    brandColor: "#8E6CCF",
    href: "/services#scentcare",
    desc: "매장 첫인상은 향기",
    iconColor: "bg-pink-50 text-pink-600",
    icon: Flower2,
    tagline: "매장의 첫인상, 향으로 완성.",
    longDesc:
      "매장에 들어선 순간의 첫인상은 향에서 시작됩니다. 화장실·흡연구역 냄새부터 매장 전반의 향까지, 프리미엄 공간을 위해 관리합니다.",
    situations: [
      {
        icon: Flower2,
        title: "매장 첫인상 개선",
        desc: "입장 순간의 향 관리",
      },
      {
        icon: Wind,
        title: "화장실·흡연구역 냄새",
        desc: "지속되는 냄새 원인 제거",
      },
      {
        icon: Star,
        title: "프리미엄 공간 브랜딩",
        desc: "매장 아이덴티티에 맞춘 향 구성",
      },
    ],
    items: [
      "매장 방향 시스템 설치",
      "화장실 탈취·항균",
      "흡연구역 냄새 관리",
      "오존 살균",
      "향 조합 컨설팅",
    ],
  },
  {
    key: "hygiene",
    label: "위생 등급",
    labelEn: "Hygiene",
    short: "위생등급",
    shortHangul: "위생등급",
    brandColor: "#F29F05",
    href: "/services#hygiene",
    desc: "식품안심업소 컨설팅",
    iconColor: "bg-amber-50 text-amber-700",
    icon: ShieldCheck,
    tagline: "위생등급 대응, 전문 시공팀.",
    longDesc:
      "위생등급제·식품안심업소 지정을 준비하는 사장님을 위해 정밀 위생 청소와 서류 대응까지 함께 지원합니다.",
    situations: [
      {
        icon: ShieldCheck,
        title: "위생등급 대응",
        desc: "심사 기준에 맞춘 정밀 청소",
      },
      {
        icon: BookOpen,
        title: "HACCP 사전 준비",
        desc: "인증 준비 단계 전문 지원",
      },
      {
        icon: FileCheck,
        title: "행정 서류 대응",
        desc: "심사 필요 서류 작성 지원",
      },
    ],
    items: [
      "HACCP 사전 점검·세척",
      "위생등급제 심사 대응",
      "그리스트랩 정밀 관리",
      "냉장·냉동 살균",
      "심사 서류 대응 컨설팅",
    ],
  },
  {
    key: "organizing",
    label: "정리 수납",
    labelEn: "Organizing",
    short: "정리",
    shortHangul: "정리수납",
    brandColor: "#D9734E",
    href: "/services#organizing",
    desc: "공간 창출, 동선 효율",
    iconColor: "bg-indigo-50 text-indigo-600",
    icon: Layers,
    tagline: "청소를 넘어, 자리까지.",
    longDesc:
      "청소가 끝난 뒤 물건이 제자리에 있어야 진짜 정리입니다. 창고·백스토어·진열대까지 자리와 배치를 잡아드립니다.",
    situations: [
      {
        icon: Layers,
        title: "청소 이후 자리 배치",
        desc: "물건을 다시 올바른 자리에",
      },
      {
        icon: Package,
        title: "창고·백스토어 정리",
        desc: "재고와 자재 분류·배치",
      },
      {
        icon: Boxes,
        title: "진열대·라벨링",
        desc: "매장 진열 재구성과 라벨 정리",
      },
    ],
    items: [
      "창고·백스토어 정리",
      "진열대 재배치",
      "시공 후 자리 정돈",
      "재고 라벨링",
      "자재 분류·수납",
    ],
  },
  {
    key: "special",
    label: "특수 케어",
    labelEn: "Special Care",
    short: "특수",
    shortHangul: "특수청소",
    brandColor: "#37474F",
    href: "/services#special",
    desc: "일반 청소로 안 되는 문제",
    iconColor: "bg-purple-50 text-purple-600",
    icon: Wrench,
    tagline: "일반 청소로 안 되는 문제, 전문 장비로.",
    longDesc:
      "일반 청소로 해결이 안 되는 문제 — 곰팡이, 화재·수해 복구, 흡연 냄새, 특수 얼룩 — 각 분야 전문 장비로 해결합니다.",
    situations: [
      {
        icon: Wrench,
        title: "일반 청소로 안 되는 문제",
        desc: "전문 장비·약제로 해결",
      },
      {
        icon: Droplets,
        title: "화재·수해 이후 복구",
        desc: "잔여물 제거와 위생 복구",
      },
      {
        icon: Bug,
        title: "곰팡이·해충 문제",
        desc: "원인 진단과 근본 제거",
      },
    ],
    items: [
      "유리 코팅",
      "카펫·러그 딥클리닝",
      "곰팡이 제거",
      "흡연 냄새 제거",
      "화재·수해 이후 복구",
      "스팀 살균",
    ],
  },
];

export const CATEGORY_MAP = SERVICE_CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.key]: c }),
  {} as Record<ServiceCategoryKey, ServiceCategory>,
);
