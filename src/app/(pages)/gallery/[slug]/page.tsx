import { notFound } from "next/navigation";
import { blogPosts, type GalleryItem } from "@/data/blog";
import { bookingTour as multiDayTour } from "@/data/multiDaysBooking";
import { bookingTour as oneDayTour } from "@/data/oneDayBooking";
import { reviewMoments } from "@/data/GuestMomentsImages";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import type { Metadata } from "next";

type GalleryDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({ params, searchParams }: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.filter as string | undefined;
  const filterOneDay = resolvedSearchParams?.["filter-one-day-tours"] as string | undefined;
  const filterMultiDay = resolvedSearchParams?.["filter-multi-days-tours"] as string | undefined;

  const activeFilter = filterOneDay || filterMultiDay || filter;

  let post: (typeof blogPosts)[0] | typeof multiDayTour | typeof oneDayTour | undefined = blogPosts.find(
    (p) => p.slug === slug,
  );
  let isBookingTour = false;

  if (!post) {
    if (filterOneDay && oneDayTour.slug === slug) {
      post = oneDayTour;
      isBookingTour = true;
    } else if (filterMultiDay && multiDayTour.slug === slug) {
      post = multiDayTour;
      isBookingTour = true;
    } else if (multiDayTour.slug === slug) {
      post = multiDayTour;
      isBookingTour = true;
    } else if (oneDayTour.slug === slug) {
      post = oneDayTour;
      isBookingTour = true;
    }
  }

  if (!post) {
    return {
      title: "Gallery Not Found",
      description: "The requested gallery could not be found.",
    };
  }

  let title = post.title;
  let description = `Explore visual moments and photo gallery for ${post.title}.`;

  if (isBookingTour) {
    const tour = post as typeof multiDayTour;

    if (activeFilter === "moments" || activeFilter === "all-moments") {
      title = `Guest Moments - ${tour.fullTitle}`;
      description = `Captured memories and guest moments from ${tour.fullTitle}.`;
    } else if (activeFilter && activeFilter.startsWith("review-")) {
      const encodedUserName = activeFilter.replace("review-", "");
      const userName = decodeURIComponent(encodedUserName).trim();
      title = `Review Gallery by ${userName} | ${tour.fullTitle}`;
      description = `Photo gallery and shared experiences by ${userName} for ${tour.fullTitle}.`;
    } else {
      title = `${tour.fullTitle} - Tour Gallery`;
      description = `Explore the complete photo gallery of ${tour.fullTitle}.`;
    }
  } else {
    title = `${post.title} - Story Gallery`;
  }

  return {
    title,
    description,
  };
}

export default async function GalleryDetailPage({ params, searchParams }: GalleryDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.filter as string | undefined;
  const filterOneDay = resolvedSearchParams?.["filter-one-day-tours"] as string | undefined;
  const filterMultiDay = resolvedSearchParams?.["filter-multi-days-tours"] as string | undefined;
  const from = resolvedSearchParams?.from as string | undefined;

  const activeFilter = filterOneDay || filterMultiDay || filter;

  let post: (typeof blogPosts)[0] | typeof multiDayTour | typeof oneDayTour | undefined = blogPosts.find(
    (p) => p.slug === slug,
  );
  let isBookingTour = false;
  let tourType: "one" | "multi" | undefined = undefined;

  if (!post) {
    if (filterOneDay && oneDayTour.slug === slug) {
      post = oneDayTour;
      isBookingTour = true;
      tourType = "one";
    } else if (filterMultiDay && multiDayTour.slug === slug) {
      post = multiDayTour;
      isBookingTour = true;
      tourType = "multi";
    } else if (multiDayTour.slug === slug) {
      // Fallback
      post = multiDayTour;
      isBookingTour = true;
      tourType = "multi";
    } else if (oneDayTour.slug === slug) {
      post = oneDayTour;
      isBookingTour = true;
      tourType = "one";
    }
  }

  if (!post) {
    notFound();
  }

  let dynamicBackLink = `/blog/${slug}`;
  let dynamicBackLabel = "Back to Story";

  if (isBookingTour) {
    dynamicBackLink = tourType === "one" ? `/booking/one-day-tours/${slug}` : `/booking/multi-days-tours/${slug}`;
    dynamicBackLabel = "Back to Tour";

    if (from === "reviews") {
      dynamicBackLink =
        tourType === "one" ? `/booking/one-day-tours/${slug}/reviews` : `/booking/multi-days-tours/${slug}/reviews`;
      dynamicBackLabel = "Back to Reviews";
    }
  }

  let itemsToShow: GalleryItem[] = [];

  let heroTitle = post.title;
  let heroSubtitle = isBookingTour ? "Tour Gallery" : "Story Gallery";

  if (isBookingTour) {
    const tour = post as typeof multiDayTour;

    if (activeFilter === "gallery") {
      // 1. Package Gallery
      itemsToShow = tour.gallery as GalleryItem[];
      heroSubtitle = "Tour Gallery";
    } else if (activeFilter === "moments" || activeFilter === "all-moments") {
      // 2. Guest Moments
      itemsToShow = (tour.reviewMoments || reviewMoments).map((moment, index) => ({
        id: `moment-${index}`,
        src: moment.src,
        alt: moment.alt,
        title: "Guest Moment",
        category: "Guest Moments",
      }));
      heroTitle = "Guest Moments";
      heroSubtitle = `Captured memories from ${tour.title}`;
    } else if (activeFilter && activeFilter.startsWith("review-")) {
      const encodedUserName = activeFilter.replace("review-", "");
      const userName = decodeURIComponent(encodedUserName).trim();

      const specificReview = tour.reviews.find((r) => r.name.toLowerCase().trim() === userName);

      if (specificReview && specificReview.photos && specificReview.photos.length > 0) {
        itemsToShow = specificReview.photos.map((photo) => ({
          id: photo.id,
          src: photo.src,
          alt: photo.alt,
          title: photo.title,
          category: `Review by ${specificReview.name}`,
        }));
        heroTitle = `Review by ${specificReview.name}`;
        heroSubtitle = `${specificReview.name}'s Gallery Moments`;
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
      <GalleryHero backLink={dynamicBackLink} backLabel={dynamicBackLabel} title={heroTitle} subtitle={heroSubtitle} />
      <GalleryCollection items={itemsToShow} />
    </main>
  );
}
