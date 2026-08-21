"use client";
import { Link } from "@/lib/i18nNavigation";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { CountrySelect } from "./CountrySelect";
import { useTranslations } from "next-intl";
import { AuthLegalFooter } from "../AuthLegalFooter";
import { TransientMessage } from "@/components/ui/TransientMessage";
import { useSignupForm } from "@/hooks/auth/useSignupForm";
//Icons
import { User, UserCheck, Mail, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-body-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function SignupForm() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");

  //Hook
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    countryName,
    setCountryName,
    terms,
    setTerms,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    transientConfirmSuccess,
    localConfirmError,
    handleConfirmChange,
    handleConfirmBlur,
    isLoading,
    handleSubmit,
  } = useSignupForm(tError);

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-130 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Signup" />

      <div className="overflow-y-auto no-scrollbar -mx-5 px-5 pr-2">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* First Name Field */}
              <label className="block space-y-2">
                <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.firstName")}
                </span>
                <span className="group relative block">
                  <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                    <User className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder={tForm("Placeholders.firstName")}
                    value={firstName}
                    disabled={isLoading}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    className={`${inputClass} pl-12 pr-6`}
                  />
                </span>
                <div className="ml-2">
                  <FormError message={errors.firstName} />
                </div>
              </label>

              {/* Last Name Field */}
              <label className="block space-y-2">
                <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.lastName")}
                </span>
                <span className="group relative block">
                  <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                    <UserCheck className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder={tForm("Placeholders.lastName")}
                    value={lastName}
                    disabled={isLoading}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    className={`${inputClass} pl-12 pr-6`}
                  />
                </span>
                <div className="ml-2">
                  <FormError message={errors.lastName} />
                </div>
              </label>
            </div>

            {/* Email Field */}
            <label className="block space-y-2">
              <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.email")}
              </span>
              <span className="group relative block">
                <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={tForm("Placeholders.email")}
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={`${inputClass} pl-12 pr-6`}
                />
              </span>
              <div className="ml-2">
                <FormError message={errors.email} />
              </div>
            </label>

            {/* country Field */}
            <CountrySelect
              countryName={countryName}
              setCountryName={setCountryName}
              disabled={isLoading}
              error={errors.country}
              clearError={() => {
                if (errors.country) setErrors((prev) => ({ ...prev, country: "" }));
              }}
              inputClass={inputClass}
            />

            {/* Secure Password Field */}
            <label className="block space-y-2">
              <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.password")}
              </span>
              <span className="group relative block">
                <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder={tForm("Placeholders.password")}
                  value={password}
                  disabled={isLoading}
                  onChange={(e) =>
                    handlePasswordChange(e.target.value, setPassword, () =>
                      setErrors((prev) => ({ ...prev, password: "" })),
                    )
                  }
                  onBlur={() => handlePasswordBlur(password)}
                  className={`${inputClass} pl-12 pr-12`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                  onClick={() => setShowPassword((value) => !value)}
                  className="outline-none focus:outline-none absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </span>

              {transientSuccessMsgs.length > 0 && !(localError || errors.password) && (
                <TransientMessage messages={transientSuccessMsgs} />
              )}

              {password === "" && !localError && !errors.password && (
                <p className="ml-2 mt-2 text-tiny text-slate-500 italic">
                  * Must be at least 8 characters long and include uppercase, lowercase, numbers, and special
                  characters.
                </p>
              )}
              <div className="ml-2">
                <FormError message={localError || errors.password} />
              </div>
            </label>

            {/* Confirm Password Field */}
            <label className="block space-y-2">
              <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.confirmPassword")}
              </span>
              <span className="group relative block">
                <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
                  <ShieldCheck className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder={tForm("Placeholders.confirmPassword")}
                  value={confirmPassword}
                  disabled={isLoading}
                  onChange={(e) => handleConfirmChange(e.target.value)}
                  onBlur={handleConfirmBlur}
                  className={`${inputClass} pl-12 pr-12`}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="outline-none focus:outline-none absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
                >
                  {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </span>

              {transientConfirmSuccess.length > 0 && !(localConfirmError || errors.confirmPassword) && (
                <TransientMessage messages={transientConfirmSuccess} />
              )}
              <div className="ml-2">
                <FormError message={localConfirmError || errors.confirmPassword} />
              </div>
            </label>
          </div>

          {/* Check Terms Field */}
          <div className="px-1 py-2">
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={terms}
                disabled={isLoading}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: "" }));
                }}
                className="h-4 w-4 shrink-0 rounded border-white/10 bg-white/5 accent-gold"
              />
              <span className="text-body-sm font-light text-slate-400 transition-colors group-hover:text-slate-200">
                {tForm("Labels.agreeTo")}{" "}
                <Link href="/legal/terms" className="text-gold underline underline-offset-4 ml-1">
                  {tForm("Labels.terms")}
                </Link>
                {` ${tForm("Labels.and")} `}
                <Link href="/legal/privacy" className="text-gold underline underline-offset-4">
                  {tForm("Labels.privacy")}
                </Link>
                .
              </span>
            </label>
            <div className="ml-2 mt-2">
              <FormError message={errors.terms} />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="md:w-102.5! text-body-sm!" variant="auth">
            {isLoading ? tForm("ButtonsLoading.registering") : tForm("Buttons.registerMembership")}
          </Button>

          <div className="mt-8 md:mt-6 text-center mb-5">
            <p className="text-body font-light text-slate-500">
              {tAuth("Links.alreadyHaveAccount")}
              <Link
                href="/login"
                className="ml-1 whitespace-nowrap border-b border-gold/30 font-bold text-gold transition-colors hover:text-white"
              >
                {tAuth("Links.signInHere")}
              </Link>
            </p>
          </div>
        </form>
      </div>
      <AuthLegalFooter />
    </section>
  );
}
