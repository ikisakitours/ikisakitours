"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMenuStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsMobileMenuOpen(customEvent.detail.isOpen);
    };

    const handleGlobalModalChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsGlobalModalOpen(customEvent.detail.isOpen);
    };

    window.addEventListener("mobileMenuStateChange", handleMenuStateChange);
    window.addEventListener("globalModalStateChange", handleGlobalModalChange);

    return () => {
      window.removeEventListener("mobileMenuStateChange", handleMenuStateChange);
      window.removeEventListener("globalModalStateChange", handleGlobalModalChange);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group relative z-999 flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-[#0a0a0a]/50 text-gold shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-md backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:border-gold/80 hover:bg-[#0a0a0a]/70 hover:shadow-[0_10px_30px_rgba(212,175,55,0.35),inset_0_0_20px_rgba(212,175,55,0.3)] ${
        isGlobalModalOpen ? "hidden" : isMobileMenuOpen ? "hidden xl:flex" : "flex"
      } ${
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "pointer-events-none translate-y-12 opacity-0"
      }`}
    >
      <div className="absolute top-0 left-1/2 h-[35%] w-[75%] -translate-x-1/2 rounded-full bg-linear-to-b from-white/15 to-transparent blur-[1px]" />

      <div className="absolute inset-0 translate-y-full bg-linear-to-t from-gold/40 via-gold/10 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0" />

      <ArrowUp className="relative z-10 h-4.5 w-4.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
    </button>
  );
}
