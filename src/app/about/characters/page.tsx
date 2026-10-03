import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import CharactersView from "./CharactersView";

export const metadata = {
  title: "브랜드 캐릭터 — BBK 공간케어",
  description:
    "조라니, 라니, 둥이 — BBK의 브랜드를 사람처럼 전달하는 세 얼굴.",
};

export default function CharactersPage() {
  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        <CharactersView />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}
