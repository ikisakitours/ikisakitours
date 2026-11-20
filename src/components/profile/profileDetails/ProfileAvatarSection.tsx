"use client";

import React, { useState } from "react";
import { UserProfileAvatar } from "@/components/layout/UserProfileAvatar";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
//Icons
import { Camera, Copy, Check } from "lucide-react";

type ProfileAvatarSectionProps = {
  avatarPreview: string | null;
  profilePhoto?: string | null;
  initials: string;
  avatarError?: string;
  memberId?: string | null;
  onOpenSourceModal: () => void;
  onAvatarSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpdate: () => void;
  onRemoveAvatar?: () => void;
  isLoading?: boolean;
  isImageChanged?: boolean;
};

export function ProfileAvatarSection({
  avatarPreview,
  profilePhoto,
  initials,
  avatarError,
  memberId,
  onOpenSourceModal,
  onAvatarSelect,
  onImageUpdate,
  onRemoveAvatar,
  isLoading,
  isImageChanged,
}: ProfileAvatarSectionProps) {
  const t = useTranslations("ProfilePage");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!memberId) return;
    try {
      await navigator.clipboard.writeText(memberId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between gap-6 border-b border-white/5 pb-6 sm:flex-row sm:items-end">
      <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0">
        <button type="button" onClick={onOpenSourceModal} className="group relative h-24 w-24 shrink-0 cursor-pointer">
          <span
            className="relative flex h-full w-full items-center justify-center rounded-full border-2 bg-white/5 p-1 transition-colors"
            style={{ borderColor: avatarError ? "#dc2626" : "#c5a059" }}
          >
            <UserProfileAvatar
              src={avatarPreview || profilePhoto}
              initials={initials}
              className="h-full! w-full! border-none! bg-transparent! p-0!"
              initialsClassName="font-serif text-2xl tracking-widest"
            />
          </span>

          <span className="absolute bottom-0 right-0 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-gold text-black shadow-lg transition-transform group-hover:scale-110">
            <Camera className="h-3.5 w-3.5" />
          </span>
        </button>

        <input
          id="camera-input"
          type="file"
          accept="image/*"
          capture="user"
          onChange={onAvatarSelect}
          className="sr-only"
        />
        <input
          id="gallery-input"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={onAvatarSelect}
          className="sr-only"
        />

        <div className="text-center sm:text-left">
          <h3 className="text-body font-bold text-white">{t("DetailsPanel.profilePicTitle")}</h3>
          <p className="mt-1 text-caption text-slate-400">{t("DetailsPanel.profilePicDesc")}</p>

          {avatarError && <div className="mt-2 text-body-sm font-medium text-red-500">{avatarError}</div>}

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            {avatarPreview && !avatarError && (
              <Button
                type="button"
                variant="details"
                disabled={isLoading || !isImageChanged}
                onClick={onImageUpdate}
                className="[&_span]:text-tiny! disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? t("DetailsPanel.savingPhoto") : t("DetailsPanel.savePhotoBtn")}
              </Button>
            )}

            {(profilePhoto || avatarPreview) && onRemoveAvatar && (
              <button
                type="button"
                disabled={isLoading}
                onClick={onRemoveAvatar}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-tiny font-medium text-red-300 transition-colors hover:bg-red-500/20 hover:border-red-500/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {t("DetailsPanel.removePhotoBtn")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── Member ID Right Bottom Section ─── */}
      {memberId && (
        <div className="flex flex-col items-center sm:items-end gap-1 shrink-0 self-center sm:self-end sm:ml-auto sm:translate-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80 sm:mr-0.5">
            {t("DetailsPanel.memberIdLabel")}
          </span>
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#121212] px-3.5 py-2 transition-all hover:border-gold/30 shadow-md">
            <span className="font-mono text-body-sm font-bold tracking-wider text-white">
              {memberId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-gold hover:text-gold-light transition-colors p-1 cursor-pointer flex items-center gap-1.5 text-tiny font-bold uppercase tracking-wider"
              title={t("DetailsPanel.copyMemberId")}
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{isCopied ? t("DetailsPanel.copied") : t("DetailsPanel.copy")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
