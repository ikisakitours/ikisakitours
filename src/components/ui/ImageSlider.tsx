"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

interface PremiumImageSliderProps {
  images: string[];
  altText?: string;
  badge?: string;
  description?: string;
  showIndicators?: boolean;
  interval?: number;
  className?: string;
  href?: string;
}

export function ImageSlider({
  images,
  altText = "Slider Image",
  badge,
  description,
  showIndicators = false,
  interval = 4000,
  className = "",
  href,
}: PremiumImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Image Animation - Buttery Smooth Parallax Crossfade
  const slideVariants: Variants = {
    initial: { opacity: 0, scale: 1.08, y: 15 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -15,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Text Animation - Cinematic Blur & Parallax Reveal
  const textVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
      scale: 1.05,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const sliderContent = (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {/* Images Slider */}
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
            src={images[currentIndex]}
            alt={altText}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay for Text Readability */}
      {(badge || description || showIndicators) && (
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-1000" />
      )}

      {/* Highly Refined Text Overlays */}
      {(badge || description) && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={`text-${currentIndex}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end"
            >
              {badge && (
                <p className="text-xs sm:text-sm lg:text-xs 3xl:text-sm font-bold uppercase tracking-widest text-gold drop-shadow-md mb-2">
                  {badge}
                </p>
              )}
              {description && (
                <p className="text-xs sm:text-sm lg:text-xs 3xl:text-sm font-bold text-gray-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-snug">
                  {description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Navigation Dots (Indicators) - Modern Animated Pills */}
      {showIndicators && (
        <div className="absolute bottom-5 right-6 z-20 flex gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                idx === currentIndex
                  ? "w-8 bg-gold shadow-[0_0_12px_rgba(197,160,89,0.9)]"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="group relative block h-full w-full">
      {sliderContent}
    </Link>
  ) : (
    sliderContent
  );
}
