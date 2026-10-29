"use client";

import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { BookingDetailSections } from "@/components/booking/BookingDetailSections";
import RelatedBookingSections from "./RelatedBookingSections";
import { BookingWidget } from "@/components/booking/BookingWidget";
import type { bookingTour } from "@/data/multiDaysBooking";
import { StickyBookingBar } from "@/components/booking/StickyBookingBar";
import { useBookingWidget } from "@/hooks/Booking/useBookingWidget";
import { AuthRequiredModal } from "@/components/ui/AuthRequiredModal";

type BookingBodyProps = {
  tour: typeof bookingTour;
  tourType: "multi" | "one";
};

export default function BookingBody({ tour, tourType }: BookingBodyProps) {
  const mappedTourType = tourType === "one" ? "oneday" : "multiday";

  // The ONE and only hook instance. Shared by the desktop widget and the mobile modal.
  const booking = useBookingWidget(tour, mappedTourType);

  return (
    <ContainerLayout className="min-h-screen pt-27 sm:pt-25 md:pt-30 lg:pt-32 2xl:pt-34 3xl:pt-36 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="xl:flex xl:gap-6 2xl:gap-8 pb-20 md:pb-28 xl:pb-20 2xl:pb-32 3xl:pb-40">
        <div className="xl:w-2/3">
          <BookingDetailSections tour={tour} tourType={tourType} />
        </div>

        <BookingWidget tour={tour} booking={booking} className="hidden xl:block" />
      </div>

      <RelatedBookingSections recommendations={tour.recommendations} insights={tour.insights} />

      <StickyBookingBar tour={tour} booking={booking} />

      {/* Rendered once, for both desktop and mobile */}
      <AuthRequiredModal
        isOpen={booking.showAuthModal}
        onClose={booking.closeAuthModal}
        translationPath="ValidationErrors.AuthRequired.Booking"
      />
    </ContainerLayout>
  );
}
