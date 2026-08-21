"use client";

import { ReactNode, useState, useMemo, useRef, useEffect } from "react";
import { Link } from "@/lib/i18nNavigation";
import { motion, Transition } from "framer-motion";
import { Search, ArrowRight, MapPin, Map, BookOpen, CalendarHeart } from "lucide-react";
import { useTranslations } from "next-intl";

// Data Imports
import { destinationsData } from "@/data/destinationData";
import { oneDayTours } from "@/data/oneDayTours";
import { packages } from "@/data/multiDaysTours";
import { blogPosts } from "@/data/blog";
import { allSpecialEventsList } from "@/data/specialEvents";

export interface SearchResultItem {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  badge?: string;
  isMultiDay?: boolean;
}

const smoothTransition: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
};

export function OmniSearch() {
  const t = useTranslations("HomePage.Hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
        <div className="group relative w-full max-w-xl md:max-w-2xl">
          <div className="absolute -inset-px rounded-full bg-linear-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 blur-md transition-opacity duration-700 group-focus-within:opacity-100" />

          {/* The Sleek Pill Container */}
          <div className="relative flex items-center rounded-full border border-white/5 bg-lanka-black/80 p-1.5 pl-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 group-focus-within:border-gold/40 group-focus-within:bg-lanka-black/95 md:p-2 md:pl-5 3xl:p-2.5 3xl:pl-6">
            <div className="flex flex-1 items-center gap-2 md:gap-3 3xl:gap-4">
              <Search className="h-4 w-4 shrink-0 text-gold/80 transition-transform duration-500 group-focus-within:scale-110 group-focus-within:text-gold md:h-4.5 md:w-4.5 3xl:h-6 3xl:w-6" />

              <input
                type="text"
                placeholder={t("content.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);

                  setIsTyping(true);
                  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                  typingTimeoutRef.current = setTimeout(() => {
                    setIsTyping(false);
                  }, 800);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full bg-transparent py-1.5 text-body font-light tracking-wide text-foreground outline-none placeholder:tracking-wider placeholder:text-foreground/30 md:py-2 3xl:py-2.5"
              />

              {/* The Unique Right Console */}
              <div className="flex shrink-0 items-center gap-2 pr-1 md:gap-3 md:pr-2">
                {/* Clean (X) Button */}
                {searchQuery.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsDropdownOpen(false);
                      setIsTyping(false);
                    }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all hover:bg-gold hover:text-lanka-black md:h-7 md:w-7 3xl:h-8 3xl:w-8"
                    title="Clear search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="3xl:w-4 3xl:h-4"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}

                {/*Live Navigation Radar*/}
                <div className="flex shrink-0 items-center justify-center gap-1.5 md:gap-2 rounded-full border border-gold/10 bg-gold/5 px-2.5 py-1.5 shadow-inner transition-colors group-focus-within:border-gold/20 group-focus-within:bg-gold/10 md:px-3.5 md:py-2 3xl:px-4 3xl:py-2.5">
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute h-2 w-2 rounded-full bg-gold/60 ${isTyping ? "animate-ping" : "animate-pulse"}`}
                    />

                    <span className="relative h-2 w-2 rounded-full bg-gold shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  </div>

                  <span className="text-micro leading-none font-bold tracking-[0.2em] text-gold/80 transition-all pt-px">
                    {searchQuery.length === 0 ? "OMNI-LINK" : isTyping ? "SCANNING" : "ACTIVE"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS DROPDOWN */}
      {isDropdownOpen && searchQuery.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-3 z-9999 overflow-hidden rounded-2xl border border-white/10 bg-[#070707] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          <div className="max-h-[55vh] overflow-y-auto custom-scrollbar p-6 space-y-6">
            {searchResults?.hasResults ? (
              <div className="flex flex-col gap-6 text-left">
                {/* 1. Destinations */}
                <SearchResultSection
                  title="Destinations"
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  onItemClick={() => setIsDropdownOpen(false)}
                  items={searchResults.dests.map((d) => ({
                    id: d.slug,
                    href: `/destination/${d.slug}`,
                    title: d.name,
                    subtitle: d.region,
                  }))}
                />

                {/* 2. Tour Packages */}
                <SearchResultSection
                  title="Tour Packages"
                  icon={<Map className="h-3.5 w-3.5" />}
                  onItemClick={() => setIsDropdownOpen(false)}
                  items={searchResults.combinedTours.map((t, idx) => {
                    const isMulti = t.tourType === "Multi-Day Tour";
                    return {
                      id: `${t.slug}-${idx}`,
                      href: isMulti ? `/booking/multi-days-tours/${t.slug}` : `/booking/one-day-tours/${t.slug}`,
                      title: t.title,
                      subtitle: `${t.duration} • ${t.categoryLabel}`,
                      badge: t.tourType,
                      isMultiDay: isMulti,
                    };
                  })}
                />

                {/* 3. Journals */}
                <SearchResultSection
                  title="Journal & Stories"
                  icon={<BookOpen className="h-3.5 w-3.5" />}
                  onItemClick={() => setIsDropdownOpen(false)}
                  items={searchResults.blogs.map((b) => ({
                    id: b.slug,
                    href: `/blog/${b.slug}`,
                    title: b.title,
                    subtitle: `${b.category} • ${b.readTime}`,
                  }))}
                />

                {/* 4. Events */}
                <SearchResultSection
                  title="Upcoming Events"
                  icon={<CalendarHeart className="h-3.5 w-3.5" />}
                  onItemClick={() => setIsDropdownOpen(false)}
                  items={searchResults.events.map((e) => ({
                    id: e.slug,
                    href: `/events/${e.slug}`,
                    title: e.title,
                    subtitle: e.statusTag,
                  }))}
                />
              </div>
            ) : (
              <div className="py-8 text-center text-white/40 text-body font-light">
                No results found for &quot;<span className="text-gold">{searchQuery}</span>&quot;.
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export interface SearchSectionProps {
  title: string;
  icon: ReactNode;
  items: SearchResultItem[];
  onItemClick: () => void;
}

function SearchResultSection({ title, icon, items, onItemClick }: SearchSectionProps) {
  // Results මුකුත් නැත්නම් මේ Section එක පෙන්නන්න එපා (Conditional Rendering)
  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Header කොටස */}
      <div className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.25em] text-gold/70 pb-2 border-b border-white/5">
        {icon} {title}
      </div>

      {/* Items List එක */}
      <div className="divide-y divide-white/5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onItemClick}
            className="group flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/3 transition-all duration-200"
          >
            <div className="flex flex-col gap-2">
              {/* Title & Badge Container */}
              <div className="flex flex-col items-start gap-1.5 md:flex-row md:items-center md:gap-2.5">
                <p className="text-body font-light text-white transition-colors group-hover:text-gold">{item.title}</p>

                {/* Badge (Conditional Rendering) */}
                {item.badge && (
                  <span
                    className={`text-tiny rounded-full border px-2 py-1 md:py-1 font-semibold uppercase tracking-wider ${
                      item.isMultiDay
                        ? "border-gold/20 bg-gold/10 text-gold"
                        : "border-white/10 bg-white/5 text-white/60"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <p className="text-micro uppercase tracking-wider text-white/40">{item.subtitle}</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
