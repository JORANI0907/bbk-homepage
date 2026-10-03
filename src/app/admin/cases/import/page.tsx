import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import DriveImportView from "./DriveImportView";

export const metadata = {
  title: "Drive 임포트 — 시공사례 관리",
};

export default async function DriveImportPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login?next=/admin/cases/import");
  }

  return (
    <>
      <HeaderV4 />
      <main className="bg-ink-50 min-h-screen pt-28 md:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <DriveImportView />
        </div>
      </main>
      <FooterV4 />
    </>
  );
}
