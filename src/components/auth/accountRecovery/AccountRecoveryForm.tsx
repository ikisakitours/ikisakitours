"use client";

import { type FormEvent, useState, Suspense } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18nNavigation";
import { useTranslations } from "next-intl";
//Icons
import { ArrowLeft, Mail } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

function AccountRecoveryFormInner() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");

  const [email, setEmail] = useState("");
  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromWhere = searchParams?.get("from");
  const backLabel = fromWhere === "profile?tab=security" ? tAuth("Links.backToProfile") : tAuth("Links.backToSignIn");

  const handleBackClick = () => {
    if (fromWhere === "profile") {
      router.push("/profile?tab=security");
    } else {
      router.back();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate({ email })) {
      console.log("Valid Email for recovery:", email);
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-125 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Recovery" />

      <div className="overflow-y-auto pr-2">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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

          <Button type="submit" variant="auth">
            {tForm("Buttons.sendResetLink")}
          </Button>
        </form>

        <div className="mt-10 pb-2 text-center">
          <button
            type="button"
            onClick={handleBackClick}
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-gold"
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
