"use client";

import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Info, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { PricingNoteItem } from "@/services/Booking/packageDetails/types";

interface PricingNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingNotes?: PricingNoteItem[];
}

type PointItem = {
  id?: string;
  title: string;
  desc: string;
};

export function PricingNotesModal({ isOpen, onClose, pricingNotes }: PricingNotesModalProps) {
  const t = useTranslations("Booking.Widget.PricingNotesModal");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  const points: PointItem[] = useMemo(() => {
    if (Array.isArray(pricingNotes) && pricingNotes.length > 0) {
      return pricingNotes.map((note) => {
        const title =
          note.title?.[locale] ||
          note.title?.en ||
          Object.values(note.title || {})[0] ||
          "";
        const desc =
          note.description?.[locale] ||
          note.description?.en ||
          Object.values(note.description || {})[0] ||
          "";
        return {
          id: note.id,
          title,
          desc,
        };
      });
    }
    return [];
  }, [pricingNotes, locale]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll on mobile, tablet, and desktop
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card relative w-full max-w-lg my-auto overflow-hidden rounded-3xl border border-gold/25 bg-[#0a0a0a] p-5 sm:p-7 shadow-2xl space-y-4 animate-fade-in-up"
      >
        {/* Top-Left Info Icon Badge */}
        <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold shadow-md shadow-gold/10">
          <Info className="h-4 w-4" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 z-10 cursor-pointer"
        >
          <X className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-red-400" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-1 sm:pt-2">
          <h3 className="text-heading-card font-bold text-white tracking-tight">
            {t("title")}
          </h3>
          <p className="text-body-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Bullet Points Container */}
        <div className="space-y-2.5 max-h-[52vh] overflow-y-auto no-scrollbar pr-0.5 pt-1">
          {points.map((pt, idx) => (
            <div
              key={pt.id || idx}
              className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/2 p-3 sm:p-3.5 transition-colors hover:border-gold/20 hover:bg-gold/5"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/30 text-gold shadow-sm">
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <div className="space-y-0.5">
                <h4 className="text-caption font-bold uppercase tracking-wider text-gold">
                  {pt.title}
                </h4>
                <p className="text-body-sm text-slate-300 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Confirmation Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gold py-3 px-4 text-caption font-bold uppercase tracking-widest text-lanka-black transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg shadow-gold/20 font-sans"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
