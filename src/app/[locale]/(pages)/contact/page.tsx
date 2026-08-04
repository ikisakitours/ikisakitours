import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ContactBody from "@/components/contact/ContactBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "ContactPage.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContactPage() {
  const t = useTranslations("ContactPage.Hero");

  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        {/* Hero Section */}
        <Hero
          image={t("image")}
          altText={t("altText")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          strapline={t("strapline")}
        />
        <ContactBody />
      </main>
    </UserPageLayout>
  );
}
