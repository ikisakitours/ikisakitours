import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

export type TransientMsgType = {
  id: string;
  msg: string;
  isStrong?: boolean;
};

export function usePasswordStrength() {
  const tError = useTranslations("ValidationErrors");

  const [metRequirements, setMetRequirements] = useState<string[]>([]);
  const [transientSuccessMsgs, setTransientSuccessMsgs] = useState<TransientMsgType[]>([]);
  const [localError, setLocalError] = useState("");

  const strengthChecks = [
    { id: "length", regex: /.{8,}/, msg: tError("PasswordRules.length") },
    { id: "upper", regex: /[A-Z]/, msg: tError("PasswordRules.upper") },
    { id: "lower", regex: /[a-z]/, msg: tError("PasswordRules.lower") },
    { id: "num", regex: /\d/, msg: tError("PasswordRules.num") },
    { id: "special", regex: /[^A-Za-z0-9]/, msg: tError("PasswordRules.special") },
  ];

  const removeMsg = useCallback((idToRemove: string) => {
    setTransientSuccessMsgs((prev) => prev.filter((m) => m.id !== idToRemove));
  }, []);

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

    const isNowStrong = currentlyMet.length === strengthChecks.length;
    const wasStrong = metRequirements.length === strengthChecks.length;

    if (newlyMet.length > 0) {
      newlyMet.forEach((id) => {
        const metRule = strengthChecks.find((req) => req.id === id);
        if (metRule) {
          setTransientSuccessMsgs((prev) => [...prev, { id, msg: metRule.msg }]);

          setTimeout(() => removeMsg(id), 4000);
        }
      });
    }

    if (isNowStrong && !wasStrong) {
      const strongId = `strong-secured-${Date.now()}`;
      setTransientSuccessMsgs((prev) => [
        ...prev,
        { id: strongId, msg: tError("PasswordRules.secured"), isStrong: true },
      ]);

      setTimeout(() => removeMsg(strongId), 8000);
    }

    setMetRequirements(currentlyMet);
  };

  const handlePasswordBlur = (val: string) => {
    if (val === "") return;
    const unmet = strengthChecks.filter((req) => !req.regex.test(val));
    if (unmet.length > 0) {
      setLocalError(`${tError("missing")} ${unmet[0].msg}`);
    } else {
      setLocalError("");
    }
  };

  return {
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    setLocalError,
  };
}
