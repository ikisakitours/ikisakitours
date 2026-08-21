import React from "react";
//Icons
import { FaCircleCheck } from "react-icons/fa6";

export default function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="group flex items-start gap-3 md:gap-4">
      <FaCircleCheck className="mt-1 h-4 w-4 shrink-0 text-gold" />
      <span className="text-body font-light leading-relaxed text-slate-200 transition-colors group-hover:text-white">
        {children}
      </span>
    </li>
  );
}
