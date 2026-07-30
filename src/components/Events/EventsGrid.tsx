"use client";

import React, { useState, useMemo } from "react";
import CustomSelect from "@/components/ui/CustomSelect";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "./EventCard";
import { SpecialEventListItem } from "@/data/specialEvents";

interface SpecialEventsGridProps {
  events: SpecialEventListItem[];
  categories: readonly string[];
}

export function EventsGrid({ events, categories }: SpecialEventsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  if (events.length === 0) {
    return (
      <div className="py-10">
        <EmptyState
          backgroundText="Coming Soon"
          title="No events currently available"
          description="We are preparing some exciting new events and celebrations for you. Please check back later!"
        />
      </div>
    );
  }
  return (
    <>
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
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          backgroundText="No Events"
          title="No matching celebrations found"
          description={
            <>
              We couldn&apos;t find any events matching{" "}
              {searchQuery && <span className="text-gold font-medium">&quot;{searchQuery}&quot;</span>}
              {searchQuery && selectedCategory !== "All" && " in "}
              {selectedCategory !== "All" && (
                <span className="text-gold font-medium">&quot;{selectedCategory}&quot;</span>
              )}
              . Try resetting your filters to explore more.
            </>
          }
          onAction={() => {
            setSearchQuery("");
            setSelectedCategory("All");
          }}
        />
      )}
    </>
  );
}
