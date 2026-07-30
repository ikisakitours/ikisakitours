"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import UniversalPlayer from "@/components/home/Events/UniversalPlayer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView, motion, AnimatePresence, Variants } from "framer-motion";

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderImages = images && images.length > 0 ? images : [image];

  useEffect(() => {
    if (videoUrl || sliderImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videoUrl, sliderImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  // 🔥 The Buttery Smooth Cinematic Animation Variants
  const slideVariants: Variants = {
    initial: { opacity: 0, scale: 1.08, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.95, y: -15, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
  };

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
          <>
            {/* 🔥 Animated Image Slider */}
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={sliderImages[currentIndex]}
                  alt={titleAccent}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-linear-to-t from-background/95 via-transparent to-transparent pointer-events-none z-10" />

            {sliderImages.length > 1 && (
              <>
                {/* --- Manual Controls --- */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/50 md:bg-black/40 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black border border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/50 md:bg-black/40 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black border border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* --- Modern Animated Indicators --- */}
                <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                        idx === currentIndex
                          ? "w-8 bg-gold shadow-[0_0_12px_rgba(197,160,89,0.9)]"
                          : "w-2 bg-white/40 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* --- Status Tag --- */}
        {mode !== "live" && (
          <div className="absolute bottom-6 left-6 z-20 rounded-xl border border-white/15 bg-black/70 px-5 py-3 backdrop-blur-xl shadow-xl pointer-events-none hidden md:block">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{statusTag}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}