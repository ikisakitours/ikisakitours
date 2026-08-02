import Image from "next/image";

export interface TourHeroProps {
  data: {
    badge: string;
    startTitle: string;
    HighlightTitle: string;
    EndTitle: string;
    description: string;
    image: string;
  };
}

export function TourHero({ data }: TourHeroProps) {
  return (
    <header className="relative flex flex-col justify-center text-center bg-lanka-dark h-[35vh] min-h-80 md:h-[40vh] md:min-h-87.5 lg:h-[50vh] lg:min-h-100 xl:h-[55vh] xl:min-h-112.5 2xl:h-[60vh] 2xl:min-h-125 3xl:h-[65vh] 3xl:min-h-137.5">
      {/* FIX 2: overflow-hidden is moved strictly to the image wrapper */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 1. Mobile Image  */}

        <Image
          src={data.image}
          alt="MapMate Transfer Background"
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 300vw, 100vw"
          className="block sm:hidden scale-110 object-cover object-center  animate-slow-zoom"
        />

        {/* 2. Desktop Image */}
        <Image
          src={data.image}
          alt="MapMate Transfer Background"
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
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{data.badge}</span>
        </div>

        <h1 className="premium-serif mb-6 text-3xl leading-tight text-white md:text-6xl">
          {data.startTitle} <span className="italic text-gold">{data.HighlightTitle}</span> {data.EndTitle}
        </h1>

        <div className="flex items-center justify-center gap-3 md:gap-5">
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
          <p className="mx-auto max-w-[95%] text-[10px] font-bold uppercase leading-loose tracking-[0.15em] text-gold opacity-90 sm:text-[11px] sm:leading-relaxed md:max-w-[80%] md:text-[13px] md:tracking-[0.2em] lg:max-w-[60%]">
            {data.description}
          </p>
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
        </div>
      </div>
    </header>
  );
}
