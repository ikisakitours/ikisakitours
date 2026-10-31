import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ReviewsBody from "@/components/booking/bookingReviews/ReviewsBody";

type BookingReviewsPageProps = {
  params: Promise<{ slug: string }>;
};

const slugToName = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export async function generateMetadata({ params }: BookingReviewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("Booking.MetadataReviews");
  const tourName = slugToName(slug);

  return {
    title: t("reviewTitle", { tourName }),
    description: t("reviewDescription", { tourName }),
  };
}

export default async function BookingReviewsPage({ params }: BookingReviewsPageProps) {
  const { slug } = await params;
  return <ReviewsBody slug={slug} tourType="one" />;
}
