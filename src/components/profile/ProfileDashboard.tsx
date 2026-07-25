"use client";
import { Suspense } from "react";
import { ProfileDetailsPanel } from "./ProfileDetailsPanel";
import { SecuritySettingsPanel } from "./SecuritySettingsPanel";
import { profileTabs, type ProfileTabId } from "@/data/profile";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { useSearchParams, useRouter } from "next/navigation";
//Icons
import { ShieldCheck, UserRound, type LucideIcon } from "lucide-react";

const tabIcons = {
  profile: UserRound,
  security: ShieldCheck,
} satisfies Record<ProfileTabId, LucideIcon>;

function ProfileDashboardInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams?.get("tab");
  const activeTab: ProfileTabId = tabParam === "security" ? "security" : "profile";

  const handleTabChange = (id: ProfileTabId) => {
    router.push(`/profile?tab=${id}`, { scroll: false });
  };

  return (
    <ContainerLayout className="grid grid-cols-1 gap-12 pt-32 pb-20 md:pt-40 md:pb-32 lg:grid-cols-12">
      <aside className="w-full space-y-6 lg:col-span-4">
        <h1 className="premium-serif mb-6 whitespace-nowrap text-center text-2xl text-white sm:mb-8 sm:text-3xl lg:text-left lg:text-4xl">
          Account <span className="text-gold">Settings</span>
        </h1>

        <nav className="mx-auto flex w-full flex-nowrap justify-center gap-1.5 sm:gap-3 lg:mx-0 lg:max-w-full lg:flex-col lg:space-y-2.5 lg:gap-0">
          {profileTabs.map((tab) => {
            const Icon = tabIcons[tab.id];
            const isActive = tab.id === activeTab;

            const shortLabel = tab.id === "profile" ? "Profile" : "Security";

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

                  <span className="inline max-[380px]:hidden">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
      <div className="lg:col-span-8">
        {activeTab === "profile" ? <ProfileDetailsPanel /> : <SecuritySettingsPanel />}
      </div>
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
