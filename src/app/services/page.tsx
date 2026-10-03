import { ServicesClient } from "./ServicesClient";

export const metadata = {
  title: "서비스 안내 — BBK 공간케어",
  description:
    "1회성 청소, 정기 청소, 식품안심업소, 향기 케어, 정리정돈, 특수 케어 — BBK가 제공하는 6가지 공간케어 서비스를 한 페이지에서 확인하세요.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
