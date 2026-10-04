import type { MetadataRoute } from "next";

/**
 * PWA 매니페스트.
 * - 안드로이드 Chrome / iOS Safari "홈 화면에 추가" 시 아이콘·이름 표시
 * - Chrome "앱으로 설치" 지원
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BBK 공간케어",
    short_name: "BBK",
    description: "전국 24시간 야간 청소 전문 — BBK 공간케어",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2ca7f1",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
