import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { BookingDetailSections } from "@/components/booking/BookingDetailSections";
import RelatedBookingSections from "./RelatedBookingSections";
import { BookingWidget } from "@/components/booking/BookingWidget";
import type { bookingTour, travelerOptions } from "@/data/booking";
type BookingBodyProps = {
  tour: typeof bookingTour;
  options: typeof travelerOptions;
  assurances: readonly string[];
};

export default function BookingBody({ tour, options, assurances }: BookingBodyProps) {
  return (
    <ContainerLayout className="min-h-screen py-20 md:py-28 xl:py-20 2xl:py-32 3xl:py-40">
      <div className="xl:flex xl:gap-12 pb-20 md:pb-28 xl:pb-20 2xl:pb-32 3xl:pb-40">
        <div className="xl:w-2/3">
          <BookingDetailSections tour={tour} />
        </div>

        <BookingWidget tour={tour} options={options} assurances={assurances} />
      </div>

      <RelatedBookingSections recommendations={tour.recommendations} insights={tour.insights} />
    </ContainerLayout>
  );
}
