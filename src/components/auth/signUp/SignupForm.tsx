"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { AuthSocialButtons } from "../AuthSocialButtons";
import { signupFormContent } from "@/data/auth";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { User, Mail } from "lucide-react";

import { CountrySelect } from "./CountrySelect";
import { PasswordField } from "./PasswordField";
import { ConfirmPasswordField } from "./ConfirmPasswordField";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryName, setCountryName] = useState("");
  const [terms, setTerms] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ fullName, email, password, confirmPassword, country: countryName, terms });
    if (isValid) {
      console.log("Signup Valid!", { fullName, email, password, country: countryName });
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-130 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader content={signupFormContent} />

      <div className="overflow-y-auto no-scrollbar pr-2">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Full Name */}
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Full Name</span>
              <span className="group relative block">
                <User className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`${inputClass} pl-12 pr-6`}
                />
              </span>
              <div className="ml-2 mt-1">
                <FormError message={errors.fullName} />
              </div>
            </label>

            {/* Email Address */}
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                Email Address
              </span>
              <span className="group relative block">
                <Mail className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* Password Component */}
            <PasswordField
              value={password}
              onChange={setPassword}
              error={errors.password}
              clearError={() => {
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              inputClass={inputClass}
            />

            {/* Confirm Password Component */}
            <ConfirmPasswordField
              value={confirmPassword}
              passwordToMatch={password}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              clearError={() => {
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              inputClass={inputClass}
            />
          </div>

          <div className="px-1 py-2">
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="h-4 w-4 shrink-0 rounded border-white/10 bg-white/5 accent-gold"
              />
              <span className="text-[13px] md:text-[15px] lg:text-[14px] 3xl:text-[15px] font-light text-slate-400 transition-colors group-hover:text-slate-200">
                I agree to the
                <Link href="/legal/terms" className="text-gold underline underline-offset-4 ml-1">
                  Terms
                </Link>
                {" and "}
                <Link href="/legal/privacy" className="text-gold underline underline-offset-4">
                  Privacy
                </Link>
                .
              </span>
            </label>
            <div className="ml-2 mt-2">
              <FormError message={errors.terms} />
            </div>
          </div>

          <Button type="submit" variant="auth">
            Register Membership
          </Button>

          <AuthSocialButtons label="Social Sign Up" />

          <div className="mt-8 pb-12 text-center">
            <p className="text-[14px] md:text-[14px] lg:text-[15px] 2xl:text-[16px] 3xl:text-[17px] font-light text-slate-500">
              Already have an account?
              <Link
                href="/login"
                className="ml-1 whitespace-nowrap border-b border-gold/30 font-bold text-gold transition-colors hover:text-white"
              >
                Sign In Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
