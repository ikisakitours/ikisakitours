import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import BookingBody from "@/components/booking/BookingBody";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";

type BookingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();

  try {
    const tour = await packageDetailsService.getPackageBySlug(slug, locale);
    const fullTitle = `${tour.title} ${tour.titleEmphasis}`;
    const ogImage = tour.gallery && tour.gallery.length > 0 ? tour.gallery[0] : "";

    return {
      title: fullTitle,
      description: tour.leadDescription,
      alternates: {
        canonical: `/${locale}/booking/one-day-tours/${tour.slug}`,
        languages: {
          en: `/en/booking/one-day-tours/${tour.slug}`,
          ja: `/ja/booking/one-day-tours/${tour.slug}`,
        },
      },
      openGraph: {
        title: fullTitle,
        description: tour.leadDescription,
        url: `/${locale}/booking/one-day-tours/${tour.slug}`,
        locale: locale === "ja" ? "ja_JP" : "en_US",
        type: "website",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: fullTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description: tour.leadDescription,
        images: [ogImage],
      },
    };
  } catch (_error) {
    console.error("Failed to generate metadata:", _error);
    return {
      title: "Tour not found",
    };
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;

  return (
    <>
      <BookingBody slug={slug} tourType="one" />
      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </>
  );
}
