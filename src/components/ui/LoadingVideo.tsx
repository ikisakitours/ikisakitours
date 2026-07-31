"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CACHE_KEY = "mapmate_loaded_videos";
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
const loadedVideosCache = getInitialCache();
const saveToCache = (key: string) => {
  loadedVideosCache.add(key);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(loadedVideosCache)));
  }
};
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface LoadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  wrapperClassName?: string;
  isSmall?: boolean;
}

export function LoadingVideo({
  src,
  className = "",
  wrapperClassName = "",
  isSmall = false,
  ...props
}: LoadingVideoProps) {
  const videoKey = typeof src === "string" ? src : "default-video";

  const [isLoading, setIsLoading] = useState(true);
  const [isInstant, setIsInstant] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (loadedVideosCache.has(videoKey)) {
      setIsInstant(true);
      setIsLoading(false);
    }
  }, [videoKey]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (videoRef.current && videoRef.current.readyState >= 3) {
      if (!loadedVideosCache.has(videoKey)) {
        timer = setTimeout(() => {
          saveToCache(videoKey);
          setIsLoading(false);
        }, 0);
      } else {
        timer = setTimeout(() => setIsLoading(false), 0);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [videoKey]);

  const handleVideoReady = () => {
    if (!loadedVideosCache.has(videoKey)) {
      setTimeout(() => {
        saveToCache(videoKey);
        setIsLoading(false);
      }, 0);
    } else {
      setTimeout(() => setIsLoading(false), 0);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-[inherit] ${wrapperClassName}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: isInstant ? 0 : 0.8 } }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            {isSmall ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 rounded-[inherit]">
                <motion.div
                  className="absolute h-4 w-4 rounded-full bg-gold/40 blur-sm"
                  animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.svg
                  className="z-10 h-4 w-4 sm:h-5 sm:w-5 text-gold/80"
                  viewBox="0 0 50 50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                    stroke="currentColor"
                    strokeDasharray="5 15 25 10"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>
            ) : (
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
                <div className="pointer-events-none absolute bottom-3 right-4 whitespace-nowrap select-none font-bold leading-none tracking-tighter text-white/3 text-2xl sm:text-3xl">
                  MapMate
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <video
        ref={videoRef}
        src={src}
        preload="auto"
        className={`${className} ${isInstant ? "" : "transition-opacity duration-700 ease-in-out"} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onCanPlay={handleVideoReady}
        onLoadedData={handleVideoReady}
        {...props}
      />
    </div>
  );
}
