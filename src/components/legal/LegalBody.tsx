"use client";
import { useState } from "react";
import { useRouter, usePathname } from "@/lib/i18nNavigation";
import { LegalDocumentSection } from "@/components/legal/LegalDocumentSection";
import { LegalHero } from "@/components/legal/LegalHero";
import { legalDocuments, type LegalDocumentId } from "@/data/legal";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { useTranslations } from "next-intl";
import { CookiePageActions } from "@/components/ui/CookieModel/CookiePageActions";
import { CookiePreferenceModal } from "@/components/ui/CookieModel/CookiePreferenceModal";
import { saveCookiePreferences } from "@/utils/cookiesHandle";
//Icons
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { Filter } from "lucide-react";

export default function LegalBody() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LegalPage.Tabs");

  const currentSlug = pathname.split("/").pop() as LegalDocumentId;

  const validIds = legalDocuments.map((doc) => doc.id);
  const activeId = validIds.includes(currentSlug) ? currentSlug : "terms";

  const activeDoc = legalDocuments.find((doc) => doc.id === activeId) || legalDocuments[0];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const handleTabChange = (id: LegalDocumentId) => {
    router.push(`/legal/${id}`, { scroll: false });
  };

  const handleAcceptAll = () => {
    saveCookiePreferences({ performance: true, functional: true, targeting: true }, "accepted");
    window.dispatchEvent(new Event("cookieConsentUpdated"));
  };

  const categoryLabels = validIds.reduce(
    (acc, id) => {
      acc[id] = t(id);
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <ContainerLayout className="pt-28 sm:pt-30 md:pt-34 lg:pt-28 2xl:pt-30 3xl:pt-32 pb-12 sm:pb-16 md:pb-18 lg:pb-20 2xl:pb-22 3xl:pb-24">
      <div className="mx-auto max-w-7xl">
        <LegalHero activeDoc={activeDoc} />

        {/* Tab Buttons */}
        <div className="mb-10 flex justify-start">
          <button
            type="button"
            onClick={() => setIsFilterSidebarOpen(true)}
            className="group flex items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-tiny font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
          >
            <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />

            <span className="transition-colors duration-300 group-hover:text-black">
              {activeId ? t(activeId) : "Filter Legal Documents"}
            </span>
          </button>
        </div>

        <div className="glass-card space-y-10 rounded-4xl border-gold/15 p-6 shadow-2xl md:space-y-12 md:rounded-[2.5rem] md:p-12">
          {legalDocuments
            .filter((doc) => doc.id === activeId)
            .map((doc) => (
              <div key={doc.id}>
                <LegalDocumentSection document={doc} />
                {activeId === "cookie" && (
                  <CookiePageActions onManageCookies={() => setIsModalOpen(true)} onAcceptAll={handleAcceptAll} />
                )}
              </div>
            ))}
        </div>
      </div>
      <CookiePreferenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        categories={validIds}
        selectedCategory={activeId}
        onSelectCategory={(id: string) => handleTabChange(id as LegalDocumentId)}
        title="Legal Documents"
        categoryLabels={categoryLabels}
        showClearButton={false}
        showCounts={false}
      />
    </ContainerLayout>
  );
}
