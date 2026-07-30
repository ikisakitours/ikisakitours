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
    <ContainerLayout className="mt-12">
      <EventsGrid events={events} categories={categories} />
    </ContainerLayout>
  );
}
