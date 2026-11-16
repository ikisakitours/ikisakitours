import { MetadataRoute } from "next";
import { apiResponseEvents } from "@/data/specialEvents";
import { packageSummaryService } from "@/services/tours/packageSummaryService";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import { reviewService } from "@/services/Booking/packageAllReview/FetchReviewService";

const BASE_URL = "https://www.ikisakitours.com";
const LOCALES = ["en", "ja"] as const;

interface RouteDefinition {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: RouteDefinition[] = [
    // 1. Core Landing & Hub Pages
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "weekly" },
    { path: "/testimonials", priority: 0.8, changeFrequency: "weekly" },

    // 2. Main Tour Hubs & Bespoke Services
    { path: "/tours/multi-days", priority: 0.95, changeFrequency: "weekly" },
    { path: "/tours/one-day", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/bespoke-travel", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/private-vehicle", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/transfers", priority: 0.9, changeFrequency: "weekly" },

    // 3. Discovery & Content Hubs
    { path: "/destination", priority: 0.85, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" },
    { path: "/legal", priority: 0.4, changeFrequency: "yearly" },
  ];

  // 4. Dynamic Pages (Multi-day Tours, One-day Tours, Blogs, Destinations, Events)
  try {
    const [multiDayRes, oneDayRes, blogsRes, destinationsRes] = await Promise.allSettled([
      packageSummaryService.getSummaries("multiday", 1, 100, "en").catch(() => null),
      packageSummaryService.getSummaries("oneday", 1, 100, "en").catch(() => null),
      fetchBlogServices.getBlogPreviews("en").catch(() => null),
      fetchDestinationServices.getDestinationPreviews("en").catch(() => null),
    ]);

    // Multi-day Tour Packages
    if (multiDayRes.status === "fulfilled" && multiDayRes.value?.data) {
      for (const tour of multiDayRes.value.data) {
        if (tour.slug) {
          routes.push({
            path: `/booking/multi-days-tours/${tour.slug}`,
            priority: 0.9,
            changeFrequency: "weekly",
          });
          routes.push({
            path: `/booking/multi-days-tours/${tour.slug}/reviews`,
            priority: 0.7,
            changeFrequency: "monthly",
          });
          routes.push({
            path: `/gallery/${tour.slug}`,
            priority: 0.75,
            changeFrequency: "monthly",
          });
          // Package Guest Review & Moments Gallery
          routes.push({
            path: `/gallery/${tour.slug}?filter-multi-days-tours=all-moments`,
            priority: 0.75,
            changeFrequency: "monthly",
          });

          // Specific User Review Image Galleries
          if (tour.id) {
            try {
              const reviews = await reviewService.getReviewsByPackageId(tour.id).catch(() => []);
              const reviewsWithImages = (reviews || []).filter(
                (r) => Array.isArray(r.imageUrls) && r.imageUrls.length > 0
              );
              for (const r of reviewsWithImages) {
                const reviewKey = r.id || encodeURIComponent(r.fullName.toLowerCase().trim());
                routes.push({
                  path: `/gallery/${tour.slug}?filter-multi-days-tours=review-${reviewKey}&from=reviews`,
                  priority: 0.65,
                  changeFrequency: "monthly",
                });
              }
            } catch {
              // Graceful fallback if reviews cannot be fetched
            }
          }
        }
      }
    }

    // One-day Tour Packages
    if (oneDayRes.status === "fulfilled" && oneDayRes.value?.data) {
      for (const tour of oneDayRes.value.data) {
        if (tour.slug) {
          routes.push({
            path: `/booking/one-day-tours/${tour.slug}`,
            priority: 0.9,
            changeFrequency: "weekly",
          });
          routes.push({
            path: `/booking/one-day-tours/${tour.slug}/reviews`,
            priority: 0.7,
            changeFrequency: "monthly",
          });
          routes.push({
            path: `/gallery/${tour.slug}`,
            priority: 0.75,
            changeFrequency: "monthly",
          });
          // Package Guest Review & Moments Gallery
          routes.push({
            path: `/gallery/${tour.slug}?filter-one-day-tours=all-moments`,
            priority: 0.75,
            changeFrequency: "monthly",
          });

          // Specific User Review Image Galleries
          if (tour.id) {
            try {
              const reviews = await reviewService.getReviewsByPackageId(tour.id).catch(() => []);
              const reviewsWithImages = (reviews || []).filter(
                (r) => Array.isArray(r.imageUrls) && r.imageUrls.length > 0
              );
              for (const r of reviewsWithImages) {
                const reviewKey = r.id || encodeURIComponent(r.fullName.toLowerCase().trim());
                routes.push({
                  path: `/gallery/${tour.slug}?filter-one-day-tours=review-${reviewKey}&from=reviews`,
                  priority: 0.65,
                  changeFrequency: "monthly",
                });
              }
            } catch {
              // Graceful fallback if reviews cannot be fetched
            }
          }
        }
      }
    }

    // Destinations & Destination Galleries
    if (destinationsRes.status === "fulfilled" && Array.isArray(destinationsRes.value)) {
      for (const dest of destinationsRes.value) {
        if (dest.slug) {
          routes.push({
            path: `/destination/${dest.slug}`,
            priority: 0.85,
            changeFrequency: "monthly",
          });
          routes.push({
            path: `/gallery/destination/${dest.slug}`,
            priority: 0.75,
            changeFrequency: "monthly",
          });
        }
      }
    }

    // Blog Articles & Blog Galleries
    if (blogsRes.status === "fulfilled" && Array.isArray(blogsRes.value)) {
      for (const blog of blogsRes.value) {
        if (blog.slug) {
          routes.push({
            path: `/blog/${blog.slug}`,
            priority: 0.8,
            changeFrequency: "monthly",
            lastModified: blog.createdAt ? new Date(blog.createdAt) : undefined,
          });
          routes.push({
            path: `/gallery/${blog.slug}`,
            priority: 0.7,
            changeFrequency: "monthly",
          });
        }
      }
    }
  } catch (error) {
    console.warn("Sitemap: Dynamic backend fetch failed, proceeding with static routes:", error);
  }

  // 5. Special Events & Event Galleries from Static Data
  if (Array.isArray(apiResponseEvents)) {
    for (const evt of apiResponseEvents) {
      if (evt.slug) {
        routes.push({
          path: `/events/${evt.slug}`,
          priority: 0.75,
          changeFrequency: "monthly",
        });
        routes.push({
          path: `/gallery/${evt.slug}`,
          priority: 0.7,
          changeFrequency: "monthly",
        });
      }
    }
  }

  // Build the complete localized Sitemap with hreflang alternates (en, ja, x-default)
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const item of routes) {
    for (const locale of LOCALES) {
      const localizedUrl = `${BASE_URL}/${locale}${item.path}`;

      sitemapEntries.push({
        url: localizedUrl,
        lastModified: item.lastModified || new Date(),
        changeFrequency: item.changeFrequency,
        priority: item.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${item.path}`,
            ja: `${BASE_URL}/ja${item.path}`,
            "x-default": `${BASE_URL}/en${item.path}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
