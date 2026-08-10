"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackToTop } from "@/components/layout/BackToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";

export function FloatingWidgets() {
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  useEffect(() => {
    // Adding correct generic types to CustomEvent to avoid 'any'
    const handleStickyBarChange = (e: Event) => {
      setIsStickyBarVisible((e as CustomEvent<{ isVisible: boolean }>).detail.isVisible);
    };

    const handleBookingModalChange = (e: Event) => {
      setIsBookingModalOpen((e as CustomEvent<{ isOpen: boolean }>).detail.isOpen);
    };

    let menuTimeoutId: ReturnType<typeof setTimeout>;

    const handleMobileMenuChange = (e: Event) => {
      if ((e as CustomEvent<{ isOpen: boolean }>).detail.isOpen) {
        clearTimeout(menuTimeoutId);
        setIsMobileMenuActive(true);
      } else {
        menuTimeoutId = setTimeout(() => {
          setIsMobileMenuActive(false);
        }, 800);
      }
    };

    window.addEventListener("stickyBarStateChange", handleStickyBarChange);
    window.addEventListener("bookingModalStateChange", handleBookingModalChange);
    window.addEventListener("mobileMenuStateChange", handleMobileMenuChange);

    return () => {
      window.removeEventListener("stickyBarStateChange", handleStickyBarChange);
      window.removeEventListener("bookingModalStateChange", handleBookingModalChange);
      window.removeEventListener("mobileMenuStateChange", handleMobileMenuChange);
      clearTimeout(menuTimeoutId);
    };
  }, []);

  useEffect(() => {
    const handlePreloaderFinished = () => {
      setIsPreloaderDone(true);
    };

    if (typeof window !== "undefined") {
      // Cast window to a specific intersection type instead of 'any'
      const customWindow = window as Window & { __preloaderDone?: boolean };

      if (customWindow.__preloaderDone) {
        handlePreloaderFinished();
      } else {
        window.addEventListener("preloaderFinished", handlePreloaderFinished);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("preloaderFinished", handlePreloaderFinished);
      }
    };
  }, []);

  const isHidden = !isPreloaderDone || isBookingModalOpen || isMobileMenuActive;

  return (
    <motion.div
      initial={false}
      animate={{
        y: isBookingModalOpen ? 120 : isStickyBarVisible ? -68 : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{
        type: "tween",
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "transform, opacity" }}
      className="fixed right-6 md:right-8 bottom-6 md:bottom-8 z-999 flex flex-col items-center gap-6 pointer-events-none"
    >
      {/* Back To Top */}
      <div className={`pointer-events-auto transition-all ${isHidden ? "pointer-events-none" : ""}`}>
        <BackToTop />
      </div>

      {/* Chat Widget */}
      <div className={`pointer-events-auto transition-all ${isHidden ? "pointer-events-none" : ""}`}>
        <ChatWidget />
      </div>
    </motion.div>
  );
}
