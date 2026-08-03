import type { Metadata } from "next";
import { TestimonialExplorer } from "@/components/testimonials/TestimonialExplorer";
import { TestimonialHero } from "@/components/testimonials/TestimonialHero";
import { testimonials } from "@/data/testimonials";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export const metadata: Metadata = {
  title: "Guest Journals",
  description: "Verified guest stories and luxury travel reviews from MapMate travelers across Sri Lanka.",
};

export default function TestimonialsPage() {
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark ">
        <TestimonialHero />
        <TestimonialExplorer testimonials={testimonials} />
      </main>
    </UserPageLayout>
  );
}
