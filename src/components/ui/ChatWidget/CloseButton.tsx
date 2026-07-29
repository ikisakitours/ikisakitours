"use client";

import React from "react";
import { X } from "lucide-react";

interface ChatCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
  className?: string;
}

export function CloseButton({ iconSize = 14, className = "", ...props }: ChatCloseButtonProps) {
  return (
    <button
      type="button"
      className={`group flex items-center justify-center rounded-full bg-surface border border-gold/50 text-gold transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.3)] cursor-pointer hover:bg-gold! hover:text-lanka-black! active:bg-gold! active:text-lanka-black! ${className}`}
      {...props}
    >
      <X
        size={iconSize}
        className="transition-colors duration-300 group-hover:text-lanka-black! group-active:text-lanka-black!"
      />
    </button>
  );
}
