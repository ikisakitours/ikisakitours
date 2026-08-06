import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { BookingDetailSections } from "@/components/booking/BookingDetailSections";
import RelatedBookingSections from "./RelatedBookingSections";
import { BookingWidget } from "@/components/booking/BookingWidget";
import type { bookingTour, travelerOptions } from "@/data/multiDaysBooking";
import { StickyBookingBar } from "@/components/booking/StickyBookingBar";

type BookingBodyProps = {
  tour: typeof bookingTour;
  options: typeof travelerOptions;
  assurances: readonly string[];
  tourType?: "multi" | "one";
};

export default function BookingBody({ tour, options, assurances, tourType }: BookingBodyProps) {
  return (
    <ContainerLayout className="min-h-screen pt-27 sm:pt-25 md:pt-30 lg:pt-32 2xl:pt-34 3xl:pt-36 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="xl:flex xl:gap-6 2xl:gap-12 pb-20 md:pb-28 xl:pb-20 2xl:pb-32 3xl:pb-40">
        <div className="xl:w-2/3">
          <BookingDetailSections tour={tour} tourType={tourType} />
        </div>

        <BookingWidget tour={tour} options={options} assurances={assurances} />
      </div>

      <RelatedBookingSections recommendations={tour.recommendations} insights={tour.insights} />

      <StickyBookingBar tour={tour} options={options} assurances={assurances} />
    </ContainerLayout>
  );
}
