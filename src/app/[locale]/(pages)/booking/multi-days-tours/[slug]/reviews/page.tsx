import { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import ReviewsBody from "@/components/booking/bookingReviews/ReviewsBody";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

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
    alternates: getSeoAlternates(`/booking/multi-days-tours/${slug}/reviews`, locale),
  };
}

export default async function BookingReviewsPage({ params }: BookingReviewsPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "ツアー" : "Tours", url: `/${locale}/tours/multi-days` },
    { name: slug, url: `/${locale}/booking/multi-days-tours/${slug}` },
    { name: locale === "ja" ? "レビュー" : "Reviews", url: `/${locale}/booking/multi-days-tours/${slug}/reviews` },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ReviewsBody slug={slug} tourType="multi" />
    </>
  );
}
