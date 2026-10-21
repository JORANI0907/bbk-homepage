import type { MetadataRoute } from "next";

const SITE_URL = "https://bbkorea.co.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/preview"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/api/", "/preview"],
      },
      {
        userAgent: "NaverBot",
        allow: "/",
        disallow: ["/api/", "/preview"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/preview"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
