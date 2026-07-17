"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, FilterX } from "lucide-react";

type CategoryFilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  title?: string;
  categoryCounts: Record<string, number>;
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

const filterStagger: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const filterItemVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.4 } },
};

export function FilterSidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  title = "Select Category",
  categoryCounts,
}: CategoryFilterSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
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

            {/* Sidebar Header */}
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

            {/* Categories List (Scrollable Area) */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8 sm:px-8">
              {/* Sticky Clear Filter Button (Fixed) */}
              <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-white/5 bg-[#0a0a0a] px-6 pb-4 pt-6 sm:-mx-8 sm:px-8">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory("all");
                    onClose();
                  }}
                  disabled={selectedCategory === "all"}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    selectedCategory !== "all"
                      ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                      : "cursor-not-allowed border-white/5 bg-white/5 text-white/20"
                  }`}
                >
                  <FilterX className="h-4 w-4" />
                  Clear Filter
                </button>
              </div>

              <motion.div
                variants={filterStagger}
                initial="initial"
                animate="enter"
                exit="exit"
                className="flex flex-col space-y-3"
              >
                {categories.map((item) => {
                  const isActive = item === selectedCategory;
                  const count = categoryCounts[item] || 0;

                  return (
                    <motion.button
                      key={item}
                      variants={filterItemVariants}
                      onClick={() => {
                        onSelectCategory(item);
                        onClose();
                      }}
                      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-6 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "scale-[1.02] border-gold bg-gold text-black shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                          : "border-white/5 bg-white/5 text-slate-300 hover:scale-[1.02] hover:border-gold/50 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs ${
                            isActive ? "text-black" : "text-white transition-colors group-hover:text-gold"
                          }`}
                        >
                          {item}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${
                            isActive ? "text-black/60" : "text-white/30 group-hover:text-gold/50"
                          }`}
                        >
                          ({count})
                        </span>
                      </div>

                      {/* Active Indicator */}
                      {isActive && <span className="h-2 w-2 rounded-full bg-black shadow-sm" />}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
