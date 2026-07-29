"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  isAtBottom?: boolean;
  toggleChat: () => void;
}

export function ChatToggleButton({ isOpen, toggleChat, isAtBottom = false }: ChatToggleButtonProps) {
  return (
    <button
      onClick={toggleChat}
      className={`relative group flex h-14 w-14 md:h-15.5 md:w-15.5 items-center justify-center rounded-full bg-linear-to-b from-surface via-lanka-black to-lanka-black border-2 border-gold/60 shadow-[0_0_35px_rgba(197,160,89,0.35)] hover:shadow-[0_0_50px_rgba(197,160,89,0.6)] transition-all duration-500 z-50 ${
        isAtBottom && !isOpen
          ? "opacity-0 translate-y-10 scale-50 pointer-events-none"
          : "opacity-100 translate-y-0 scale-100 pointer-events-auto hover:scale-110 active:scale-95"
      }`}
      aria-label="Toggle chat"
    >
      <div className="absolute -inset-1.5 rounded-full border border-gold/30 animate-[spin_5s_linear_infinite] pointer-events-none" />
      <div className="absolute -inset-3 rounded-full border border-dashed border-gold/20 animate-[spin_10s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-linear-to-tr from-gold-dark/30 via-transparent to-gold/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      {isOpen ? (
        <X className="h-6 w-6 text-gold transition-all duration-500 rotate-180 scale-110 relative z-10 drop-shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
      ) : (
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-gold transition-all duration-500 group-hover:scale-110 relative z-10 drop-shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
      )}
    </button>
  );
}
