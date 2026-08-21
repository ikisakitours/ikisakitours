"use client";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
//Icons
import { ArrowLeft } from "lucide-react";

type GalleryHeroProps = {
  backLink: string;
  backLabel: string;
  title?: string;
  accent?: string;
  subtitle?: string;
};

export function GalleryHero({ backLink, backLabel, title, accent, subtitle }: GalleryHeroProps) {
  const router = useRouter();
  const t = useTranslations("Gallery.Hero");

  const displayTitle = title || t("defaultTitle");
  const displayAccent = accent || t("defaultAccent");
  const displaySubtitle = subtitle || t("defaultSubtitle");

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(backLink);
    }
  };

  return (
    <ContainerLayout className="text-center py-20 md:py-28 xl:py-20 2xl:py-32 3xl:py-40">
      <header>
        <a
          href={backLink}
          onClick={handleBack}
          style={{ letterSpacing: "0.3em" }}
          className="group relative z-10 mb-7 inline-flex cursor-pointer items-center gap-2 py-3 pr-4 text-caption font-bold uppercase text-gold transition-all hover:text-gold-light"
        >
          <ArrowLeft strokeWidth={3} className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          {backLabel}
        </a>

        <h1 className="premium-serif text-heading-section font-light uppercase leading-tight tracking-[0.14em] text-white md:tracking-[0.2em]">
          {displayTitle} <span className="text-gold">{displayAccent}</span>
        </h1>

        <p className="mt-5 text-caption font-bold uppercase tracking-[0.35em] text-slate-500 md:tracking-[0.5em]">
          {displaySubtitle}
        </p>

        <div className="mx-auto mt-8 h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent" />
      </header>
    </ContainerLayout>
  );
}
