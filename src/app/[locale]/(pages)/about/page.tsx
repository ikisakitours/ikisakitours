import React from "react";
import { Hero } from "@/components/ui/Hero";
import AboutBody from "@/components/about/AboutBody";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getTravelAgencySchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/about", locale),
  };
}

export default async function AboutUsPage() {
  const locale = await getLocale();
  const t = await getTranslations("AboutPage.Hero");

  const orgSchema = getTravelAgencySchema(locale);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "私たちについて" : "About Us", url: `/${locale}/about` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={[orgSchema, breadcrumbSchema]} />
      <Hero
        image={t("image")}
        altText={t("altText")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        accent={t("accent")}
        strapline={t("strapline")}
      />
      <AboutBody />
    </main>
  );
}
