import { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import ReviewsBody from "@/components/booking/bookingReviews/ReviewsBody";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";

type BookingReviewsPageProps = {
  params: Promise<{ slug: string; locale?: string }>;
};

export async function generateMetadata({ params }: BookingReviewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Booking.MetadataReviews" });
  
  let tourName = "";

  try {
    const tour = await packageDetailsService.getPackageBySlug(slug, locale);
    tourName = `${tour.title} ${tour.titleEmphasis ?? ""}`.trim();
  } catch (error) {
    console.error(`Failed to fetch tour details for metadata (slug: ${slug})`, error);
    tourName = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return {
    title: t("reviewTitle", { tourName }),
    description: t("reviewDescription", { tourName }),
  };
}

export default async function BookingReviewsPage({ params }: BookingReviewsPageProps) {
  const { slug } = await params;
  return <ReviewsBody slug={slug} tourType="one" />;
}
