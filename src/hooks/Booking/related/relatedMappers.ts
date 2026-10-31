import type { PackageSummary } from "@/services/tours/types";
import type { BlogPreview } from "@/services/blogs/types";
import type { RecommendationType } from "@/components/booking/RelatedBookingSections/RecommendationCard";
import type { InsightType } from "@/components/booking/RelatedBookingSections/InsightCard";

export function mapPackageToRecommendation(
  pkg: PackageSummary,
  tourType: "multi" | "one",
  newLabel: string,
): RecommendationType {
  const base = tourType === "one" ? "/booking/one-day-tours" : "/booking/multi-days-tours";

  return {
    categoryLabel: pkg.category,
    origin: pkg.origin,
    title: pkg.title,
    duration: pkg.duration,
    rating: pkg.averageRating > 0 ? pkg.averageRating.toFixed(1) : newLabel,
   price: pkg.price,
    image: pkg.heroImage,
    slug: pkg.slug,
    href: `${base}/${pkg.slug}`,
  };
}

export function mapBlogToInsight(blog: BlogPreview): InsightType {
  return {
    category: blog.category,
    label: blog.readTime,
    title: blog.title,
    excerpt: blog.summary,
    image: blog.previewImage,
    slug: blog.slug,
  };
}
