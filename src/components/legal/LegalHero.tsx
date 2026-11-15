import type { LegalDocumentContent } from "@/services/legal/types";
import EyeBrow from "@/components/ui/EyeBrow";
import { useTranslations } from "next-intl";

export function LegalHero({ activeDoc }: { activeDoc: LegalDocumentContent }) {
  const t = useTranslations("LegalPage.Hero");
  const titleParts = activeDoc.title.split(activeDoc.accent);

  return (
    <header className="mb-10 text-center md:mb-16">
      <EyeBrow eyebrow={activeDoc.eyebrow} />
      <h1 className="premium-serif mb-4 text-heading-section font-bold leading-tight text-white md:text-6xl">
        {titleParts}
      </h1>

      <p className="text-caption  font-bold uppercase tracking-widest text-slate-400 ">
        {t("lastUpdated")} {activeDoc.lastUpdated}
      </p>
    </header>
  );
}
