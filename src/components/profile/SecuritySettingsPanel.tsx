"use client";
import Link from "next/link";
import { type FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
//Icons
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

type PasswordFieldKey = "current" | "new" | "confirm";

const strengthChecks = [
  { id: "length", regex: /.{8,}/, msg: "At least 8 characters" },
  { id: "upper", regex: /[A-Z]/, msg: "1 Uppercase letter" },
  { id: "lower", regex: /[a-z]/, msg: "1 Lowercase letter" },
  { id: "num", regex: /\d/, msg: "1 Numeral" },
  { id: "special", regex: /[^A-Za-z0-9]/, msg: "1 Special character" },
];

export function SecuritySettingsPanel() {
  const [visibleFields, setVisibleFields] = useState<Record<PasswordFieldKey, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Real-time states
  const [metRequirements, setMetRequirements] = useState<string[]>([]);

  const [transientSuccessMsgs, setTransientSuccessMsgs] = useState<string[]>([]);
  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<string[]>([]);

  const [localNewError, setLocalNewError] = useState("");
  const [localConfirmError, setLocalConfirmError] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { errors, validate, setErrors } = useValidationForm();

  const togglePassword = (field: PasswordFieldKey) => {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  };

  // --- New Password Handling ---
  const handleNewPasswordChange = (val: string) => {
    setNewPassword(val);

    if (val === "") {
      setLocalNewError("");
      setTransientSuccessMsgs([]);
      setMetRequirements([]);
      if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
      return;
    }

    const currentlyMet = strengthChecks.filter((req) => req.regex.test(val)).map((req) => req.id);
    const newlyMet = currentlyMet.filter((id) => !metRequirements.includes(id));

    if (newlyMet.length > 0) {
      const newMessages = newlyMet.map((id) => {
        const metRule = strengthChecks.find((req) => req.id === id);
        return `${metRule?.msg}`;
      });

      setTransientSuccessMsgs(newMessages);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setTransientSuccessMsgs([]), 2000);
    }
    setMetRequirements(currentlyMet);

    if (localNewError || errors.password) {
      const unmet = strengthChecks.filter((req) => !req.regex.test(val));
      if (unmet.length === 0) {
        setLocalNewError("");
      } else {
        setLocalNewError(`Missing: ${unmet[0].msg}`);
      }
      if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleNewPasswordBlur = () => {
    if (newPassword === "") return;

    const unmet = strengthChecks.filter((req) => !req.regex.test(newPassword));
    if (unmet.length > 0) {
      setLocalNewError(`Missing: ${unmet[0].msg}`);
    } else {
      setLocalNewError("");
    }
  };

  // --- Confirm Password Handling ---
  const handleConfirmChange = (val: string) => {
    setConfirmPassword(val);

    if (val === "") {
      setLocalConfirmError("");
      setTransientConfirmSuccess([]);
      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      return;
    }

    if (val === newPassword) {
      setTransientConfirmSuccess(["Passwords match"]);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setTransientConfirmSuccess([]), 2000);
      setLocalConfirmError("");
      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    } else {
      setTransientConfirmSuccess([]);
    }

    if (localConfirmError || errors.confirmPassword) {
      if (val === newPassword) setLocalConfirmError("");
      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmBlur = () => {
    if (confirmPassword !== "" && confirmPassword !== newPassword) {
      setLocalConfirmError("Passwords do not match");
    }
  };

  // --- Submit Handling ---
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
              onChange={(val) => {
                setCurrentPassword(val);
                if (val === "") setErrors((prev) => ({ ...prev, currentPassword: "" }));
              }}
              isVisible={visibleFields.current}
              onToggle={() => togglePassword("current")}
              error={errors.currentPassword}
            />

            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              onBlur={handleNewPasswordBlur}
              isVisible={visibleFields.new}
              onToggle={() => togglePassword("new")}
              error={localNewError || errors.password}
              successMsg={transientSuccessMsgs}
            />

            <PasswordField
              label="Confirm Password"
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
  onBlur?: () => void;
  isVisible: boolean;
  onToggle: () => void;
  error?: string;
  successMsg?: string[];
};

function PasswordField({ label, value, onChange, onBlur, isVisible, onToggle, error, successMsg }: PasswordFieldProps) {
  return (
    <label className="space-y-2 block">
      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{label}</span>
      <span className="relative block">
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </span>

      {/* Transient Success Message(s) (Green) with CheckCircle2 icon */}
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

      {/* Error Message (Red) */}
      {error && (
        <div className="ml-2 mt-1">
          <FormError message={error} />
        </div>
      )}
    </label>
  );
}
