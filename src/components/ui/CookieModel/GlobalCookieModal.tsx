"use client";

import { useState, useEffect } from "react";
import { CookiePreferenceModal } from "./CookiePreferenceModal"; 

export function GlobalCookieModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    
    window.addEventListener("openCookieModal", handleOpen);
    
    return () => window.removeEventListener("openCookieModal", handleOpen);
  }, []);

  return <CookiePreferenceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}