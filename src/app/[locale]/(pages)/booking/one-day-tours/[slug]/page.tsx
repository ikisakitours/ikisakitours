import type { Metadata } from "next";
import BookingBody from "@/components/booking/BookingBody";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";

type BookingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const tour = await packageDetailsService.getPackageBySlug(slug);
    const fullTitle = `${tour.title} ${tour.titleEmphasis}`;
    const ogImage = tour.gallery && tour.gallery.length > 0 ? tour.gallery[0] : "";

    return {
      title: fullTitle,
      description: tour.leadDescription,
      openGraph: {
        title: fullTitle,
        description: tour.leadDescription,
        url: `/booking/one-day-tours/${tour.slug}`,
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
      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </>
  );
}
