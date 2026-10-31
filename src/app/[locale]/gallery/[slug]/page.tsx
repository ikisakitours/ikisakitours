import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { blogPosts, type GalleryItem } from "@/data/blog";
import { allSpecialEventsList } from "@/data/specialEvents";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import type { BlogPost } from "@/services/blogs/types";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";
import type { PackageDetails } from "@/services/Booking/packageDetails/types";
import { reviewService } from "@/services/Booking/packageAllReview/FetchReviewService";
import type { ReviewType } from "@/services/Booking/packageAllReview/types";

type GalleryDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getBlog = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    return await fetchBlogServices.getBlogPostBySlug(slug);
  } catch {
    return null;
  }
});

const getTour = cache(async (slug: string): Promise<PackageDetails | null> => {
  try {
    return await packageDetailsService.getPackageBySlug(slug);
  } catch (error) {
    if (!(error instanceof Error && error.message === "NOT_FOUND")) {
      console.error(`Failed to fetch package for gallery slug: ${slug}`, error);
    }
    return null;
  }
});

const getReviews = cache(async (packageId: string): Promise<ReviewType[]> => {
  try {
    return await reviewService.getReviewsByPackageId(packageId);
  } catch (error) {
    console.error("Failed to fetch reviews for gallery", error);
    return [];
  }
});

/* ---------- helpers ---------- */

type Resolved =
  | { kind: "blog"; post: BlogPost }
  | { kind: "staticBlog"; post: (typeof blogPosts)[0] }
  | { kind: "event"; post: (typeof allSpecialEventsList)[0] }
  | { kind: "tour"; post: PackageDetails }
  | null;

async function resolvePost(slug: string, hasTourFilter: boolean, fromEvent: boolean): Promise<Resolved> {
  if (hasTourFilter) {
    const tour = await getTour(slug);
    if (tour) return { kind: "tour", post: tour };
  }

  const blog = await getBlog(slug);
  if (blog) return { kind: "blog", post: blog };

  const staticBlog = blogPosts.find((p) => p.slug === slug);
  if (staticBlog) return { kind: "staticBlog", post: staticBlog };

  if (fromEvent || allSpecialEventsList.some((e) => e.slug === slug)) {
    const event = allSpecialEventsList.find((e) => e.slug === slug);
    if (event) return { kind: "event", post: event };
  }

  if (!hasTourFilter) {
    const tour = await getTour(slug);
    if (tour) return { kind: "tour", post: tour };
  }

  return null;
}
const getFullTitle = (tour: PackageDetails) => `${tour.title} ${tour.titleEmphasis ?? ""}`.trim();
const getFilterKey = (key: string) => decodeURIComponent(key.replace("review-", "")).trim();

