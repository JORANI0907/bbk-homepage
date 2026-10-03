import { BlogListClient } from "./BlogListClient";

export const metadata = {
  title: "블로그 · 인사이트 — BBK 공간케어",
  description:
    "청소 팁, 위생 관리, 매장 스토리, 운영 노하우, 업계 트렌드 — 사장님을 위한 청소·매장 인사이트를 모았습니다.",
};

export default function BlogPage() {
  return <BlogListClient />;
}
