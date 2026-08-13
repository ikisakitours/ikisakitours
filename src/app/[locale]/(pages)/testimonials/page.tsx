import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TestimonialExplorer } from "@/components/testimonials/TestimonialExplorer";
import { TestimonialHero } from "@/components/testimonials/TestimonialHero";
import { testimonials } from "@/data/testimonials";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Testimonials.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <TestimonialHero />
      <TestimonialExplorer testimonials={testimonials} />
    </main>
  );
}
