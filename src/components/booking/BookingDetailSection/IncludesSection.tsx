"use client";

import React, { useState } from "react";
import { CircleCheck, Check, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";

type IncludesSectionProps = {
  tour: {
    includes: string[];
    excludes: string[];
  };
};

const perfStyle: React.CSSProperties = {
  willChange: "transform, opacity",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  transformOrigin: "top",
};

const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth <= 1024;
const perfStiffness = isTablet ? 170 : 120;

const butterySmoothVariants: Variants = {
  initial: { opacity: 0, scaleY: 0.8 },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      bounce: 0,
      damping: 25,
      stiffness: perfStiffness,
      opacity: { ease: "linear", duration: 0.2 },
    },
  },
  exit: { opacity: 0, scaleY: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function IncludesSection({ tour }: IncludesSectionProps) {  const [isExpanded, setIsExpanded] = useState(false);

  const DEFAULT_COUNT = 8;
  const extraIncludes = tour.includes.slice(DEFAULT_COUNT);
  const extraExcludes = tour.excludes.slice(DEFAULT_COUNT);
  const hasMore = extraIncludes.length > 0 || extraExcludes.length > 0;

  const displayIncludes = tour.includes.slice(0, DEFAULT_COUNT);
  const displayExcludes = tour.excludes.slice(0, DEFAULT_COUNT);

  return (
    <section id="includes" className="glass-card mb-10 rounded-4xl border border-white/5 p-6 md:mb-14 md:p-10">
      <SectionHeading>What&apos;s Included & Excluded</SectionHeading>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {/* Included Column */}
        <div className="flex flex-col flex-1">
          <h3 className="mb-6 flex items-center gap-2 text-sm font-bold text-emerald-400 md:text-base">
            <CircleCheck className="h-5 w-5" /> Included
          </h3>
          <ul className="space-y-4">
            {displayIncludes.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm font-light leading-relaxed text-slate-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-0"}`}>
            <AnimatePresence initial={false}>
              {isExpanded && extraIncludes.length > 0 && (
                <motion.div
                  key="extra-includes"
                  variants={butterySmoothVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={perfStyle}
                >
                  <ul className="space-y-4 pt-4 border-t border-white/5 mt-4">
                    {extraIncludes.map((item: string, idx: number) => (
                      <li key={`extra-inc-${idx}`} className="flex items-start gap-3 pt-4">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-sm font-light leading-relaxed text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Excluded Column */}
        <div className="flex flex-col flex-1 border-t border-white/5 pt-10 md:border-0 md:pt-0">
          <h3 className="mb-6 flex items-center gap-2 text-sm font-bold text-rose-400 md:text-base">
            <X className="h-5 w-5 rounded-full bg-rose-400/10 p-0.5" /> Excluded
          </h3>
          <ul className="space-y-4">
            {displayExcludes.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <X className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
                <span className="text-sm font-light leading-relaxed text-slate-400">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-0"}`}>
            <AnimatePresence initial={false}>
              {isExpanded && extraExcludes.length > 0 && (
                <motion.div
                  key="extra-excludes"
                  variants={butterySmoothVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={perfStyle}
                >
                  <ul className="space-y-4 pt-4 border-t border-white/5 mt-4">
                    {extraExcludes.map((item: string, idx: number) => (
                      <li key={`extra-exc-${idx}`} className="flex items-start gap-3 pt-4">
                        <X className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
                        <span className="text-sm font-light leading-relaxed text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center border-t border-white/5 pt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
          >
            {isExpanded ? "Show Less" : "Show All Included & Excluded"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
