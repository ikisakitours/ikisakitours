"use client";
import { useToast } from "@/context/ToastContext";
import { useTranslations } from "next-intl";
import { Share2 } from "lucide-react";
interface NavigatorWithUAData extends Navigator {
  userAgentData?: {
    mobile: boolean;
  };
}

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
  iconClassName?: string;
  iconSize?: number;
}

const isMobileDevice = (): boolean => {
  if (typeof navigator === "undefined") return false;

  // Modern Chromium browsers
  const uaData = (navigator as NavigatorWithUAData).userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") {
    return uaData.mobile;
  }

  // Fallback: user agent check
  const mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  // iPadOS (Mac wage report karanawa, eth touch thiyenawa)
  const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return mobileUA || isIPadOS;
};

export function ShareButton({ title, text, url, className, iconClassName, iconSize }: ShareButtonProps) {
  const toast = useToast();
  const tToast = useTranslations("SharedForm.ShareButtonToastMessages");

  const copyLinkWithToast = async (absoluteUrl: string) => {
    const toastId = toast.loading(tToast("copyingLink"));

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(absoluteUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = absoluteUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (!ok) throw new Error("execCommand copy failed");
      }

      setTimeout(() => toast.success(toastId, tToast("linkCopied")), 600);
    } catch (err) {
      console.error("Copy failed:", err);
      setTimeout(() => toast.error(toastId, tToast("copyFailed")), 600);
    }
  };

  const handleShare = async () => {
    const absoluteUrl = `${window.location.origin}${url}`;
    const shareData = { title, text, url: absoluteUrl };

    // Native share use karanne MOBILE walata witharai
    const canNativeShare =
      isMobileDevice() &&
      typeof navigator.share === "function" &&
      (typeof navigator.canShare !== "function" || navigator.canShare(shareData));

    if (canNativeShare) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return; // user cancel kala
        }
        console.log("Native share failed, falling back to copy.", error);
      }
    }

    // Desktop (Chrome, Edge, Firefox, Safari) + fallback: copy + toast
    await copyLinkWithToast(absoluteUrl);
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
