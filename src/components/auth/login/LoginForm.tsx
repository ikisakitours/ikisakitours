"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { AuthSocialButtons } from "../AuthSocialButtons";
import { loginFormContent } from "@/data/auth";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
//Icons
import { Eye, EyeOff, Mail, ShieldCheck } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, validate } = useValidationForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ email, password });
    if (isValid) {
      console.log("Form is valid!", { email, password });
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-120 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader content={loginFormContent} />

      <div className="overflow-y-auto no-scrollbar pr-2">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <label className="block space-y-2">
            <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Email Address</span>
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

          <label className="block space-y-2">
            <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Secure Password
            </span>
            <span className="group relative block">
              <ShieldCheck className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pl-12 pr-12`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </span>
            <div className="ml-2 mt-1">
              <FormError message={errors.password} />
            </div>
          </label>

          <div className="flex items-center justify-between gap-4">
            <label className="group flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-5 w-5 rounded border-white/10 bg-white/5 accent-gold" />

              <span className="text-[13px] md:text-[15px] lg:text-[14px] 3xl:text-[15px] text-slate-400 transition-colors group-hover:text-slate-200">
                Stay signed in
              </span>
            </label>

            <Link
              href="/confirm-email"
              className="text-[13px] md:text-[15px] lg:text-[14px] 3xl:text-[15px] text-slate-500 transition-colors hover:text-gold"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="auth">
            Enter Gateway
          </Button>

          <AuthSocialButtons label="or continue with" />
        </form>

        <div className="mt-4 pb-6 text-center">
          <p className="text-[14px] md:text-[14px] lg:text-[15px] 2xl:text-[16px] 3xl:text-[17px] font-light text-slate-500">
            First time visiting?
            <Link
              href="/signup"
              className="ml-1 border-b border-gold/30 pb-0.5 font-bold text-gold transition-colors hover:text-white"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
