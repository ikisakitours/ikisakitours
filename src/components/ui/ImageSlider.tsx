"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link } from "@/lib/i18nNavigation";

const CACHE_KEY = "ikisaki_loaded_sliders";
const getInitialCache = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem(CACHE_KEY);
      return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  }
  return new Set<string>();
};
const loadedSliderCache = getInitialCache();
const saveToCache = (key: string) => {
  loadedSliderCache.add(key);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(loadedSliderCache)));
  }
};
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface SlideData {
  image: string;
  alt?: string;
  badge?: string;
  desc?: string;
}

interface PremiumImageSliderProps {
  slides?: SlideData[];
  images?: string[];
  altText?: string;
  badge?: string;
  description?: string;
  showIndicators?: boolean;
  interval?: number;
  className?: string;
  href?: string;
}

export function ImageSlider({
  slides,
  images = [],
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
  const [isInstant, setIsInstant] = useState(false);

  const activeSlides: SlideData[] =
    slides && slides.length > 0
      ? slides
      : images.map((img) => ({ image: img, alt: altText, badge: badge, desc: description }));

  useIsomorphicLayoutEffect(() => {
    if (activeSlides.length > 0 && loadedSliderCache.has(activeSlides[0].image)) {
      setIsInstant(true);
      setIsReady(true);
    }
  }, [activeSlides]);

  useEffect(() => {
    if (activeSlides.length === 0) return;
    const firstImageKey = activeSlides[0].image;

    if (loadedSliderCache.has(firstImageKey)) {
      const timer = setTimeout(() => setIsReady(true), 0);
      return () => clearTimeout(timer);
    }

    let isMounted = true;
    const img = new window.Image();
    img.src = firstImageKey;

    img.onload = () => {
      setTimeout(() => {
        if (isMounted) {
          saveToCache(firstImageKey);
          setIsReady(true);
        }
      }, 0);
    };

    img.onerror = () => {
      if (isMounted) setIsReady(true);
    };

    return () => {
      isMounted = false;
    };
  }, [activeSlides]);

  useEffect(() => {
    if (!isReady || activeSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [activeSlides.length, interval, isReady]);

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

  const currentSlide = activeSlides[currentIndex] || {};
  const hasOverlayText = currentSlide.badge || currentSlide.desc;

  const sliderContent = (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: isInstant ? 0 : 0.8 } }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <>
              <div className="relative flex h-14 w-14 items-center justify-center">
                <motion.svg
                  className="absolute h-full w-full text-gold/30"
                  viewBox="0 0 50 50"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="23"
                    fill="none"
                    strokeWidth="0.5"
                    stroke="currentColor"
                    strokeDasharray="100 44"
                  />
                </motion.svg>
                <motion.svg
                  className="absolute h-full w-full text-gold/80"
                  viewBox="0 0 50 50"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="17"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeDasharray="30 76"
                    strokeLinecap="round"
                  />
                </motion.svg>
                <motion.svg
                  className="absolute h-full w-full text-gold"
                  viewBox="0 0 50 50"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="11"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeDasharray="15 54"
                    strokeLinecap="round"
                  />
                </motion.svg>
                <div className="absolute h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
              <div className="pointer-events-none absolute bottom-3 right-4 whitespace-nowrap font-bold leading-none tracking-tighter text-white/5 text-3xl">
                IkiSaki Tours
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReady && activeSlides.length > 0 && (
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt || "Slider Image"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={currentIndex === 0}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {(hasOverlayText || showIndicators) && isReady && (
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-1000" />
      )}

      {hasOverlayText && isReady && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end"
            >
              {currentSlide.badge && (
                <p className="text-caption font-bold uppercase tracking-widest text-gold drop-shadow-md mb-2">
                  {currentSlide.badge}
                </p>
              )}
              {currentSlide.desc && (
                <p className="text-body-sm font-bold text-gray-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-snug">
                  {currentSlide.desc}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {showIndicators && isReady && activeSlides.length > 1 && (
        <div className="absolute bottom-5 right-6 z-20 flex gap-2">
          {activeSlides.map((_, idx) => (
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
