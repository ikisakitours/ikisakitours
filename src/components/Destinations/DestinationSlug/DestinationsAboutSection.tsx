import React, { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import BackNavigation from "@/components/Destinations/DestinationSlug/BackNavigation";
type Props = {
  name: string;
  about: string;
};

export default function DestinationsAboutSection({ name, about }: Props) {
  return (
    <section className="glass-card rounded-4xl border border-white/5 p-6 md:p-10">
      <Suspense
        fallback={
          <div className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold/50">
            <ArrowLeft className="h-4 w-4" />
            Loading...
          </div>
        }
      >
        <BackNavigation />
      </Suspense>
      <h2 className="premium-serif mb-6 text-2xl italic text-white md:text-3xl">About {name}</h2>
      <p className="text-sm font-light leading-relaxed text-slate-300 md:text-[15px] md:leading-loose">{about}</p>
    </section>
  );
}
