"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { BookingDetailSections } from "@/components/booking/BookingDetailSections";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { StickyBookingBar } from "@/components/booking/StickyBookingBar";
import { useBookingWidget } from "@/hooks/Booking/useBookingWidget";
import { AuthRequiredModal } from "@/components/ui/AuthRequiredModal";
import { PackageDetails } from "@/services/Booking/packageDetails/types";
import { notFound } from "next/navigation";
import { usePackageDetails } from "@/hooks/Booking/packageDetails/usePackageDetails";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
import RelatedBookingSections from "@/components/booking/RelatedBookingSections";

type BookingBodyProps = {
  slug: string;
  tourType: "multi" | "one";
};

export default function BookingBody({ slug, tourType }: BookingBodyProps) {
  const tApi = useTranslations("Common.Api");
  const mappedTourType = tourType === "one" ? "oneday" : "multiday";

  const { tour, isLoading, error, isNotFound, refetch } = usePackageDetails(slug);

  const booking = useBookingWidget((tour || {}) as PackageDetails, mappedTourType);
  if (isLoading) {
    return <ApiCallLoader fullScreen={true} text={tApi("loadingTourDetails")} />;
  }

  if (isNotFound) {
    notFound();
  }

  if (error || !tour) {
    return (
      <ApiCallError
        message={tApi("contentLoadError")}
        title={tApi("failedToLoad")}
        watermark={tApi("errorWatermark")}
        buttonText={tApi("tryAgain")}
        fullScreen={false}
        onRetry={refetch}
      />
    );
  }

  return (
    <ContainerLayout className="min-h-screen pt-27 sm:pt-25 md:pt-30 lg:pt-32 2xl:pt-34 3xl:pt-36 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="xl:flex xl:gap-6 2xl:gap-8 pb-20 md:pb-28 xl:pb-20 2xl:pb-32 3xl:pb-40">
        <div className="xl:w-2/3">
          <BookingDetailSections tour={tour} tourType={tourType} />
        </div>

        <BookingWidget tour={tour} booking={booking} className="hidden xl:block" />
      </div>
      <RelatedBookingSections
        currentSlug={tour.slug}
        tourType={tourType}
        category={tour.category}
        origin={tour.origin}
        price={tour.price}
      />{" "}
      <StickyBookingBar tour={tour} booking={booking} />
      <AuthRequiredModal
        isOpen={booking.showAuthModal}
        onClose={booking.closeAuthModal}
        translationPath="ValidationErrors.AuthRequired.Booking"
      />
    </ContainerLayout>
  );
}
