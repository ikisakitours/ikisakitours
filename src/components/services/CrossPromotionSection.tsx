import Link from "next/link";
import Image from "next/image";
import { Star, MessageCircleHeart, ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";
import { testimonials } from "@/data/testimonials";

export function CrossPromotionSection() {
  const displayPackages = packages.slice(0, 3);
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <section className="mt-24 border-t border-white/5 pt-16">
      {/* Packages Section */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="premium-serif text-3xl text-white">Discover More</h2>
          <Link
            href="/packages"
            className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          >
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPackages.map((pkg, index) => (
            <Link href={`/packages/${pkg.title.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
              <div className="group overflow-hidden rounded-4xl bg-[#0a0a0a] border border-white/10 transition-all hover:border-gold/50 hover:shadow-[0_10px_30px_rgba(197,160,89,0.1)]">
                {/* Image Component with parent container */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{pkg.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center text-sm font-bold text-gold">
                    <span>{pkg.price}</span>
                    <span className="flex items-center gap-1 bg-gold/10 px-3 py-1 rounded-full text-[10px]">
                      <Star className="h-3 w-3 fill-gold text-gold" /> {pkg.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="premium-serif text-3xl text-white">Guest Stories</h2>
          <Link
            href="/testimonials"
            className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          >
            Read More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.map((t, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/5 bg-[#0a0a0a]/50 p-6 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <MessageCircleHeart className="h-6 w-6 text-gold mb-4" />
              <p className="text-sm text-slate-300 italic mb-6 leading-relaxed grow line-clamp-4">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                {t.avatar ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold">
                    {t.initials}
                  </div>
                )}

                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
