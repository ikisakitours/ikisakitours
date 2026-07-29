"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ChatImageSliderProps {
  images?: string[];
}

export function ChatImageSlider({ images }: ChatImageSliderProps) {
  const imagesList =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
        ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesList.length]);

  return (
    <div className="relative w-full h-36 sm:h-40 md:h-32 lg:h-28 rounded-2xl overflow-hidden mb-4 border border-gold/30 shadow-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={imagesList[currentImageIndex]}
            alt="Sri Lanka Tour Slideshow"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-lanka-black/80 via-transparent to-transparent z-10" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
        <span className="premium-serif text-2xl sm:text-3xl font-bold tracking-[0.3em] uppercase text-white/15 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] select-none">
          Map<span className="text-gold/25">Mate</span>
        </span>
      </div>

      <div className="absolute bottom-2.5 right-3 z-20 flex gap-1.5">
        {imagesList.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentImageIndex ? "w-5 bg-gold" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
