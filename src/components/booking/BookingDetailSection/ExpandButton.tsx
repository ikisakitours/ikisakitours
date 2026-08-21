import React from "react";
//Icons
import { ChevronDown } from "lucide-react";

// --- Reusable Expand/Collapse Button Component ---
type ExpandButtonProps = {
  isExpanded: boolean;
  onClick: () => void;
  expandText?: string;
  collapseText?: string;
  align?: "center" | "left";
  showBorder?: boolean;
  className?: string;
};

export default function ExpandButton({
  isExpanded,
  onClick,
  expandText = "Show More",
  collapseText = "Show Less",
  align = "center",
  showBorder = true,
  className = "",
}: ExpandButtonProps) {
  return (
    <div
      className={`mt-6 flex  ${
        align === "left" ? "justify-start" : "justify-center"
      } ${showBorder ? "border-t border-white/5 pt-4" : ""}`}
    >
      <button
        onClick={onClick}
        className={`group flex cursor-pointer items-center gap-1.5  px-6 py-3 text-caption font-bold uppercase tracking-widest text-gold transition-colors  focus:outline-none [-webkit-tap-highlight-color:transparent] ${className}`}
      >
        {isExpanded ? collapseText : expandText}
        <ChevronDown
          strokeWidth={3}
          className={`h-4.5 w-4.5 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
