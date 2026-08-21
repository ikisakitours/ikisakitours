"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { TransientMsgType } from "@/hooks/usePasswordStrength";

interface TransientMessageProps {
  messages: TransientMsgType[];
}

export function TransientMessage({ messages }: TransientMessageProps) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="ml-2 mt-2 flex flex-col space-y-1.5">
      {messages.map((item) => (
        <div
          key={item.id}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-sm w-fit animate-fade-in-up transition-all ${
            item.isStrong ? "bg-gold/15 border border-gold/40" : "bg-emerald-500/10 border border-emerald-500/20"
          }`}
        >
          {item.isStrong ? (
            <ShieldCheck className="h-4 w-4 shrink-0 text-gold drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
          )}
          <span
            className={`tracking-wide ${
              item.isStrong ? "text-tiny font-bold text-gold" : "text-tiny font-medium text-emerald-400"
            }`}
          >
            {item.msg}
          </span>
        </div>
      ))}
    </div>
  );
}