function findReview(reviews: ReviewType[], key: string) {
  const byId = reviews.find((r) => r.id === key);
  if (byId) return byId;

  const normalize = (s?: string) => (s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
  const k = normalize(key);
  const sameName = reviews.filter((r) => normalize(r.fullName) === k);

  return sameName.find((r) => r.imageUrls?.length > 0) ?? sameName[0];
}
function toItems(
  urls: string[] | undefined,
  prefix: string,
  alt: string,
  title: string,
  category: string,
): GalleryItem[] {
  return (urls || [])
    .filter(Boolean)
    .map((src, i) => ({ id: `${prefix}-${i}`, src, alt: `${alt} ${i + 1}`, title, category }));
}

function readParams(sp: { [key: string]: string | string[] | undefined }) {
  const filter = sp?.filter as string | undefined;
  const filterOneDay = sp?.["filter-one-day-tours"] as string | undefined;
  const filterMultiDay = sp?.["filter-multi-days-tours"] as string | undefined;
  const from = sp?.from as string | undefined;
  return {
    from,
    hasTourFilter: !!(filterOneDay || filterMultiDay),
    activeFilter: filterOneDay || filterMultiDay || filter,
  };
}

/* ---------- metadata ---------- */

export async function generateMetadata({ params, searchParams }: GalleryDetailPageProps): Promise<Metadata> {
  const t = await getTranslations("Gallery.Metadata");
  const { slug } = await params;
  const { from, hasTourFilter, activeFilter } = readParams(await searchParams);

  const resolved = await resolvePost(slug, hasTourFilter, from === "events");

  if (!resolved) {
    return { title: t("notFoundTitle"), description: t("notFoundDesc") };
  }

  if (resolved.kind === "event") {
    return {
      title: t("eventTitle", { title: resolved.post.title }),
      description: `Discover visual highlights and exclusive images from ${resolved.post.title}.`,
    };
  }

  if (resolved.kind === "tour") {
    const tour = resolved.post;
    const fullTitle = getFullTitle(tour);
    if (activeFilter === "moments" || activeFilter === "all-moments") {
      return {
        title: t("guestMomentsTitle", { title: fullTitle }),
        description: t("guestMomentsDesc", { title: fullTitle }),
      };
    }
    if (activeFilter?.startsWith("review-")) {
      const reviews = await getReviews(tour.id);
      const review = findReview(reviews, getFilterKey(activeFilter));
      const name = review?.fullName ?? "Guest";
      return {
        title: t("reviewTitle", { name, title: fullTitle }),
        description: t("reviewDesc", { name, title: fullTitle }),
      };
    }
    return {
      title: t("tourTitle", { title: fullTitle }),
      description: t("tourDesc", { title: fullTitle }),
    };
  }

  // blog / staticBlog
  return {
    title: t("storyTitle", { title: resolved.post.title }),
    description: t("blogDesc", { title: resolved.post.title }),
  };
}

/* ---------- page ---------- */

export default async function GalleryDetailPage({ params, searchParams }: GalleryDetailPageProps) {
  const t = await getTranslations("Gallery.Labels");
  const { slug } = await params;
  const { from, hasTourFilter, activeFilter } = readParams(await searchParams);

  const resolved = await resolvePost(slug, hasTourFilter, from === "events");
  if (!resolved) notFound();

  let backLink = `/blog/${slug}`;
  let backLabel = t("backToStory");
  let heroTitle = resolved.post.title;
  let heroSubtitle = t("storyGallery");
  let items: GalleryItem[] = [];

  switch (resolved.kind) {
    case "blog": {
      const blog = resolved.post;
      items = toItems(
        blog.gallery,
        "dynamic-blog-img",
        `${blog.title} - Image`,
        blog.title,
        blog.category || t("storyGallery"),
      );
      break;
    }

    case "staticBlog": {
      items = (resolved.post.gallery || []) as GalleryItem[];
      break;
    }

    case "event": {
      const event = resolved.post;
      backLink = `/events/${slug}`;
      backLabel = t("backToEvent");
      heroSubtitle = t("eventHighlightsGallery");
      items = toItems(event.images, "event-img", `${event.title} Highlight`, event.title, t("eventHighlightCat"));
      break;
    }

    case "tour": {
      const tour = resolved.post;
      const base = tour.type === "oneday" ? "one-day-tours" : "multi-days-tours";
      const fullTitle = getFullTitle(tour);
      backLink = `/booking/${base}/${slug}`;
      backLabel = t("backToTour");
      heroSubtitle = t("tourGallery");

      if (activeFilter === "moments" || activeFilter === "all-moments") {
        const reviews = await getReviews(tour.id);
        const urls = reviews.flatMap((r) => r.imageUrls || []);
        items = toItems(urls, "moment", `${fullTitle} moment`, t("guestMoments"), t("guestMoments"));
        heroTitle = t("guestMoments");
        heroSubtitle = t("capturedMemories", { title: fullTitle });
      } else if (activeFilter?.startsWith("review-")) {
        const reviews = await getReviews(tour.id);
        // console.log("FILTER KEY:", JSON.stringify(getFilterKey(activeFilter)));
        // console.log("IS ARRAY:", Array.isArray(reviews), "COUNT:", reviews.length);
        // console.log(
        //   "REVIEWS:",
        //   reviews.map((r) => ({ id: r.id, name: JSON.stringify(r.fullName), imgs: r.imageUrls?.length })),
        // );
        const review = findReview(reviews, getFilterKey(activeFilter));
        console.log("FOUND:", review?.id, review?.imageUrls);

        if (review && review.imageUrls?.length > 0) {
          items = toItems(
            review.imageUrls,
            `review-${review.id}`,
            `${review.fullName} photo`,
            review.fullName,
            t("reviewBy", { name: review.fullName }),
          );
          heroTitle = t("reviewBy", { name: review.fullName });
          heroSubtitle = t("galleryMoments", { name: review.fullName });
        } else {
          items = toItems(tour.gallery, "tour-img", `${fullTitle} Gallery Image`, fullTitle, t("tourGallery"));
        }

        if (from === "reviews") {
          backLink = `/booking/${base}/${slug}/reviews`;
          backLabel = t("backToReviews");
        }
      } else {
        items = toItems(tour.gallery, "tour-img", `${fullTitle} Gallery Image`, fullTitle, t("tourGallery"));
      }
      break;
    }
  }

  return (
    <main className="min-h-screen bg-lanka-black ">
      <GalleryHero backLink={backLink} backLabel={backLabel} title={heroTitle} subtitle={heroSubtitle} />
      <GalleryCollection items={items} />
    </main>
  );
}
