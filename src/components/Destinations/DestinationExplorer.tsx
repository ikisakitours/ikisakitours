"use client";

import { useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/i18nNavigation";
import { type Destination } from "@/data/destinationData";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { Map } from "lucide-react";
import { useTranslations } from "next-intl";

import DestinationsCard from "@/components/Destinations/DestinationsCard";
import FilterButtonSearchInput from "@/components/Destinations/FilterButtonSearchInput";
import DestinationsMap from "@/components/Destinations/DestinationsMap/DestinationsMap";

type DestinationExplorerProps = {
  destinations: Destination[];
};

const INITIAL_COUNT = 3;

export function DestinationExplorer({ destinations }: DestinationExplorerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("Destinations.Explorer");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [, startTransition] = useTransition();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMap, setShowMap] = useState(searchParams.get("view") === "map");

  const handleMapToggle = (isOpen: boolean) => {
    setShowMap(isOpen);
    const params = new URLSearchParams(searchParams.toString());
    if (isOpen) {
      params.set("view", "map");
    } else {
      params.delete("view");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const dynamicCategories = useMemo(() => {
    const uniqueRegions = Array.from(new Set(destinations.map((dest) => dest.region)));
    return ["all", ...uniqueRegions];
  }, [destinations]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: destinations.length };

    destinations.forEach((dest) => {
      const reg = dest.region;
      if (counts[reg] !== undefined) {
        counts[reg] += 1;
      } else {
        counts[reg] = 1;
      }
    });

    dynamicCategories.forEach((cat) => {
      if (counts[cat] === undefined) counts[cat] = 0;
    });

    return counts;
  }, [destinations, dynamicCategories]);

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return destinations.filter((item) => {
      const matchesCategory = category === "all" || item.region === category;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${item.name} ${item.about} ${item.hero.strapline}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [category, destinations, query]);

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMore = visibleDestinations.length < filteredDestinations.length;

  return (
    <section id="destinations" className="bg-lanka-dark">
      <ContainerLayout className="pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
        <div className=" flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full flex-1">
            {!showMap && (
              <FilterButtonSearchInput
                query={query}
                setQuery={setQuery}
                category={category}
                filteredCount={filteredDestinations.length}
                setVisibleCount={setVisibleCount}
                initialCount={INITIAL_COUNT}
                setIsFilterOpen={setIsFilterOpen}
              />
            )}
            {!showMap && filteredDestinations.length > 0 && (
              <div className="relative mb-8 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 overflow-hidden rounded-3xl border border-white/5 bg-surface/40 p-6 md:p-8 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none overflow-hidden opacity-[0.03] dark:opacity-[0.06]">
                  <span className="absolute top-[65%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 premium-serif whitespace-nowrap text-[3.7rem] min-[340px]:max-[365px]:text-[3.4rem] min-[540px]:text-[5.5rem] sm:text-[3.7rem] md:text-[7rem] lg:text-[9rem] xl:text-[8.5rem] 2xl:text-[8.7rem] 3xl:text-[10rem] font-black uppercase leading-none text-gold">
                    {t("watermark")}
                  </span>
                </div>

                <div className="relative z-10 text-center lg:text-left">
                  <div className="mb-1.5 flex items-center justify-center lg:justify-start gap-2 text-gold">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
                    <span className="text-tiny font-extrabold uppercase tracking-[0.3em]">{t("geoBadge")}</span>
                  </div>
                  <h3 className="premium-serif text-heading-sub italic text-white  tracking-wide">{t("mapTitle")}</h3>
                  <p className="mt-1.5 text-body font-light text-slate-400 max-w-md">{t("mapDesc")}</p>
                </div>

                <div className="relative z-10 shrink-0">
                  <div className="relative z-10 shrink-0">
                    <Button
                      variant="shine"
                      onClick={() => handleMapToggle(true)}
                      className="px-3 py-1.5 [&_span]:text-tiny! sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5 3xl:px-6 3xl:py-3 "
                    >
                      <span className="group-hover:text-black flex items-center gap-1.5 sm:gap-2 transition-colors duration-300">
                        <Map className="h-3 w-3 sm:h-3.5 sm:w-3.5 2xl:h-4 2xl:w-4 3xl:h-5 3xl:w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span>{t("viewMapBtn")}</span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showMap ? (
          <div className="relative animate-fade-in-up">
            <DestinationsMap onClose={() => handleMapToggle(false)} />
          </div>
        ) : (
          <>
            {filteredDestinations.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-12">
                  {visibleDestinations.map((dest) => (
                    <DestinationsCard key={dest.slug} dest={dest} />
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center md:mt-24">
                  {hasMore ? (
                    <Button
                      className="[&_span]:text-caption!"
                      type="button"
                      variant="explore"
                      onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}
                    >
                      {t("loadMore")}
                    </Button>
                  ) : null}

                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-px w-8 bg-gold/20" />
                    <p className="whitespace-nowrap text-tiny font-medium uppercase tracking-[0.2em] text-slate-500">
                      {t("showing")} <span className="text-gold">{visibleDestinations.length}</span> {t("of")}{" "}
                      <span className="text-white">{filteredDestinations.length}</span> {t("destinations")}
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
                      <>{t("EmptyState.filterNoResult", { category: category })}</>
                    )}
                    <br />
                    {t("EmptyState.redefine")}
                  </>
                }
                buttonText={t("EmptyState.resetBtn")}
                onAction={() => {
                  setQuery("");
                  setCategory("all");
                  setVisibleCount(INITIAL_COUNT);
                }}
              />
            )}
          </>
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
        title={t("filterRegions")}
        categoryCounts={categoryCounts}
        clearFilterText={t("Sidebar.clearFilter")}
        categoryLabels={{ all: t("Sidebar.all") }}
      />
    </section>
  );
}
