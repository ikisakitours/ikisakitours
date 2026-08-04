import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export function usePasswordStrength() {
  const tError = useTranslations("ValidationErrors"); 

  const [metRequirements, setMetRequirements] = useState<string[]>([]);
  const [transientSuccessMsgs, setTransientSuccessMsgs] = useState<string[]>([]);
  const [localError, setLocalError] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const strengthChecks = [
    { id: "length", regex: /.{8,}/, msg: tError("PasswordRules.length") },
    { id: "upper", regex: /[A-Z]/, msg: tError("PasswordRules.upper") },
    { id: "lower", regex: /[a-z]/, msg: tError("PasswordRules.lower") },
    { id: "num", regex: /\d/, msg: tError("PasswordRules.num") },
    { id: "special", regex: /[^A-Za-z0-9]/, msg: tError("PasswordRules.special") },
  ];

  const handlePasswordChange = (val: string, onChangeCb: (val: string) => void, clearErrorCb?: () => void) => {
    onChangeCb(val);
    if (clearErrorCb) clearErrorCb();
    setLocalError("");

    if (val === "") {
      setTransientSuccessMsgs([]);
      setMetRequirements([]);
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
  };

  const handlePasswordBlur = (val: string) => {
    if (val === "") return;
    const unmet = strengthChecks.filter((req) => !req.regex.test(val));
    if (unmet.length > 0) {
      setLocalError(`${tError("missing")}${unmet[0].msg}`);
    } else {
      setLocalError("");
    }
  };

  return {
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    setLocalError
  };
}