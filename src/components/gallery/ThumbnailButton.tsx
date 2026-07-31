"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/data/blog";

const CACHE_KEY = "mapmate_loaded_thumbs";
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
const loadedThumbsCache = getInitialCache();
const saveToCache = (key: string) => {
  loadedThumbsCache.add(key);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(loadedThumbsCache)));
  }
};
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ThumbnailButtonProps {
  item: GalleryItem;
  isActive: boolean;
  onClick: () => void;
}

export function ThumbnailButton({ item, isActive, onClick }: ThumbnailButtonProps) {
  const imageKey = item?.src || "";

  const [isThumbReady, setIsThumbReady] = useState(false);
  const [isInstant, setIsInstant] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (imageKey && loadedThumbsCache.has(imageKey)) {
      setIsInstant(true);
      setIsThumbReady(true);
    }
  }, [imageKey]);

  useEffect(() => {
    if (!item || !item.src) return;

    if (loadedThumbsCache.has(imageKey)) {
      const timer = setTimeout(() => setIsThumbReady(true), 0);
      return () => clearTimeout(timer);
    }

    let isMounted = true;
    const img = new window.Image();
    img.src = imageKey;

    img.onload = () => {
      setTimeout(() => {
        if (isMounted) {
          saveToCache(imageKey);
          setIsThumbReady(true);
        }
      }, 0);
    };

    img.onerror = () => {
      if (isMounted) setIsThumbReady(true);
    };

    return () => {
      isMounted = false;
    };
  }, [item, imageKey]);

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
          <motion.div
            layoutId="orbit-ring"
            className="absolute -inset-1.5 rounded-full border border-dashed border-gold/70 z-30 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              layout: { type: "spring", stiffness: 700, damping: 35 },
            }}
          />
          <motion.div
            layoutId="orbit-core"
            className="absolute inset-0 rounded-full border-2 border-gold z-30 pointer-events-none shadow-[0_0_15px_rgba(197,160,89,0.8)]"
            transition={{ type: "spring", stiffness: 700, damping: 35 }}
          />
        </>
      )}

      {!isThumbReady && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 rounded-full border border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
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
        </motion.div>
      )}

      <div
        className={`absolute inset-0 overflow-hidden rounded-full bg-black/70 transition-all duration-300 ${isActive ? "" : "border border-white/15"}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="64px"
          className={`object-cover ${
            isInstant ? "" : "transition-all duration-700 ease-out"
          } ${isThumbReady ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </div>
    </button>
  );
}
