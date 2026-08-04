"use client";

import { Link } from "@/i18nNavigation";
import { type FormEvent, type KeyboardEvent, useRef, useState } from "react";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
//Icons
import { CheckCircle2, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";

const otpLength = 6;

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function PasswordResetForm() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");

  const [otp, setOtp] = useState(() => Array.from({ length: otpLength }, () => ""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { errors, validate, setErrors } = useValidationForm();

  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<string[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- OTP Handling ---
  const handleOtpChange = (index: number, value: string) => {
    const nextDigit = value.replace(/\D/g, "").slice(-1);

    const nextOtp = [...otp];
    nextOtp[index] = nextDigit;
    setOtp(nextOtp);

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    if (nextDigit && index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

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
    if (validate({ otp, password, confirmPassword })) {
      console.log("Password Reset Valid!", { otp, password });
    }
  };

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-125 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Reset" />

      <div className="overflow-y-auto no-scrollbar pr-2">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-3">
            <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {tForm("ResetFormOtp.verificationCode")}
            </label>
            <div className="flex justify-between gap-1.5 md:gap-2">
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
            <p className="text-right text-[11px] md:text-[12px] lg:text-[12px] 2xl:text-[14px] text-slate-300">
              {tForm("ResetFormOtp.checkEmailOtp")}
            </p>
          </div>

          <div className="space-y-4">
            {/* New Password */}
            <label className="block space-y-2">
              <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {tForm("Labels.password")}
              </span>
              <span className="group relative block">
                <Lock className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-gold" />
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

              {/* Confirm Password Success */}
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

          <Button type="submit" variant="auth">
            {tForm("Buttons.updatePassword")}
          </Button>

          <div className="mt-8 pb-6 text-center">
            <p className="text-[14px] md:text-[14px] lg:text-[15px] 2xl:text-[16px] 3xl:text-[17px] font-light text-slate-500">
              {tAuth("Links.rememberIt")}
              <Link
                href="/login"
                className="ml-1 border-b border-gold/30 font-bold text-gold transition-colors hover:text-white"
              >
                {tAuth("Links.backToLogin")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
