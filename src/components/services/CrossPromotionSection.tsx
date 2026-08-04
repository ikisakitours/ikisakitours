import { Link } from "@/i18nNavigation";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Clock, Star, MessageCircleHeart, ArrowRight } from "lucide-react";
import { packages } from "@/data/multiDaysTours";
import { testimonials } from "@/data/testimonials";
import { RatingStars } from "@/components/ui/RatingStars";
import { useTranslations } from "next-intl";

export function CrossPromotionSection() {
  const tCross = useTranslations("Services.CrossPromotion");
  const displayPackages = packages.slice(0, 4);
  const displayTestimonials = testimonials.filter((t) => (t.rating ?? 5) === 5).slice(0, 4);

  return (
    <section className="mt-16 border-t border-white/5 pt-16">
      {/* Packages Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="premium-serif text-3xl text-white">{tCross("discoverMore")}</h2>
          <Link
            href="/packages"
            className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          >
            {tCross("viewAll")} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayPackages.map((pkg, index) => (
            <Link
              href={`/booking/multi-days-tours/${pkg.slug}`}
              key={index}
              className={`glass-card group overflow-hidden rounded-4xl border border-white/5 transition-all duration-700 hover:border-gold/40 ${
                index === 3 ? "hidden md:block xl:hidden" : "block"
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full border border-gold/40 bg-black/80 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gold backdrop-blur-md">
                    {pkg.categoryLabel}
                  </span>
                </div>
                <LoadingImage
                  src={pkg.image}
                  alt={`${pkg.title} ${pkg.imageAlt}`}
                  fill
                  sizes="(min-width: 1280px) 380px, 85vw"
                  wrapperClassName="w-full h-full"
                  className="image-render-visible object-cover opacity-70! group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold">{pkg.origin}</div>
                <h3 className="premium-serif mb-3 text-xl font-bold leading-tight text-white">
                  {pkg.title} <br />
                  <span className="text-lg font-light italic">{pkg.subtitle}</span>
                </h3>
                <div className="mb-6 flex items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gold" />
                    {pkg.duration}
                  </span>

                  <span className="group relative flex shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:border-gold min-h-11 px-5 py-3 text-[10px] sm:min-h-0 sm:px-5 sm:py-2.5 font-bold uppercase tracking-[0.2em] text-white">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{tCross("details")}</span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                    <ArrowRight className="ml-2 h-3 w-3 relative z-10 transition-colors duration-300 group-hover:text-white" />
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2">
                    <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" />
                    <span className="text-sm font-bold tracking-widest text-white">{pkg.rating}</span>
                  </div>
                  
                  {/* Price Section with 'Starting from' */}
                  <div className="flex flex-col items-end">
                    <span className="mb-0.5 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                      {tCross("startingFrom")}
                    </span>
                    <span className="text-xl font-bold tracking-tighter text-gold leading-none">
                      {pkg.price}
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
          <h2 className="premium-serif text-3xl text-white">{tCross("guestStories")}</h2>
          <Link
            href="/testimonials"
            className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          >
            {tCross("readMore")} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayTestimonials.map((t, index) => {
            const rating = t.rating ?? 5;

            return (
              <div
                key={index}
                className={`group rounded-2xl border border-white/5 bg-[#0a0a0a]/50 p-6 flex-col justify-between hover:border-gold/30 hover:bg-white/2 transition-all duration-500 shadow-lg hover:shadow-gold/5 ${
                  index === 3 ? "hidden md:flex xl:hidden" : "flex"
                }`}
              >
                {/* Modern Header: Icon on Left, Stars on Right */}
                <div className="mb-5 flex items-start justify-between">
                  <MessageCircleHeart className="h-6 w-6 text-gold/70 transition-colors duration-300 group-hover:text-gold" />

                  <RatingStars rating={rating} starClassName="h-3.5 w-3.5 text-gold" />
                </div>

                <p className="grow line-clamp-4 text-sm leading-relaxed italic text-slate-300 mb-6">
                  &quot;{t.quote}&quot;
                </p>

                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  {t.avatar ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-gold/30">
                      <LoadingImage
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="40px"
                        isSmall
                        wrapperClassName="w-full h-full"
                        className=" object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold ring-2 ring-transparent transition-all duration-300 group-hover:ring-gold/30 group-hover:bg-gold/20">
                      {t.initials}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-gold-light">
                      {t.name}
                    </p>
                    <p className="text-[10px] tracking-widest uppercase text-slate-500">{t.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}