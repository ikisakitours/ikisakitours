import type { GalleryItem } from "@/data/blog";
import { LoadingImage } from "@/components/ui/LoadingImage";

type GalleryCardProps = {
  item: GalleryItem;
  priority: boolean;
  onSelect: () => void;
};

export function GalleryCard({ item, priority, onSelect }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative aspect-4/5 overflow-hidden rounded-sm border border-white/5 bg-surface text-left shadow-2xl outline-none transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
      aria-label={`Open ${item.alt} in gallery lightbox`}
    >
      <LoadingImage
        src={item.src}
        alt={item.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 260px, (min-width: 768px) 33vw, 50vw"
        className="image-render-visible object-cover grayscale-50 group-hover:scale-110 group-hover:grayscale-0 group-focus-visible:scale-110 group-focus-visible:grayscale-0"
        wrapperClassName="w-full h-full"
      />
      <span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-3 sm:p-4 md:p-6 transition-all duration-500 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="mb-1 truncate text-[10px] font-extrabold uppercase tracking-[0.25em] text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-[11px] sm:tracking-[0.3em]">
          {item.category}
        </span>
        <span className="truncate text-[11px] font-bold leading-snug tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-[12px] sm:tracking-widest md:text-[13px]">
          {item.title}
        </span>
      </span>
    </button>
  );
}
