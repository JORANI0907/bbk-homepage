import { notFound } from "next/navigation";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import { getCaseBySlug, maskStoreName } from "@/lib/data/cases";
import CaseDetailView from "./CaseDetailView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) {
    return {
      title: "시공사례 — BBK 공간케어",
    };
  }
  const maskedName = c.store_name ? maskStoreName(c.store_name) : null;
  const title = maskedName
    ? `${maskedName} 시공사례 — BBK 공간케어`
    : "시공사례 — BBK 공간케어";
  const description = `${c.industry ?? ""} ${c.region ?? ""} ${maskedName ?? ""} 야간 시공 전후 비교. 작업 전 ${c.before_images.length}장, 작업 후 ${c.after_images.length}장.`;
  return { title, description };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) notFound();

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        <CaseDetailView caseData={c} />
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}
