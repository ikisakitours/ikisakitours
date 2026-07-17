import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";

type GalleryHeroProps = {
  backLink: string;
  backLabel: string;
};

export function GalleryHero({ backLink, backLabel }: GalleryHeroProps) {
  return (
    <ContainerLayout className=" text-center py-20 md:py-28 xl:py-20 2xl:py-32 3xl:py-40">
      <header>
        <Link
          href={backLink}
          style={{ letterSpacing: "0.5em" }}
          className="group mb-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase text-gold transition-all hover:text-gold-light"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          {backLabel}
        </Link>

        <h1 className="premium-serif text-4xl font-light uppercase leading-tight tracking-[0.14em] text-white sm:text-5xl md:text-6xl md:tracking-[0.2em]">
          The <span className="text-gold">Heritage</span>
        </h1>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500 sm:text-[11px] md:tracking-[0.5em]">
          Curated Visual Experience
        </p>

        <div className="mx-auto mt-8 h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent" />
      </header>
    </ContainerLayout>
  );
}
