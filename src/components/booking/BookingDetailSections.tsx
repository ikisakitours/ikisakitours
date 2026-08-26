import { bookingTour } from "@/data/multiDaysBooking";
import { BookingNavigation } from "@/components/booking/BookingNavigation";
import BookingHeader from "@/components/booking/BookingDetailSection/BookingHeader";
import BookingGallery from "@/components/booking/BookingDetailSection/BookingGallery";
import StoryBanner from "@/components/booking/BookingDetailSection/StoryBanner";
import ActivityDetails from "@/components/booking/BookingDetailSection/ActivityDetails";
import HighlightsSection from "@/components/booking/BookingDetailSection/HighlightsSection";
import ItinerarySection from "@/components/booking/BookingDetailSection/ItinerarySection";
import CoveredCitiesRoute from "@/components/booking/BookingDetailSection/CoveredCitiesRoute";
import DescriptionSection from "@/components/booking/BookingDetailSection/DescriptionSection";
import IncludesSection from "@/components/booking/BookingDetailSection/IncludesSection";
import EssentialsSection from "@/components/booking/BookingDetailSection/EssentialsSection";
import TourCustomization from "@/components/booking/BookingDetailSection/TourCustomization";
import CoveredDestinations from "@/components/booking/BookingDetailSection/CoveredDestinations";
import ReviewsSection from "@/components/booking/BookingDetailSection/ReviewsSection";

type SharedTourProps = {
  tour: typeof bookingTour;
  tourType?: "multi" | "one";
};

export function BookingDetailSections({ tour, tourType }: SharedTourProps) {
  return (
    <>
      <BookingHeader tour={tour} />
      <BookingGallery tour={tour} tourType={tourType} />
      <StoryBanner tour={tour} />
      <BookingNavigation />
      <ActivityDetails tour={tour} />
      <DescriptionSection tour={tour} />
      <hr className="my-14 border-white/5" />
      <HighlightsSection tour={tour} />
      <ItinerarySection tour={tour} />
      <CoveredCitiesRoute destinations={tour.coveredDestinations} />
      <hr className="my-14 border-white/5" />
      <IncludesSection tour={tour} />
      <EssentialsSection />
      <TourCustomization />
      <CoveredDestinations destinations={tour.coveredDestinations} tourSlug={tour.slug} tourType={tourType} />
      <ReviewsSection tour={tour} tourType={tourType} />
    </>
  );
}
