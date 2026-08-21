"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingWidget } from "@/components/booking/BookingWidget";
import type { bookingTour, travelerOptions } from "@/data/multiDaysBooking";

type MobileBookingBarProps = {
  tour: typeof bookingTour;
  options: typeof travelerOptions;
  assurances: readonly string[];
};

export function StickyBookingBar({ tour, options, assurances }: MobileBookingBarProps) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("bookingModalStateChange", { detail: { isOpen: isMobileModalOpen } }));
  }, [isMobileModalOpen]);

  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileModalOpen]);

  useEffect(() => {
    let isCurrentlyVisible = false;
    let ticking = false; // Add ticking variable for requestAnimationFrame

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          const screenWidth = window.innerWidth;

          if (screenWidth >= 1280) {
            if (isCurrentlyVisible) {
              isCurrentlyVisible = false;
              setShowStickyBar(false);
              window.dispatchEvent(new CustomEvent("stickyBarStateChange", { detail: { isVisible: false } }));
            }
            ticking = false;
            return;
          }

          let scrollThreshold = 450;
          if (screenWidth < 768) {
            scrollThreshold = 1070;
          } else if (screenWidth >= 768 && screenWidth < 1024) {
            scrollThreshold = 900;
          } else {
            scrollThreshold = 500;
          }

          let shouldBeVisible = isCurrentlyVisible;
          if (scrollPos > scrollThreshold + 20) {
            shouldBeVisible = true;
          } else if (scrollPos < scrollThreshold - 20) {
            shouldBeVisible = false;
          }

          if (shouldBeVisible !== isCurrentlyVisible) {
            isCurrentlyVisible = shouldBeVisible;
            setShowStickyBar(shouldBeVisible);
            window.dispatchEvent(new CustomEvent("stickyBarStateChange", { detail: { isVisible: shouldBeVisible } }));
          }

          ticking = false; // Reset ticking after execution
        });

        ticking = true; // Set ticking to true while waiting for the next frame
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Call once on mount to set initial state correctly
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          y: showStickyBar ? 0 : 48,
          opacity: showStickyBar ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed z-50 flex items-center justify-between border-t border-b-0 border-x-0 md:border border-gold/40 bg-linear-to-r from-lanka-black/95 via-[#141414]/95 to-lanka-black/95 px-6 py-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] xl:hidden ${"bottom-0 left-0 right-0 rounded-none md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-105.5 md:rounded-2xl"} ${
          !showStickyBar ? "pointer-events-none" : ""
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="absolute inset-0 rounded-none md:rounded-2xl bg-linear-to-r from-gold/5 via-gold/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-1.5 text-caption font-bold uppercase tracking-[0.2em] text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>MapMate Rate</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-heading-sub font-black tracking-tight text-white drop-shadow-md">${tour.price}</span>
            <span className="text-caption font-light text-slate-400">/ Person</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileModalOpen(true)}
          className="group relative z-10 flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-gold-dark via-gold to-gold-light px-7 py-3 text-caption! font-black uppercase tracking-[0.25em] text-lanka-black shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(197,160,89,0.6)] active:scale-95"
        >
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <CalendarCheck className="h-4 w-4 relative z-10" />
          <span className="relative z-10">Check Availability</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            key="booking-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-150 flex items-end md:items-center justify-center p-0 md:p-4 xl:hidden"
          >
            <div
              onClick={() => setIsMobileModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "tween",
                duration: 0.9,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative h-dvh md:h-auto md:max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-none md:rounded-3xl border-0 md:border border-gold/40 bg-[#0d0d0d] px-3 sm:px-5 py-4 sm:py-7 no-scrollbar shadow-2xl z-10"
              style={{ willChange: "transform" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-48 bg-gold/15 blur-[60px] rounded-full pointer-events-none" />

              <div className="sticky -top-4 z-40 -mx-3 sm:-mx-5 -mt-4 sm:-mt-7 mb-5 flex items-center justify-between border-b border-white/10 bg-[#0d0d0d] px-4 sm:px-7 py-4 md:static md:mx-0 md:mt-0 md:bg-transparent md:p-0 md:py-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-caption! font-black uppercase tracking-[0.25em] gold-gradient-text">
                    Secure Your Journey
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileModalOpen(false)}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-gold/50 hover:bg-gold hover:text-black hover:shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                  aria-label="Close modal"
                >
                  <X className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>

              <div className="relative z-10">
                <BookingWidget tour={tour} options={options} assurances={assurances} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
