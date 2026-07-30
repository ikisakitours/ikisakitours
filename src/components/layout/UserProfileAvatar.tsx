"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type UserProfileAvatarProps = {
  src?: string;
  alt?: string;
  fallbackText?: string;
  className?: string;
};

export function UserProfileAvatar({
  src = "https://i.pravatar.cc/96?img=12",
  alt = "User Profile",
  fallbackText = "US",
  className = "",
}: UserProfileAvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gold/30 bg-white/10 p-0.5 transition-all duration-300 group-hover:border-gold sm:h-12 sm:w-12 ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-gold/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-5 w-5 rounded-full bg-gold/40 blur-sm"
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-20 text-xs font-bold uppercase tracking-tighter text-gold sm:text-sm">
            {fallbackText}
          </span>
        </div>
      )}

      {/* User Profile Image */}
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        // onLoad={() => setIsLoaded(true)}
        //Test Time
        onLoad={() => {
          setTimeout(() => {
            setIsLoaded(true);
          }, 6000);
        }}
        onError={(event) => {
          setHasError(true);
          event.currentTarget.style.opacity = "0";
        }}
        className={`relative z-10 h-full w-full rounded-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
