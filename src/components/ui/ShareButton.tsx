"use client";
import { useToast } from "@/context/ToastContext";
import { useTranslations } from "next-intl";
//Icons
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
  iconClassName?: string;
  iconSize?: number;
}

export function ShareButton({ title, text, url, className, iconClassName, iconSize }: ShareButtonProps) {
  const toast = useToast();
  const tToast = useTranslations("SharedForm.ShareButtonToastMessages");
  const handleShare = async () => {
    const absoluteUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: absoluteUrl });
        return;
      } catch (error) {
        console.log("Native share cancelled or failed, falling back to copy.", error);
      }
    }

    // 2. Clipboard API (Copy to Clipboard)
    const toastId = toast.loading(tToast("copyingLink"));

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(absoluteUrl);

        setTimeout(() => {
          toast.success(toastId, tToast("linkCopied"));
        }, 600);
      } catch (err) {
        console.error("Failed to copy:", err);
        setTimeout(() => {
          toast.error(toastId, tToast("copyFailed"));
        }, 600);
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
        setTimeout(() => {
          toast.success(toastId, tToast("linkCopied"));
        }, 600);
      } catch (err) {
        console.error("Fallback copy failed", err);
        setTimeout(() => {
          toast.error(toastId, tToast("copyFailed"));
        }, 600);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title}`}
      className={`text-slate-500 transition-colors group-hover:text-gold ${className || ""}`}
    >
      <Share2 size={iconSize || 18} className={iconClassName || ""} />
    </button>
  );
}
