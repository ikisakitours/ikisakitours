import { SectionLabel } from "@/components/ui/SectionLabel";
import { type LegalDocument } from "@/data/legal";

export function LegalHero({ activeDoc }: { activeDoc: LegalDocument }) {
  const titleParts = activeDoc.title.split(activeDoc.accent);

  return (
    <header className="mb-10 text-center md:mb-16">
      <SectionLabel>{activeDoc.eyebrow}</SectionLabel>

      <h1 className="premium-serif mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
        {titleParts[0]}
        <span className="gold-gradient-text">{activeDoc.accent}</span>
        {titleParts[1]}
      </h1>

      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 md:text-sm">
        Last Updated: {activeDoc.lastUpdated}
      </p>
    </header>
  );
}
