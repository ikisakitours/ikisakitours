"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SpecialEventMode, EventContentItem } from "@/data/specialEvents";
import { CountdownTimer } from "./CountdownTimer";
import UniversalPlayer from "./UniversalPlayer";
import { SpecialEventsImageSlider } from "./SpecialEventsImageSlider";

interface SpecialEventsMediaProps {
  mode: SpecialEventMode;
  content: EventContentItem;
  targetLink: string;
  upcomingTargetDate: string;
}

export function SpecialEventsMedia({ mode, content, targetLink, upcomingTargetDate }: SpecialEventsMediaProps) {
  const imagesList =
    content.images && content.images.length > 0
      ? content.images
      : [
          content.image ||
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
        ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="relative lg:col-span-5 flex flex-col gap-4"
    >
      {/* 1. Main Media Card (වීඩියෝ එක හෝ ඉමේජ් ස්ලයිඩර් එක) */}
      <div className="glass-card relative overflow-hidden rounded-[2.5rem] border border-white/10 p-3 shadow-2xl md:p-4">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-black">
          {mode === "live" && (
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/80 px-3 py-1 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-300">
                {content.broadcastTag}
              </span>
            </div>
          )}

          {content.videoUrl ? (
            <div className="relative h-full w-full">
              <UniversalPlayer url={content.videoUrl} />

              <Link
                href={targetLink}
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-hover hover:bg-gold hover:text-black"
              >
                <span>Full Details</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <SpecialEventsImageSlider images={imagesList} titleAccent={content.titleAccent} targetLink={targetLink} />
          )}
        </div>
      </div>

      {mode === "upcoming" && (
        <div className="w-full">
          <CountdownTimer targetDate={upcomingTargetDate} />
        </div>
      )}
    </motion.div>
  );
}
