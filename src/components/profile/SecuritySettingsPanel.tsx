"use client";

import Link from "next/link";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";
import { passwordRequirements } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

type PasswordFieldKey = "current" | "new" | "confirm";

export function SecuritySettingsPanel() {
  const [visibleFields, setVisibleFields] = useState<Record<PasswordFieldKey, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { errors, validate } = useValidationForm();

  const togglePassword = (field: PasswordFieldKey) => {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
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
        <h2 className="premium-serif mb-6 text-2xl text-white">Security Access</h2>

        <form className="space-y-6" onSubmit={handleSecurityUpdate} noValidate>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PasswordField
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              isVisible={visibleFields.current}
              onToggle={() => togglePassword("current")}
              error={errors.currentPassword}
            />
            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              isVisible={visibleFields.new}
              onToggle={() => togglePassword("new")}
              error={errors.password}
            />
            <PasswordField
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isVisible={visibleFields.confirm}
              onToggle={() => togglePassword("confirm")}
              error={errors.confirmPassword}
            />
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Security Strength</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {passwordRequirements.map((item) => (
                <div key={item} className="flex items-center space-x-3 text-slate-500">
                  <CheckCircle2 className="h-3 w-3" />
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 pt-6 sm:flex-row">
            <Link
              href="/confirm-email"
              className="order-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 transition-all duration-300 hover:text-white hover:underline sm:order-1 sm:text-[11px]"
            >
              Forgot Password?
            </Link>

            <Button type="submit" variant="explore" className="order-1 w-full justify-center sm:order-2 sm:w-max">
              Update Security Settings
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
  isVisible: boolean;
  onToggle: () => void;
  error?: string;
};

function PasswordField({ label, value, onChange, isVisible, onToggle, error }: PasswordFieldProps) {
  return (
    <label className="space-y-2 block">
      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{label}</span>
      <span className="relative block">
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
      {error && (
        <div className="ml-2">
          <FormError message={error} />
        </div>
      )}
    </label>
  );
}
