// src/components/ui/UnderDevelopmentModal.tsx
"use client";

import React, { useEffect } from "react";
import { FiClock, FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";

interface UnderDevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
}

const AUTO_CLOSE_MS = 4000;

export default function UnderDevelopmentModal({ isOpen, onClose, providerName }: UnderDevelopmentModalProps) {
  const tAuth = useTranslations("Common.underDevelopment");

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="fixed top-2 right-4 left-4 sm:left-auto sm:right-6 sm:w-90 z-9999 animate-in slide-in-from-top-4 fade-in duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)]">
        {/* Close (top right) */}
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="absolute top-2.5 right-2.5 z-10 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-3.5 p-4 pr-10">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <FiClock className="h-4 w-4" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="text-body-sm font-semibold text-white">
              <span className="capitalize text-gold">{providerName}</span> {tAuth("comingSoon")}
            </p>
            <p className="mt-0.5 text-caption text-slate-400">{tAuth("pleaseContinueEmail")}</p>
          </div>
        </div>

        {/* Thin progress line */}
        <div
          className="animate-toast-progress absolute inset-x-0 bottom-0 h-0.5 bg-gold/70"
          style={{ animationDuration: `${AUTO_CLOSE_MS}ms` }}
        />
      </div>
    </div>,
    document.body,
  );
}
