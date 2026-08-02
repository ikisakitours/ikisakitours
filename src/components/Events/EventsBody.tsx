import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { EventsGrid } from "@/components/Events/EventsGrid";
import { SpecialEventListItem } from "@/data/specialEvents";

interface SpecialEventsBodyProps {
  events: SpecialEventListItem[];
  categories: readonly string[];
}

export function EventsBody({ events, categories }: SpecialEventsBodyProps) {
  return (
    <ContainerLayout className="pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <EventsGrid events={events} categories={categories} />
    </ContainerLayout>
  );
}
