"use client";
import { useEffect, useState } from "react";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { motion } from "framer-motion";
import { ChatWidget } from "@/components/ui/ChatWidget";

export default function UserPageLayout({ children }) {
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleStickyBarChange = (e) => {
      setIsStickyBarVisible(e.detail.isVisible);
    };

    const handleBookingModalChange = (e) => {
      setIsBookingModalOpen(e.detail.isOpen);
    };

    window.addEventListener("stickyBarStateChange", handleStickyBarChange);
    window.addEventListener("bookingModalStateChange", handleBookingModalChange);
    return () => {
      window.removeEventListener("stickyBarStateChange", handleStickyBarChange);
      window.removeEventListener("bookingModalStateChange", handleBookingModalChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1 w-full">{children}</main>
      <Footer />

      <motion.div
        initial={false}
        animate={{
          y: isBookingModalOpen ? 120 : isStickyBarVisible ? -68 : 0,
          opacity: isBookingModalOpen ? 0 : 1,
          scale: isBookingModalOpen ? 0.95 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.75,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ willChange: "transform, opacity" }}
        className="fixed right-6 md:right-8 bottom-6 md:bottom-8 z-150 flex flex-col items-center gap-4 pointer-events-none"
      >
        <div className={`pointer-events-auto ${isBookingModalOpen ? "pointer-events-none" : ""}`}>
          <BackToTop />
        </div>

        <div className={`pointer-events-auto ${isBookingModalOpen ? "pointer-events-none" : ""}`}>
          <ChatWidget />
        </div>
      </motion.div>
    </div>
  );
}
