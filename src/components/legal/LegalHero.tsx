import { type LegalDocument } from "@/data/legal";
import EyeBrow from "@/components/ui/EyeBrow";
import { useTranslations } from "next-intl";

export function LegalHero({ activeDoc }: { activeDoc: LegalDocument }) {
  const t = useTranslations("LegalPage.Hero");
  const titleParts = activeDoc.title.split(activeDoc.accent);

  return (
    <header className="mb-10 text-center md:mb-16">
      <EyeBrow eyebrow={activeDoc.eyebrow} />
      <h1 className="premium-serif mb-4 text-heading-section font-bold leading-tight text-white md:text-6xl">
        {titleParts[0]}
        <span className="gold-gradient-text">{activeDoc.accent}</span>
        {titleParts[1]}
      </h1>

      <p className="text-caption  font-bold uppercase tracking-widest text-slate-400 ">
        {t("lastUpdated")} {activeDoc.lastUpdated}
      </p>
    </header>
  );
}
