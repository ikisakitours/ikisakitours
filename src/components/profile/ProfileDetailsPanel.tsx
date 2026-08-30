"use client";
import { useEffect } from "react";
import { profileUser } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { ImageCropModal } from "@/components/profile/profileDetails/ImageCropModal";
import { ProfileAvatarSection } from "@/components/profile/profileDetails/ProfileAvatarSection";
import { ImageSourceModal } from "@/components/profile/profileDetails/ImageSourceModal";
import { CountrySelect } from "@/components/auth/signUp/CountrySelect";
import { useTranslations } from "next-intl";
import { useProfileDetailsForm } from "@/hooks/profile/useProfileDetailsForm";
import { useAuth } from "@/context/AuthContext";

//Icons
import { BsPatchCheck } from "react-icons/bs";
import { Crown } from "lucide-react";

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-body-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

export function ProfileDetailsPanel() {
  const t = useTranslations("ProfilePage");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");
  const { user } = useAuth();

  //Hook
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    country,
    setCountry,
    avatarPreview,
    isSourceModalOpen,
    setIsSourceModalOpen,
    rawImage,
    isCropModalOpen,
    setIsCropModalOpen,
    cameraError,
    setCameraError,
    errors,
    isLoading,
    isProfileLoading,
    setErrors,
    handleAvatarSelect,
    handleCropComplete,
    handlePersonalUpdate,
    handleImageUpdate,
  } = useProfileDetailsForm(tError);

  const triggerInput = async (inputId: string) => {
    setCameraError(null);

    const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    if (isMobileDevice || inputId === "gallery-input") {
      setIsSourceModalOpen(false);
      setTimeout(() => {
        document.getElementById(inputId)?.click();
      }, 200);
      return;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setCameraError(tError("CameraErrors.notSupported"));
        return;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some((device) => device.kind === "videoinput");

      if (!hasVideoInput) {
        setCameraError(tError("CameraErrors.noCamera"));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());

      setIsSourceModalOpen(false);
      setTimeout(() => {
        document.getElementById(inputId)?.click();
      }, 200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setCameraError(tError("CameraErrors.denied"));
        } else {
          setCameraError(tError("CameraErrors.general"));
        }
      } else {
        setCameraError(tError("CameraErrors.unexpected"));
      }
    }
  };

  useEffect(() => {
    const isAnyModalOpen = isSourceModalOpen || isCropModalOpen;
    if (isAnyModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    window.dispatchEvent(new CustomEvent("globalModalStateChange", { detail: { isOpen: isAnyModalOpen } }));

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.dispatchEvent(new CustomEvent("globalModalStateChange", { detail: { isOpen: false } }));
    };
  }, [isSourceModalOpen, isCropModalOpen]);

  return (
    <>
      <section className="animate-fade-in-up space-y-8">
        <div className="glass-card backdrop-blur-none! relative overflow-hidden rounded-3xl p-6 md:p-12">
          <div className="relative z-10">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="premium-serif mb-6 text-heading-sub text-white">{t("DetailsPanel.title")}</h2>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
                <StatusBadge tone="green" icon={<BsPatchCheck className="h-4 w-4" />}>
                  {t("Badge.verified")}
                </StatusBadge>
                <StatusBadge tone="gold" icon={<Crown className="h-4 w-4" strokeWidth={2} />}>
                  {t("Badge.vipMember")}
                </StatusBadge>
              </div>
            </div>

            <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-start sm:p-6 lg:mx-0">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-gold to-gold-dark shadow-[0_10px_30px_rgba(197,160,89,0.3)] sm:h-20 sm:w-20">
                <span className="text-heading-sub font-black leading-none text-black">
                  {profileUser.toursCompleted}
                </span>
                <span className="text-caption font-bold uppercase tracking-tight text-black/80">
                  {t("DetailsPanel.toursText")}
                </span>
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <h3 className="mb-1.5 text-body-sm font-bold uppercase tracking-widest text-gold">
                  {t("Milestone.title")}
                </h3>
                <p className="text-body-sm italic text-pretty leading-relaxed text-slate-300 opacity-90">
                  &quot;{t("Milestone.quote")}&quot;
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <ProfileAvatarSection
                avatarPreview={avatarPreview}
                profilePhoto={user?.photo || ""}
                initials={user ? `${user.firstname.charAt(0)}${user.lastname.charAt(0)}` : ""}
                avatarError={errors.avatar}
                isLoading={isProfileLoading}
                onOpenSourceModal={() => {
                  setCameraError(null);
                  setIsSourceModalOpen(true);
                }}
                onAvatarSelect={handleAvatarSelect}
                onImageUpdate={handleImageUpdate}
              />

              <form className="space-y-8" onSubmit={handlePersonalUpdate} noValidate>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 cursor-default">
                  {/* First Name Field */}
                  <label className="space-y-2">
                    <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                      {tForm("Labels.firstName")}
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      disabled={isLoading}
                      autoComplete="given-name"
                      placeholder={tForm("Placeholders.firstName")}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setErrors((prev) => ({ ...prev, firstName: "" }));
                      }}
                      className={inputClass}
                    />
                    <div className="ml-2">
                      <FormError message={errors.firstName} />
                    </div>
                  </label>

                  {/* Last Name Field */}
                  <label className="space-y-2">
                    <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                      {tForm("Labels.lastName")}
                    </span>
                    <input
                      type="text"
                      value={lastName}
                      disabled={isLoading}
                      autoComplete="family-name"
                      placeholder={tForm("Placeholders.lastName")}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setErrors((prev) => ({ ...prev, lastName: "" }));
                      }}
                      className={inputClass}
                    />
                    <div className="ml-2">
                      <FormError message={errors.lastName} />
                    </div>
                  </label>

                  {/* Email Field (Half-width, no full width issue) */}
                  <label className="space-y-2">
                    <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                      {tForm("Labels.email")}
                    </span>
                    <input
                      type="email"
                      value={email}
                      disabled={isLoading}
                      autoComplete="email"
                      placeholder={tForm("Placeholders.email")}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={inputClass}
                    />
                    <div className="ml-2">
                      <FormError message={errors.email} />
                    </div>
                  </label>

                  {/* Country Field */}
                  <div className="space-y-2">
                    <CountrySelect
                      countryName={country}
                      setCountryName={(val) => {
                        setCountry(val);
                        setErrors((prev) => ({ ...prev, country: "" }));
                      }}
                      enableIpDetection={false}
                      dropdownPosition="top"
                      error={errors.country}
                      disabled={isLoading}
                      clearError={() => setErrors((prev) => ({ ...prev, country: "" }))}
                      inputClass={inputClass}
                      showIcon={false}
                      customLabel={
                        <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                          {tForm("Labels.country")}
                        </span>
                      }
                    />
                    {errors.country && (
                      <div className="ml-2">
                        <FormError message={errors.country} />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4 pt-4 sm:col-span-2">
                    <div className="flex w-full sm:justify-end">
                      <Button
                        type="submit"
                        variant="explore"
                        disabled={isLoading}
                        className="[&_span]:text-caption! w-full justify-center sm:w-max"
                      >
                        {isLoading ? tForm("ButtonsLoading.saving") : tForm("Buttons.saveChanges")}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ImageSourceModal
        isOpen={isSourceModalOpen}
        cameraError={cameraError}
        onClose={() => setIsSourceModalOpen(false)}
        onTriggerInput={triggerInput}
      />

      {rawImage && (
        <ImageCropModal
          isOpen={isCropModalOpen}
          imageSrc={rawImage}
          onClose={() => setIsCropModalOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
}

type StatusBadgeProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  tone: "green" | "gold";
};

function StatusBadge({ children, icon, tone }: StatusBadgeProps) {
  const toneClass =
    tone === "green"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      : "border-gold/20 bg-gold/10 text-gold";

  return (
    <span
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-caption font-black uppercase tracking-widest sm:px-4 sm:text-[11px] ${toneClass}`}
    >
      {icon}
      {children}
    </span>
  );
}
