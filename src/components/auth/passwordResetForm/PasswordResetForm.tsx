"use client";

import Link from "next/link";
import { type FormEvent, type KeyboardEvent, useRef, useState } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { passwordResetFormContent } from "@/data/auth";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
//Icons
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";

const otpLength = 6;

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function PasswordResetForm() {
  const [otp, setOtp] = useState(() => Array.from({ length: otpLength }, () => ""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { errors, validate } = useValidationForm();

  const handleOtpChange = (index: number, value: string) => {
    const nextDigit = value.replace(/\D/g, "").slice(-1);

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp];
      nextOtp[index] = nextDigit;
      return nextOtp;
    });

    if (nextDigit && index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate({ otp, password, confirmPassword })) {
      console.log("Password Reset Valid!", { otp, password });
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-125 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader content={passwordResetFormContent} />

      <div className="overflow-y-auto no-scrollbar pr-2">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-3">
            <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Verification Code
            </label>
            <div className="flex justify-between gap-1 sm:gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    otpRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleOtpChange(index, event.target.value)}
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  className="h-12 w-full max-w-14 rounded-xl border border-white/10 bg-white/3 text-center text-lg font-extrabold text-gold outline-none transition-all focus:border-gold focus:bg-gold/5 sm:h-14 sm:text-xl"
                />
              ))}
            </div>
            <div className="ml-1">
              <FormError message={errors.otp} />
            </div>
            <p className="text-right text-[11px] md:text-xs lg:text-sm 2xl:text-base text-slate-300">
              Check your email for the OTP
            </p>
          </div>

          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                Secure Password
              </span>
              <span className="group relative block">
                <Lock className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pl-12 pr-12`}
                />
                <button
                  type="button"
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

            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                Confirm Password
              </span>
              <span className="group relative block">
                <ShieldCheck className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClass} pl-12 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </span>
              <div className="ml-2 mt-1">
                <FormError message={errors.confirmPassword} />
              </div>
            </label>
          </div>

          <Button type="submit" variant="auth">
            Update Password
          </Button>

          <div className="mt-8 pb-6 text-center">
            <p className="text-[14px] md:text-[14px] lg:text-[15px] 2xl:text-[16px] 3xl:text-[17px] font-light text-slate-500">
              Wait, I remember it!
              <Link
                href="/login"
                className="ml-1 border-b border-gold/30 font-bold text-gold transition-colors hover:text-white"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
