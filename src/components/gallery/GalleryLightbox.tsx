"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { GalleryItem } from "@/data/blog";
//Icons
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

// ==========================================
// UNIQUE LUXURY THUMBNAIL COMPONENT
// ==========================================
// ==========================================
// UNIQUE LUXURY THUMBNAIL COMPONENT
// ==========================================
const ThumbnailButton = ({
  item,
  isActive,
  onClick,
}: {
  item: GalleryItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [isThumbReady, setIsThumbReady] = useState(false);

  useEffect(() => {
    if (!item || !item.src) return;

    let isMounted = true;
    const img = new window.Image();
    img.src = item.src;

    img.onload = () => {
      if (isMounted) {
        setIsThumbReady(true);
      }
    };

    //Test Time
    // img.onload = () => {
    //   if (isMounted) {
    //     setTimeout(() => {
    //       if (isMounted) {
    //        setIsThumbReady(true);
    //       }
    //     }, 6000);
    //   }
    // };

    img.onerror = () => {
      if (isMounted) {
        setIsThumbReady(true);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [item]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-14 w-14 sm:h-15 sm:w-15 shrink-0 transition-all duration-300 ease-out ${
        isActive
          ? "scale-[1.2] md:scale-[1.25] z-30 grayscale-0"
          : "opacity-30 hover:opacity-100 hover:scale-[1.05] z-10 grayscale-80 hover:grayscale-0"
      } rounded-full overflow-visible my-3 mx-2`}
    >
      {isActive && (
        <>
          {/* Rotating Cosmic Orbit Ring */}
          <motion.div
            layoutId="orbit-ring"
            className="absolute -inset-1.5 rounded-full border border-dashed border-gold/70 z-30 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              layout: { type: "spring", stiffness: 700, damping: 35 },
            }}
          />
          {/* Inner Sharp Gold Ring */}
          <motion.div
            layoutId="orbit-core"
            className="absolute inset-0 rounded-full border-2 border-gold z-30 pointer-events-none shadow-[0_0_15px_rgba(197,160,89,0.8)]"
            transition={{ type: "spring", stiffness: 700, damping: 35 }}
          />
        </>
      )}

      {/* Thumbnail Loading Spinner */}
      {!isThumbReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 rounded-full border border-white/5">
          <motion.div
            className="absolute h-6 w-6 rounded-full bg-gold/40 blur-lg"
            animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.svg
            className="z-10 h-6 w-6 text-gold/80"
            viewBox="0 0 50 50"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeDasharray="30 100"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      )}

      <div
        className={`absolute inset-0 overflow-hidden rounded-full bg-black/70 transition-all duration-300 ${isActive ? "" : "border border-white/15"}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="64px"
          className={`object-cover transition-all duration-700 ease-out ${
            isThumbReady ? "opacity-100 scale-100" : "opacity-0 scale-125"
          }`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </div>
    </button>
  );
};

// ==========================================
// MAIN LIGHTBOX COMPONENT
// ==========================================
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
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const touchStartX = useRef(0);

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

  // Main Image Loader with Cache
  useEffect(() => {
    if (!activeItem || !activeItem.src) return;

    if (loadedImages.has(activeItem.id)) return;

    let isMounted = true;
    const img = new window.Image();
    img.src = activeItem.src;

    img.onload = () => {
      if (isMounted) {
        setLoadedImages((prev) => new Set(prev).add(activeItem.id));
      }
    };

    //Test Time
    // img.onload = () => {
    //   if (isMounted) {
    //     setTimeout(() => {
    //       if (isMounted) {
    //         setLoadedImages((prev) => new Set(prev).add(activeItem.id));
    //       }
    //     }, 6000);
    //   }
    // };

    img.onerror = () => {
      if (isMounted) {
        setLoadedImages((prev) => new Set(prev).add(activeItem.id));
      }
    };

    return () => {
      isMounted = false;
    };
  }, [activeItem, loadedImages]);

  const isReady = loadedImages.has(activeItem.id);

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
      className="fixed inset-0 z-110 flex flex-col items-center justify-center bg-[#050505]/95 p-4 backdrop-blur-lg"
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
        className="group absolute left-4 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-black/40 text-gold backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-gold focus-visible:outline-none md:left-10 md:flex pointer-coarse:hidden"
      >
        <ChevronLeft className="h-7 w-7 transition-colors group-hover:text-black" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="group absolute right-4 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-black/40 text-gold backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-gold focus-visible:outline-none md:right-10 md:flex pointer-coarse:hidden"
      >
        <ChevronRight className="h-7 w-7 transition-colors group-hover:text-black" />
      </button>

      <div className="flex w-full max-w-6xl flex-col items-center">
        {/* Main Image Container */}
        <div className="relative h-[55vh] w-full md:h-[65vh] flex items-center justify-center">
          <AnimatePresence>
            {!isReady && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    className="absolute h-12 w-12 rounded-full bg-gold/40 blur-xl"
                    animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.svg
                    className="h-14 w-14 text-gold/80"
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

          <AnimatePresence mode="wait">
            {isReady && (
              <motion.div
                key={activeItem.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 h-full w-full flex items-center justify-center"
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="100vw"
                  quality={100}
                  priority
                  className="image-render-visible object-contain drop-shadow-[0_0_50px_rgba(197,160,89,0.3)]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center w-full min-h-15">
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${activeItem.id}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="premium-serif text-sm uppercase tracking-[0.3em] text-white md:text-lg">
                {activeItem.title}
              </p>
              <div className="mx-auto my-3 h-px w-12 bg-gold/50" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                {activeIndex + 1} / {totalCount}
              </p>
            </motion.div>
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

        <p className="hidden text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 pointer-coarse:block -mt-1">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}
