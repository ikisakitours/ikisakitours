"use client";

import { Suspense } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";

import { useTranslations } from "next-intl";
import { useRecoveryForm } from "@/hooks/auth/useRecoveryForm";
//Icons
import { ArrowLeft, Mail } from "lucide-react";

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-body-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

function AccountRecoveryFormInner() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");

  //Hook
  const { email, setEmail, errors, setErrors, isLoading, backLabel, handleBackClick, handleSubmit } =
    useRecoveryForm(tAuth);

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-125 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Recovery" />

      <div className="overflow-y-auto pr-2 -mx-5 px-5">
        {/* Email Feild */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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

          <Button type="submit" disabled={isLoading} className="md:w-97.5! text-body-sm!" variant="auth">
            {isLoading ? tForm("ButtonsLoading.sending") : tForm("Buttons.sendResetLink")}
          </Button>
        </form>

        <div className="mt-8 md:mt-6 text-center">
          <button
            type="button"
            onClick={handleBackClick}
            className="group inline-flex items-center gap-2 text-body font-medium text-slate-500 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

export function AccountRecoveryForm() {
  return (
    <Suspense fallback={null}>
      <AccountRecoveryFormInner />
    </Suspense>
  );
}
