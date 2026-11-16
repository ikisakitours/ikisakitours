import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { TestimonialsClientWrapper } from "@/components/testimonials/TestimonialsClientWrapper";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getTravelAgencySchema, getSeoAlternates } from "@/components/seo/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Testimonials.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/testimonials", locale),
  };
}

export default async function TestimonialsPage() {
  const locale = await getLocale();
  const tMeta = await getTranslations({ locale, namespace: "Testimonials.Metadata" });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: tMeta("title"), url: `/${locale}/testimonials` },
  ]);

  const orgSchema = getTravelAgencySchema(locale);

  return (
    <>
      <JsonLd schema={[orgSchema, breadcrumbSchema]} />
      <TestimonialsClientWrapper />
    </>
  );
}
