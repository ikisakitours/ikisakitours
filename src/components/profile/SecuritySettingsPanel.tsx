"use client";
import { Link } from "@/i18nNavigation";
import { type FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
//Icons
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

type PasswordFieldKey = "current" | "new" | "confirm";

export function SecuritySettingsPanel() {
  const t = useTranslations("ProfilePage");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");

  const [visibleFields, setVisibleFields] = useState<Record<PasswordFieldKey, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
  } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<string[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { errors, validate, setErrors } = useValidationForm();

  const togglePassword = (field: PasswordFieldKey) => {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  };

  const handleCurrentPasswordChange = (val: string) => {
    setCurrentPassword(val);
    setErrors((prev) => ({ ...prev, currentPassword: "" }));
  };

  const handleConfirmChange = (val: string) => {
    setConfirmPassword(val);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    setLocalConfirmError("");

    if (val === "") {
      setTransientConfirmSuccess([]);
      return;
    }

    if (val === newPassword) {
      setTransientConfirmSuccess([tError("passwordsMatch")]);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setTransientConfirmSuccess([]), 2000);
    } else {
      setTransientConfirmSuccess([]);
    }
  };

  const handleConfirmBlur = () => {
    if (confirmPassword !== "" && confirmPassword !== newPassword) {
      setLocalConfirmError(tError("passwordsDoNotMatch"));
    }
  };

  const handleSecurityUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (
      validate({
        currentPassword: currentPassword,
        password: newPassword,
        confirmPassword: confirmPassword,
      })
    ) {
      console.log("Validation passed!");
    }
  };

  return (
    <section className="animate-fade-in-up space-y-8">
      <div className="glass-card rounded-3xl p-6 md:p-12">
        <h2 className="premium-serif mb-6 text-2xl text-white">{t("SecurityPanel.title")}</h2>

        <form className="space-y-6" onSubmit={handleSecurityUpdate} noValidate>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PasswordField
              label={tForm("Labels.currentPassword")}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              isVisible={visibleFields.current}
              onToggle={() => togglePassword("current")}
              error={errors.currentPassword}
            />

            <PasswordField
              label={tForm("Labels.newPassword")}
              value={newPassword}
              onChange={(val) =>
                handlePasswordChange(val, setNewPassword, () =>
                  setErrors((prev) => ({ ...prev, password: "" }))
                )
              }
              onBlur={() => handlePasswordBlur(newPassword)}
              isVisible={visibleFields.new}
              onToggle={() => togglePassword("new")}
              error={localError || errors.password}
              successMsg={transientSuccessMsgs}
            />

            <PasswordField
              label={tForm("Labels.confirmPassword")}
              value={confirmPassword}
              onChange={handleConfirmChange}
              onBlur={handleConfirmBlur}
              isVisible={visibleFields.confirm}
              onToggle={() => togglePassword("confirm")}
              error={localConfirmError || errors.confirmPassword}
              successMsg={transientConfirmSuccess}
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-6 pt-6 sm:flex-row">
            <Link
              href="/confirm-email?from=profile?tab=security"
              className="order-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 transition-all duration-300 hover:text-white hover:underline sm:order-1 sm:text-[11px]"
            >
              {t("SecurityPanel.forgotPassword")}
            </Link>

            <Button type="submit" variant="explore" className="order-1 w-full justify-center sm:order-2 sm:w-max">
              {tForm("Buttons.updateSecurity")}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  isVisible: boolean;
  onToggle: () => void;
  error?: string;
  successMsg?: string[];
};

function PasswordField({ label, value, onChange, onBlur, isVisible, onToggle, error, successMsg }: PasswordFieldProps) {
  const tForm = useTranslations("SharedForm");

  return (
    <label className="space-y-2 block">
      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{label}</span>
      <span className="relative block">
        <input
          type={isVisible ? "text" : "password"}
          placeholder={tForm("Placeholders.password")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
        <button
          type="button"
          aria-label={isVisible ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </span>

      {successMsg && successMsg.length > 0 && !error && (
        <div className="ml-2 mt-1 flex flex-col space-y-1 animate-fade-in">
          {successMsg.map((msg, idx) => (
            <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>{msg}</span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="ml-2 mt-1">
          <FormError message={error} />
        </div>
      )}
    </label>
  );
}