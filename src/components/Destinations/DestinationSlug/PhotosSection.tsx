import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import Link from "next/link";
//Icons
import { Images, Plus } from "lucide-react";

type Props = {
  name: string;
  slug: string;
  photos: string[];
};

export default function PhotosSection({ name, slug, photos }: Props) {
  const galleryUrl = `/gallery/destination/${slug}?filter=gallery`;

  return (
    <section className="glass-card relative overflow-hidden rounded-4xl border border-white/5 p-6 md:p-10">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />

      {/* Top Header & Link Section */}
      <div className="mb-6 flex flex-row items-end justify-between gap-4">
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2">
            <Images className="h-4 w-4 text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Visual Journey</span>
          </div>
          <h2 className="premium-serif text-2xl italic text-white sm:text-3xl md:text-4xl">Explore {name}</h2>
        </div>

        {/* View All Link */}
        <Link
          href={galleryUrl}
          className="shrink-0 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-white pb-1"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.2em] md:text-[11px]">
            View all
          </span>

          <div className="inline-flex items-center gap-0.5">
            <span className="text-[10px] font-black sm:text-[11px] md:text-[12px]">{photos.length}</span>
            <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={4} />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {photos.slice(0, 3).map((photoSrc, index) => {
          const isLast = index === 2;

          return (
            <Link
              key={index}
              href={galleryUrl}
              className="group relative block h-56 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-64"
            >
              <LoadingImage
                src={photoSrc}
                alt={`${name} highlight ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                wrapperClassName="w-full h-full"
                className="object-cover group-hover:scale-110"
              />
              {isLast ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/65">
                  <Images className="mb-2 text-white" size={28} />
                  <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    View Gallery
                  </span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                      0{index + 1} — Highlights
                    </span>
                  </div>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
