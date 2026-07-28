import { Hero } from "@/components/ui/Hero";
import { SpecialEventsBody } from "@/components/specialEvents/SpecialEventsBody";
import { allSpecialEventsList, categories } from "@/data/specialEvents";

export default function SpecialEventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero
        image="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1920&auto=format&fit=crop"
        altText="Cultural Festivals & Special Events"
        eyebrow="Cultural Pageants & Live"
        title="Explore Island Celebrations"
        accent="Celebrations"
        strapline="Immerse in Sri Lanka's most magnificent cultural pageants and live broadcasts"
      />
      <SpecialEventsBody events={allSpecialEventsList} categories={categories} />
    </main>
  );
}