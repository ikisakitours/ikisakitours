"use client";

import React, { useState } from "react";
import { CircleCheck, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ExpandButton from "./ExpandButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
import { useTranslations } from "next-intl";

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

// -----------------------------------------------

export default function IncludesSection({ tour }: IncludesSectionProps) {
  const t = useTranslations("Booking.Includes");

  const [isIncludesExpanded, setIsIncludesExpanded] = useState(false);
  const [isExcludesExpanded, setIsExcludesExpanded] = useState(false);

  const DEFAULT_COUNT = 8;

  const extraIncludes = tour.includes.slice(DEFAULT_COUNT);
  const extraExcludes = tour.excludes.slice(DEFAULT_COUNT);

  const hasMoreIncludes = extraIncludes.length > 0;
  const hasMoreExcludes = extraExcludes.length > 0;

  const displayIncludes = tour.includes.slice(0, DEFAULT_COUNT);
  const displayExcludes = tour.excludes.slice(0, DEFAULT_COUNT);

  return (
    <section id="includes" className="glass-card mb-10 rounded-4xl border border-white/5 p-6 md:mb-14 md:p-10">
      <SectionHeading>{t("title")}</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Included Column */}
        <div className="flex h-full w-full flex-col pb-8 md:pb-0 md:pr-8 lg:pr-12">
          <h3 className="mb-6 flex items-center gap-2 text-body-sm font-extrabold uppercase tracking-widest text-emerald-400">
            <CircleCheck className="h-4.5 w-4.5 shrink-0" /> {t("included")}
          </h3>
          <ul className="space-y-4">
            {displayIncludes.map((item: string, idx: number) => (
              <li key={`inc-${idx}`} className="flex items-start gap-3">
                <IoMdCheckmarkCircleOutline className="mt-1 h-4.5 w-4.5 shrink-0 text-emerald-400" />
                <span className="text-body font-light leading-relaxed text-slate-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`overflow-hidden transition-all duration-300 ${isIncludesExpanded ? "h-auto" : "h-0"}`}>
            <AnimatePresence initial={false}>
              {isIncludesExpanded && hasMoreIncludes && (
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
                        <IoMdCheckmarkCircleOutline className="mt-1 h-4.5 w-4.5 shrink-0 text-emerald-400" />
                        <span className="text-body font-light leading-relaxed text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasMoreIncludes && (
            <div className={`w-full ${isIncludesExpanded === isExcludesExpanded ? "mt-auto" : ""}`}>
              <ExpandButton
                isExpanded={isIncludesExpanded}
                onClick={() => setIsIncludesExpanded(!isIncludesExpanded)}
                expandText={t("showAllIncluded")}
                collapseText={t("showLess")}
              />
            </div>
          )}
        </div>

        {/* Excluded Column */}
        <div className="flex h-full w-full flex-col border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pl-8 lg:pl-12 md:pt-0">
          <h3 className="mb-6 flex items-center gap-2 text-body-sm font-extrabold uppercase tracking-widest text-rose-400">
            <X className="h-5 w-5 rounded-full bg-rose-400/10 p-0.5" /> {t("excluded")}
          </h3>
          <ul className="space-y-4">
            {displayExcludes.map((item: string, idx: number) => (
              <li key={`exc-${idx}`} className="flex items-start gap-3">
                <RiCloseCircleLine className="mt-1 h-4.5 w-4.5 shrink-0 text-rose-400" />
                <span className="text-body font-light leading-relaxed text-slate-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`overflow-hidden transition-all duration-300 ${isExcludesExpanded ? "h-auto" : "h-0"}`}>
            <AnimatePresence initial={false}>
              {isExcludesExpanded && hasMoreExcludes && (
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
                        <RiCloseCircleLine className="mt-1 h-4.5 w-4.5 shrink-0 text-rose-400" />
                        <span className="text-body font-light leading-relaxed text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasMoreExcludes && (
            <div className={`w-full ${isIncludesExpanded === isExcludesExpanded ? "mt-auto" : ""}`}>
              <ExpandButton
                isExpanded={isExcludesExpanded}
                onClick={() => setIsExcludesExpanded(!isExcludesExpanded)}
                expandText={t("showAllExcluded")}
                collapseText={t("showLess")}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
