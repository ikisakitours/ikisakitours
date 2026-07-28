"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SpecialEventMode, EventContentItem } from "@/data/specialEvents";
import { CountdownTimer } from "./CountdownTimer";
import UniversalPlayer from "./UniversalPlayer"; 

interface SpecialEventsMediaProps {
  mode: SpecialEventMode;
  content: EventContentItem;
  targetLink: string;
  upcomingTargetDate: string;
}

export function SpecialEventsMedia({ mode, content, targetLink, upcomingTargetDate }: SpecialEventsMediaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="relative lg:col-span-5"
    >
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

          {/* 1. LIVE MODE VIDEO PLAYER */}
          {mode === "live" && content.videoUrl ? (
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
            /* 2. IMAGE SHOWCASE */
            <Link href={targetLink} className="group relative block h-full w-full">
              <Image
                src={content.image || ""}
                alt={content.titleAccent}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
            </Link>
          )}

          {mode === "upcoming" && (
            <div className="absolute inset-x-4 top-4 z-10">
              <CountdownTimer targetDate={upcomingTargetDate} />
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}