"use client";
import { Link } from "@/lib/i18nNavigation";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { TransientMessage } from "@/components/ui/TransientMessage";
import { useTranslations } from "next-intl";
import { useSecuritySettingsForm } from "@/hooks/profile/useSecuritySettingsForm";

//Icons
import { Eye, EyeOff } from "lucide-react";

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-body-sm! text-white outline-none transition-all placeholder:text-slate-500 focus:border-gold/50";

export function SecuritySettingsPanel() {
  const t = useTranslations("ProfilePage");
  const tForm = useTranslations("SharedForm");
  const tError = useTranslations("ValidationErrors");

  //Hook
  const {
    currentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handleCurrentChange,
    handlePasswordChange,
    handlePasswordBlur,
    transientConfirmSuccess,
    localConfirmError,
    handleConfirmChange,
    handleConfirmBlur,
    isLoading,
    handleSubmit,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deletePassword,
    setDeletePassword,
    isDeleting,
    handleDeleteAccount,
    showDeletePassword,
    setShowDeletePassword,
  } = useSecuritySettingsForm(tError);

  return (
    <>
      <section className="animate-fade-in-up space-y-8">
        <div className="glass-card backdrop-blur-none! rounded-3xl p-6 md:p-12">
          <h2 className="premium-serif mb-6 text-heading-sub text-white">{t("SecurityPanel.title")}</h2>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* 1. Current Password (No TransientMessage) */}
              <label className="block space-y-2">
                <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.currentPassword")}
                </span>
                <span className="relative block">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder={tForm("Placeholders.password")}
                    value={currentPassword}
                    disabled={isLoading}
                    onChange={(e) => handleCurrentChange(e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    aria-label={showCurrentPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="outline-none focus:outline-none absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
                  >
                    {showCurrentPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </span>
                <div className="ml-1">
                  <FormError message={errors.currentPassword} />
                </div>
              </label>

              {/* 2. New Password */}
              <label className="block space-y-2">
                <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.newPassword")}
                </span>
                <span className="relative block">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder={tForm("Placeholders.password")}
                    value={newPassword}
                    disabled={isLoading}
                    onChange={(e) =>
                      handlePasswordChange(e.target.value, setNewPassword, () =>
                        setErrors((prev) => ({ ...prev, password: "" })),
                      )
                    }
                    onBlur={() => handlePasswordBlur(newPassword)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    aria-label={showNewPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="outline-none focus:outline-none absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
                  >
                    {showNewPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </span>

                {transientSuccessMsgs.length > 0 && !(localError || errors.password) && (
                  <TransientMessage messages={transientSuccessMsgs} />
                )}

                {newPassword === "" && !localError && !errors.password && (
                  <p className="ml-2 mt-2 text-tiny text-slate-500 italic">
                    * Must be at least 8 characters long and include uppercase, lowercase, numbers, and special
                    characters.
                  </p>
                )}
                <div className="ml-1">
                  <FormError message={localError || errors.password} />
                </div>
              </label>

              {/* 3. Confirm Password */}
              <label className="block space-y-2">
                <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">
                  {tForm("Labels.confirmPassword")}
                </span>
                <span className="relative block">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={tForm("Placeholders.confirmPassword")}
                    value={confirmPassword}
                    disabled={isLoading}
                    onChange={(e) => handleConfirmChange(e.target.value)}
                    onBlur={handleConfirmBlur}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? tForm("Buttons.hidePassword") : tForm("Buttons.showPassword")}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="outline-none focus:outline-none absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </span>

                {transientConfirmSuccess.length > 0 && !(localConfirmError || errors.confirmPassword) && (
                  <TransientMessage messages={transientConfirmSuccess} />
                )}

                <div className="ml-1">
                  <FormError message={localConfirmError || errors.confirmPassword} />
                </div>
              </label>
            </div>

            <div className="flex flex-col items-center justify-between gap-6 pt-6 sm:flex-row">
              <Link
                href="/confirm-email?from=profile?tab=security"
                className="order-2 text-caption font-bold uppercase tracking-[0.2em] text-red-500 transition-all duration-300 hover:text-white hover:underline sm:order-1"
              >
                {t("SecurityPanel.forgotPassword")}
              </Link>

              <Button
                type="submit"
                variant="explore"
                disabled={isLoading}
                className="[&_span]:text-caption! order-1 w-full justify-center sm:order-2 sm:w-max"
              >
                {isLoading ? tForm("ButtonsLoading.updating") : tForm("Buttons.updateSecurity")}
              </Button>
            </div>
          </form>
        </div>

        {/* Delete Account Card */}
        <div className="glass-card backdrop-blur-none! rounded-3xl p-6 md:p-12 border-red-500/20 bg-red-950/5">
          <div className="flex flex-col items-start gap-6">
            <div className="space-y-2">
              <h3 className="text-body font-bold uppercase tracking-wider text-red-400">
                {t("SecurityPanel.dangerZoneTitle")}
              </h3>
              <p className="text-body-sm text-slate-400">{t("SecurityPanel.dangerZoneDesc")}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="self-end px-6 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-caption font-bold uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white hover:border-red-500 whitespace-nowrap"
            >
              {t("SecurityPanel.deleteBtn")}
            </button>
          </div>
        </div>
      </section>
      {/*  Confirmation Modal */}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-card w-full max-w-md my-auto rounded-3xl p-6 md:p-8 border-red-500/30 bg-[#0a0a0a] shadow-2xl space-y-6">
            <h3 className="text-heading-card font-bold text-white">{t("SecurityPanel.modalTitle")}</h3>
            <p className="text-body-sm text-slate-300 leading-relaxed">{t("SecurityPanel.modalDesc")}</p>
            <div className="space-y-2">
              <span className="relative block">
                <input
                  type={showDeletePassword ? "text" : "password"}
                  placeholder={tForm("Placeholders.password")}
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setErrors((prev) => ({ ...prev, deletePassword: "" }));
                  }}
                  className={inputClass}
                />
                <button
                  type="button"
                  aria-label={showDeletePassword ? "Hide password" : "Show password"}
                  onClick={() => setShowDeletePassword((prev) => !prev)}
                  className="outline-none focus:outline-none absolute active:scale-95 right-3.5 p-2 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-gold"
                >
                  {showDeletePassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </span>

              <div className="ml-1">
                <FormError message={errors.deletePassword} />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletePassword("");
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-caption font-bold uppercase tracking-widest hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                {t("SecurityPanel.cancelBtn")}
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 text-white text-caption font-bold uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                {isDeleting ? t("SecurityPanel.deletingBtn") : t("SecurityPanel.confirmDeleteBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
