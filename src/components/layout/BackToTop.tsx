"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // 8
      className={`fixed bottom-30 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold bg-transparent text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-gold/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      <ArrowUp className="h-4.5 w-4.5" />
    </button>
  );
}
