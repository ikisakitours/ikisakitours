"use client";

import { useState, useRef } from "react";
import { CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import { FormError } from "@/components/ui/FormError";

const strengthChecks = [
  { id: "length", regex: /.{8,}/, msg: "At least 8 characters" },
  { id: "upper", regex: /[A-Z]/, msg: "1 Uppercase letter" },
  { id: "lower", regex: /[a-z]/, msg: "1 Lowercase letter" },
  { id: "num", regex: /\d/, msg: "1 Numeral" },
  { id: "special", regex: /[^A-Za-z0-9]/, msg: "1 Special character" },
];

interface PasswordFieldProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  clearError?: () => void;
  inputClass: string;
}

export function PasswordField({ value, onChange, error, clearError, inputClass }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [metRequirements, setMetRequirements] = useState<string[]>([]);
  const [transientSuccessMsgs, setTransientSuccessMsgs] = useState<string[]>([]);
  const [localNewError, setLocalNewError] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePasswordChange = (val: string) => {
    onChange(val);

    if (val === "") {
      setLocalNewError("");
      setTransientSuccessMsgs([]);
      setMetRequirements([]);
      if (clearError) clearError();
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

    if (localNewError || error) {
      const unmet = strengthChecks.filter((req) => !req.regex.test(val));
      if (unmet.length === 0) setLocalNewError("");
      else setLocalNewError(`Missing: ${unmet[0].msg}`);
      if (clearError) clearError();
    }
  };

  const handlePasswordBlur = () => {
    if (value === "") return;
    const unmet = strengthChecks.filter((req) => !req.regex.test(value));
    if (unmet.length > 0) setLocalNewError(`Missing: ${unmet[0].msg}`);
    else setLocalNewError("");
  };

  return (
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
          value={value}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onBlur={handlePasswordBlur}
          className={`${inputClass} pl-12 pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-gold"
        >
          {showPassword ? <EyeOff className="h-5.5 w-5.5 lg:h-5 lg:w-5" /> : <Eye className="h-5.5 w-5.5 lg:h-5 lg:w-5" />}
        </button>
      </span>

      {transientSuccessMsgs.length > 0 && !(localNewError || error) && (
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
        <FormError message={localNewError || error} />
      </div>
    </label>
  );
}