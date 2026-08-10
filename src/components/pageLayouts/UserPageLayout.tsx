// "use client";
// import { useEffect, useState } from "react";
// import { BackToTop } from "@/components/layout/BackToTop";
// import { Footer } from "@/components/layout/Footer";
// import { SiteHeader } from "@/components/layout/SiteHeader";
// import { motion } from "framer-motion";
// import { ChatWidget } from "@/components/ui/ChatWidget";

// export default function UserPageLayout({ children }) {
//   const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [isPreloaderDone, setIsPreloaderDone] = useState(false);

//   // New state to track mobile menu visibility
//   const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

//   useEffect(() => {
//     const handleStickyBarChange = (e) => {
//       setIsStickyBarVisible(e.detail.isVisible);
//     };

//     const handleBookingModalChange = (e) => {
//       setIsBookingModalOpen(e.detail.isOpen);
//     };

//     let menuTimeoutId;
//     const handleMobileMenuChange = (e) => {
//       if (e.detail.isOpen) {
//         clearTimeout(menuTimeoutId);
//         setIsMobileMenuActive(true); // Hide floating buttons immediately when menu opens
//       } else {
//         // Wait for 800ms (matching the menu's exit animation duration) before showing them again
//         menuTimeoutId = setTimeout(() => {
//           setIsMobileMenuActive(false);
//         }, 800);
//       }
//     };

//     window.addEventListener("stickyBarStateChange", handleStickyBarChange);
//     window.addEventListener("bookingModalStateChange", handleBookingModalChange);
//     window.addEventListener("mobileMenuStateChange", handleMobileMenuChange);

//     return () => {
//       window.removeEventListener("stickyBarStateChange", handleStickyBarChange);
//       window.removeEventListener("bookingModalStateChange", handleBookingModalChange);
//       window.removeEventListener("mobileMenuStateChange", handleMobileMenuChange);
//       clearTimeout(menuTimeoutId);
//     };
//   }, []);

//   useEffect(() => {
//     const handlePreloaderFinished = () => {
//       setIsPreloaderDone(true);
//     };

//     if (typeof window !== "undefined") {
//       if (window.__preloaderDone) {
//         handlePreloaderFinished();
//       } else {
//         window.addEventListener("preloaderFinished", handlePreloaderFinished);
//       }
//     }

//     return () => {
//       if (typeof window !== "undefined") {
//         window.removeEventListener("preloaderFinished", handlePreloaderFinished);
//       }
//     };
//   }, []);

//   // Combined logic: Hide if Preloader isn't done, Booking Modal is open, OR Mobile Menu is animating/open
//   const isHidden = !isPreloaderDone || isBookingModalOpen || isMobileMenuActive;

//   return (
//     <div className="min-h-screen flex flex-col bg-paper">
//       <SiteHeader />

//       <main className="flex-1 w-full">{children}</main>
//       <Footer />

//       <motion.div
//         initial={false}
//         animate={{
//           // Sticky bar pushes up logic remains unchanged
//           y: isBookingModalOpen ? 120 : isStickyBarVisible ? -68 : 0,
//           opacity: isHidden ? 0 : 1,
//           scale: isHidden ? 0.95 : 1,
//         }}
//         transition={{
//           type: "tween",
//           duration: 0.75,
//           ease: [0.4, 0, 0.2, 1],
//         }}
//         style={{ willChange: "transform, opacity" }}
//         className="fixed right-6 md:right-8 bottom-6 md:bottom-8 z-150 flex flex-col items-center gap-6 pointer-events-none"
//       >
//         {/* Back To Top */}
//         <div className={`pointer-events-auto transition-all ${isHidden ? "pointer-events-none" : ""}`}>
//           <BackToTop />
//         </div>

//         {/* Chat Widget */}
//         <div className={`pointer-events-auto transition-all ${isHidden ? "pointer-events-none" : ""}`}>
//           <ChatWidget />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingWidgets } from "@/components/ui/FloatingWidgets";

export default function UserPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1 w-full">{children}</main>

      <Footer />

      <FloatingWidgets />
    </div>
  );
}
