import Link from "next/link";
//Icon
import { X } from "lucide-react";

export function ReviewsHeader({ slug }: { slug: string }) {
  return (
    <div className="mb-10 flex items-start justify-between border-b border-white/10 pb-6 pt-2 md:items-center md:pt-0">
      <div className="flex-1">
        <h1 className="premium-serif text-3xl italic text-white md:text-5xl">Guest Experiences</h1>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold md:text-xs md:tracking-[0.3em]">
          Authentic Stories from Our Travelers
        </p>
      </div>

      <Link
        href={`/booking/${slug}`}
        className="group ml-4 mt-2 flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 md:mt-0 md:px-6 md:py-3"
      >
        <X className="h-4 w-4 text-gold group-hover:text-white" strokeWidth={3} />
        <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-white md:inline">Close</span>
      </Link>
    </div>
  );
}
