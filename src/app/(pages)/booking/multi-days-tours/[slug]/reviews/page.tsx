import { notFound } from "next/navigation";
import { Metadata } from "next";
import { bookingTour } from "@/data/multiDaysBooking";
import ReviewsBody from "@/components/booking/bookingReviews/ReviewsBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

type BookingReviewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BookingReviewsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tour = bookingTour.slug === slug ? bookingTour : null;

  if (!tour) {
    return {
      title: "Review Not Found | MapMate",
    };
  }

  return {
    title: `Guest Reviews | ${tour.titleEmphasis} | MapMate`,
    description: `Read authentic stories and experiences from travelers who joined our ${tour.fullTitle}.`,
  };
}

export default async function BookingReviewsPage({ params }: BookingReviewsPageProps) {
  const { slug } = await params;

  const tour = bookingTour.slug === slug ? bookingTour : null;

  if (!tour) {
    notFound();
  }

  return (
    <UserPageLayout>
      <ReviewsBody tour={tour} />
    </UserPageLayout>
  );
}
