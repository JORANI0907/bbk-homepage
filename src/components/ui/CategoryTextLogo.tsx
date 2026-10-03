import {
  getCategoryLogoSrc,
  type LogoVariant,
  type ServiceCategory,
} from "@/lib/service-categories";

type Props = {
  category: ServiceCategory;
  /** 배지 크기 (px, 정사각). 기본 80 */
  size?: number;
  /** 평상시 노출할 원거리 심볼 variant · 기본 mini (컬러) */
  restVariant?: Extract<
    LogoVariant,
    "mini" | "mini-black" | "mini-on-dark" | "mini-white"
  >;
  /** hover 시 노출할 근거리 브랜드 로고 variant · 기본 ko */
  hoverVariant?: Extract<LogoVariant, "en" | "ko" | "en-dark" | "ko-dark">;
  className?: string;
};

/**
 * 카테고리 로고 · 원거리(mini) 심볼을 평상시로, hover 시 근거리(BBK 4사분면) 브랜드 로고로 전환.
 * 부모 컨테이너에 `group` 클래스가 있어야 hover 전환이 동작합니다.
 */
export function CategoryTextLogo({
  category,
  size = 80,
  restVariant = "mini",
  hoverVariant = "ko",
  className = "",
}: Props) {
  const restSrc = getCategoryLogoSrc(category.key, restVariant);
  const hoverSrc = getCategoryLogoSrc(category.key, hoverVariant);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 평상시 · 원거리 심볼 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={restSrc}
        alt={`${category.label} 심볼`}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Hover · 근거리 브랜드 로고 (BBK 4사분면) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hoverSrc}
        alt={`${category.label} 브랜드 로고`}
        className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  );
}
