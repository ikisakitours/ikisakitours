"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingImageProps extends ImageProps {
  wrapperClassName?: string;
}

export function LoadingImage({ src, alt, className, wrapperClassName, ...props }: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Loading Animation Layer */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-lanka-dark"
            exit={{ opacity: 0 }}
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Spinning Ring */}
              <motion.div
                className="h-10 w-10 rounded-full border border-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="mt-4 text-[8px] font-bold uppercase tracking-[0.2em] text-gold animate-pulse">
                Map Mate
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}