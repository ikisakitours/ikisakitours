"use client";

import { useRouter, usePathname } from "@/i18nNavigation";
import { LegalDocumentSection } from "@/components/legal/LegalDocumentSection";
import { LegalHero } from "@/components/legal/LegalHero";
import { legalDocuments, type LegalDocumentId } from "@/data/legal";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function LegalBody() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LegalPage.Tabs");

  const currentSlug = pathname.split("/").pop() as LegalDocumentId;

  const validIds = legalDocuments.map((doc) => doc.id);
  const activeId = validIds.includes(currentSlug) ? currentSlug : "terms";

  const activeDoc = legalDocuments.find((doc) => doc.id === activeId) || legalDocuments[0];

  const handleTabChange = (id: LegalDocumentId) => {
    router.push(`/legal/${id}`, { scroll: false });
  };

  return (
    <ContainerLayout className="py-20 sm:py-24 md:py-26 lg:py-28 2xl:py-30 3xl:py-32">
      <div className="mx-auto max-w-7xl">
        <LegalHero activeDoc={activeDoc} />

        {/* Tab Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {legalDocuments.map((doc) => (
            <Button
              key={doc.id}
              variant="details"
              onClick={() => handleTabChange(doc.id)}
              className={activeId === doc.id ? "bg-gold! border-gold! text-lanka-black!" : ""}
            >
              {t(doc.id)}
            </Button>
          ))}
        </div>

        <div className="glass-card space-y-10 rounded-4xl border-gold/15 p-6 shadow-2xl md:space-y-12 md:rounded-[2.5rem] md:p-12">
          {legalDocuments
            .filter((doc) => doc.id === activeId)
            .map((doc) => (
              <div key={doc.id}>
                <LegalDocumentSection document={doc} />
              </div>
            ))}
        </div>
      </div>
    </ContainerLayout>
  );
}
