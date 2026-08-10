import EyeBrow from "@/components/ui/EyeBrow";
import Image from "next/image";

type HeroProps = {
  image: string;
  altText: string;
  eyebrow: string;
  title: string;
  accent: string;
  strapline: string;
};

export function Hero({ image, altText, eyebrow, title, accent, strapline }: HeroProps) {
  const titleParts = title.split(accent);

  return (
    <header className="relative flex flex-col justify-center text-center bg-lanka-dark h-[53vh] min-h-93 md:h-[45vh] md:min-h-95 lg:h-[58vh] lg:min-h-120 xl:h-[63vh] xl:min-h-120 2xl:h-[60vh] 2xl:min-h-125 3xl:h-[60vh] 3xl:min-h-127.5">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={altText}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover object-center scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-lanka-dark" />
      </div>
      <div className="absolute -bottom-0.5 left-0 right-0 z-0 h-1 bg-lanka-dark pointer-events-none" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <EyeBrow eyebrow={eyebrow} />

        <h1 className="premium-serif mb-6 text-4xl leading-tight text-white md:text-6xl lg:text-7xl">
          {titleParts[0]}
          <span className="italic text-gold">{accent}</span>
          {titleParts[1]}
        </h1>

        <div className="flex items-center justify-center gap-4 md:gap-5">
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
          <p className="mx-auto max-w-[90%] text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-gold md:text-[13px] md:tracking-[0.2em]">
            {strapline}
          </p>
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
        </div>
      </div>
    </header>
  );
}
