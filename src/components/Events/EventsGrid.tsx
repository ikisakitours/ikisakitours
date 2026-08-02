"use client";

import React, { useState, useMemo } from "react";
import CustomSelect from "@/components/ui/CustomSelect";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "./EventCard";
import { SpecialEventListItem } from "@/data/specialEvents";
import { Button } from "@/components/ui/Button";

interface SpecialEventsGridProps {
  events: SpecialEventListItem[];
  categories: readonly string[];
}

const INITIAL_COUNT = 2;

export function EventsGrid({ events, categories }: SpecialEventsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleEvents.length < filteredEvents.length;

  if (events.length === 0) {
    return (
      <EmptyState
        backgroundText="Coming Soon"
        title="No events currently available"
        description="We are preparing some exciting new events and celebrations for you. Please check back later!"
      />
    );
  }

  return (
    <>
      {/* Search & Filter Controls Bar */}
      <div className="mb-12 md:mb-16 xl:mb-16 2xl:mb-20 3xl:mb-24  space-y-8">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="relative justify-start md:w-40 w-full">
            <CustomSelect
              value={selectedCategory}
              onChange={(val) => {
                setSelectedCategory(val);
                setVisibleCount(INITIAL_COUNT);
              }}
              options={categories}
              placeholder="Filter by Category"
            />
          </div>

          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setVisibleCount(INITIAL_COUNT); // Search කරන විට reset වීම
            }}
            placeholder="Search events, festivals, broadcasts..."
            count={filteredEvents.length}
            itemLabel="Event"
            className="w-full md:w-72 lg:flex-none lg:w-96"
          />
        </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 2xl:grid-cols-3 2xl:gap-9 3xl:grid-cols-4 3xl:gap-10">
            {visibleEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

          {/* Load More Section */}
          <div className="mt-10 flex flex-col items-center md:mt-14">
            {hasMore ? (
              <Button type="button" variant="explore" onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}>
                Load More Events
              </Button>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-gold/20" />
              <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Showing <span className="text-gold">{visibleEvents.length}</span> of{" "}
                <span className="text-white">{filteredEvents.length}</span> Events
              </p>
              <div className="h-px w-8 bg-gold/20" />
            </div>
          </div>
        </>
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
            setVisibleCount(INITIAL_COUNT);
          }}
        />
      )}
    </>
  );
}
