import { notFound } from "next/navigation";
import { blogPosts, type GalleryItem } from "@/data/blog";
import { bookingTour as multiDayTour } from "@/data/multiDaysBooking";
import { bookingTour as oneDayTour } from "@/data/oneDayBooking";
import { reviewMoments } from "@/data/GuestMomentsImages";
import { allSpecialEventsList } from "@/data/specialEvents";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type GalleryDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: GalleryDetailPageProps): Promise<Metadata> {
  const t = await getTranslations("Gallery.Metadata");
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.filter as string | undefined;
  const filterOneDay = resolvedSearchParams?.["filter-one-day-tours"] as string | undefined;
  const filterMultiDay = resolvedSearchParams?.["filter-multi-days-tours"] as string | undefined;

  const fromEvent = resolvedSearchParams?.from === "events";

  const activeFilter = filterOneDay || filterMultiDay || filter;

  let post:
    | (typeof blogPosts)[0]
    | typeof multiDayTour
    | typeof oneDayTour
    | (typeof allSpecialEventsList)[0]
    | undefined = blogPosts.find((p) => p.slug === slug);

  let isBookingTour = false;
  let isEventGallery = false;

  if (!post) {
    if (filterOneDay && oneDayTour.slug === slug) {
      post = oneDayTour;
      isBookingTour = true;
    } else if (filterMultiDay && multiDayTour.slug === slug) {
      post = multiDayTour;
      isBookingTour = true;
    } else if (fromEvent || allSpecialEventsList.some((e) => e.slug === slug)) {
      post = allSpecialEventsList.find((e) => e.slug === slug);
      isEventGallery = true;
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
      title: t("notFoundTitle"),
      description: t("notFoundDesc"),
    };
  }

  let title = post.title;
  let description = t("blogDesc", { title: post.title });

  if (isEventGallery) {
    title = t("eventTitle", { title: post.title });
    description = `Discover visual highlights and exclusive images from ${post.title}.`;
  } else if (isBookingTour) {
    const tour = post as typeof multiDayTour;
    if (activeFilter === "moments" || activeFilter === "all-moments") {
      title = t("guestMomentsTitle", { title: tour.fullTitle });
      description = t("guestMomentsDesc", { title: tour.fullTitle });
    } else if (activeFilter && activeFilter.startsWith("review-")) {
      const encodedUserName = activeFilter.replace("review-", "");
      const userName = decodeURIComponent(encodedUserName).trim();
      title = t("reviewTitle", { name: userName, title: tour.fullTitle });
      description = t("reviewDesc", { name: userName, title: tour.fullTitle });
    } else {
      title = t("tourTitle", { title: tour.fullTitle });
      description = t("tourDesc", { title: tour.fullTitle });
    }
  } else {
    title = t("storyTitle", { title: post.title });
  }

  return {
    title,
    description,
  };
}

export default async function GalleryDetailPage({ params, searchParams }: GalleryDetailPageProps) {
  const t = await getTranslations("Gallery.Labels");
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.filter as string | undefined;
  const filterOneDay = resolvedSearchParams?.["filter-one-day-tours"] as string | undefined;
  const filterMultiDay = resolvedSearchParams?.["filter-multi-days-tours"] as string | undefined;
  const from = resolvedSearchParams?.from as string | undefined;

  const activeFilter = filterOneDay || filterMultiDay || filter;

  let post:
    | (typeof blogPosts)[0]
    | typeof multiDayTour
    | typeof oneDayTour
    | (typeof allSpecialEventsList)[0]
    | undefined = blogPosts.find((p) => p.slug === slug);

  let isBookingTour = false;
  let isEventGallery = false;
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
    } else if (from === "events" || allSpecialEventsList.some((e) => e.slug === slug)) {
      post = allSpecialEventsList.find((e) => e.slug === slug);
      isEventGallery = true;
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
  let dynamicBackLabel = t("backToStory");

  if (isEventGallery) {
    dynamicBackLink = `/events/${slug}`;
    dynamicBackLabel = t("backToEvent");
  } else if (isBookingTour) {
    dynamicBackLink = tourType === "one" ? `/booking/one-day-tours/${slug}` : `/booking/multi-days-tours/${slug}`;
    dynamicBackLabel = t("backToTour");

    if (from === "reviews") {
      dynamicBackLink =
        tourType === "one" ? `/booking/one-day-tours/${slug}/reviews` : `/booking/multi-days-tours/${slug}/reviews`;
      dynamicBackLabel = t("backToReviews");
    }
  }

  let itemsToShow: GalleryItem[] = [];
  let heroTitle = post.title;
  let heroSubtitle = t("storyGallery");

  if (isEventGallery) {
    const event = post as (typeof allSpecialEventsList)[0];
    heroSubtitle = t("eventHighlightsGallery");

    if (event.images && event.images.length > 0) {
      itemsToShow = event.images.map((imgStr, index) => ({
        id: `event-img-${index}`,
        src: imgStr,
        alt: `${event.title} Highlight ${index + 1}`,
        title: event.title,
        category: t("eventHighlightCat"),
      }));
    }
  } else if (isBookingTour) {
    const tour = post as typeof multiDayTour;
    heroSubtitle = t("tourGallery");

    if (activeFilter === "gallery") {
      itemsToShow = tour.gallery as GalleryItem[];
    } else if (activeFilter === "moments" || activeFilter === "all-moments") {
      itemsToShow = (tour.reviewMoments || reviewMoments).map((moment, index) => ({
        id: `moment-${index}`,
        src: moment.src,
        alt: moment.alt,
        title: t("guestMoments"),
        category: t("guestMoments"),
      }));
      heroTitle = t("guestMoments");
      heroSubtitle = t("capturedMemories", { title: tour.title });
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
          category: t("reviewBy", { name: specificReview.name }),
        }));
        heroTitle = t("reviewBy", { name: specificReview.name });
        heroSubtitle = t("galleryMoments", { name: specificReview.name });
      } else {
        itemsToShow = tour.gallery as GalleryItem[];
      }
    } else {
      itemsToShow = tour.gallery as GalleryItem[];
    }
  } else {
    itemsToShow = (post as (typeof blogPosts)[0]).gallery as GalleryItem[];
  }

  return (
    <main className="min-h-screen bg-lanka-black ">
      <GalleryHero backLink={dynamicBackLink} backLabel={dynamicBackLabel} title={heroTitle} subtitle={heroSubtitle} />
      <GalleryCollection items={itemsToShow} />
    </main>
  );
}
