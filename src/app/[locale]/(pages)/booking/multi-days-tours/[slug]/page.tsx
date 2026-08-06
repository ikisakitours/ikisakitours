import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingBody from "@/components/booking/BookingBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { bookingTour, travelerOptions, bookingAssurances } from "@/data/multiDaysBooking";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

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

  const ogImage = tour.gallery && tour.gallery.length > 0 ? tour.gallery[0].src : "";
  return {
    title: tour.fullTitle,
    description: tour.lead,
    openGraph: {
      title: tour.fullTitle,
      description: tour.lead,
      url: `/booking/one-day-tours/${tour.slug}`,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: tour.fullTitle || tour.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.fullTitle,
      description: tour.lead,
      images: [ogImage],
    },
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
      <BookingBody tour={tour} options={travelerOptions} assurances={bookingAssurances} tourType="multi" />
      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </UserPageLayout>
  );
}
