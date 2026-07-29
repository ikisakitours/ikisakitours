"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.dispatchEvent(new CustomEvent("preloaderFinished"));
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-lanka-dark overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        >
          {/* Ultra-Luxury Soft Shimmer Sweep  */}
          <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
            <motion.div
              className="absolute top-[-50%] bottom-[-50%] w-screen sm:w-[60vw] rotate-30 bg-linear-to-r from-transparent via-gold/5 to-transparent blur-2xl"
              initial={{ left: "-150%" }}
              animate={{ left: "150%" }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Spinning Rings */}
            <motion.div
              className="absolute h-40 w-40 sm:h-52 sm:w-52 lg:h-56 lg:w-56 3xl:h-64 3xl:w-64 rounded-full border border-gold/30"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute h-32 w-32 sm:h-44 sm:w-44 lg:h-48 lg:w-48 3xl:h-56 3xl:w-56 rounded-full border-t-2 border-gold"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo */}
            <motion.div
              className="relative overflow-hidden rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                src="/images/bg-remove.png"
                alt="Logo"
                width={200}
                height={200}
                className="h-35 w-35 sm:h-45 sm:w-45 md:h-50 md:w-50 lg:h-45 lg:w-45 3xl:h-50 3xl:w-50 drop-shadow-[0_0_15px_rgba(197,160,89,0.5)] object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Luxury Text */}
          <motion.div
            className="relative z-10 mt-16 px-4 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] 3xl:text-[22px] font-bold uppercase tracking-[0.6em] sm:tracking-[0.8em] text-gold">
              Map Mate
            </p>
            <motion.div
              className="mt-2 h-px bg-gold/50 mx-auto w-40 sm:w-56 lg:w-64 3xl:w-80"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}