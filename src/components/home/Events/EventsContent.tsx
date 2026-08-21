"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SpecialEventMode, EventContentItem } from "@/data/specialEvents";
import SectionBadge from "@/components/home/Events/SectionBadge";

interface SpecialEventsContentProps {
  mode: SpecialEventMode;
  content: EventContentItem;
  targetLink: string;
}

export function EventsContent({ mode, content, targetLink }: SpecialEventsContentProps) {
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
      <h2 className="premium-serif mb-6 text-heading-section font-light leading-tight text-white">
        {content.titlePart1} <span className="gold-gradient-text italic">{content.titleAccent}</span>
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-2xl text-body font-light leading-relaxed text-foreground/80">{content.description}</p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Button
          variant="shine"
          href={targetLink}
          className="[&_span]:text-caption! sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5  3xl:px-6 3xl:py-3"
        >
          {content.buttonText}
        </Button>

        {mode === "live" && (
          <div className="flex items-center gap-3">
            {/* 1. Ultra-minimal Live Dot */}
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
            </span>

            {/* 2. System Font with wide tracking */}
            <span className="text-tiny font-black uppercase tracking-[0.3em] text-red-500/90">Streaming Live</span>

            {/* 3. The Luxury Touch: Fading accent line */}
            <div className="h-px w-10 bg-linear-to-r from-red-500/50 to-transparent sm:w-16"></div>
          </div>
        )}

        {mode === "SpecialEvent" && (
          <div className="flex items-center gap-3">
            {/* 1. Refined Icon */}
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gold/80" strokeWidth={1.5} />

            {/* 2. System Font */}
            <span className="text-tiny font-bold uppercase tracking-[0.3em] text-gold/90">Seasonal Access</span>

            {/* 3. The Luxury Touch: Fading accent line */}
            <div className="h-px w-10 bg-linear-to-r from-gold/50 to-transparent sm:w-16"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
