"use client";

import { Link } from "@/i18nNavigation";
import { type FormEvent, useState, useRef } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { CountrySelect } from "./CountrySelect";
import { useTranslations } from "next-intl";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { AuthLegalFooter } from "../AuthLegalFooter";
// Icons
import { User, UserCheck, Mail, ShieldCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function SignupForm() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryName, setCountryName] = useState("");
  const [terms, setTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();

  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<string[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Confirm Password Handling ---
  const handleConfirmChange = (val: string) => {
    setConfirmPassword(val);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    setLocalConfirmError("");

    if (val === "") {
      setTransientConfirmSuccess([]);
      return;
    }

    if (val === password) {
      setTransientConfirmSuccess([tError("passwordsMatch")]);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setTransientConfirmSuccess([]), 2000);
    } else {
      setTransientConfirmSuccess([]);
    }
  };

  const handleConfirmBlur = () => {
    if (confirmPassword !== "" && confirmPassword !== password) {
      setLocalConfirmError(tError("passwordsDoNotMatch"));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ firstName, lastName, email, password, confirmPassword, country: countryName, terms });
    if (isValid) {
      console.log("Signup Valid!", { firstName, lastName, email, password, country: countryName });
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-130 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Signup" />

      <div className="overflow-y-auto no-scrollbar pr-2">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Name Fields (First Name & Last Name) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* First Name */}
              <label className="block space-y-2">
                <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.firstName")}
                </span>
                <span className="group relative block">
                  <User className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder={tForm("Placeholders.firstName")}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    className={`${inputClass} pl-12 pr-6`}
                  />
                </span>
                <div className="ml-2 mt-1">
                  <FormError message={errors.firstName} />
                </div>
              </label>

              {/* Last Name */}
              <label className="block space-y-2">
                <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.lastName")}
                </span>
                <span className="group relative block">
                  <UserCheck className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder={tForm("Placeholders.lastName")}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    className={`${inputClass} pl-12 pr-6`}
                  />
                </span>
                <div className="ml-2 mt-1">
                  <FormError message={errors.lastName} />
                </div>
              </label>
            </div>

            {/* Email Address */}
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.email")}
              </span>
              <span className="group relative block">
                <Mail className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={tForm("Placeholders.email")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={`${inputClass} pl-12 pr-6`}
                />
              </span>
              <div className="ml-2 mt-1">
                <FormError message={errors.email} />
              </div>
            </label>

            {/* Country Component */}
            <CountrySelect
              countryName={countryName}
              setCountryName={setCountryName}
              error={errors.country}
              clearError={() => {
                if (errors.country) setErrors((prev) => ({ ...prev, country: "" }));
              }}
              inputClass={inputClass}
            />

            {/* Secure Password */}
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.password")}
              </span>
              <span className="group relative block">
                <ShieldCheck className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder={tForm("Placeholders.password")}
                  value={password}
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
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
                >
                  {showPassword ? (
                    <EyeOff className="h-5.5 w-5.5 lg:h-5 lg:w-5" />
                  ) : (
                    <Eye className="h-5.5 w-5.5 lg:h-5 lg:w-5" />
                  )}
                </button>
              </span>

              {/* Transient Success Message(s) */}
              {transientSuccessMsgs.length > 0 && !(localError || errors.password) && (
                <div className="ml-2 mt-1 flex flex-col space-y-1 animate-fade-in">
                  {transientSuccessMsgs.map((msg, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="ml-2 mt-1">
                <FormError message={localError || errors.password} />
              </div>
            </label>

            {/* Confirm Password */}
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.confirmPassword")}
              </span>
              <span className="group relative block">
                <ShieldCheck className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder={tForm("Placeholders.confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmChange(e.target.value)}
                  onBlur={handleConfirmBlur}
                  className={`${inputClass} pl-12 pr-12`}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5.5 w-5.5 lg:h-5 lg:w-5" />
                  ) : (
                    <Eye className="h-5.5 w-5.5 lg:h-5 lg:w-5" />
                  )}
                </button>
              </span>

              {/* Confirm Transient Success */}
              {transientConfirmSuccess.length > 0 && !(localConfirmError || errors.confirmPassword) && (
                <div className="ml-2 mt-1 flex flex-col space-y-1 animate-fade-in">
                  {transientConfirmSuccess.map((msg, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="ml-2 mt-1">
                <FormError message={localConfirmError || errors.confirmPassword} />
              </div>
            </label>
          </div>

          <div className="px-1 py-2">
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: "" }));
                }}
                className="h-4 w-4 shrink-0 rounded border-white/10 bg-white/5 accent-gold"
              />
              <span className="text-[13px] md:text-[15px] lg:text-[14px] 3xl:text-[15px] font-light text-slate-400 transition-colors group-hover:text-slate-200">
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

          <Button type="submit" variant="auth">
            {tForm("Buttons.registerMembership")}
          </Button>

          <div className="mt-8 pb-4 text-center">
            <p className="text-[14px] md:text-[14px] lg:text-[15px] 2xl:text-[16px] 3xl:text-[17px] font-light text-slate-500">
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
