import React from "react";
import { Link } from "@/i18nNavigation";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { useTranslations } from "next-intl";
//Icons
import { CheckCircle2, Images } from "lucide-react";

interface EventAboutProps {
  slug: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  perks: string[];
  images?: string[];
}

export function EventAbout({ slug, aboutTitle, aboutText1, aboutText2, perks, images = [] }: EventAboutProps) {
  const t = useTranslations("Events.Slug");
  return (
    <div className="mt-12 space-y-8 text-slate-300 font-light leading-relaxed">
      <div className="space-y-6">
        <h3 className="premium-serif text-2xl text-white font-normal">{aboutTitle}</h3>
        <p>{aboutText1}</p>
        <p>{aboutText2}</p>
      </div>

      {/* Perks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {perks.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-surface/50 border border-white/5 p-4 rounded-2xl transition-colors hover:border-gold/30 hover:bg-surface/80"
          >
            <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
            <span className="text-sm text-slate-200">{item}</span>
          </div>
        ))}
      </div>

      {images && images.length > 0 && (
        <div className="pt-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-gold/30 to-transparent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">{t("highlights")}</span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-gold/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {images.slice(0, 4).map((img, idx, arr) => {
              const isGalleryLink = idx === arr.length - 1;

              const containerClassName =
                "group relative overflow-hidden rounded-[2rem] border border-gold/20 bg-black shadow-2xl aspect-square sm:aspect-4/3 transition-all duration-500 hover:border-gold/60 block w-full h-full";

              const content = (
                <>
                  <LoadingImage
                    src={img}
                    alt={`Event Highlight ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    watermarkClassName="text-[15px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    wrapperClassName="w-full h-full"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Cinematic Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none" />

                  {isGalleryLink ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/70">
                      <Images className="mb-2 text-white" size={24} />
                      <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                       {t("viewGallery")}
                      </span>
                    </div>
                  ) : null}
                </>
              );

              return isGalleryLink ? (
                <Link key={idx} href={`/gallery/${slug}?from=events`} className={containerClassName}>
                  {content}
                </Link>
              ) : (
                <div key={idx} className={containerClassName}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
