import React from "react";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import AboutBody from "@/components/about/AboutBody";
import { aboutData } from "@/data/aboutData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Discover Our Story & Vision",
  description: aboutData.hero.strapline,
};
export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <Hero
          image={aboutData.hero.image}
          altText={aboutData.hero.altText}
          eyebrow={aboutData.hero.eyebrow}
          title={aboutData.hero.title}
          accent={aboutData.hero.accent}
          strapline={aboutData.hero.strapline}
        />
        <AboutBody />
      </UserPageLayout>
    </main>
  );
}
