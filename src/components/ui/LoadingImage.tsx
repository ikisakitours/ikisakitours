"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CACHE_KEY = "ikisaki_loaded_images";

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

const loadedImagesCache = getInitialCache();

const saveToCache = (key: string) => {
  loadedImagesCache.add(key);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(loadedImagesCache)));
  }
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface LoadingImageProps extends ImageProps {
  wrapperClassName?: string;
  watermarkClassName?: string;
  isSmall?: boolean;
  priority?: boolean;
}

export function LoadingImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  isSmall = false,
  watermarkClassName = "text-3xl sm:text-3xl bottom-3 right-4",
  ...props
}: LoadingImageProps) {
  const imageKey = typeof src === "string" ? src : (src as StaticImageData).src;

  const [isLoading, setIsLoading] = useState(true);
  const [isInstant, setIsInstant] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (loadedImagesCache.has(imageKey)) {
      setIsInstant(true);
      setIsLoading(false);
    }
  }, [imageKey]);

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
                <div
                  className={`pointer-events-none absolute whitespace-nowrap select-none font-bold leading-none tracking-tighter text-white/3 ${watermarkClassName}`}
                >
                  IkiSaki Tours
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={alt}
        className={`${className} ${
          isInstant ? "" : "transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
        } ${isLoading ? "opacity-0 scale-100 blur-none" : "opacity-100 scale-100 blur-0"}`}
        onLoad={() => {
          if (!loadedImagesCache.has(imageKey)) {
            setTimeout(() => {
              saveToCache(imageKey);
              setIsLoading(false);
            }, 0);
          } else {
            setTimeout(() => setIsLoading(false), 0);
          }
        }}
        {...props}
      />
    </div>
  );
}
