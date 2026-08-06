"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CheckBullet from "./CheckBullet";
import ExpandButton from "./ExpandButton";
import { useTranslations } from "next-intl";
type HighlightsSectionProps = {
  tour: {
    highlights: string[];
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

export default function HighlightsSection({ tour }: HighlightsSectionProps) {
  const t = useTranslations("Booking.Highlights");
  const [isExpanded, setIsExpanded] = useState(false);

  const DEFAULT_COUNT = 6;
  const hasMore = tour.highlights.length > DEFAULT_COUNT;

  const defaultHighlights = tour.highlights.slice(0, DEFAULT_COUNT);
  const extraHighlights = tour.highlights.slice(DEFAULT_COUNT);

  return (
    <section id="highlights" className="mb-10 md:mb-14 px-1">
      <h2 className="premium-serif mb-6 border-l-2 border-gold pl-4 text-2xl italic text-white md:mb-8 md:border-l md:pl-6 md:text-3xl">
        {t("title")}
      </h2>

      <ul className="space-y-4 md:space-y-6">
        {defaultHighlights.map((highlight: string, idx: number) => (
          <CheckBullet key={idx}>{highlight}</CheckBullet>
        ))}
      </ul>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-0"}`}>
        <AnimatePresence initial={false}>
          {isExpanded && hasMore && (
            <motion.div
              key="extra-highlights"
              variants={butterySmoothVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={perfStyle}
            >
              <ul className="space-y-4 pt-4 md:space-y-6 md:pt-6">
                {extraHighlights.map((highlight: string, idx: number) => (
                  <CheckBullet key={`extra-${idx}`}>{highlight}</CheckBullet>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMore && (
        <ExpandButton
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          expandText={t("showAll")}
          collapseText={t("showLess")}
          align="left"
          showBorder={false}
          className="px-0! -mt-4!"
        />
      )}
    </section>
  );
}
