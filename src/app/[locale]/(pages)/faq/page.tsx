import React, { Suspense } from "react";
import { Hero } from "@/components/ui/Hero";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { FaqClientWrapper } from "@/components/faq/FaqClientWrapper";
import JsonLd from "@/components/seo/JsonLd";
import { getFaqSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
import { faqService } from "@/services/faqs/faqService";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FaqPage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/faq", locale),
  };
}

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("FaqPage.Hero");

  let schemas: Array<Record<string, unknown>> = [
    getBreadcrumbSchema([
      { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
      { name: locale === "ja" ? "よくある質問" : "Frequently Asked Questions", url: `/${locale}/faq` },
    ]),
  ];

  try {
    const faqs = await faqService.getFaqs(locale).catch(() => []);
    if (Array.isArray(faqs) && faqs.length > 0) {
      schemas.push(
        getFaqSchema(
          faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))
        )
      );
    }
  } catch {
    // Graceful fallback if backend is unreachable
  }

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={schemas} />
      <Hero
        image={t("backGroundImage")}
        altText={t("altText")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        accent={t("accent")}
        strapline={t("strapline")}
      />
      <Suspense fallback={<div className="h-96" />}>
        <FaqClientWrapper />
      </Suspense>
    </main>
  );
}
