"use client";

import React, { useState, useEffect, useRef } from "react";
import DestinationsMap from "@/components/Destinations/DestinationsMap/DestinationsMap";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { DestinationSummary } from "@/services/Booking/packageDetails/types";
import { useFetchDestinationMapData } from "@/hooks/destinations/useFetchDestinationMapData";
//Icons
import { MapPin, Map, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type CoveredCitiesRouteProps = {
  destinations: DestinationSummary[];
};

export default function CoveredCitiesRoute({ destinations }: CoveredCitiesRouteProps) {
  const t = useTranslations("Booking.CoveredCities");
  const [showMap, setShowMap] = useState(false);

  const { data: allMapDestinations } = useFetchDestinationMapData();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [destinations]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#route-map") {
      setTimeout(() => {
        setShowMap(true);
      }, 0);
    }
  }, []);

  const handleMapToggle = (isOpen: boolean) => {
    setShowMap(isOpen);
    if (typeof window !== "undefined") {
      if (isOpen) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search + "#route-map");
      } else {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  };

  if (!destinations || destinations.length === 0) return null;

  const mappedDestinations = destinations.map((dest, index) => {
    const fullMapData = allMapDestinations?.find((item) => item.slug === dest.slug || item.id === dest.id);

    return {
      id: dest.id || String(index + 1),
      slug: dest.slug || "",
      title: dest.title || "",
      coordinates: {
        lat: fullMapData?.coordinates?.lat || 0,
        lng: fullMapData?.coordinates?.lng || 0,
      },
      heroImage: dest.heroImage || fullMapData?.heroImage || "",
      summary: dest.summary || fullMapData?.summary || "",
    };
  });

  return (
    <>
      {!showMap && (
        <section
          id="Covered-CitiesRoute"
          className="glass-card relative overflow-hidden rounded-4xl border border-white/5 p-6 md:p-8"
        >
          {/* Background Glow Effect */}
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold/5 blur-3xl" />

          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5 text-caption font-bold uppercase tracking-[0.2em] text-gold">
              <MapPin className="h-4.5 w-4.5 md:h-5 md:w-5 animate-pulse" />
              {t("title")}
            </div>

            <div className="flex w-full items-center justify-end gap-4 sm:w-auto">
              <span className="text-caption font-semibold uppercase tracking-widest text-slate-400">
                {t("magicalStops", { count: destinations.length })}
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth"
            >
              {destinations.map((dest, idx) => {
                const safeTitle = dest.title || "";
                return (
                  <React.Fragment key={dest.id || idx}>
                    <div className="group flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gold text-tiny font-bold text-lanka-black">
                        {idx + 1}
                      </span>

                      <span className="text-body-sm font-semibold tracking-wide text-white capitalize transition-colors group-hover:text-gold">
                        {safeTitle.replace(/-/g, " ")}
                      </span>
                    </div>

                    {idx < destinations.length - 1 && (
                      <ArrowRight className="h-3 w-3 shrink-0 text-gold/60 mx-1" strokeWidth={4} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="shine"
                onClick={() => handleMapToggle(true)}
                className="px-3 py-1.5 text-caption! sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5  3xl:px-6 3xl:py-3"
              >
                <span className="group-hover:text-black flex items-center gap-1.5 sm:gap-2 transition-colors duration-300">
                  <Map className="h-3 w-3 sm:h-3.5 sm:w-3.5 2xl:h-4 2xl:w-4 3xl:h-5 3xl:w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>{t("viewRouteMap")}</span>
                </span>
              </Button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all 
                 ${!canScrollLeft ? "cursor-not-allowed opacity-30" : "cursor-pointer hover:border-gold hover:bg-gold hover:text-black"}`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all 
                 ${!canScrollRight ? "cursor-not-allowed opacity-30" : "cursor-pointer hover:border-gold hover:bg-gold hover:text-black"}`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between text-micro tracking-wider text-slate-400">
              <span className="flex items-start sm:items-center gap-1.5 text-gold/80 leading-relaxed font-semibold uppercase tracking-[0.2em]">
                <span className="mt-1 sm:mt-0 shrink-0 inline-block h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                <span>{t("clickMap")}</span>
              </span>

              <span className="pl-3 sm:pl-0 inline-block uppercase tracking-[0.2em] text-slate-500 font-semibold">
                {t("swipeHint")}
              </span>
            </div>
          </div>
        </section>
      )}

      {showMap && mappedDestinations.length > 0 && (
        <div className="animate-fade-in-up">
          <DestinationsMap
            onClose={() => handleMapToggle(false)}
            routeDestinations={mappedDestinations}
            isRouteMode={true}
          />
        </div>
      )}
    </>
  );
}
