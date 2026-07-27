import Image from "next/image";
import type { GalleryItem } from "@/data/blog";
//Icons
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryLightboxProps = {
  activeItem: GalleryItem;
  activeIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onTouchEnd: (screenX: number) => void;
  onTouchStart: (screenX: number) => void;
};

export function GalleryLightbox({
  activeItem,
  activeIndex,
  totalCount,
  onClose,
  onNext,
  onPrevious,
  onTouchEnd,
  onTouchStart,
}: GalleryLightboxProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.alt} gallery preview`}
      className="fixed inset-0 z-110 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-[14px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onTouchStart={(event) => onTouchStart(event.changedTouches[0].screenX)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].screenX)}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/5 text-white backdrop-blur-lg transition-all duration-300 hover:rotate-90 hover:border-gold hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label="Close gallery preview"
      >
        <X className="h-5 w-5 transition-colors" />
      </button>

      {/* Previous Button (Hidden on touch devices using valid Tailwind media query) */}
      <button
        type="button"
        onClick={onPrevious}
        className="group absolute left-4 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/40 text-gold backdrop-blur transition-all duration-300 hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 md:left-10 md:flex pointer-coarse:hidden"
        aria-label="Show previous gallery image"
      >
        <ChevronLeft className="h-6 w-6 transition-colors group-hover:text-black" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="group absolute right-4 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/40 text-gold backdrop-blur transition-all duration-300 hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 md:right-10 md:flex pointer-coarse:hidden"
        aria-label="Show next gallery image"
      >
        <ChevronRight className="h-6 w-6 transition-colors group-hover:text-black" />
      </button>

      <div className="flex w-full max-w-5xl flex-col items-center">
        {/* Image Container */}
        <div className="relative h-[60vh] w-full md:h-[72vh]">
          <Image
            key={activeItem.id}
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            sizes="100vw"
            quality={100}
            className="image-render-visible object-contain drop-shadow-[0_0_50px_rgba(197,160,89,0.2)]"
            priority
          />
        </div>

        {/* Caption & Controls Info */}
        <div className="mt-8 text-center">
          <p className="premium-serif text-sm uppercase tracking-[0.3em] text-white md:text-xl">{activeItem.title}</p>
          <div className="mx-auto my-4 h-px w-12 bg-gold/40" />
          <p className="text-[12px] font-semibold uppercase tracking-[0.4em] text-gold">
            {activeIndex + 1} / {totalCount}
          </p>

          <p className="mt-6 hidden text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 pointer-coarse:block">
            Swipe left or right to explore
          </p>
        </div>
      </div>
    </div>
  );
}
