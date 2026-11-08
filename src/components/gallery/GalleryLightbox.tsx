"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { GalleryItem } from "@/data/blog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { ThumbnailButton } from "./ThumbnailButton";

const CACHE_KEY = "IkiSaki_loaded_lightbox";

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

const loadedLightboxCache = getInitialCache();

const saveToCache = (key: string) => {
  loadedLightboxCache.add(key);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(loadedLightboxCache)));
  }
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type GalleryLightboxProps = {
  activeItem: GalleryItem;
  activeIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onTouchEnd: (screenX: number) => void;
  onTouchStart: (screenX: number) => void;
  items: GalleryItem[];
  onSelectIndex: (index: number) => void;
};

export function GalleryLightbox({
  activeItem,
  activeIndex,
  totalCount,
  onClose,
  onNext,
  onPrevious,
  onTouchEnd,
  onTouchStart,
  items,
  onSelectIndex,
}: GalleryLightboxProps) {
  const imageKey = activeItem?.src || "";

  const [isMainReady, setIsMainReady] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const touchStartX = useRef(0);

  // ---------------- Zoom (image only) ----------------
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isZoomed = scale > 1;

  const [prevItemId, setPrevItemId] = useState(activeItem.id);
  if (prevItemId !== activeItem.id) {
    setPrevItemId(activeItem.id);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  const imageAreaRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);
  const panStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const hadPinch = useRef(false);
  const mouseDragging = useRef(false); // desktop: mouse drag

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    const el = imageAreaRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => {
      if (e.touches.length === 2 || scaleRef.current > 1) e.preventDefault();
    };
    el.addEventListener("touchmove", block, { passive: false });
    return () => el.removeEventListener("touchmove", block);
  }, []);

  useEffect(() => {
    const el = imageAreaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      const next = Math.min(4, Math.max(1, scaleRef.current * factor));
      const finalScale = next < 1.05 ? 1 : next;
      scaleRef.current = finalScale;
      setScale(finalScale);
      setOffset((o) => {
        if (finalScale === 1) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const maxX = (rect.width * (finalScale - 1)) / 2;
        const maxY = (rect.height * (finalScale - 1)) / 2;
        return {
          x: Math.max(-maxX, Math.min(maxX, o.x)),
          y: Math.max(-maxY, Math.min(maxY, o.y)),
        };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  // ---------------------------------------------------

  useIsomorphicLayoutEffect(() => {
    if (imageKey && loadedLightboxCache.has(imageKey)) {
      setIsInstant(true);
      setIsMainReady(true);
    } else {
      setIsInstant(false);
      setIsMainReady(false);
    }
  }, [imageKey]);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeElement = container.children[activeIndex] as HTMLElement;

      if (activeElement) {
        const targetScrollLeft = activeElement.offsetLeft - container.clientWidth / 2 + activeElement.offsetWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!activeItem || !activeItem.src) return;

    if (loadedLightboxCache.has(imageKey)) {
      const timer = setTimeout(() => setIsMainReady(true), 0);
      return () => clearTimeout(timer);
    }

    let isMounted = true;
    const img = new window.Image();
    img.src = imageKey;

    img.onload = () => {
      setTimeout(() => {
        if (isMounted) {
          saveToCache(imageKey);
          setIsMainReady(true);
        }
      }, 0);
    };

    img.onerror = () => {
      if (isMounted) setIsMainReady(true);
    };

    return () => {
      isMounted = false;
    };
  }, [activeItem, imageKey]);

  // ---------------- Thumbnail strip touch ----------------
  const handleStripTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    isDragging.current = false;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleStripTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touchCurrentX = e.touches[0].clientX;
    if (Math.abs(touchCurrentX - touchStartX.current) > 10) {
      isDragging.current = true;
    }
  };

  const handleStripTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  // ---------------- Image pinch / pan touch ----------------
  const getDist = (t: React.TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  const clampOffset = (x: number, y: number, s: number) => {
    const rect = imageAreaRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    const maxX = (rect.width * (s - 1)) / 2;
    const maxY = (rect.height * (s - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleImgTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      hadPinch.current = true;
      pinchStartDist.current = getDist(e.touches);
      pinchStartScale.current = scale;
      e.stopPropagation();
    } else if (e.touches.length === 1 && scale > 1) {
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, ox: offset.x, oy: offset.y };
      e.stopPropagation();
    }
  };

  const handleImgTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.stopPropagation();
      const next = Math.min(4, Math.max(1, (pinchStartScale.current * getDist(e.touches)) / pinchStartDist.current));
      setScale(next);
      setOffset((o) => (next === 1 ? { x: 0, y: 0 } : clampOffset(o.x, o.y, next)));
    } else if (e.touches.length === 1 && scale > 1) {
      e.stopPropagation();
      const dx = e.touches[0].clientX - panStart.current.x;
      const dy = e.touches[0].clientY - panStart.current.y;
      setOffset(clampOffset(panStart.current.ox + dx, panStart.current.oy + dy, scale));
    }
  };

  const handleImgTouchEnd = (e: React.TouchEvent) => {
    if (hadPinch.current || scale > 1) e.stopPropagation();

    if (e.touches.length === 0) {
      hadPinch.current = false;
      if (scale < 1.05) {
        setScale(1);
        setOffset({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1) {
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, ox: offset.x, oy: offset.y };
    }
  };

  // ---------------- Desktop: mouse drag + double click ----------------
  const handleImgMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    mouseDragging.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };

  const handleImgMouseMove = (e: React.MouseEvent) => {
    if (!mouseDragging.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setOffset(clampOffset(panStart.current.ox + dx, panStart.current.oy + dy, scale));
  };

  const handleImgMouseUp = () => {
    mouseDragging.current = false;
  };

  const handleImgDoubleClick = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    if (scale > 1) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.alt} gallery preview`}
      className="fixed inset-0 z-110 flex flex-col items-center justify-center bg-[#050505]/95 p-4 2xl:pt-10! backdrop-blur-lg"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onTouchStart={(event) => onTouchStart(event.changedTouches[0].screenX)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].screenX)}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/5 text-white backdrop-blur-lg transition-all duration-300 hover:rotate-90 hover:border-gold hover:bg-gold hover:text-black focus-visible:outline-none"
      >
        <X className="h-5 w-5 transition-colors" />
      </button>

      <button
        type="button"
        onClick={onPrevious}
        className="group absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden h-14 w-14 items-center justify-center rounded-full bg-black/60 text-gold backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:outline-none md:left-8 md:flex pointer-coarse:hidden overflow-visible"
      >
        {/* Minimal Expanding Outline Ring on Hover */}
        <span className="absolute inset-0 rounded-full border border-gold/40 transition-all duration-500 ease-out group-hover:scale-125 group-hover:border-gold/15 group-hover:opacity-0" />

        {/* Left Button: Outer Ring rotates Counter-Clockwise (Left), Inner Ring rotates Clockwise (Right) */}
        <span className="absolute inset-0 rounded-full border border-gold/60 transition-colors duration-300 group-hover:border-gold animate-[spin_12s_linear_infinite_reverse]" />
        <span className="absolute inset-1.5 rounded-full border border-dashed border-gold/30 transition-colors duration-300 group-hover:border-gold/70 animate-[spin_8s_linear_infinite]" />

        {/* Smooth Subtle Glide */}
        <ChevronLeft className="relative z-10 h-6 w-6 transition-transform duration-300 ease-out group-hover:-translate-x-0.5 text-gold" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="group absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden h-14 w-14 items-center justify-center rounded-full bg-black/60 text-gold backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:outline-none md:right-8 md:flex pointer-coarse:hidden overflow-visible"
      >
        {/* Minimal Expanding Outline Ring on Hover */}
        <span className="absolute inset-0 rounded-full border border-gold/40 transition-all duration-500 ease-out group-hover:scale-125 group-hover:border-gold/15 group-hover:opacity-0" />

        {/* Right Button: Outer Ring rotates Clockwise (Right), Inner Ring rotates Counter-Clockwise (Left) */}
        <span className="absolute inset-0 rounded-full border border-gold/60 transition-colors duration-300 group-hover:border-gold animate-[spin_12s_linear_infinite]" />
        <span className="absolute inset-1.5 rounded-full border border-dashed border-gold/30 transition-colors duration-300 group-hover:border-gold/70 animate-[spin_8s_linear_infinite_reverse]" />

        {/* Smooth Subtle Glide */}
        <ChevronRight className="relative z-10 h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-0.5 text-gold" />
      </button>

      <div className="flex w-full max-w-6xl flex-col items-center">
        {/* Main Image Container */}
        <div
          ref={imageAreaRef}
          onTouchStart={handleImgTouchStart}
          onTouchMove={handleImgTouchMove}
          onTouchEnd={handleImgTouchEnd}
          onMouseDown={handleImgMouseDown}
          onMouseMove={handleImgMouseMove}
          onMouseUp={handleImgMouseUp}
          onMouseLeave={handleImgMouseUp}
          onDoubleClick={handleImgDoubleClick}
          className={`relative flex h-[50vh] w-full touch-none items-center justify-center md:h-[65vh] ${
            isZoomed ? "cursor-grab overflow-hidden active:cursor-grabbing" : "cursor-zoom-in overflow-visible"
          }`}
        >
          <AnimatePresence>
            {!isMainReady && (
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
                    IkiSaki
                  </div>
                </>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isMainReady && (
              <motion.div
                key={activeItem.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 h-full w-full flex items-center justify-center"
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    sizes="100vw"
                    quality={100}
                    priority
                    className={`image-render-visible object-contain transition-[filter] duration-300 ${
                      isZoomed ? "" : "drop-shadow-[0_0_50px_rgba(197,160,89,0.3)]"
                    } ${isInstant ? "" : "transition-opacity duration-700 ease-out"}`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 lg:mt-6 text-center w-full min-h-15">
          <AnimatePresence mode="wait">
            {isMainReady && (
              <motion.div
                key={`caption-${activeItem.id}`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="premium-serif text-body-sm uppercase tracking-[0.3em] pl-[0.3em] text-white">
                  {activeItem.title}
                </p>
                <div className="mx-auto my-3 h-px w-12 bg-gold/50" />
                <p className="text-caption font-semibold uppercase tracking-[0.4em] pl-[0.3em] text-gold">
                  {activeIndex + 1} / {totalCount}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative w-full max-w-4xl mx-auto mt-2 mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div
            ref={thumbnailContainerRef}
            onTouchStart={handleStripTouchStart}
            onTouchMove={handleStripTouchMove}
            onTouchEnd={handleStripTouchEnd}
            className="relative no-scrollbar flex w-full items-center gap-1 sm:gap-1 overflow-x-auto px-[calc(50%-28px)] sm:px-[calc(50%-30px)] py-6"
          >
            {items?.map((item, idx) => (
              <ThumbnailButton
                key={item.id}
                item={item}
                isActive={idx === activeIndex}
                onClick={() => {
                  if (!isDragging.current) {
                    onSelectIndex(idx);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <p className="hidden text-caption font-bold uppercase tracking-[0.3em] text-white/40 pointer-coarse:block -mt-1">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}
