"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CACHE_KEY = "ikisaki_loaded_avatars";
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
const loadedAvatarsCache = getInitialCache();
const saveToCache = (key: string) => {
  loadedAvatarsCache.add(key);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(loadedAvatarsCache)));
  }
};
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UserProfileAvatarProps = {
  src?: string | null;
  alt?: string;
  initials?: string;
  className?: string;
  initialsClassName?: string;
};

export function UserProfileAvatar({
  src,
  alt = "User Profile",
  initials = "",
  className = "",
  initialsClassName = "text-xs sm:text-sm tracking-tighter",
}: UserProfileAvatarProps) {
  const imageKey = typeof src === "string" ? src : "";
  const hasValidSrc = Boolean(imageKey && imageKey.trim() !== "");

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  useIsomorphicLayoutEffect(() => {
    if (hasValidSrc && loadedAvatarsCache.has(imageKey)) {
      setIsInstant(true);
      setIsLoaded(true);
    }
  }, [imageKey, hasValidSrc]);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
    setIsInstant(false);
    setHasError(false);
  }

  return (
    <div
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gold/30 bg-white/10 p-0.5 transition-all duration-300 group-hover:border-gold sm:h-12 sm:w-12 ${className}`}
    >
      {!hasValidSrc || hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 rounded-full">
          <span className={`relative z-20 font-bold uppercase text-gold ${initialsClassName}`}>{initials}</span>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <motion.svg
                className="absolute inset-0 h-full w-full p-0.75 text-gold/80"
                viewBox="0 0 50 50"
                animate={{ rotate: 360 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="23"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeDasharray="5 15 25 10"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.div>
          )}

          <Image
            key={imageKey}
            src={imageKey}
            alt={alt}
            width={48}
            height={48}
            onLoad={() => {
              if (!loadedAvatarsCache.has(imageKey)) {
                setTimeout(() => {
                  saveToCache(imageKey);
                  setIsLoaded(true);
                }, 0);
              } else {
                setTimeout(() => setIsLoaded(true), 0);
              }
            }}
            onError={(event) => {
              setHasError(true);
              event.currentTarget.style.opacity = "0";
            }}
            className={`relative z-10 h-full w-full rounded-full object-cover ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${isInstant ? "" : "transition-opacity duration-700 ease-out"}`}
          />
        </>
      )}
    </div>
  );
}
