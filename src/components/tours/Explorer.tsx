"use client";

import { useMemo, useState, useTransition } from "react";
import { Card } from "@/components/tours/Card";
import { type MultiDaysTourPackage } from "@/data/multiDaysTours";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/SearchInput";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
//Icon
import { Filter } from "lucide-react";

type PackageExplorerProps = {
  packages: MultiDaysTourPackage[];
};

const INITIAL_COUNT = 4;

//  Price Filters
const dynamicPriceFilters = [
  { value: "any", label: "Any price" },
  { value: "under-200", label: "Under $200" },
  { value: "200-300", label: "$200 - $300" },
  { value: "over-300", label: "Over $300" },
];

//  Rating Filters
const dynamicRatingFilters = [
  { value: "any", label: "Any rating" },
  { value: "4.5", label: "4.5 & up" },
  { value: "4.8", label: "4.8 & up" },
];

export function Explorer({ packages }: PackageExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState("Any price");
  const [rating, setRating] = useState("Any rating");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [, startTransition] = useTransition();

  const dynamicCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(packages.map((pkg) => pkg.categoryLabel)));
    return ["all", ...uniqueCategories];
  }, [packages]);

  // 2. COUNTS CALCULATION FOR CATEGORIES
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicCategories.forEach((cat) => {
      if (cat === "all") {
        counts[cat] = packages.length;
      } else {
        counts[cat] = packages.filter((p) => p.categoryLabel === cat).length;
      }
    });
    return counts;
  }, [packages, dynamicCategories]);

  // 3. DYNAMIC PRICE FILTERS
  const priceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicPriceFilters.forEach((pf) => {
      counts[pf.label] = packages.filter((pkg) => {
        const priceVal = parseFloat(pkg.price.replace(/[^0-9.]/g, ""));
        if (pf.value === "under-200") return priceVal < 200;
        if (pf.value === "200-300") return priceVal >= 200 && priceVal <= 300;
        if (pf.value === "over-300") return priceVal > 300;
        return true;
      }).length;
    });
    return counts;
  }, [packages]);

  // 4. DYNAMIC RATING FILTERS
  const ratingCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicRatingFilters.forEach((rf) => {
      counts[rf.label] = packages.filter((pkg) => {
        if (rf.value === "any") return true;
        const r = parseFloat(pkg.rating);
        const threshold = parseFloat(rf.value);
        return r >= threshold;
      }).length;
    });
    return counts;
  }, [packages]);

  // 5. FILTERING LOGIC
  const filteredPackages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return packages.filter((item) => {
      // Category Filter
      const matchesCategory = category === "all" || item.categoryLabel === category;

      // Search Filter
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.description} ${item.categoryLabel}`.toLowerCase().includes(normalizedQuery);

      // Price Filter
      let matchesPrice = true;
      if (priceRange !== "Any price") {
        const priceVal = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        if (priceRange === "Under $200") matchesPrice = priceVal < 200;
        else if (priceRange === "$200 - $300") matchesPrice = priceVal >= 200 && priceVal <= 300;
        else if (priceRange === "Over $300") matchesPrice = priceVal > 300;
      }

      // Rating Filter
      let matchesRating = true;
      if (rating !== "Any rating") {
        const activeRatingFilter = dynamicRatingFilters.find((r) => r.label === rating);
        if (activeRatingFilter && activeRatingFilter.value !== "any") {
          const ratingVal = parseFloat(item.rating);
          const threshold = parseFloat(activeRatingFilter.value);
          matchesRating = ratingVal >= threshold;
        }
      }

      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [category, packages, query, priceRange, rating]);

  const visiblePackages = filteredPackages.slice(0, visibleCount);
  const hasMore = visiblePackages.length < filteredPackages.length;

  return (
    <section id="packages" className="bg-lanka-dark ">
      <ContainerLayout>
        <div className="mb-16 space-y-8">
          <div className="flex flex-col-reverse justify-between gap-6 lg:flex-row lg:items-center">
            <div className="relative flex justify-start">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
              >
                <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
                <span className="transition-colors duration-300 group-hover:text-black">Filter Packages</span>

                {(category !== "all" || priceRange !== "Any price" || rating !== "Any rating") && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[9px] font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                    {(category !== "all" ? 1 : 0) +
                      (priceRange !== "Any price" ? 1 : 0) +
                      (rating !== "Any rating" ? 1 : 0)}
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
              placeholder="Search by destination..."
              count={filteredPackages.length}
              itemLabel="Package"
              className="lg:w-96"
            />
          </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {filteredPackages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 3xl:gap-10">
              {visiblePackages.map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>

            <div className="mt-20 flex flex-col items-center md:mt-24">
              {hasMore ? (
                <Button
                  type="button"
                  variant="explore"
                  onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}
                >
                  Load More Packages
                </Button>
              ) : null}

              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-8 bg-gold/20" />
                <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Showing <span className="text-gold">{visiblePackages.length}</span> of{" "}
                  <span className="text-white">{filteredPackages.length}</span> Packages
                </p>
                <div className="h-px w-8 bg-gold/20" />
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            backgroundText="Journeys"
            title="no matching journeys"
            description={
              <>
                Your search returned no destinations. <br />
                Please redefine your travel criteria.
              </>
            }
            buttonText="Reset Exploration"
            onAction={() => {
              setQuery("");
              setCategory("all");
              setPriceRange("Any price");
              setRating("Any rating");
            }}
          />
        )}
      </ContainerLayout>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={dynamicCategories}
        selectedCategory={category}
        onSelectCategory={(val) => {
          startTransition(() => {
            setCategory(val);
            setVisibleCount(INITIAL_COUNT);
          });
        }}
        title="Filter Tour"
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
        onClearAll={() => {
          setCategory("all");
          setPriceRange("Any price");
          setRating("Any rating");
          setQuery("");
          setVisibleCount(INITIAL_COUNT);
          setIsFilterOpen(false);
        }}
      />
    </section>
  );
}
