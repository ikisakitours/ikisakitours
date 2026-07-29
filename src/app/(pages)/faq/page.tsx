import React from "react";
import FaqBody from "@/components/faq/FaqBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import { faqPageData } from "@/data/faqData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: faqPageData.hero.strapline,
};
export default function page() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <Hero
          image={faqPageData.hero.image}
          altText={faqPageData.hero.altText}
          eyebrow={faqPageData.hero.eyebrow}
          title={faqPageData.hero.title}
          accent={faqPageData.hero.accent}
          strapline={faqPageData.hero.strapline}
        />
        <FaqBody />
      </UserPageLayout>
    </main>
  );
}
