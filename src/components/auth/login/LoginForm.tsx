"use client";
import { Link } from "@/lib/i18nNavigation";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { AuthLegalFooter } from "../AuthLegalFooter";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { SocialLogin } from "../SocialLogin";
//Icons
import { Eye, EyeOff, Mail, ShieldCheck, Smartphone } from "lucide-react";

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-body-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function LoginForm() {
  //  Hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    staySignedIn,
    setStaySignedIn,
    isTwoFactorStep,
    totpCode,
    challengeEmail,
    handleTotpChange,
    handleBackToCredentials,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
    suspendedInfo,
    errorMessage,
    setErrorMessage,
  } = useLoginForm();

  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-120 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 shadow-2xl backdrop-blur-3xl py-8 md:py-12">
      <AuthFormHeader introKey="Login" />
      {/* no-scrollbar */}

      <div className="overflow-y-auto no-scrollbar px-8 md:px-12">
        {/* ─── Account Restricted Banner ─── */}
        {suspendedInfo?.isSuspended && (
          <div className="p-4 mb-6 text-sm text-red-300 bg-red-950/40 border border-red-500/30 rounded-2xl shadow-lg backdrop-blur-md animate-fade-in-up">
            <div className="font-semibold text-base mb-1 text-red-200">
              {tAuth("Suspension.account_suspended_title")}
            </div>
            <p className="text-slate-300 text-body-sm leading-relaxed">{tAuth("Suspension.account_suspended_message")}</p>
            {suspendedInfo.refId && (
              <p className="mt-2 text-xs font-mono font-medium text-gold tracking-wider">
                {tAuth("Suspension.reference_id_label")}: {suspendedInfo.refId}
              </p>
            )}
          </div>
        )}

        {/* ─── Standard / Social Error Banner ─── */}
        {errorMessage && (
          <div className="p-3.5 mb-6 text-sm text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-2xl shadow-lg backdrop-blur-md animate-fade-in-up">
            {errorMessage}
          </div>
        )}

        {isTwoFactorStep ? (
          /* ─── Step 2: Two-Factor Verification ─── */
          <form className="space-y-6 animate-fade-in-up" onSubmit={handleSubmit} noValidate>
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10">
                <Smartphone className="h-7 w-7" />
              </div>
              <h2 className="premium-serif text-heading-sub text-white">
                {tAuth("TwoFactor.title")}
              </h2>
              <p className="text-body-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                {tAuth("TwoFactor.subtitle")}
              </p>
              {challengeEmail && (
                <div className="pt-1">
                  <span className="font-mono text-tiny text-gold/90 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 inline-block">
                    {challengeEmail}
                  </span>
                </div>
              )}
            </div>

            {/* 6-Digit Compact Input */}
            <div className="space-y-2">
              <input
                id="totpCode"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                maxLength={6}
                value={totpCode}
                disabled={isLoading}
                onChange={(e) => handleTotpChange(e.target.value)}
                placeholder={tAuth("TwoFactor.placeholder")}
                className="w-48 sm:w-52 mx-auto block text-center tracking-[0.35em] font-mono font-bold py-3 px-4 rounded-xl bg-white/[0.05] border border-white/20 text-white text-2xl outline-none focus:bg-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading || totpCode.length < 6}
                className="w-full text-body-sm! disabled:opacity-50 disabled:cursor-not-allowed"
                variant="auth"
              >
                {isLoading ? tAuth("TwoFactor.verifyingBtn") : tAuth("TwoFactor.verifyBtn")}
              </Button>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleBackToCredentials}
                className="w-full py-2.5 text-center text-body-sm text-slate-400 hover:text-gold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {tAuth("TwoFactor.backBtn")}
              </button>
            </div>
          </form>
        ) : (
          <>
            <SocialLogin disabled={isLoading} />
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Email Address */}
              <label htmlFor="email" className="block space-y-2">
                <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.email")}
                </span>

                <span className="group relative block">
                  <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                    <Mail className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={tForm("Placeholders.email")}
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "" }));
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className={`${inputClass} pl-12 pr-6`}
                  />
                </span>
                <div className="ml-2">
                  <FormError message={errors.email} />
                </div>
              </label>

              {/* Secure Password */}
              <label htmlFor="password" className="block space-y-2">
                <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.password")}
                </span>
                <span className="group relative block">
                  <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                    <ShieldCheck className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder={tForm("Placeholders.password")}
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className={`${inputClass} pl-12 pr-12`}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                    onClick={() => setShowPassword((value) => !value)}
                    className="outline-none focus:outline-none z-10 absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </span>

                <div className="ml-2">
                  <FormError message={errors.password} />
                </div>
              </label>

              {/* Additional Options */}
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="staySignedIn" className="group flex cursor-pointer items-center gap-2">
                  <input
                    id="staySignedIn"
                    type="checkbox"
                    checked={staySignedIn}
                    onChange={(e) => setStaySignedIn(e.target.checked)}
                    className="h-4 w-4 rounded border-white/10 bg-white/5 accent-gold"
                  />
                  <span className="text-body-sm text-slate-400 transition-colors group-hover:text-slate-200">
                    {tForm("Labels.staySignedIn")}
                  </span>
                </label>

                <Link href="/confirm-email" className="text-body-sm text-slate-500 transition-colors hover:text-red-500">
                  {tAuth("Links.forgotPassword")}
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="md:w-92.5! text-body-sm! disabled:opacity-60 disabled:cursor-not-allowed"
                variant="auth"
              >
                {isLoading ? tForm("ButtonsLoading.authenticating") : tForm("Buttons.enterGateway")}
              </Button>
            </form>

            <div className="mt-8 md:mt-6 text-center mb-5">
              <p className="text-body font-light text-slate-500">
                {tAuth("Links.firstTime")}
                <Link
                  href="/signup"
                  className="ml-1 border-b border-gold/30 pb-0.5 font-bold text-gold transition-colors hover:text-white"
                >
                  {tAuth("Links.createAccount")}
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
      <AuthLegalFooter />
    </section>
  );
}
