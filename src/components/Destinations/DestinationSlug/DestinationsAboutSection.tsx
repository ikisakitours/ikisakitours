import React from "react";

type Props = {
  name: string;
  about: string;
};

export default function DestinationsAboutSection({ name, about }: Props) {
  return (
    <section className="glass-card rounded-4xl border border-white/5 p-6 md:p-10">
      <h2 className="premium-serif mb-6 text-2xl italic text-white md:text-3xl">
        About {name}
      </h2>
      <p className="text-sm font-light leading-relaxed text-slate-300 md:text-[15px] md:leading-loose">
        {about}
      </p>
    </section>
  );
}