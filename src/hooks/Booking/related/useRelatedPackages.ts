import { useMemo } from "react";
import { usePackageSummaries } from "@/hooks/tours/usePackageSummaries";
import type { PackageSummary } from "@/services/tours/types";
import { mapPackageToRecommendation } from "./relatedMappers";
import { useTranslations } from "next-intl";

type CurrentPackage = {
  slug: string;
  category?: string;
  origin?: string;
  price?: number;
};

export function useRelatedPackages(tourType: "multi" | "one", current: CurrentPackage, max = 4) {
  const t = useTranslations("Tours.Card");

  const apiType = tourType === "one" ? "oneday" : "multiday";
  const { packages, isLoading, error, refetch } = usePackageSummaries(apiType, 12);

  const { slug, category, origin, price } = current;

  const recommendations = useMemo(() => {
    const score = (p: PackageSummary) => {
      let s = 0;
      if (category && p.category === category) s += 3;
      if (origin && p.origin === origin) s += 2;
      if (price && price > 0 && Math.abs(p.price - price) / price <= 0.3) s += 1;
      s += Math.min((p.averageRating || 0) / 5, 1) * 0.5;
      return s;
    };

    return packages
      .filter((p) => p.slug !== slug)
      .sort((a, b) => score(b) - score(a))
      .slice(0, max)
      .map((p) => mapPackageToRecommendation(p, tourType, t("newBadge")));
  }, [packages, slug, category, origin, price, max, tourType, t]);

  return { recommendations, isLoading, error, refetch };
}
