import { Hero } from "@/components/ui/Hero";
import { EventsBody } from "@/components/Events/EventsBody";
import { allSpecialEventsList, categories } from "@/data/specialEvents";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cultural Festivals & Special Events",
  description: "Immerse in Sri Lanka's most magnificent cultural pageants and live broadcasts.",
};

export default function SpecialEventsPage() {
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-background">
        <Hero
          image="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1920&auto=format&fit=crop"
          altText="Cultural Festivals & Special Events"
          eyebrow="Cultural Pageants & Live"
          title="Explore Island Celebrations"
          accent="Celebrations"
          strapline="Immerse in Sri Lanka's most magnificent cultural pageants and live broadcasts"
        />
        <EventsBody events={allSpecialEventsList} categories={categories} />
      </main>
    </UserPageLayout>
  );
}
