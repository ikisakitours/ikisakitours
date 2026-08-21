import Image from "next/image";
import { useTranslations } from "next-intl";
import EyeBrow from "@/components/ui/EyeBrow";

import ContainerLayout from "@/components/pageLayouts/ContainerLayout";

export interface TourHeroProps {
  namespace: "Tours.MultiDay" | "Tours.OneDay";
}

export function TourHero({ namespace }: TourHeroProps) {
  const t = useTranslations(`${namespace}.Hero`);

  return (
    <header className="relative flex flex-col justify-center text-center bg-lanka-dark min-h-[53vh] md:min-h-[45vh] lg:min-h-[58vh] xl:min-h-[63vh] 2xl:min-h-[60vh] pt-20 pb-12 sm:py-24 md:py-26 lg:py-28 2xl:py-30 3xl:py-32">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={t("image")}
          alt={t("alt")}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover object-center scale-110 animate-slow-zoom"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-lanka-dark" />
      </div>

      <div className="absolute -bottom-0.5 left-0 right-0 z-0 h-1 bg-lanka-dark pointer-events-none" />

      <ContainerLayout className="relative z-10">
        <div className="mx-auto w-full max-w-4xl">
          <EyeBrow eyebrow={t("badge")} />

          <h1 className="premium-serif mb-6 text-heading-hero leading-tight text-white">
            {t("startTitle")} <span className="italic text-gold">{t("HighlightTitle")}</span> {t("EndTitle")}
          </h1>

          <div className="flex items-center justify-center gap-3 md:gap-5">
            <div className="hidden h-px w-8 bg-gold/40 sm:block" />
            <p className="mx-auto max-w-[95%] text-caption font-bold uppercase leading-loose tracking-[0.15em] text-gold opacity-90 sm:leading-relaxed md:max-w-[80%] md:tracking-[0.2em] lg:max-w-[60%]">
              {t("description")}
            </p>
            <div className="hidden h-px w-8 bg-gold/40 sm:block" />
          </div>
        </div>
      </ContainerLayout>
    </header>
  );
}
