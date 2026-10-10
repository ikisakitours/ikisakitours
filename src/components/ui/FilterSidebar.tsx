"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, FilterX, Star } from "lucide-react";

type CategoryFilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  title?: string;
  categoryCounts?: Record<string, number>;
  categoryLabels?: Record<string, string>;
  clearFilterText?: string;
  showClearButton?: boolean;
  showCounts?: boolean;
  selectedRating?: string | number;
  onSelectRating?: (rating: string | number) => void;
  selectedSort?: "newest" | "oldest";
  onSelectSort?: (sort: "newest" | "oldest") => void;
  totalResults?: number;
  selectedReadTime?: string;
  onSelectReadTime?: (time: string) => void;
  readTimeOptions?: string[];
  labels?: {
    categories: string;
    rating: string;
    allRatings: string;
    stars: string;
    sortByDate: string;
    newestFirst: string;
    oldestFirst: string;
    showResults: string;
    readTime?: string;
    allReadTimes?: string;
  };
};

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Framer Motion Curve SVG Component
const Curve = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowHeight === 0) return null;

  const initialPath = `M100 0 L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const targetPath = `M100 0 L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

  const curveVariants: Variants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.8, ease: customEase },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: customEase },
    },
  };

  return (
    <svg className="pointer-events-none absolute -left-24.75 top-0 h-full w-25 fill-[#0a0a0a] stroke-none">
      <motion.path variants={curveVariants} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

// Animations (Smoother settings)
const filterMenuVariants: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0%", transition: { duration: 0.8, ease: customEase } },
  exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: customEase } },
};

