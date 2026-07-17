import { notFound } from "next/navigation";
import { blogPosts, type GalleryItem } from "@/data/blog";
import { bookingTour } from "@/data/booking";
import { reviewMoments } from "@/data/GuestMomentsImages";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";

type GalleryDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function GalleryDetailPage({ params, searchParams }: GalleryDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.filter as string | undefined;

  let post: (typeof blogPosts)[0] | typeof bookingTour | undefined = blogPosts.find((p) => p.slug === slug);
  let isBookingTour = false;

  if (!post && bookingTour.slug === slug) {
    post = bookingTour;
    isBookingTour = true;
  }

  if (!post) {
    notFound();
  }

  const dynamicBackLink = isBookingTour ? `/booking/${slug}` : `/blog/${slug}`;
  const dynamicBackLabel = isBookingTour ? "Back to Tour" : "Back to Story";

  let itemsToShow: GalleryItem[] = [];

  if (isBookingTour) {
    const tour = post as typeof bookingTour;

    if (filter === "gallery") {
      // 1. Package Gallery
      itemsToShow = tour.gallery as GalleryItem[];
    } else if (filter === "moments") {
      // 2. Guest Moments
      itemsToShow = reviewMoments.map((moment) => ({
        id: moment.id,
        src: moment.src,
        alt: moment.alt,
        title: moment.title,
        category: "Guest Moments",
      }));
    } else if (filter && filter.startsWith("review-")) {
      const userName = filter.replace("review-", "");

      const specificReview = tour.reviews.find((r) => r.name.toLowerCase() === userName);

      if (specificReview) {
        itemsToShow = specificReview.photos.map((photo) => ({
          id: photo.id,
          src: photo.src,
          alt: photo.alt,
          title: photo.title,
          category: `Review by ${specificReview.name}`,
        }));
      } else {
        itemsToShow = tour.gallery as GalleryItem[];
      }
    } else {
      itemsToShow = tour.gallery as GalleryItem[];
    }
  } else {
    itemsToShow = post.gallery as GalleryItem[];
  }

  return (
    <main className="min-h-screen bg-lanka-black ">
      <GalleryHero backLink={dynamicBackLink} backLabel={dynamicBackLabel} />
      <GalleryCollection items={itemsToShow} />
    </main>
  );
}
