"use client";

import { useState } from "react";
import { useRouter, usePathname } from "@/lib/i18nNavigation";
import { LegalDocumentSection } from "@/components/legal/LegalDocumentSection";
import { LegalHero } from "@/components/legal/LegalHero";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { useTranslations } from "next-intl";
import { CookiePageActions } from "@/components/ui/CookieModel/CookiePageActions";
import { CookiePreferenceModal } from "@/components/ui/CookieModel/CookiePreferenceModal";
import { useCookieConsent } from "@/hooks/cookies/useCookieConsent";
import { useAllLegalDocuments } from "@/hooks/legal/useLegalDocument";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { Filter } from "lucide-react";

export default function LegalBody() {
  const { handleAccept } = useCookieConsent();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LegalPage.Tabs");
  const tApi = useTranslations("Common.Api");

  const { docs: allDocs, isLoading, error, refetch } = useAllLegalDocuments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const currentSlug = pathname.split("/").pop();

  const activeDoc =
    allDocs.find((doc) => doc.id === currentSlug) ||
    allDocs.find((doc) => doc.id === "terms") ||
    allDocs[0] ||
    null;

  const activeId = activeDoc?.id || "";

  const handleTabChange = (id: string) => {
    router.push(`/legal/${id}`, { scroll: false });
  };

  const dynamicCategories = allDocs.map((doc) => doc.id);

const categoryLabels = allDocs.reduce((acc, doc) => {
  acc[doc.id] = doc.title; 
  return acc;
}, {} as Record<string, string>);

  const statusWrapperClass =
    "flex min-h-dvh w-full items-center justify-center bg-lanka-dark px-4 pt-20 sm:pt-24";

  if (isLoading && !activeDoc) {
    return (
      <section className={statusWrapperClass}>
        <ApiCallLoader fullScreen={false} text={tApi("loadingLegal")} />
      </section>
    );
  }

  if (error || !activeDoc) {
    return (
      <section className={statusWrapperClass}>
        <ApiCallError
          fullScreen={false}
          onRetry={refetch}
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
        />
      </section>
    );
  }

  return (
    <ContainerLayout className="pt-28 sm:pt-30 md:pt-34 lg:pt-28 2xl:pt-30 3xl:pt-32 pb-12 sm:pb-16 md:pb-18 lg:pb-20 2xl:pb-22 3xl:pb-24">
      <div className="mx-auto max-w-7xl">
        <LegalHero activeDoc={activeDoc} />

        {/* Tab Buttons / Filter Trigger */}
        <div className="mb-10 flex justify-start">
          <button
            type="button"
            onClick={() => setIsFilterSidebarOpen(true)}
            className="group flex items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-tiny font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
          >
            <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
            <span className="transition-colors duration-300 group-hover:text-black">
               {activeDoc?.title || "Legal Documents"}
            </span>
          </button>
        </div>

        <div className="glass-card space-y-10 rounded-4xl border-gold/15 p-6 shadow-2xl md:space-y-12 md:rounded-[2.5rem] md:p-12">
          <div>
            <LegalDocumentSection document={activeDoc} />
            {activeId === "cookie" && (
              <CookiePageActions
                onManageCookies={() => setIsModalOpen(true)}
                onAcceptAll={handleAccept}
              />
            )}
          </div>
        </div>
      </div>

      <CookiePreferenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        categories={dynamicCategories}
        selectedCategory={activeId}
        onSelectCategory={(id: string) => handleTabChange(id)}
        title="Legal Documents"
        categoryLabels={categoryLabels}
        showClearButton={false}
        showCounts={false}
        showAllCategory={false}
        showBottomBar={false}
        labels={{
          categories: t("categories"),
        }}
      />
    </ContainerLayout>
  );
}