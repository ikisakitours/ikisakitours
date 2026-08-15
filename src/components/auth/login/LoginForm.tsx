"use client";

import { Link } from "@/i18nNavigation";
import { type FormEvent, useState } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { AuthLegalFooter } from "../AuthLegalFooter";
//Icons
import { CheckCircle2, Eye, EyeOff, Mail, ShieldCheck } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function LoginForm() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, validate, setErrors } = useValidationForm();

  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ email, password });
    if (isValid) {
      console.log("Form is valid!", { email, password });
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-120 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Login" />

      <div className="overflow-y-auto no-scrollbar pr-2">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                autoComplete="current-password"
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

          {/* Additional Options */}
          <div className="flex items-center justify-between gap-4">
            <label className="group flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 accent-gold" />
              <span className="text-[11px] md:text-[12px] lg:text-[13px] 3xl:text-[14px] text-slate-400 transition-colors group-hover:text-slate-200">
                {tForm("Labels.staySignedIn")}
              </span>
            </label>

            <Link
              href="/confirm-email"
              className="text-[11px] md:text-[11px] lg:text-[12px] 3xl:text-[14px] text-slate-500 transition-colors hover:text-red-500"
            >
              {tAuth("Links.forgotPassword")}
            </Link>
          </div>

          {/* Submit & Social */}
          <Button type="submit" variant="auth">
            {tForm("Buttons.enterGateway")}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[14px] md:text-[14px] lg:text-[15px] 2xl:text-[16px] 3xl:text-[17px] font-light text-slate-500">
            {tAuth("Links.firstTime")}
            <Link
              href="/signup"
              className="ml-1 border-b border-gold/30 pb-0.5 font-bold text-gold transition-colors hover:text-white"
            >
              {tAuth("Links.createAccount")}
            </Link>
          </p>
        </div>
      </div>
      <AuthLegalFooter />
    </section>
  );
}
