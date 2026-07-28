"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SpecialEventMode, EventContentItem } from "@/data/specialEvents";
import SectionBadge from "@/components/home/SpecialEvents/SectionBadge";

interface SpecialEventsContentProps {
  mode: SpecialEventMode;
  content: EventContentItem;
  targetLink: string;
}

export function SpecialEventsContent({ mode, content, targetLink }: SpecialEventsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="text-left lg:col-span-7"
    >
      {/* Top Badge */}
      <SectionBadge badge={content.badge} />
      {/* Title */}
      <h2 className="premium-serif mb-6 text-3xl font-light leading-[1.15] text-white sm:text-4xl md:text-5xl xl:text-6xl">
        {content.titlePart1} <span className="gold-gradient-text italic">{content.titleAccent}</span>
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-2xl text-sm font-light leading-relaxed text-slate-300 md:text-base xl:text-lg">
        {content.description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Button
          variant="shine"
          href={targetLink}
          className="px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-[11px] md:text-xs 2xl:px-5 2xl:py-2.5 2xl:text-sm 3xl:px-6 3xl:py-3 3xl:text-base"
        >
          {content.buttonText}
        </Button>

        {mode === "live" && (
          <div className="flex items-center gap-2 text-xs text-red-400 font-medium tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span>Streaming Live Broadcast</span>
          </div>
        )}

        {mode === "SpecialEvent" && (
          <div className="flex items-center gap-2.5 text-xs text-gold/80 font-medium tracking-wide">
            <CalendarDays className="h-4 w-4 text-gold" />
            <span>Limited seasonal access</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
