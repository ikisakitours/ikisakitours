"use client";
import { Link } from "@/lib/i18nNavigation";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { AuthLegalFooter } from "../AuthLegalFooter";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
//Icons
import { Eye, EyeOff, Mail, ShieldCheck } from "lucide-react";

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
    errors,
    setErrors,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-120 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Login" />
      {/* no-scrollbar */}

      <div className="overflow-y-auto no-scrollbar -mx-5 px-5 pr-2">
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
            <label className="group flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 accent-gold" />
              <span className="text-body-sm text-slate-400 transition-colors group-hover:text-slate-200">
                {tForm("Labels.staySignedIn")}
              </span>
            </label>

            <Link href="/confirm-email" className="text-body-sm text-slate-500 transition-colors hover:text-red-500">
              {tAuth("Links.forgotPassword")}
            </Link>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="md:w-92.5! text-body-sm!" variant="auth">
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
      </div>
      <AuthLegalFooter />
    </section>
  );
}
