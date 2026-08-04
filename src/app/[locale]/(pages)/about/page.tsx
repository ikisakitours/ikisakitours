import React from "react";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import AboutBody from "@/components/about/AboutBody";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "AboutPage.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutUsPage() {
  const t = await getTranslations("AboutPage.Hero");

  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <Hero
          image={t("image")}
          altText={t("altText")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          strapline={t("strapline")}
        />
        <AboutBody />
      </UserPageLayout>
    </main>
  );
}
