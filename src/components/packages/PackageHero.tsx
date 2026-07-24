import Image from "next/image";
import { heroData } from "@/data/packages";

export function PackageHero() {
  return (
    
    <header className="relative flex min-h-110 items-start justify-center bg-lanka-dark px-4 pb-28 pt-36 text-center md:min-h-130 md:pb-36 md:pt-44">
      
     
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroData.image}
          alt="Elite Transfer Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-lanka-dark" />
      </div>

      <div className="absolute -bottom-0.5 left-0 right-0 z-0 h-1 bg-lanka-dark pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{heroData.badge}</span>
        </div>

        <h1 className="premium-serif mb-6 text-3xl leading-tight text-white md:text-6xl">
          {heroData.startTitle} <span className="italic text-gold">{heroData.HighlightTitle}</span> {heroData.EndTitle}
        </h1>

        <div className="flex items-center justify-center gap-3 md:gap-5">
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
          <p className="mx-auto max-w-[95%] text-[10px] font-bold uppercase leading-loose tracking-[0.15em] text-gold opacity-90 sm:text-[11px] sm:leading-relaxed md:max-w-[80%] md:text-[13px] md:tracking-[0.2em] lg:max-w-[60%]">
            {heroData.description}
          </p>
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
        </div>
      </div>
    </header>
  );
}