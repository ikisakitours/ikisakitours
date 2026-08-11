import EyeBrow from "@/components/ui/EyeBrow";
import Image from "next/image";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";

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
    <header className="relative flex flex-col justify-center text-center bg-lanka-dark min-h-[53vh] md:min-h-[45vh] lg:min-h-[58vh] xl:min-h-[63vh] 2xl:min-h-[60vh] pt-20 pb-12  sm:py-24 md:py-26 lg:py-28 2xl:py-30 3xl:py-32">
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
      <ContainerLayout className="relative z-10">
        <div className="mx-auto w-full max-w-4xl">
          <EyeBrow eyebrow={eyebrow} />

          <h1 className="premium-serif mb-6 text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
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
      </ContainerLayout>
    </header>
  );
}
