// src/components/auth/SocialLogin.tsx
"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import { useTranslations } from "next-intl";
import { useAuthGateway } from "@/hooks/auth/useAuthGateway";
import UnderDevelopmentModal from "@/components/ui/UnderDevelopmentModal";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram, FaTiktok, FaApple, FaLinkedin, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

type SocialProvider = Parameters<ReturnType<typeof useAuthGateway>["handleSocialLogin"]>[0];

type Provider = {
  id: SocialProvider;
  labelKey: string;
  Icon: IconType;
  brand: string; // border / glow / spinner color
  iconColor?: string; // omit for multicolor icons (Google)
  iconFill?: string; // gradient fill (Instagram)
  glitch?: boolean; // TikTok hover effect
};

const PROVIDERS: Provider[] = [
  { id: "google", labelKey: "Social.continueGoogle", Icon: FcGoogle, brand: "#c5a059" },
  { id: "facebook", labelKey: "Social.continueFacebook", Icon: FaFacebook, brand: "#1877F2", iconColor: "#1877F2" },
  {
    id: "instagram",
    labelKey: "Social.continueInstagram",
    Icon: FaInstagram,
    brand: "#D62976",
    iconFill: "url(#ig-gradient)",
  },
  {
    id: "tiktok",
    labelKey: "Social.continueTiktok",
    Icon: FaTiktok,
    brand: "#25F4EE",
    iconColor: "#ffffff",
    glitch: true,
  },
  //   { id: "x", labelKey: "Social.continueX", Icon: FaXTwitter, brand: "#ffffff", iconColor: "#ffffff" },
  //   { id: "apple", labelKey: "Social.continueApple", Icon: FaApple, brand: "#ffffff", iconColor: "#ffffff" },
  //   { id: "linkedin", labelKey: "Social.continueLinkedin", Icon: FaLinkedin, brand: "#0A66C2", iconColor: "#0A66C2" },
  //   {
  //     id: "snapchat",
  //     labelKey: "Social.continueSnapchat",
  //     Icon: FaSnapchatGhost,
  //     brand: "#FFFC00",
  //     iconColor: "#FFFC00",
  //   },
];

export function SocialLogin({ disabled = false }: { disabled?: boolean }) {
  const tAuth = useTranslations("Auth");
  const { handleSocialLogin, loadingProvider, isDevModalOpen, setIsDevModalOpen, devProviderName } = useAuthGateway();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const isBusy = disabled || loadingProvider !== null;

  return (
    <div className="mb-6 mt-2">
      {/* Instagram gradient definition (hidden) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="25%" stopColor="#FA7E1E" />
            <stop offset="50%" stopColor="#D62976" />
            <stop offset="75%" stopColor="#962FBF" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glass chips */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {PROVIDERS.map(({ id, labelKey, Icon, brand, iconColor, iconFill, glitch }, index) => {
          const label = tAuth(labelKey);
          return (
            <button
              key={id}
              type="button"
              disabled={isBusy}
              aria-label={label}
              onClick={() => handleSocialLogin(id)}
              onMouseEnter={() => setActiveLabel(label)}
              onMouseLeave={() => setActiveLabel(null)}
              onFocus={() => setActiveLabel(label)}
              onBlur={() => setActiveLabel(null)}
              style={{ animationDelay: `${index * 45}ms` }}
              className="group animate-fade-in-up relative flex h-12 items-center justify-center rounded-xl border border-white/10 bg-linear-to-b from-white/8 to-white/2 outline-none transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:h-13"
            >
              {/* Brand ring + glow (fades in on hover / focus) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ border: `1px solid ${brand}99`, boxShadow: `0 8px 22px -8px ${brand}99` }}
              />

              {loadingProvider === id ? (
                <Loader2 className="relative h-5 w-5 animate-spin" style={{ color: brand }} />
              ) : (
                <span className="relative block h-5.5 w-5.5 transition-transform duration-300 group-hover:scale-110">
                  {glitch && (
                    <>
                      <Icon
                        aria-hidden
                        className="absolute inset-0 h-full w-full opacity-0 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:opacity-100"
                        style={{ color: "#25F4EE" }}
                      />
                      <Icon
                        aria-hidden
                        className="absolute inset-0 h-full w-full opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                        style={{ color: "#FE2C55" }}
                      />
                    </>
                  )}
                  <Icon className="relative h-full w-full" style={{ color: iconColor, fill: iconFill }} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hover caption (desktop only) */}
      <p
        aria-hidden
        className={`mt-3 hidden h-4 text-center text-tiny font-medium tracking-wide text-gold/90 transition-opacity duration-200 sm:block ${
          activeLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeLabel ?? "\u00A0"}
      </p>

      {/* Divider -> email form */}
      <div className="mt-4 flex items-center gap-4 sm:mt-3">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold/30" />
        <span className="text-caption font-bold uppercase tracking-[0.25em] text-slate-500">
          {tAuth("Social.continueEmail")}
        </span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold/30" />
      </div>

      <UnderDevelopmentModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
        providerName={devProviderName}
      />
    </div>
  );
}
