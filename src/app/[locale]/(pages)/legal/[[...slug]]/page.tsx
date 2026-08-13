import type { Metadata } from "next";
import LegalBody from "@/components/legal/LegalBody";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LegalPage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <LegalBody />
    </main>
  );
}
