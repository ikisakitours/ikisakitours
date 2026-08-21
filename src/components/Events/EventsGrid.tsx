"use client";

import React, { useState, useMemo } from "react";
import CustomSelect from "@/components/ui/CustomSelect";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "./EventCard";
import { SpecialEventListItem } from "@/data/specialEvents";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

interface SpecialEventsGridProps {
  events: SpecialEventListItem[];
  categories: readonly string[];
}

const INITIAL_COUNT = 2;

export function EventsGrid({ events, categories }: SpecialEventsGridProps) {
  const t = useTranslations("Events.Explorer");
  const ALL_CATEGORY = t("Categories.All"); 

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const translatedOptions = useMemo(() => {
    return categories.map((cat) => t(`Categories.${cat}`));
  }, [categories, t]);

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const translatedItemCategory = t(`Categories.${item.category}`);
      const matchesCategory = selectedCategory === ALL_CATEGORY || translatedItemCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory, ALL_CATEGORY, t]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleEvents.length < filteredEvents.length;

  if (events.length === 0) {
    return (
      <EmptyState
        backgroundText={t("ComingSoon.backgroundText")}
        title={t("ComingSoon.title")}
        description={t("ComingSoon.description")}
      />
    );
  }

  // Dynamic Empty State Text
  let emptyDescription;
  if (searchQuery && selectedCategory !== ALL_CATEGORY) {
    emptyDescription = t("EmptyState.searchAndFilterNoResult", { query: searchQuery, category: selectedCategory });
  } else if (searchQuery) {
    emptyDescription = t("EmptyState.searchNoResult", { query: searchQuery });
  } else {
    emptyDescription = t("EmptyState.filterNoResult", { category: selectedCategory });
  }

  return (
    <>
      <div className="mb-12 md:mb-16 xl:mb-16 2xl:mb-20 3xl:mb-24  space-y-8">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="relative justify-start md:w-42 w-full">
            <CustomSelect
              value={selectedCategory}
              onChange={(val) => {
                setSelectedCategory(val);
                setVisibleCount(INITIAL_COUNT);
              }}
              options={translatedOptions}
              placeholder={t("filterPlaceholder")}
            />
          </div>

          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setVisibleCount(INITIAL_COUNT);
            }}
            placeholder={t("searchPlaceholder")}
            count={filteredEvents.length}
            itemLabel={t("eventSingular")}
            className="w-full md:w-72 lg:flex-none lg:w-96"
          />
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {filteredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 2xl:grid-cols-3 2xl:gap-9 3xl:grid-cols-4 3xl:gap-10">
            {visibleEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center md:mt-14">
            {hasMore ? (
              <Button type="button" variant="explore" className="[&_span]:text-caption!" onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}>
                {t("loadMore")}
              </Button>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-gold/20" />
              <p className="whitespace-nowrap text-tiny font-medium uppercase tracking-[0.2em] text-slate-500">
                {t("showing")} <span className="text-gold">{visibleEvents.length}</span> {t("of")}{" "}
                <span className="text-white">{filteredEvents.length}</span> {t("events")}
              </p>
              <div className="h-px w-8 bg-gold/20" />
            </div>
          </div>
        </>
      ) : (
        <EmptyState
          backgroundText={t("EmptyState.backgroundText")}
          title={t("EmptyState.title")}
          description={
            <>
              {emptyDescription}
              <br />
              {t("EmptyState.redefine")}
            </>
          }
          buttonText={t("EmptyState.resetBtn")}
          onAction={() => {
            setSearchQuery("");
            setSelectedCategory(ALL_CATEGORY);
            setVisibleCount(INITIAL_COUNT);
          }}
        />
      )}
    </>
  );
}