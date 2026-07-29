"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SpecialEventsImageSliderProps {
  images: string[];
  titleAccent: string;
  targetLink: string;
}

export function SpecialEventsImageSlider({ images, titleAccent, targetLink }: SpecialEventsImageSliderProps) {
  const imagesList =
    images && images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesList.length]);

  return (
    <Link href={targetLink} className="group relative block h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={imagesList[currentImageIndex]}
            alt={titleAccent}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent z-10" />

      {/* Slider Indicators */}
      <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
        {imagesList.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentImageIndex ? "w-6 bg-gold" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </Link>
  );
}
