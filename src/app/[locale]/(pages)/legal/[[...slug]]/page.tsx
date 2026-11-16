import type { Metadata } from "next";
import LegalBody from "@/components/legal/LegalBody";
import { getTranslations } from "next-intl/server";
import { getSeoAlternates } from "@/components/seo/schemas";

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "LegalPage.Metadata" });
  const legalPath = Array.isArray(slug) && slug.length > 0 ? `/legal/${slug.join("/")}` : "/legal";

  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates(legalPath, locale),
  };
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <LegalBody />
    </main>
  );
}
