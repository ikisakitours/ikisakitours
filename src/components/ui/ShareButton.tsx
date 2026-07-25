"use client";

import { toast } from "sonner";
//Icon
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
  iconClassName?: string;
}

export function ShareButton({ title, text, url, className, iconClassName }: ShareButtonProps) {
  const handleShare = async () => {
    const absoluteUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

    // 1. Web Share API
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: absoluteUrl });
        return;
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }

    // 2. Clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(absoluteUrl);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
    // 3. Fallback: Clipboard API
    else {
      const textArea = document.createElement("textarea");
      textArea.value = absoluteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title}`}
      className={`text-slate-500 transition-colors hover:text-gold ${className || ""}`}
    >
      <Share2 size={18} className={iconClassName || ""} />
    </button>
  );
}
