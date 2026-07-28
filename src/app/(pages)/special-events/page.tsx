"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { Hero } from "@/components/ui/Hero"; 
import { allSpecialEvents } from "@/data/allSpecialEvents";
import { CalendarDays, Radio, Sparkles, ExternalLink } from "lucide-react";

const categories = ["All", "Live", "Special Event", "Event"] as const;

export default function SpecialEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredEvents = useMemo(() => {
    return allSpecialEvents.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Hero
        image="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1920&auto=format&fit=crop"
        altText="Cultural Festivals & Special Events"
        eyebrow="Cultural Pageants & Live"
        title="Explore Island Celebrations"
        accent="Celebrations"
        strapline="Immerse in Sri Lanka's most magnificent cultural pageants and live broadcasts"
      />

      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute left-1/2 top-96 -translate-x-1/2 h-96 w-96 rounded-full bg-gold/10 blur-[150px]" />

      <ContainerLayout className="mt-12">
        {/* Search & Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 mb-12 border-b border-white/10">
          <div className="w-full md:w-64">
            <CustomSelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              placeholder="Filter by Category"
            />
          </div>

          <div className="w-full md:w-96">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search events, festivals, broadcasts..."
              count={filteredEvents.length}
              itemLabel="Event"
            />
          </div>
        </div>

        {/* Content Section: Events Grid or Empty State */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="glass-card group flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 p-4 transition-all duration-300 hover:border-gold/50 hover:shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-surface">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 backdrop-blur-md">
                    {event.category === "Live" ? (
                      <Radio className="h-3 w-3 text-red-500 animate-pulse" />
                    ) : (
                      <Sparkles className="h-3 w-3 text-gold" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">{event.category}</span>
                  </div>

                  {/* Status / Date Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 font-medium">
                      <CalendarDays className="h-3.5 w-3.5 text-gold" />
                      <span>{event.date}</span>
                    </div>
                    <span className="rounded-full bg-gold/20 border border-gold/40 px-2.5 py-0.5 text-[10px] font-bold text-gold uppercase">
                      {event.status}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="flex flex-col flex-grow p-4 pt-6">
                  <h3 className="premium-serif text-xl font-normal text-white mb-3 group-hover:text-gold transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-slate-300 line-clamp-3 mb-6 flex-grow">
                    {event.description}
                  </p>

                  <Button variant="shine" href={event.href} className="w-full">
                    <span className="flex w-full items-center justify-center gap-2 whitespace-nowrap">
                      <span>View Event Details</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Integration */
          <EmptyState
            backgroundText="No Events"
            title="No matching celebrations found"
            description="We couldn't find any events matching your search or category filter. Try resetting your filters to explore more."
            buttonText="Reset Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          />
        )}
      </ContainerLayout>
    </main>
  );
}