export function FilterSidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  title = "Select Category",
  categoryCounts = {},
  categoryLabels,
  clearFilterText = "Clear Filter",
  showClearButton = true,
  showCounts = true,
  selectedRating,
  onSelectRating,
  selectedSort,
  onSelectSort,
  totalResults,
  selectedReadTime,
  onSelectReadTime,
  readTimeOptions,
  labels,
}: CategoryFilterSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
      window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: true } }));
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
      window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: false } }));
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
      window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: false } }));
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-100 cursor-pointer bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            variants={filterMenuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 z-101 flex h-dvh w-full flex-col border-l border-white/5 bg-[#0a0a0a] shadow-2xl sm:w-100 will-change-transform"
          >
            <Curve />

            {/* --- 1. HEADER --- */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-8 py-6">
              <span className="text-body font-bold uppercase tracking-[0.2em] text-gold">{title}</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-gold hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* --- 2. SCROLLABLE CONTENT AREA --- */}
            <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6 space-y-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gold [&::-webkit-scrollbar-track]:bg-transparent">
              {/* Category Filter */}
              <div className="space-y-4">
                <h3 className="text-caption font-bold uppercase tracking-widest text-white/50">
                  {labels?.categories || "Categories"}
                </h3>

                <button
                  onClick={() => onSelectCategory("all")}
                  className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                    selectedCategory === "all" ? "text-gold" : "text-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" checked={selectedCategory === "all"} readOnly className="accent-gold h-4 w-4" />
                    All
                  </span>
                  {showCounts && <span className="text-white/30">{categoryCounts["all"] || 0}</span>}
                </button>

                {categories
                  .filter((c) => c !== "all")
                  .map((item) => {
                    const isActive = item === selectedCategory;
                    const displayLabel = categoryLabels?.[item] || item;

                    return (
                      <button
                        key={item}
                        onClick={() => onSelectCategory(item)}
                        className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                          isActive ? "text-gold" : "text-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input type="radio" checked={isActive} readOnly className="accent-gold h-4 w-4" />
                          {displayLabel}
                        </span>
                        {showCounts && <span className="text-white/30">{categoryCounts[item] || 0}</span>}
                      </button>
                    );
                  })}
              </div>

              {/* Rating Filter Section */}
              {onSelectRating && (
                <div className="space-y-4">
                  <h3 className="text-caption font-bold uppercase tracking-widest text-white/50">
                    {labels?.rating || "Rating"}
                  </h3>

                  <button
                    onClick={() => onSelectRating("all")}
                    className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                      selectedRating === "all" ? "text-gold" : "text-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input type="radio" checked={selectedRating === "all"} readOnly className="accent-gold h-4 w-4" />
                      {labels?.allRatings || "All Ratings"}
                    </span>
                  </button>

                  {[5, 4, 3, 2, 1].map((rate) => {
                    const isActive = selectedRating === rate;
                    return (
                      <button
                        key={rate}
                        onClick={() => onSelectRating(rate)}
                        className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                          isActive ? "text-gold" : "text-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input type="radio" checked={isActive} readOnly className="accent-gold h-4 w-4" />
                          {rate} {labels?.stars || "Stars"}
                        </span>

                        <div className="flex gap-1">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`h-3.5 w-3.5 ${
                                index < rate
                                  ? isActive
                                    ? "fill-gold text-gold"
                                    : "fill-white/40 text-white/40"
                                  : "fill-transparent text-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Date Sort Section */}
              {onSelectSort && (
                <div className="space-y-4">
                  <h3 className="text-caption font-bold uppercase tracking-widest text-white/50">
                    {labels?.sortByDate || "Sort by Date"}
                  </h3>

                  {[
                    { id: "newest", label: labels?.newestFirst || "Newest First" },
                    { id: "oldest", label: labels?.oldestFirst || "Oldest First" },
                  ].map((sortType) => {
                    const isActive = selectedSort === sortType.id;
                    return (
                      <button
                        key={sortType.id}
                        onClick={() => onSelectSort(sortType.id as "newest" | "oldest")}
                        className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                          isActive ? "text-gold" : "text-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input type="radio" checked={isActive} readOnly className="accent-gold h-4 w-4" />
                          {sortType.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {onSelectReadTime && readTimeOptions && (
                <div className="space-y-4">
                  <h3 className="text-caption font-bold uppercase tracking-widest text-white/50">
                    {labels?.readTime || "Reading Time"}
                  </h3>

                  <button
                    onClick={() => onSelectReadTime("all")}
                    className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                      selectedReadTime === "all" ? "text-gold" : "text-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={selectedReadTime === "all"}
                        readOnly
                        className="accent-gold h-4 w-4"
                      />
                      {labels?.allReadTimes || "All Times"}
                    </span>
                  </button>

                  {readTimeOptions.map((time) => {
                    const isActive = selectedReadTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => onSelectReadTime(time)}
                        className={`flex w-full items-center justify-between text-body-sm transition-colors hover:text-gold ${
                          isActive ? "text-gold" : "text-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input type="radio" checked={isActive} readOnly className="accent-gold h-4 w-4" />
                          {time}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* --- 3. BOTTOM BAR (Matching Reference) --- */}
            <div className="relative z-20 flex gap-4 border-t border-white/10 bg-[#0a0a0a] p-8">
              {showClearButton && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory("all");
                    if (onSelectRating) onSelectRating("all");
                    if (onSelectSort) onSelectSort("newest");
                    if (onSelectReadTime) onSelectReadTime("all");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-4 text-caption font-bold uppercase transition-all duration-300 ${
                    selectedCategory !== "all" ||
                    (selectedRating && selectedRating !== "all") ||
                    (selectedSort && selectedSort !== "newest") ||
                    (selectedReadTime && selectedReadTime !== "all")
                      ? "border-red-500/40 bg-red-950/30 text-red-400 hover:border-red-500/60 hover:bg-red-900/50"
                      : "border-white/10 text-white hover:bg-white/5"
                  }`}
                >
                  {(selectedCategory !== "all" ||
                    (selectedRating && selectedRating !== "all") ||
                    (selectedSort && selectedSort !== "newest") ||
                    (selectedReadTime && selectedReadTime !== "all")) && <FilterX className="h-3.5 w-3.5" />}
                  {selectedCategory !== "all" ||
                  (selectedRating && selectedRating !== "all") ||
                  (selectedSort && selectedSort !== "newest") ||
                  (selectedReadTime && selectedReadTime !== "all")
                    ? "CLEAR FILTER"
                    : clearFilterText}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex-[1.2] rounded-full bg-gold py-4 text-caption font-black uppercase tracking-[0.2em] text-black shadow-md transition-colors hover:bg-yellow-500"
              >
                {labels?.showResults || "Show Results"} {totalResults !== undefined ? `(${totalResults})` : ""}{" "}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
