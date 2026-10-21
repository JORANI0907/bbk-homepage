import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/ui/CursorGlow";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { HomepageContentProvider } from "@/components/admin/HomepageContentProvider";
import FloatingActions from "@/components/home-v4/FloatingActions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bbkorea.co.kr"),
  title: {
    default: "범빌드코리아 BBK — 야간 청소 전문 | 상업 청소",
    template: "%s | 범빌드코리아 BBK",
  },
  description:
    "범빌드코리아(BBK)는 전국 24시간 야간 청소 전문 업체입니다. 매장·주방 후드·덕트·바닥 청소를 매달 500건 이상 진행하고 있습니다. BBK 공간케어로 청소 걱정 끝.",
  keywords: [
    "범빌드코리아",
    "BBK",
    "BBK 공간케어",
    "범빌드코리아 BBK",
    "야간 청소",
    "매장 청소",
    "상업 청소",
    "주방 후드 청소",
    "덕트 청소",
    "정기 청소",
    "청소 업체",
    "청소 전문",
  ],
  authors: [{ name: "범빌드코리아 BBK" }],
  creator: "범빌드코리아 BBK",
  publisher: "범빌드코리아 BBK",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bbkorea.co.kr",
    siteName: "범빌드코리아 BBK",
    title: "범빌드코리아 BBK — 야간 청소 전문 | 상업 청소",
    description:
      "범빌드코리아(BBK)는 전국 24시간 야간 청소 전문 업체입니다. 매장·주방 후드·덕트·바닥 청소를 매달 500건 이상 진행합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "범빌드코리아 BBK — 야간 청소 전문",
    description:
      "범빌드코리아(BBK)는 전국 24시간 야간 청소 전문 업체입니다. 매달 500건 이상의 상업 청소를 진행합니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://bbkorea.co.kr",
  },
  appleWebApp: {
    capable: true,
    title: "범빌드코리아 BBK",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#2ca7f1",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "범빌드코리아",
  alternateName: ["BBK", "BBK 공간케어", "범빌드코리아 BBK"],
  url: "https://bbkorea.co.kr",
  logo: "https://bbkorea.co.kr/opengraph-image.png",
  description:
    "범빌드코리아(BBK)는 전국 24시간 야간 청소 전문 업체입니다. 매장·주방 후드·덕트·바닥 청소를 매달 500건 이상 진행합니다.",
  foundingDate: "2023",
  areaServed: {
    "@type": "Country",
    name: "대한민국",
  },
  sameAs: [
    "https://bbkorea.co.kr",
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "범빌드코리아 BBK",
  alternateName: ["BBK", "범빌드코리아"],
  url: "https://bbkorea.co.kr",
  image: "https://bbkorea.co.kr/opengraph-image.png",
  description:
    "범빌드코리아(BBK)는 전국 24시간 야간 청소 전문 업체입니다. 매장·주방 후드·덕트·바닥 청소를 매달 500건 이상 진행합니다.",
  priceRange: "₩₩",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "경기도",
    addressLocality: "성남시",
  },
  areaServed: "KR",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="min-h-full">
        <AdminProvider>
          <HomepageContentProvider>
            <CursorGlow />
            {children}
            <FloatingActions />
          </HomepageContentProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
