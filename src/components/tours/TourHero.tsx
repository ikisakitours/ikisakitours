import Image from "next/image";
import { useTranslations } from "next-intl";

export interface TourHeroProps {
  namespace: "Tours.MultiDay" | "Tours.OneDay";
}

export function TourHero({ namespace }: TourHeroProps) {
  const t = useTranslations(`${namespace}.Hero`);

  return (
    <header className="relative flex flex-col justify-center text-center bg-lanka-dark h-[53vh] min-h-93 md:h-[45vh] md:min-h-95 lg:h-[58vh] lg:min-h-120 xl:h-[63vh] xl:min-h-120 2xl:h-[60vh] 2xl:min-h-125 3xl:h-[60vh] 3xl:min-h-127.5">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={t("image")}
          alt={t("alt")}
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 300vw, 100vw"
          className="block sm:hidden scale-110 object-cover object-center animate-slow-zoom"
        />

        <Image
          src={t("image")}
          alt={t("alt")}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="hidden sm:block scale-110 object-cover object-center animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-lanka-dark" />
      </div>

      <div className="absolute -bottom-0.5 left-0 right-0 z-0 h-1 bg-lanka-dark pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t("badge")}</span>
        </div>

        <h1 className="premium-serif mb-6 text-3xl leading-tight text-white md:text-6xl">
          {t("startTitle")} <span className="italic text-gold">{t("HighlightTitle")}</span> {t("EndTitle")}
        </h1>

        <div className="flex items-center justify-center gap-3 md:gap-5">
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
          <p className="mx-auto max-w-[95%] text-[10px] font-bold uppercase leading-loose tracking-[0.15em] text-gold opacity-90 sm:text-[11px] sm:leading-relaxed md:max-w-[80%] md:text-[13px] md:tracking-[0.2em] lg:max-w-[60%]">
            {t("description")}
          </p>
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
        </div>
      </div>
    </header>
  );
}