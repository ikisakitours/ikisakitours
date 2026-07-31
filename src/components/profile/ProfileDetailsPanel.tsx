"use client";
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react";
import { profileUser } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { ImageCropModal } from "@/components/profile/profileDetails/ImageCropModal";
import { ProfileAvatarSection } from "@/components/profile/profileDetails/ProfileAvatarSection";
import { ImageSourceModal } from "@/components/profile/profileDetails/ImageSourceModal";
//Icons
import { CheckCircle2, Crown } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

export function ProfileDetailsPanel() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  const [rawImage, setRawImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const [cameraError, setCameraError] = useState<string | null>(null);

  const [name, setName] = useState(profileUser.name);
  const [email, setEmail] = useState(profileUser.email);
  const { errors, validate, setErrors } = useValidationForm();

  const handleAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ avatar: "Image must be less than 5MB" });
      return;
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.avatar;
        return copy;
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setRawImage(reader.result);
        setIsCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleCropComplete = async (croppedImageUrl: string) => {
    setAvatarPreview(croppedImageUrl);
    setIsCropModalOpen(false);
  };

  const handlePersonalUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (validate({ fullName: name, email: email })) {
      console.log("Details saved successfully:", { name, email });
    }
  };

  const handleImageUpdate = () => {
    if (!avatarPreview) return;
    console.log("Uploading cropped avatar:", avatarPreview);
  };

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
        setCameraError("Camera is not supported by your browser");
        return;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some((device) => device.kind === "videoinput");

      if (!hasVideoInput) {
        setCameraError("No camera detected on this device");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());

      setIsSourceModalOpen(false);
      setTimeout(() => {
        document.getElementById(inputId)?.click();
      }, 200);
    } catch (err: unknown) {
      // TypeScript error solved by narrowing down the unknown error type securely
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setCameraError("Camera permission denied. Please allow camera access in your browser settings.");
        } else {
          setCameraError("Unable to access the camera. Please check your device settings.");
        }
      } else {
        setCameraError("An unexpected error occurred while accessing the camera.");
      }
    }
  };

  // Scroll Lock & Widget Hide
  useEffect(() => {
    const isAnyModalOpen = isSourceModalOpen || isCropModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.dispatchEvent(new CustomEvent("globalModalStateChange", { detail: { isOpen: isAnyModalOpen } }));

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("globalModalStateChange", { detail: { isOpen: false } }));
    };
  }, [isSourceModalOpen, isCropModalOpen]);

  return (
    <>
      <section className="animate-fade-in-up space-y-8">
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-12">
          <div className="relative z-10">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="premium-serif mb-6 text-2xl text-white">Personal Details</h2>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
                <StatusBadge tone="green" icon={<CheckCircle2 className="h-3 w-3" />}>
                  {profileUser.status}
                </StatusBadge>
                <StatusBadge tone="gold" icon={<Crown className="h-3 w-3" />}>
                  {profileUser.membership}
                </StatusBadge>
              </div>
            </div>

            <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-start sm:p-6 lg:mx-0">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-gold to-gold-dark shadow-[0_10px_30px_rgba(197,160,89,0.3)] sm:h-20 sm:w-20">
                <span className="text-2xl font-black leading-none text-black">{profileUser.toursCompleted}</span>
                <span className="text-[9px] font-bold uppercase tracking-tight text-black/80">Tours</span>
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <h3 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-gold sm:text-sm">
                  {profileUser.milestoneTitle}
                </h3>
                <p className="text-xs italic leading-relaxed text-slate-300 opacity-90 sm:text-sm">
                  &quot;{profileUser.milestoneQuote}&quot;
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Profile Avatar Section Component */}
              <ProfileAvatarSection
                avatarPreview={avatarPreview}
                profilePhoto={profileUser.photo}
                initials={profileUser.initials}
                avatarError={errors.avatar}
                onOpenSourceModal={() => {
                  setCameraError(null);
                  setIsSourceModalOpen(true);
                }}
                onAvatarSelect={handleAvatarSelect}
                onImageUpdate={handleImageUpdate}
              />

              <form className="space-y-8" onSubmit={handlePersonalUpdate} noValidate>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Full Name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({ ...prev, fullName: "" }));
                      }}
                      className={inputClass}
                    />
                    <div className="ml-2">
                      <FormError message={errors.fullName} />
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                      Email Address
                    </span>
                    <input
                      type="email"
                      value={email}
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

                  <div className="space-y-4 pt-4 sm:col-span-2">
                    <div className="flex w-full sm:justify-end">
                      <Button type="submit" variant="explore" className="w-full justify-center sm:w-max">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Image Source Modal Component */}
      <ImageSourceModal
        isOpen={isSourceModalOpen}
        cameraError={cameraError}
        onClose={() => setIsSourceModalOpen(false)}
        onTriggerInput={triggerInput}
      />

      {/* Crop Modal Component */}
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
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest sm:px-4 sm:text-[11px] ${toneClass}`}
    >
      {icon}
      {children}
    </span>
  );
}
