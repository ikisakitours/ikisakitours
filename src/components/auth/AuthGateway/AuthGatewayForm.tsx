"use client";

import { Link } from "@/lib/i18nNavigation";
import { AuthFormHeader } from "../AuthFormHeader";
import { useTranslations } from "next-intl";
import { AuthLegalFooter } from "../AuthLegalFooter";
import { useAuthGateway } from "@/hooks/auth/useAuthGateway";
import UnderDevelopmentModal from "@/components/ui/UnderDevelopmentModal";
// Icons & Loader
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Mail, Loader2 } from "lucide-react";

export function AuthGatewayForm() {
  const tAuth = useTranslations("Auth");
  const {
    handleSocialLogin,
    loadingProvider,

    //temporary code under development
    isDevModalOpen,
    setIsDevModalOpen,
    devProviderName,
  } = useAuthGateway();
  const isGoogleLoading = loadingProvider === "google";
  const isFacebookLoading = loadingProvider === "facebook";
  const isInstagramLoading = loadingProvider === "instagram";
  const isAnyLoading = loadingProvider !== null;

  return (
    <>
      <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-120 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
        <AuthFormHeader introKey="Gateway" />

        <div className="mt-2 flex flex-col space-y-4">
          {/* Google Login Button */}
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialLogin("google")}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3 text-body font-bold text-white transition-all hover:border-gold/30 hover:bg-gold/5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
            ) : (
              <FcGoogle className="h-5 w-5 transition-transform group-hover:scale-110" />
            )}
            {tAuth("Social.continueGoogle")}
          </button>

          {/* Facebook Login Button */}
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialLogin("facebook")}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3 text-body font-bold text-white transition-all hover:border-[#1877F2]/30 hover:bg-[#1877F2]/10 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isFacebookLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-[#1877F2]" />
            ) : (
              <FaFacebook className="h-5.5 w-5.5 text-[#1877F2] transition-transform group-hover:scale-110" />
            )}
            {tAuth("Social.continueFacebook")}
          </button>

          {/* Instagram Login Button */}
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialLogin("instagram")}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3 text-body font-bold text-white transition-all hover:border-pink-500/30 hover:bg-pink-500/5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isInstagramLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-pink-500" />
            ) : (
              <FaInstagram className="h-5 w-5 text-pink-500 transition-transform group-hover:scale-110" />
            )}
            {tAuth("Social.continueInstagram")}
          </button>

          {/* OR Divider */}
          <div className="relative my-4 text-center">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            <span className="relative bg-[#0a0a0a] px-4 text-body-sm font-bold uppercase tracking-widest text-slate-500">
              {tAuth("Social.orContinueWith")}
            </span>
          </div>

          {/* Email Login/Signup Link */}
          <Link
            href="/login"
            aria-disabled={isAnyLoading}
            className={`group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3 text-body font-bold text-slate-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white ${
              isAnyLoading ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Mail className="h-5 w-5 text-slate-400 transition-colors group-hover:text-white" />
            {tAuth("Social.continueEmail")}
          </Link>
        </div>

        <AuthLegalFooter />
      </section>

      {/* temporary code under development */}
      <UnderDevelopmentModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
        providerName={devProviderName}
      />
    </>
  );
}
