import React from 'react';
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { SpecialEventsGrid } from "@/components/specialEvents/SpecialEventsGrid";
import { SpecialEventListItem } from "@/data/specialEvents";

interface SpecialEventsBodyProps {
  events: SpecialEventListItem[];
  categories: readonly string[];
}

export function SpecialEventsBody({ events, categories }: SpecialEventsBodyProps) {
  return (
    <ContainerLayout className="mt-12">
      <SpecialEventsGrid events={events} categories={categories} />
    </ContainerLayout>
  );
}