import {
  getCategoryLogoSrc,
  type ServiceCategoryKey,
} from "@/lib/service-categories";

type Props = {
  category: ServiceCategoryKey;
  /** 다크 배경 (Act 07 처럼) 에서 사용 시 true */
  dark?: boolean;
  /** 로고 크기 (px). 정사각 컨테이너 */
  size?: number;
  /** hover 없이 항상 KO 로고만 노출 */
  forceKo?: boolean;
  className?: string;
};

/**
 * 카테고리 로고 렌더. 기본 EN, 부모의 `group` hover 시 KO 로 부드럽게 전환.
 * SVG 는 next/image 최적화가 필요 없고 Next.js 기본 차단 이슈를 피하려 native <img> 사용.
 * 사용처에서 감싸는 컨테이너에 `group` 클래스를 넣어야 hover 전환이 동작합니다.
 */
export function CategoryLogo({
  category,
  dark = false,
  size = 48,
  forceKo = false,
  className = "",
}: Props) {
  const enSrc = getCategoryLogoSrc(category, dark ? "en-dark" : "en");
  const koSrc = getCategoryLogoSrc(category, dark ? "ko-dark" : "ko");

  if (forceKo) {
    return (
      <span
        className={`relative inline-block ${className}`}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={koSrc}
          alt={`${category} 로고`}
          width={size}
          height={size}
          className="w-full h-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={enSrc}
        alt={`${category} logo`}
        width={size}
        height={size}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={koSrc}
        alt={`${category} 한글 로고`}
        width={size}
        height={size}
        className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  );
}
