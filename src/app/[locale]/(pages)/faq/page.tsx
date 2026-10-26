import React, { Suspense } from "react";
import { Hero } from "@/components/ui/Hero";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { FaqClientWrapper } from "@/components/faq/FaqClientWrapper";

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
    <main className="min-h-screen bg-lanka-dark">
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
