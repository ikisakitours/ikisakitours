"use client";
import { Suspense, useState } from "react";
import { ProfileDetailsPanel } from "./ProfileDetailsPanel";
import { SecuritySettingsPanel } from "./SecuritySettingsPanel";
import { profileTabs, type ProfileTabId } from "@/data/profile";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18nNavigation";
import { useTranslations } from "next-intl";
import { ReferralPanel } from "./ReferralPanel";
import { FilterSidebar } from "@/components/ui/FilterSidebar";

//Icons
import { ShieldCheck, UserRound, Gift, Settings2, type LucideIcon } from "lucide-react";

const tabIcons = {
  profile: UserRound,
  security: ShieldCheck,
  referral: Gift,
} satisfies Record<ProfileTabId, LucideIcon>;

// you false rferel wen not use
const ENABLE_REFERRALS = true;

function ProfileDashboardInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("ProfilePage");

  const tabParam = searchParams?.get("tab");

  const activeTab: ProfileTabId =
    tabParam === "security" ? "security" : ENABLE_REFERRALS && tabParam === "referral" ? "referral" : "profile";

  const handleTabChange = (id: ProfileTabId) => {
    router.push(`/profile?tab=${id}`, { scroll: false });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const tabCategories = ["profile", "security"] as const;
  const tabCategories = ["profile", "security", "referral"] as const;

  const tabLabels = {
    profile: t("Dashboard.tabProfile"),
    security: t("Dashboard.tabSecurity"),
    referral: t("Dashboard.tabReferral"),
  };
  return (
    <ContainerLayout className="grid grid-cols-1 gap-8 xl:gap-12 xl:grid-cols-12 py-26 sm:py-27 md:py-26 lg:py-28 2xl:py-30 3xl:py-32">
      <div className="xl:hidden col-span-full w-full flex items-center justify-between border-b border-white/10 pb-4">
        <h1 className="premium-serif text-2xl text-white">
          {t("Dashboard.titleBase")} <span className="text-gold">{t("Dashboard.titleAccent")}</span>
        </h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:border-gold/50"
        >
          <Settings2 className="h-4 w-4" />
          {t("Dashboard.menuBtn")}
        </button>
      </div>

      <aside className="hidden xl:block w-full space-y-6 lg:col-span-4">
        <h1 className="premium-serif mb-6 whitespace-nowrap text-left text-4xl text-white">
          {t("Dashboard.titleBase")} <span className="text-gold">{t("Dashboard.titleAccent")}</span>
        </h1>
        <nav className="mx-0 flex w-full max-w-full flex-col space-y-2.5">
          {profileTabs.map((tab) => {
            const Icon = tabIcons[tab.id];
            const isActive = tab.id === activeTab;

            const shortLabel =
              tab.id === "profile"
                ? t("Dashboard.shortProfile")
                : tab.id === "security"
                  ? t("Dashboard.shortSecurity")
                  : t("Dashboard.shortReferral");

            const fullLabel =
              tab.id === "profile"
                ? t("Dashboard.tabProfile")
                : tab.id === "security"
                  ? t("Dashboard.tabSecurity")
                  : t("Dashboard.tabReferral");

            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-1 items-center justify-center space-x-1.5 rounded-xl border px-1.5 py-3 text-left transition-all duration-300 sm:justify-start sm:px-4 sm:space-x-3 lg:w-full lg:px-5 lg:py-3.5 ${
                  isActive
                    ? "border-gold/25 bg-gold/10 text-gold shadow-lg shadow-gold/5"
                    : "border-white/5 text-slate-400 hover:border-gold/30 hover:bg-white/5 hover:text-gold"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

                <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs whitespace-nowrap">
                  <span className="hidden max-[380px]:inline">{shortLabel}</span>
                  <span className="inline max-[380px]:hidden">{fullLabel}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="col-span-full xl:col-span-8">
        {activeTab === "profile" && <ProfileDetailsPanel />}
        {activeTab === "security" && <SecuritySettingsPanel />}
        {activeTab === "referral" && <ReferralPanel />}
      </div>

      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={tabCategories}
        selectedCategory={activeTab}
        onSelectCategory={(category) => handleTabChange(category as ProfileTabId)}
        title={t("Dashboard.accountMenuTitle")}
        categoryLabels={tabLabels}
        showClearButton={false}
        showCounts={false}
      />
    </ContainerLayout>
  );
}

export function ProfileDashboard() {
  return (
    <Suspense fallback={null}>
      <ProfileDashboardInner />
    </Suspense>
  );
}
