"use client";

import React from "react";
import { UserProfileAvatar } from "@/components/layout/UserProfileAvatar";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
//Icons
import { Camera } from "lucide-react";

type ProfileAvatarSectionProps = {
  avatarPreview: string | null;
 profilePhoto?: string | null;
  initials: string;
  avatarError?: string;
  onOpenSourceModal: () => void;
  onAvatarSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpdate: () => void;
  isLoading?: boolean;
};

export function ProfileAvatarSection({
  avatarPreview,
  profilePhoto,
  initials,
  avatarError,
  onOpenSourceModal,
  onAvatarSelect,
  onImageUpdate,
  isLoading,
}: ProfileAvatarSectionProps) {
  const t = useTranslations("ProfilePage");

  return (
    <div className="flex flex-col items-center space-y-6 border-b border-white/5 pb-8 sm:flex-row sm:space-x-8 sm:space-y-0">
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

        {avatarPreview && !avatarError && (
          <Button
            type="button"
            variant="details"
            disabled={isLoading}
            onClick={onImageUpdate}
            className="mt-3 mx-auto sm:mx-0 block [&_span]:text-tiny!"
          >
            {isLoading ? "Saving..." : t("DetailsPanel.savePhotoBtn")}{" "}
          </Button>
        )}
      </div>
    </div>
  );
}
