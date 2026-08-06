"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
//Icon
import { X, FilterX } from "lucide-react";

type CategoryFilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: readonly string[];
  selectedCategory: string;
  totalResults: number;
  onSelectCategory: (category: string) => void;
  title?: string;
  categoryCounts: Record<string, number>;
  priceRange: string;
  onPriceChange: (range: string) => void;
  rating: string;
  onRatingChange: (rating: string) => void;
  onClearAll: () => void;
  priceCounts: Record<string, number>;
  ratingCounts: Record<string, number>;
  priceCategories: readonly { value: string; label: string }[];
  ratingCategories: readonly { value: string; label: string }[];
};

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

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
    enter: { d: targetPath, transition: { duration: 0.8, ease: customEase } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: customEase } },
  };

  return (
    <svg className="pointer-events-none absolute -left-24.75 top-0 h-full w-25 fill-[#0a0a0a] stroke-none">
      <motion.path variants={curveVariants} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

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
  totalResults,
  onSelectCategory,
  title = "Select Category",
  categoryCounts,
  priceRange,
  onPriceChange,
  rating,
  onRatingChange,
  onClearAll,
  priceCounts,
  ratingCounts,
  priceCategories,
  ratingCategories,
}: CategoryFilterSidebarProps) {
  const t = useTranslations("Tours.Explorer.Sidebar");
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: true } }));
    } else {
      document.body.classList.remove("overflow-hidden");
      window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: false } }));
    }
    return () => document.body.classList.remove("overflow-hidden");
    window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: false } }));
  }, [isOpen]);

  const isFilterActive = selectedCategory !== "all" || priceRange !== "Any price" || rating !== "Any rating";
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div onClick={onClose} className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm" />
          <motion.div
            variants={filterMenuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 z-101 flex h-dvh w-full flex-col border-l border-white/5 bg-[#0a0a0a] shadow-2xl sm:w-100"
          >
            <Curve />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-8 py-6">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold">{title}</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-gold hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
              {/* Category Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50">{t("categories")}</h3>
                <button
                  onClick={() => onSelectCategory("all")}
                  className="flex w-full items-center justify-between text-sm text-slate-300 transition-colors hover:text-gold"
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" checked={selectedCategory === "all"} readOnly className="accent-gold" /> All
                  </span>
                  <span className="text-white/30">{categoryCounts["all"]}</span>
                </button>

                {categories
                  .filter((c) => c !== "all")
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => onSelectCategory(item)}
                      className="flex w-full items-center justify-between text-sm text-slate-300 transition-colors hover:text-gold"
                    >
                      <span className="flex items-center gap-3">
                        <input type="radio" checked={selectedCategory === item} readOnly className="accent-gold" />{" "}
                        {item}
                      </span>
                      <span className="text-white/30">{categoryCounts[item]}</span>
                    </button>
                  ))}
              </div>

              {/* Price Range Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50">{t("price")}</h3>
                {priceCategories.map((p) => (
                  <label
                    key={p.value}
                    className="flex w-full cursor-pointer items-center justify-between text-sm font-medium text-slate-300 transition-colors hover:text-gold"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === p.label}
                        onChange={() => onPriceChange(p.label)}
                        className="accent-gold h-4 w-4"
                      />
                      {p.label}
                    </span>
                    <span className="text-xs text-white/30">{priceCounts[p.label] || 0}</span>
                  </label>
                ))}
              </div>

              {/* Rating Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50">{t("rating")}</h3>
                {ratingCategories.map((r) => (
                  <label
                    key={r.value}
                    className="flex w-full cursor-pointer items-center justify-between text-sm font-medium text-slate-300 transition-colors hover:text-gold"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="rating"
                        checked={rating === r.label}
                        onChange={() => onRatingChange(r.label)}
                        className="accent-gold h-4 w-4"
                      />
                      {r.label}
                    </span>
                    <span className="text-xs text-white/30">{ratingCounts[r.label] || 0}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-8 border-t border-white/10 flex gap-4">
              <button
                onClick={onClearAll}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-4 text-[11px] font-bold uppercase transition-all duration-300 ${
                  isFilterActive
                    ? "border-red-500/40 bg-red-950/30 text-red-400 hover:border-red-500/60 hover:bg-red-900/50"
                    : "border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {isFilterActive && <FilterX className="h-3.5 w-3.5" />}
                {isFilterActive ? t("clearFilter") : t("clear")}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-4 bg-gold rounded-full text-[11px] font-black text-black uppercase tracking-[0.3em] transition-colors hover:bg-yellow-500 shadow-md"
              >
                {t("showResults")} ({totalResults})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
