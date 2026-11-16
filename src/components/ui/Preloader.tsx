"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface PreloaderProps {
  isTestMode?: boolean;
}

// =========================================================================
// 🧪 DEV TEST CONTROLLER
// Set to true while testing & designing the UI (infinite continuous loop).
// Set to false for production (runs once for 4s, sets cookie & triggers events).
// =========================================================================
const FORCE_TEST_LOOP = false;

export default function Preloader({ isTestMode }: PreloaderProps) {
  const activeTestMode = isTestMode ?? FORCE_TEST_LOOP;
  const [loading, setLoading] = useState(true);
  const [loopCount, setLoopCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const t = useTranslations("RootLayout.Preloader");

  // -------------------------------------------------------------
  // Zero-Lag Native Counter via direct DOM Ref (0 React Re-renders)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!loading) return;
    if (counterRef.current) counterRef.current.textContent = "00";

    const startTime = performance.now();
    const duration = 3500; // 3.5s to reach 100%

    let frameId: number;
    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      // Luxury ease-out cubic curve
      const eased = 1 - Math.pow(1 - progressFraction, 3);
      const val = Math.round(eased * 100);

      if (counterRef.current) {
        counterRef.current.textContent = String(val).padStart(2, "0");
      }

      if (progressFraction < 1) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [loading, loopCount]);

  useEffect(() => {
    // If in test mode, clean up preloader cookie so browser refresh always works
    if (activeTestMode) {
      document.cookie = "preloader_seen=; max-age=0; path=/";
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const preventTouchScroll = (e: TouchEvent | Event) => {
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouchScroll, { passive: false });

    // -------------------------------------------------------------
    // TEST LOOP LOGIC:
    // Loops animation smoothly without firing race-condition events
    // -------------------------------------------------------------
    if (activeTestMode) {
      let isCancelled = false;
      let loopTimer: ReturnType<typeof setTimeout>;
      let restartTimer: ReturnType<typeof setTimeout>;

      const runLoop = () => {
        if (isCancelled) return;
        setLoading(true);

        loopTimer = setTimeout(() => {
          if (isCancelled) return;
          setLoading(false);

          // Wait for theatrical curtain exit, then restart
          restartTimer = setTimeout(() => {
            if (isCancelled) return;
            setLoopCount((prev) => prev + 1);
            runLoop();
          }, 1400);
        }, 4000);
      };

      runLoop();

      return () => {
        isCancelled = true;
        clearTimeout(loopTimer);
        clearTimeout(restartTimer);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.removeEventListener("touchmove", preventTouchScroll);
      };
    }

    // =============================================================
    // 100% UNTOUCHED PRODUCTION LOGIC (Race-condition safe)
    // =============================================================
    const timer = setTimeout(() => {
      setLoading(false);

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventTouchScroll);

      document.cookie = "preloader_seen=true; max-age=86400; path=/";

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("preloaderFinished"));
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventTouchScroll);
    };
  }, [activeTestMode]);

  return (
    <>
      <style>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -4px, 0);
          }
        }
        .anim-gentle-float {
          animation: gentleFloat 4.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        @keyframes smoothReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .anim-reveal {
          animation: smoothReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          will-change: transform, opacity;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {loading && (
          <div
            key={`ikisaki-preloader-${loopCount}`}
            className="fixed inset-0 z-99999 pointer-events-auto overflow-hidden select-none"
          >
            {/* Theatrical Split Shutter: Top Panel (Overlaps by 4px to prevent any sub-pixel seam) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[calc(50%+4px)] bg-[#070708] z-0"
              initial={{ y: 0 }}
              exit={{
                y: "-100%",
                transition: { duration: 1.05, ease: [0.77, 0, 0.175, 1] },
              }}
            />

            {/* Theatrical Split Shutter: Bottom Panel (Overlaps by 4px to prevent any sub-pixel seam) */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[calc(50%+4px)] bg-[#070708] z-0"
              initial={{ y: 0 }}
              exit={{
                y: "100%",
                transition: { duration: 1.05, ease: [0.77, 0, 0.175, 1] },
              }}
            />

            {/* Central Stage */}
            <motion.div
              className="relative z-10 flex h-full w-full flex-col items-center justify-center text-white"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 1.04,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
            >
              {/* Haute Horlogerie Corner Brackets (Framing Logo at Balanced Distance) */}
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                {/* Royal Crest with Symmetrically Equidistant Framing Brackets */}
                <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 flex items-center justify-center anim-gentle-float">
                  <Image
                    src="/images/preloader.webp"
                    alt="Crest"
                    width={260}
                    height={260}
                    priority
                    loading="eager"
                    decoding="sync"
                    className="w-full h-full object-contain"
                  />

                  {/* 4 Architectural Golden Corner Brackets - Symmetrically Equidistant around the logo geometry */}
                  <div className="absolute inset-x-1.5 top-1.5 bottom-5 sm:bottom-6 pointer-events-none">
                    {/* Top-Left */}
                    <span className="absolute top-0 left-0 h-3.5 w-3.5 border-t-2 border-l-2 border-gold/90" />
                    {/* Top-Right */}
                    <span className="absolute top-0 right-0 h-3.5 w-3.5 border-t-2 border-r-2 border-gold/90" />
                    {/* Bottom-Left */}
                    <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-gold/90" />
                    {/* Bottom-Right */}
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-gold/90" />
                  </div>
                </div>
              </motion.div>

              {/* Sub-Descriptors with Hardware-Accelerated Smooth Entrance (Zero-Lag) */}
              <div className="relative z-10 mt-6 flex flex-col items-center text-center anim-reveal">
                {/* Localized Luxury Tagline */}
                <p className="Preloader-text text-caption tracking-[0.55em] sm:tracking-[0.75em] uppercase text-gold/85 pl-[0.55em] sm:pl-[0.75em] font-light">
                  {t("tagline")}
                </p>

                {/* Direct-DOM Precision Counter (No React Re-renders, 0ms Lag) */}
                <div className="mt-4 flex items-baseline gap-1 font-serif text-gold">
                  <span ref={counterRef} className="text-3xl sm:text-4xl font-light tracking-widest tabular-nums">
                    00
                  </span>
                  <span className="text-xs font-sans text-gold/45 tracking-widest">%</span>
                </div>

                {/* Localized Ceylon Coordinates */}
                <p className="Preloader-text mt-3 text-tiny tracking-[0.45em] uppercase text-white/35 pl-[0.45em]">
                  {t("coordinates")}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
