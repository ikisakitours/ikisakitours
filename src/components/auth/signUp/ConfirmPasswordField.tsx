"use client";

import { useState, useRef } from "react";
import { CheckCircle2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { FormError } from "@/components/ui/FormError";

interface ConfirmPasswordFieldProps {
  value: string;
  passwordToMatch: string;
  onChange: (val: string) => void;
  error?: string;
  clearError?: () => void;
  inputClass: string;
}

export function ConfirmPasswordField({ value, passwordToMatch, onChange, error, clearError, inputClass }: ConfirmPasswordFieldProps) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<string[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleConfirmChange = (val: string) => {
    onChange(val);

    if (val === "") {
      setLocalConfirmError("");
      setTransientConfirmSuccess([]);
      if (clearError) clearError();
      return;
    }

    if (val === passwordToMatch) {
      setTransientConfirmSuccess(["Passwords match"]);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setTransientConfirmSuccess([]), 2000);
      setLocalConfirmError("");
      if (clearError) clearError();
    } else {
      setTransientConfirmSuccess([]);
    }

    if (localConfirmError || error) {
      if (val === passwordToMatch) setLocalConfirmError("");
      if (clearError) clearError();
    }
  };

  const handleConfirmBlur = () => {
    if (value !== "" && value !== passwordToMatch) {
      setLocalConfirmError("Passwords do not match");
    }
  };

  return (
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
          value={value}
          onChange={(e) => handleConfirmChange(e.target.value)}
          onBlur={handleConfirmBlur}
          className={`${inputClass} pl-12 pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
        >
          {showConfirmPassword ? <EyeOff className="h-5.5 w-5.5 lg:h-5 lg:w-5" /> : <Eye className="h-5.5 w-5.5 lg:h-5 lg:w-5" />}
        </button>
      </span>

      {transientConfirmSuccess.length > 0 && !(localConfirmError || error) && (
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
        <FormError message={localConfirmError || error} />
      </div>
    </label>
  );
}