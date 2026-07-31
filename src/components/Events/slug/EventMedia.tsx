"use client";

import React, { useEffect, useRef } from "react";
import UniversalPlayer from "@/components/home/Events/UniversalPlayer";
import { useInView } from "framer-motion";
import { ImageSlider } from "@/components/ui/ImageSlider"; 

interface EventMediaProps {
  image: string;
  titleAccent: string;
  statusTag: string;
  videoUrl?: string;
  mode?: string;
  broadcastTag?: string;
  images?: string[];
}

export function EventMedia({ image, titleAccent, statusTag, videoUrl, mode, broadcastTag, images }: EventMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      console.log("▶️ EventsMedia is IN VIEWPORT: Playing/Active state triggered.");
    } else {
      console.log("⏸️ EventsMedia is OUT OF VIEWPORT: Pausing/Inactive state.");
    }
  }, [isInView]);

  const sliderImages = images && images.length > 0 ? images : [image];

  return (
    <div
      ref={containerRef}
      className="glass-card relative overflow-hidden rounded-[2.5rem] border border-white/10 p-3 shadow-2xl md:p-4"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-black z-0 group">
        
        {/* --- LIVE NOW Broadcast Badge (Top Left) --- */}
        {mode === "live" && (
          <div className="absolute top-4 left-4 z-30 flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/80 px-3 py-1.5 backdrop-blur-md shadow-lg pointer-events-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-300">
              {broadcastTag || "LIVE NOW"}
            </span>
          </div>
        )}

        {videoUrl ? (
          <div className="absolute inset-0 h-full w-full z-10">
            {isInView ? (
              <UniversalPlayer url={videoUrl} />
            ) : (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <span className="text-xs text-slate-500 tracking-wider">Stream Paused (Out of View)</span>
              </div>
            )}
          </div>
        ) : (
          <ImageSlider
            images={sliderImages}
            altText={titleAccent}
            showIndicators={sliderImages.length > 1}
            interval={5000}
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* --- Status Tag --- */}
        {mode !== "live" && (
          <div className="absolute bottom-6 left-6 z-20 hidden md:block pointer-events-none">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-linear-to-r from-black/80 via-black/60 to-black/80 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300">
              <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-linear-to-r from-gold/10 via-transparent to-transparent opacity-50 blur-xl pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-3.5">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-linear-to-r from-gold via-amber-200 to-gold">
                  {statusTag}
                </span>
                
                <div className="h-3 w-px bg-white/20" />

                <div className="relative flex items-center justify-center">
                  <div className="absolute h-3 w-3 rounded-full bg-emerald-500/30 animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}