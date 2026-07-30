"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingImageProps extends ImageProps {
  wrapperClassName?: string;
  isSmall?: boolean;
}

export function LoadingImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  isSmall = false,
  ...props
}: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden rounded-[inherit] ${wrapperClassName}`}>
      {/* Loading Animation Layer */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            {isSmall ? (
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-gold/30 border-t-gold"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                {/* Spinning Spinner & Glowing Effect (Center එකේ ඇත) */}
                <div className="relative flex items-center justify-center">
                  {/* Glowing Core Effect */}
                  <motion.div
                    className="absolute h-10 w-10 rounded-full bg-gold/40 blur-xl"
                    animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Spinning Minimalist Dash */}
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

                <div className="pointer-events-none absolute bottom-3 right-4 whitespace-nowrap select-none font-bold leading-none tracking-tighter text-white/3 text-3xl sm:text-3xl">
                  MapMate
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        className={`${className} transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isLoading ? "opacity-0 scale-100 blur-none" : "opacity-100 scale-100 blur-0"
        }`}
        onLoad={() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 6000);
        }}
        {...props}
      />
    </div>
  );
}
