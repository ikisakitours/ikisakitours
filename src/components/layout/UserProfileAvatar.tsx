"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }

  const imageKey = typeof src === "string" ? src : "";
  const hasValidSrc = Boolean(imageKey && imageKey.trim() !== "");

  useEffect(() => {
    if (typeof window !== "undefined" && hasValidSrc) {
      const isAlreadyLoaded = sessionStorage.getItem(`avatar-loaded-${imageKey}`);
      if (isAlreadyLoaded) {
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [imageKey, hasValidSrc]);

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
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 rounded-full">
              <motion.div
                className="absolute inset-0 rounded-full bg-gold/10 blur-sm"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

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
            </div>
          )}

          <Image
            key={imageKey}
            src={imageKey}
            alt={alt}
            width={48}
            height={48}
            // onLoad={() => {
            //   if (typeof window !== "undefined") {
            //     sessionStorage.setItem(`avatar-loaded-${imageKey}`, "true");
            //   }
            //   setIsLoaded(true);
            // }}
            
            //Test Time
            onLoad={() => {
              setTimeout(() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem(`avatar-loaded-${imageKey}`, "true");
                }
                setIsLoaded(true);
              }, 6000);
            }}
            onError={(event) => {
              setHasError(true);
              event.currentTarget.style.opacity = "0";
            }}
            className={`relative z-10 h-full w-full rounded-full object-cover ${
              isLoaded ? "opacity-100 transition-opacity duration-700 ease-out" : "opacity-0 transition-none"
            }`}
          />
        </>
      )}
    </div>
  );
}
