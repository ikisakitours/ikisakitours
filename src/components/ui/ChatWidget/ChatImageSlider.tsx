"use client";
import React from "react";
import { ImageSlider } from "@/components/ui/ImageSlider";
interface ChatImageSliderProps {
  images?: string[];
}

export function ChatImageSlider({ images }: ChatImageSliderProps) {
  const imagesList =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
        ];

  return (
    <div className="relative w-full h-36 sm:h-40 md:h-32 lg:h-28 rounded-2xl overflow-hidden mb-4 border border-gold/30 shadow-md">
      <ImageSlider images={imagesList} showIndicators={true} className="w-full h-full" />
      <div className="absolute inset-0 bg-linear-to-t from-lanka-black/80 via-transparent to-transparent z-10" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
        <span className="premium-serif text-2xl sm:text-3xl font-bold tracking-[0.3em] uppercase text-white/15 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] select-none">
          Map<span className="text-gold/25">Mate</span>
        </span>
      </div>
    </div>
  );
}
