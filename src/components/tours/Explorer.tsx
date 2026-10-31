// src/components/tours/Explorer.tsx
"use client";

import { useMemo, useState, useTransition } from "react";
import { Card } from "@/components/tours/Card";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/SearchInput";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";

// New Hook and Loader/Error Components
import { usePackageSummaries } from "@/hooks/tours/usePackageSummaries";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";

type PackageExplorerProps = {
  // packages: TourPackage[]; // This is no longer needed as we fetch internally
  tourType?: "multi" | "one";
};

const INITIAL_COUNT = 4;

export function Explorer({ tourType = "multi" }: PackageExplorerProps) {
  const t = useTranslations("Tours.Explorer");

  // Fetch data directly within the component
  const mappedType = tourType === "multi" ? "multiday" : "oneday";
  const { packages, isLoading, error, refetch } = usePackageSummaries(mappedType, 50); // Fetch a larger limit for client-side filtering

  // ... (keep dynamicPriceFilters and dynamicRatingFilters)
  const dynamicPriceFilters = useMemo(
    () => [
      { value: "any", label: t("priceFilters.any") },
      { value: "under-200", label: t("priceFilters.under200") },
      { value: "200-300", label: t("priceFilters.200to300") },
      { value: "over-300", label: t("priceFilters.over300") },
    ],
    [t],
  );

  const dynamicRatingFilters = useMemo(
    () => [
      { value: "any", label: t("ratingFilters.any") },
      { value: "4.5", label: t("ratingFilters.up45") },
      { value: "4.8", label: t("ratingFilters.up48") },
    ],
    [t],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [priceRange, setPriceRange] = useState(dynamicPriceFilters[0].label);
  const [rating, setRating] = useState(dynamicRatingFilters[0].label);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [, startTransition] = useTransition();

  // Update dynamic lists to use API fields
  const dynamicCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(packages.map((pkg) => pkg.category))); // Changed to item.category
    return ["all", ...uniqueCategories];
  }, [packages]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicCategories.forEach((cat) => {
      if (cat === "all") {
        counts[cat] = packages.length;
      } else {
        counts[cat] = packages.filter((p) => p.category === cat).length; // Changed to p.category
      }
    });
    return counts;
  }, [packages, dynamicCategories]);

  const dynamicDurations = useMemo(() => {
    const uniqueDurations = Array.from(new Set(packages.map((pkg) => pkg.duration)));
    return ["all", ...uniqueDurations];
  }, [packages]);

  const durationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicDurations.forEach((dur) => {
      if (dur === "all") {
        counts[dur] = packages.length;
      } else {
        counts[dur] = packages.filter((p) => p.duration === dur).length;
      }
    });
    return counts;
  }, [packages, dynamicDurations]);

  const priceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicPriceFilters.forEach((pf) => {
      counts[pf.label] = packages.filter((pkg) => {
        const priceVal = pkg.price; // Use the numeric price directly
        if (pf.value === "under-200") return priceVal < 200;
        if (pf.value === "200-300") return priceVal >= 200 && priceVal <= 300;
        if (pf.value === "over-300") return priceVal > 300;
        return true;
      }).length;
    });
    return counts;
  }, [packages, dynamicPriceFilters]);

  const ratingCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicRatingFilters.forEach((rf) => {
      counts[rf.label] = packages.filter((pkg) => {
        if (rf.value === "any") return true;
        const r = pkg.averageRating; // Use averageRating
        const threshold = parseFloat(rf.value);
        return r >= threshold;
      }).length;
    });
    return counts;
  }, [packages, dynamicRatingFilters]);

  // Update filtering logic to use API fields
  const filteredPackages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return packages.filter((item) => {
      const matchesCategory = category === "all" || item.category === category; // Changed to item.category
      const matchesDuration = duration === "all" || item.duration === duration;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(normalizedQuery); // Updated search fields

      let matchesPrice = true;
      if (priceRange !== dynamicPriceFilters[0].label) {
        const priceVal = item.price; // Use numeric price
        if (priceRange === dynamicPriceFilters[1].label) matchesPrice = priceVal < 200;
        else if (priceRange === dynamicPriceFilters[2].label) matchesPrice = priceVal >= 200 && priceVal <= 300;
        else if (priceRange === dynamicPriceFilters[3].label) matchesPrice = priceVal > 300;
      }

      let matchesRating = true;
      if (rating !== dynamicRatingFilters[0].label) {
        const activeRatingFilter = dynamicRatingFilters.find((r) => r.label === rating);
        if (activeRatingFilter && activeRatingFilter.value !== "any") {
          const ratingVal = item.averageRating; // Use averageRating
          const threshold = parseFloat(activeRatingFilter.value);
          matchesRating = ratingVal >= threshold;
        }
      }

      return matchesCategory && matchesDuration && matchesSearch && matchesPrice && matchesRating;
    });
  }, [category, duration, packages, query, priceRange, rating, dynamicPriceFilters, dynamicRatingFilters]);

  const visiblePackages = filteredPackages.slice(0, visibleCount);
  const hasMore = visiblePackages.length < filteredPackages.length;
  const tApi = useTranslations("Common.Api");
  if (isLoading) {
    return (
      <section className="bg-lanka-dark min-h-screen">
        <ApiCallLoader fullScreen={true} text={tApi("loadingTours")} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-lanka-dark min-h-screen">
        <ApiCallError
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={true}
          onRetry={refetch}
        />
      </section>
    );
  }

  return (
    <section id="packages" className="bg-lanka-dark">
      <ContainerLayout className="pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28 space-y-8">
        <div className="mb-12 md:mb-16 xl:mb-16 2xl:mb-20 3xl:mb-24 space-y-8">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="relative flex shrink-0 justify-start">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5  text-caption font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
              >
                <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
                <span className="transition-colors duration-300 group-hover:text-black">{t("filterPackages")}</span>

                {(category !== "all" ||
                  duration !== "all" ||
                  priceRange !== dynamicPriceFilters[0].label ||
                  rating !== dynamicRatingFilters[0].label) && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-micro font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                    {(category !== "all" ? 1 : 0) +
                      (duration !== "all" ? 1 : 0) +
                      (priceRange !== dynamicPriceFilters[0].label ? 1 : 0) +
                      (rating !== dynamicRatingFilters[0].label ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            <SearchInput
              value={query}
              onChange={(val) => {
                setQuery(val);
                setVisibleCount(INITIAL_COUNT);
              }}
              placeholder={t("searchPlaceholder")}
              count={filteredPackages.length}
              itemLabel={t("packages")}
              className="w-full md:w-72 lg:flex-none lg:w-96"
            />
          </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {filteredPackages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-10">
              {visiblePackages.map((item) => (
                <Card key={item.id} item={item} tourType={tourType} /> // Use item.id as key
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center md:mt-14">
              {hasMore ? (
                <Button
                  type="button"
                  className="[&_span]:text-caption!"
                  variant="explore"
                  onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}
                >
                  {t("loadMore")}
                </Button>
              ) : null}

              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-8 bg-gold/20" />
                <p className="whitespace-nowrap text-tiny font-medium uppercase tracking-[0.2em] text-slate-500">
                  {t("showing")} <span className="text-gold">{visiblePackages.length}</span> {t("of")}{" "}
                  <span className="text-white">{filteredPackages.length}</span> {t("packages")}
                </p>
                <div className="h-px w-8 bg-gold/20" />
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            backgroundText={t("EmptyState.backgroundText")}
            title={t("EmptyState.title")}
            description={
              <>
                {query.trim() !== "" ? (
                  <>{t("EmptyState.searchNoResult", { query: query })}</>
                ) : (
                  <>{t("EmptyState.filterNoResult")}</>
                )}
                <br />
                {t("EmptyState.redefine")}
              </>
            }
            buttonText={t("EmptyState.resetBtn")}
            onAction={() => {
              setQuery("");
              setCategory("all");
              setDuration("all");
              setPriceRange(dynamicPriceFilters[0].label);
              setRating(dynamicRatingFilters[0].label);
            }}
          />
        )}
      </ContainerLayout>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={dynamicCategories}
        selectedCategory={category}
        totalResults={filteredPackages.length}
        onSelectCategory={(val) => {
          startTransition(() => {
            setCategory(val);
            setVisibleCount(INITIAL_COUNT);
          });
        }}
        title={t("filterPackages")}
        categoryCounts={categoryCounts}
        priceCategories={dynamicPriceFilters}
        ratingCategories={dynamicRatingFilters}
        priceCounts={priceCounts}
        ratingCounts={ratingCounts}
        priceRange={priceRange}
        onPriceChange={(val) => {
          setPriceRange(val);
          setVisibleCount(INITIAL_COUNT);
        }}
        rating={rating}
        onRatingChange={(val) => {
          setRating(val);
          setVisibleCount(INITIAL_COUNT);
        }}
        duration={duration}
        onDurationChange={(val) => {
          startTransition(() => {
            setDuration(val);
            setVisibleCount(INITIAL_COUNT);
          });
        }}
        durationCategories={dynamicDurations}
        durationCounts={durationCounts}
        durationTitle={tourType === "multi" ? "Duration (Days)" : "Duration (Hours)"}
        onClearAll={() => {
          setCategory("all");
          setDuration("all");
          setPriceRange(dynamicPriceFilters[0].label);
          setRating(dynamicRatingFilters[0].label);
          setQuery("");
          setVisibleCount(INITIAL_COUNT);
          setIsFilterOpen(false);
        }}
      />
    </section>
  );
}
