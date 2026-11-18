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
        @keyframes logoBreathe {
          0%, 100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
          50% {
            opacity: 0.4;
            transform: scale3d(0.95, 0.95, 1);
          }
        }
        .anim-logo-breathe {
          animation: logoBreathe 1.8s ease-in-out infinite;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key={`ikisaki-preloader-${loopCount}`}
            role="status"
            aria-label={t("tagline")}
            className="fixed inset-0 z-99999 bg-[#070708] pointer-events-auto overflow-hidden select-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {/* Fixed 100vw stage prevents any horizontal jump when browser scrollbar hides/reappears */}
            <div className="fixed top-0 left-0 w-screen h-dvh flex items-center justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center anim-logo-breathe">
                <Image
                  src="/Layout-Icons/image-600x600.webp"
                  alt={t("tagline")}
                  width={260}
                  height={260}
                  unoptimized
                  priority
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-contain [mask-image:radial-gradient(circle,black_52%,transparent_76%)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
