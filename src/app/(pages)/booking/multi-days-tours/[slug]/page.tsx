import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingBody from "@/components/booking/BookingBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { bookingTour, travelerOptions, bookingAssurances } from "@/data/multiDaysBooking";

type BookingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tour = bookingTour.slug === slug ? bookingTour : null;

  if (!tour) {
    return {
      title: "Tour not found",
    };
  }

  return {
    title: `${tour.fullTitle}`,
    description: tour.lead,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;

  const tour = bookingTour.slug === slug ? bookingTour : null;

  if (!tour) {
    notFound();
  }

  return (
    <UserPageLayout>
      <BookingBody tour={tour} options={travelerOptions} assurances={bookingAssurances} tourType="multi"/>
    </UserPageLayout>
  );
}
