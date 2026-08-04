import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { BespokeForm } from "@/components/services/bespoke/BespokeForm";
import { Hero } from "@/components/ui/Hero";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Services.Metadata.Bespoke" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function BespokePage() {
  const t = useTranslations("Services.Hero.Bespoke");

  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={t("image")}
          altText={t("alt")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          strapline={t("strapline")}
        />
        <BespokeForm />
      </main>
    </UserPageLayout>
  );
}
