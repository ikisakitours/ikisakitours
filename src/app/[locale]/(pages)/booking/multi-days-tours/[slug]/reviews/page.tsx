import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { bookingTour } from "@/data/multiDaysBooking";
import ReviewsBody from "@/components/booking/bookingReviews/ReviewsBody";

type BookingReviewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BookingReviewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("Booking.Metadata");
  const tour = bookingTour.slug === slug ? bookingTour : null;

  if (!tour) {
    return {
      title: t("reviewNotFound"),
    };
  }

  return {
    title: t("reviewTitle", { tourName: tour.fullTitle }),
    description: t("reviewDescription", { tourName: tour.fullTitle }),
  };
}

export default async function BookingReviewsPage({ params }: BookingReviewsPageProps) {
  const { slug } = await params;

  const tour = bookingTour.slug === slug ? bookingTour : null;

  if (!tour) {
    notFound();
  }

  return (
    <>
      <ReviewsBody tour={tour} tourType="multi" />
    </>
  );
}
