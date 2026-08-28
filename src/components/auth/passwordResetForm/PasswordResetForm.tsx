"use client";
import { Link } from "@/lib/i18nNavigation";
import { AuthFormHeader } from "../AuthFormHeader";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { TransientMessage } from "@/components/ui/TransientMessage";
import { usePasswordResetForm } from "@/hooks/auth/usePasswordResetForm";
//Icons
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 px-5 text-body-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-gold focus:bg-gold/5 focus:shadow-[0_0_15px_rgba(197,160,89,0.05)]";

export function PasswordResetForm() {
  const tAuth = useTranslations("Auth");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");

  const {
    otp,
    password,
    setPassword,
    confirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    otpRefs,
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    transientConfirmSuccess,
    localConfirmError,
    handleOtpChange,
    handleOtpKeyDown,
    handleConfirmChange,
    handleConfirmBlur,
    isLoading,
    handleSubmit,
  } = usePasswordResetForm(tError);

  return (
    <section className="flex max-h-[calc(100dvh-4rem)] w-full max-w-125 flex-col overflow-hidden rounded-[2.5rem] border border-gold/15 bg-[#0a0a0a]/85 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
      <AuthFormHeader introKey="Reset" />

      <div className="overflow-y-auto no-scrollbar -mx-5 px-5 py-2">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* OTP */}
          <div className="space-y-3">
            <label className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
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
                  disabled={isLoading}
                  onChange={(event) => handleOtpChange(index, event.target.value)}
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  className="disabled:opacity-60 disabled:cursor-not-allowed h-12 w-full max-w-14 rounded-xl border border-white/10 bg-white/3 text-center text-lg font-extrabold text-gold outline-none transition-all focus:border-gold focus:bg-gold/5 sm:h-14 sm:text-xl"
                />
              ))}
            </div>
            <div className="ml-1">
              <FormError message={errors.otp} />
            </div>
            <p className="text-right text-caption text-slate-300">{tForm("ResetFormOtp.checkEmailOtp")}</p>
          </div>

          <div className="space-y-4">
            {/* New Password */}
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
                <p className="ml-2 mt-2 text-tiny text-slate-500 italic">{tForm("Placeholders.passwordTip")}</p>
              )}
              <div className="ml-2">
                <FormError message={localError || errors.password} />
              </div>
            </label>

            {/* Confirm Password */}
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

          <Button type="submit" disabled={isLoading} className="md:w-97.5! text-body-sm!" variant="auth">
            {isLoading ? tForm("ButtonsLoading.updating") : tForm("Buttons.updatePassword")}
          </Button>

          <div className="mt-8 md:mt-6 text-center">
            <p className="text-body font-light text-slate-500">
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
