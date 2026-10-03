import type { MetadataRoute } from "next";

const SITE_URL = "https://bbkorea.co.kr";

const STATIC_ROUTES: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFreq: "weekly" },
  { path: "/services", priority: 0.9, changeFreq: "monthly" },
  { path: "/cases", priority: 0.7, changeFreq: "weekly" },
  { path: "/app", priority: 0.7, changeFreq: "monthly" },
  { path: "/about", priority: 0.7, changeFreq: "monthly" },
  { path: "/about/ceo", priority: 0.6, changeFreq: "yearly" },
  { path: "/about/ci", priority: 0.5, changeFreq: "yearly" },
  { path: "/contact", priority: 0.9, changeFreq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));
}
