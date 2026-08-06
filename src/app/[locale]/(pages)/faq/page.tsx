import React from "react";
import FaqBody from "@/components/faq/FaqBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FaqPage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  const t = useTranslations("FaqPage.Hero");
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={t("backGroundImage")}
          altText={t("altText")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          strapline={t("strapline")}
        />
        <FaqBody />
      </main>
    </UserPageLayout>
  );
}
