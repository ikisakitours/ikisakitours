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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;

    let isMounted = true;
    const img = new window.Image();
    img.src = images[0];

    img.onload = () => {
      if (isMounted) setIsReady(true);
    };

    //Test Time
    // img.onload = () => {
    //   if (isMounted) {
    //     setTimeout(() => {
    //       if (isMounted) setIsReady(true);
    //     }, 6000);
    //   }
    // };

    img.onerror = () => {
      if (isMounted) setIsReady(true);
    };

    return () => {
      isMounted = false;
    };
  }, [images]);

  useEffect(() => {
    if (!isReady) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, isReady]);

  const slideVariants: Variants = {
    initial: { opacity: 0, scale: 1.05, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.98, y: -10, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
  };

  const textVariants: Variants = {
    initial: { opacity: 0, y: 15, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -15, filter: "blur(4px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const sliderContent = (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/*lOADING SPINNER */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute h-10 w-10 rounded-full bg-gold/40 blur-xl"
                animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.svg
                className="h-12 w-12 text-gold/70"
                viewBox="0 0 50 50"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeDasharray="30 100"
                  strokeLinecap="round"
                />
              </motion.svg>
            </div>
            <div className="pointer-events-none absolute bottom-3 right-4 whitespace-nowrap font-bold leading-none tracking-tighter text-white/5 text-3xl">
              MapMate
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReady && (
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
              priority={currentIndex === 0}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay for Text Readability */}
      {(badge || description || showIndicators) && isReady && (
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-1000" />
      )}

      {/* Highly Refined Text Overlays */}
      {(badge || description) && isReady && (
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

      {/* Navigation Dots (Indicators) */}
      {showIndicators && isReady && (
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
