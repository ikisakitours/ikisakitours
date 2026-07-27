import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
};

type BookingGalleryProps = {
  tour: {
    slug: string;
    gallery: GalleryItem[];
  };
  tourType?: "multi" | "one";
};
export default function BookingGallery({ tour, tourType }: BookingGalleryProps) {
  const galleryHref =
    tourType === "one"
      ? `/gallery/${tour.slug}?filter-one-day-tours=gallery`
      : `/gallery/${tour.slug}?filter-multi-days-tours=gallery`;

  return (
    <section id="gallery" className="mb-10 grid grid-cols-1 gap-3 md:mb-14 md:grid-cols-3 md:gap-4">
      <div className="group relative h-62.5 overflow-hidden rounded-3xl border border-white/5 sm:h-75 md:col-span-2 md:h-87.5 md:rounded-4xl">
        <Image
          src={tour.gallery[0].src}
          alt={tour.gallery[0].alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 760px, 100vw"
          className="image-render-visible object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="grid h-auto grid-cols-2 gap-3 md:h-87.5 md:grid-cols-1 md:grid-rows-2 md:gap-4">
        <div className="group relative h-37.5 overflow-hidden rounded-[1.2rem] border border-white/5 md:h-full md:rounded-3xl">
          <Image
            src={tour.gallery[1].src}
            alt={tour.gallery[1].alt}
            fill
            sizes="(min-width: 1024px) 360px, 50vw"
            className="image-render-visible object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <Link
          href={galleryHref}
          className="group relative block h-37.5 overflow-hidden rounded-[1.2rem] border border-white/5 md:h-full md:rounded-3xl"
        >
          <Image
            src={tour.gallery[2].src}
            alt={tour.gallery[2].alt}
            fill
            sizes="(min-width: 1024px) 360px, 50vw"
            className="image-render-visible object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/65">
            <Images className="mb-2 text-white" size={28} />
            <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              View Gallery
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
