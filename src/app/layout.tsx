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
    default: "BBK 공간케어 — 야간 청소 전문",
    template: "%s | BBK 공간케어",
  },
  description:
    "청소 걱정, 오늘부터 안 하셔도 돼요. 전국 24시간 야간 청소 전문. 매달 500건 이상 고객님이 공간 진행하고 있어요.",
  keywords: [
    "야간 청소",
    "매장 청소",
    "상업 청소",
    "주방 후드 청소",
    "덕트 청소",
    "정기 청소",
    "BBK",
    "범빌드코리아",
  ],
  authors: [{ name: "범빌드코리아" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bbkorea.co.kr",
    siteName: "BBK 공간케어",
    title: "BBK 공간케어 — 야간 청소 전문",
    description:
      "청소 걱정, 오늘부터 안 하셔도 돼요. 전국 24시간 야간 청소 전문.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBK 공간케어 — 야간 청소 전문",
    description:
      "청소 걱정, 오늘부터 안 하셔도 돼요. 전국 24시간 야간 청소 전문.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bbkorea.co.kr",
  },
  appleWebApp: {
    capable: true,
    title: "BBK",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#2ca7f1",
  width: "device-width",
  initialScale: 1,
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
