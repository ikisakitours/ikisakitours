import React from "react";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import ContactBody from "@/components/contact/ContactBody";
import { Hero } from "@/components/ui/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { getContactPageSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "ContactPage.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/contact", locale),
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const tHero = await getTranslations("ContactPage.Hero");

  const contactSchema = getContactPageSchema(locale);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "お問い合わせ" : "Contact Us", url: `/${locale}/contact` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={[contactSchema, breadcrumbSchema]} />
      {/* Hero Section */}
      <Hero
        image={tHero("image")}
        altText={tHero("altText")}
        eyebrow={tHero("eyebrow")}
        title={tHero("title")}
        accent={tHero("accent")}
        strapline={tHero("strapline")}
      />
      <ContactBody />
    </main>
  );
}
