import type { Metadata } from "next";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import LegalBody from "@/components/legal/LegalBody";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "LegalPage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <LegalBody />
      </UserPageLayout>
    </main>
  );
}
