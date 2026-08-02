"use client";
import { ImageSlider } from "@/components/ui/ImageSlider";

type IntroCardProps = {
  data: {
    badge: string;
    titleMain: string;
    titleBreak: string;
    description: string;
    image: string;
    imageAlt: string;
    imageBadge: string;
    imageDesc: string;
  };
};

export default function ContactIntroCard({ data }: IntroCardProps) {
  const SLIDER_IMAGES = [
    data.image,
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
  ];

  return (
    <div className="glass-card rounded-[2.5rem] p-6 md:p-10 lg:p-12 flex flex-col xl:flex-row items-center gap-10 md:gap-12 xl:gap-16 mb-12 border border-white/10">
      <div className="w-full xl:flex-1 flex flex-col justify-center space-y-5 md:space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 border border-gold/20 w-fit">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gold">{data.badge}</span>
        </div>

        <h1 className="premium-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
          {data.titleMain} <br className="hidden md:block" /> {data.titleBreak}
        </h1>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {data.description}
        </p>
      </div>

      <div
        className="relative w-full xl:w-[45%] h-50 md:h-75 xl:h-87.5 border border-white/10 z-10"
        style={{ borderRadius: "32px", overflow: "hidden", transform: "translateZ(0)" }}
      >
        <ImageSlider
          images={SLIDER_IMAGES}
          altText={data.imageAlt}
          badge={data.imageBadge}
          description={data.imageDesc}
          showIndicators={true}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}