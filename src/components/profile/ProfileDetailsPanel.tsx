"use client";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { profileUser } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
//Icons
import { Camera, CheckCircle2, Crown } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

export function ProfileDetailsPanel() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState(profileUser.name);
  const [email, setEmail] = useState(profileUser.email);
  const { errors, validate, setErrors } = useValidationForm();

  const handleAvatarPreview = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatarPreview(null);
      setSelectedFile(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors({ avatar: "Image must be less than 2MB" });
      return;
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.avatar;
        return copy;
      });
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePersonalUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (validate({ fullName: name, email: email })) {
      console.log("Details saved successfully:", { name, email });
    }
  };

  const handleImageUpdate = () => {
    if (!selectedFile) return;
    console.log("Uploading avatar separately:", selectedFile);
  };

  return (
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
            <div className="flex flex-col items-center space-y-6 border-b border-white/5 pb-8 sm:flex-row sm:space-x-8 sm:space-y-0">
              <label className="group relative h-24 w-24 shrink-0 cursor-pointer">
                <span
                  className="relative flex h-full w-full items-center justify-center rounded-full border-2 bg-white/5 p-1 transition-colors"
                  style={{
                    borderColor: errors.avatar ? "#dc2626" : "#c5a059",
                  }}
                >
                  <span
                    className="flex h-full w-full items-center justify-center rounded-full bg-cover bg-center text-2xl font-black uppercase tracking-widest text-gold"
                    style={avatarPreview ? { backgroundImage: `url(${avatarPreview})` } : undefined}
                  >
                    {avatarPreview ? null : profileUser.initials}
                  </span>
                </span>

                <span className="absolute bottom-0 right-0 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-gold text-black shadow-lg transition-transform group-hover:scale-110">
                  <Camera className="h-3.5 w-3.5" />
                </span>
                <input type="file" accept="image/*" onChange={handleAvatarPreview} className="sr-only" />
              </label>

              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-white">Profile Picture</h3>
                <p className="mt-1 text-xs text-slate-400">PNG, JPG or GIF. Max 2MB.</p>
                {errors.avatar && (
                  <div className="mt-2 text-[13px] sm:text-[13px] md:text-[13px] font-medium text-red-500">
                    {errors.avatar}
                  </div>
                )}
                {selectedFile && !errors.avatar && (
                  <Button
                    type="submit"
                    variant="details"
                    onClick={handleImageUpdate}
                    className="mt-3 mx-auto sm:mx-0 block"
                  >
                    Save Photo
                  </Button>
                )}
              </div>
            </div>

            <form className="space-y-8" onSubmit={handlePersonalUpdate} noValidate>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Full Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, fullName: "" })); // Clear error
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
                      setErrors((prev) => ({ ...prev, email: "" })); // Clear error
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
