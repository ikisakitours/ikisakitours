"use client";

import { ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { ProfileDetailsPanel } from "./ProfileDetailsPanel";
import { SecuritySettingsPanel } from "./SecuritySettingsPanel";
import { profileTabs, type ProfileTabId } from "@/data/profile";

import ContainerLayout from "@/components/pageLayouts/ContainerLayout";

const tabIcons = {
  profile: UserRound,
  security: ShieldCheck,
} satisfies Record<ProfileTabId, LucideIcon>;

export function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState<ProfileTabId>("profile");

  return (
    <ContainerLayout className="grid grid-cols-1 gap-12 pt-32 pb-20 md:pt-40 md:pb-32 lg:grid-cols-12">
      <aside className="w-full space-y-6 lg:col-span-4">
        <h1 className="premium-serif mb-6 text-center text-2xl text-white sm:mb-8 sm:text-3xl lg:text-left lg:text-4xl">
          Account <span className="text-gold">Settings</span>
        </h1>

        <nav className="mx-auto flex max-w-xs flex-col space-y-2.5 lg:mx-0 lg:max-w-full">
          {profileTabs.map((tab) => {
            const Icon = tabIcons[tab.id];
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center space-x-4 rounded-xl border px-5 py-3.5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-gold/25 bg-gold/10 text-gold shadow-lg shadow-gold/5"
                    : "border-white/5 text-slate-400 hover:border-gold/30 hover:bg-white/5 hover:text-gold"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs">{tab.label}</span>
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
