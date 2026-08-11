"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "@/i18nNavigation";
import { motion, Transition } from "framer-motion";
import { Search, ArrowRight, MapPin, Map, BookOpen, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

// Data Imports
import { destinationsData } from "@/data/destinationData";
import { oneDayTours } from "@/data/oneDayTours";
import { packages } from "@/data/multiDaysTours";
import { blogPosts } from "@/data/blog";
import { allSpecialEventsList } from "@/data/specialEvents";

const smoothTransition: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
};

export function OmniSearch() {
  const t = useTranslations("HomePage.Hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Click outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Logic
  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return null;

    // Destinations Filter
    const dests = destinationsData
      .filter((d) => d.name.toLowerCase().includes(query) || d.region.toLowerCase().includes(query))
      .slice(0, 3);

    // Multi-day Tours Filter (type property එක එක් කර ඇත)
    const multiDayToursList = packages
      .filter((t) => t.title.toLowerCase().includes(query) || t.categoryLabel.toLowerCase().includes(query))
      .slice(0, 3)
      .map((t) => ({ ...t, tourType: "Multi-Day Tour" }));

    const oneDayToursList = oneDayTours
      .filter((t) => t.title.toLowerCase().includes(query) || t.categoryLabel.toLowerCase().includes(query))
      .slice(0, 3)
      .map((t) => ({ ...t, tourType: "One-Day Tour" }));

    const combinedTours = [...multiDayToursList, ...oneDayToursList].slice(0, 4);

    // Journals / Blogs Filter
    const blogs = blogPosts
      .filter((b) => b.title.toLowerCase().includes(query) || b.category.toLowerCase().includes(query))
      .slice(0, 3);

    // Events Filter
    const events = allSpecialEventsList.filter((e) => e.title.toLowerCase().includes(query)).slice(0, 3);

    const hasResults = dests.length > 0 || combinedTours.length > 0 || blogs.length > 0 || events.length > 0;

    return { dests, combinedTours, blogs, events, hasResults };
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...smoothTransition, delay: 0.5 }}
      style={{ willChange: "transform, opacity" }}
      className="max-w-xl 3xl:max-w-3xl relative z-50"
      ref={searchContainerRef}
    >
      <div className="group relative">
        <div className="absolute -inset-1 rounded-2xl bg-gold/20 opacity-0 blur-lg transition duration-700 group-hover:opacity-100" />
        <div className="relative flex items-center rounded-xl border border-foreground/10 bg-lanka-black/60 p-1 shadow-2xl backdrop-blur-2xl md:rounded-2xl md:p-1.5 3xl:rounded-3xl 3xl:p-2">
          <div className="flex flex-1 items-center px-2 md:px-5 3xl:px-8">
            <Search className="h-3 w-3 shrink-0 text-gold md:h-5 md:w-5 3xl:h-8 3xl:w-8" />
            <input
              type="text"
              placeholder={t("content.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full bg-transparent p-2.5 text-sm font-light text-foreground outline-none placeholder:text-foreground/50 md:p-2.7 md:text-base 3xl:p-6 3xl:text-2xl"
            />
          </div>
          <Button type="button" variant="primary" className="3xl:px-12 3xl:py-6 3xl:text-lg 3xl:rounded-2xl">
            <span className="hidden sm:block">{t("content.startJourneyText")}</span>
            <ArrowRight className="h-4 w-4 sm:hidden 3xl:h-6 3xl:w-6" />
          </Button>
        </div>
      </div>

      {/* SEARCH RESULTS DROPDOWN */}
      {isDropdownOpen && searchQuery.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-3 z-9999 overflow-hidden rounded-2xl border border-white/10 bg-[#070707] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          {/* Scrollable Container with internal padding to contain the scrollbar safely */}
          <div className="max-h-[55vh] overflow-y-auto custom-scrollbar p-6 space-y-6">
            {searchResults?.hasResults ? (
              <div className="flex flex-col gap-6 text-left">
                {/* Destinations */}
                {searchResults.dests.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 pb-2 border-b border-white/5">
                      <MapPin className="h-3 w-3" /> Destinations
                    </div>
                    <div className="divide-y divide-white/5">
                      {searchResults.dests.map((dest) => (
                        <Link
                          key={dest.slug}
                          href={`/destination/${dest.slug}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="group flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/3 transition-all duration-200"
                        >
                          <div>
                            <p className="text-sm font-light text-white group-hover:text-gold transition-colors">
                              {dest.name}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40 mt-0.5">{dest.region}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tour Packages */}
                {searchResults.combinedTours.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 pb-2 border-b border-white/5">
                      <Map className="h-3 w-3" /> Tour Packages
                    </div>
                    <div className="divide-y divide-white/5">
                      {searchResults.combinedTours.map((tour, index) => {
                        const isMulti = tour.tourType === "Multi-Day Tour";
                        const targetHref = isMulti
                          ? `/booking/multi-days-tours/${tour.slug}`
                          : `/booking/one-day-tours/${tour.slug}`;

                        return (
                          <Link
                            key={`${tour.slug}-${index}`}
                            href={targetHref}
                            onClick={() => setIsDropdownOpen(false)}
                            className="group flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/3 transition-all duration-200"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-light text-white group-hover:text-gold transition-colors">
                                  {tour.title}
                                </p>
                                <span
                                  className={`text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    isMulti
                                      ? "bg-gold/10 text-gold border border-gold/20"
                                      : "bg-white/5 text-white/60 border border-white/10"
                                  }`}
                                >
                                  {tour.tourType}
                                </span>
                              </div>
                              <p className="text-[9px] text-white/40 mt-1">
                                {tour.duration} • {tour.categoryLabel}
                              </p>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Journals */}
                {searchResults.blogs.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 pb-2 border-b border-white/5">
                      <BookOpen className="h-3 w-3" /> Journal & Stories
                    </div>
                    <div className="divide-y divide-white/5">
                      {searchResults.blogs.map((blog) => (
                        <Link
                          key={blog.slug}
                          href={`/blog/${blog.slug}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="group flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/3 transition-all duration-200"
                        >
                          <div>
                            <p className="text-sm font-light text-white group-hover:text-gold transition-colors">
                              {blog.title}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40 mt-0.5">
                              {blog.category} • {blog.readTime}
                            </p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events */}
                {searchResults.events.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 pb-2 border-b border-white/5">
                      <CalendarHeart className="h-3 w-3" /> Upcoming Events
                    </div>
                    <div className="divide-y divide-white/5">
                      {searchResults.events.map((event) => (
                        <Link
                          key={event.slug}
                          href={`/events/${event.slug}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="group flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/3 transition-all duration-200"
                        >
                          <div>
                            <p className="text-sm font-light text-white group-hover:text-gold transition-colors">
                              {event.title}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-white/40 mt-0.5">
                              {event.statusTag}
                            </p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-white/40 text-xs font-light">
                No results found for &quot;<span className="text-gold">{searchQuery}</span>&quot;.
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
