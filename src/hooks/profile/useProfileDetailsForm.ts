import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { profileService } from "@/services/profile/profileService";
import { convertImageToWebP } from "@/utils/image-converter.util";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { isSuspensionError } from "@/utils/apiError";

export function useProfileDetailsForm(tError: (key: string) => string) {
  const { user, updateUser } = useAuth();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(user?.country || "");

  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToastProfile = useTranslations("ValidationErrors.ToastMessages.ProfileUpdate");
  const tToastAvatar = useTranslations("ValidationErrors.ToastMessages.AvatarUpload");
  const tAuth = useTranslations("Auth");

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [currentFileSignature, setCurrentFileSignature] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (user) {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
        setCountry(user.country);
      }
    }, 0);

    return () => clearTimeout(timeoutId); // Cleanup function
  }, [user]);

  const handleAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileSignature = `${file.name}-${file.size}-${file.lastModified}`;

    if (fileSignature === user?.avatarSignature) {
      const isConfirmed = window.confirm(
        "You already uploaded this exact same image file. Do you want to crop and upload it again?",
      );
      if (!isConfirmed) {
        event.target.value = "";
        return;
      }
    }

    setCurrentFileSignature(fileSignature);

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ avatar: tError("imageSizeProfile") });
      event.target.value = "";
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
    setIsImageChanged(true);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.avatar;
      return copy;
    });
  };

  const handlePersonalUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate({ firstName, lastName, email, country })) return;
    const toastId = toast.loading(tToastProfile("loading"));
    try {
      setIsLoading(true);

      const payload = {
        firstname: firstName,
        lastname: lastName,
        email,
        country,
      };

      await Promise.all([
        profileService.updateDetails(payload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      updateUser({
        firstname: firstName,
        lastname: lastName,
        email: email,
        country: country,
      });

      toast.success(toastId, tToastProfile("success"), 2000);
      // console.log("Login valid and submitted!", response);
    } catch (error) {
      if (isSuspensionError(error)) {
        toast.error(toastId, tAuth("Suspension.profile_restricted_message"));
        return;
      }
      toast.error(toastId, tToastProfile("error"));
      console.error("Update error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("updateFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = async () => {
    if (!avatarPreview) return;
    const toastId = toast.loading(tToastAvatar("loading"));

    try {
      setIsProfileLoading(true);

      // 1. Client-Side WebP Conversion (Max 512px, quality 0.85)
      const { file: webpFile } = await convertImageToWebP(avatarPreview, 512, 0.85);

      if (webpFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, avatar: "Converted image is still too large." }));
        setIsProfileLoading(false);
        return;
      }

      // 2. Upload avatar to Cloudflare R2 (/api/uploads/batch)
      const uploadedUrl = await profileService.uploadAvatar(webpFile);

      // 3. Cache-busting timestamp to ensure fresh image load
      const cacheBustedUrl = `${uploadedUrl}?t=${Date.now()}`;

      // 4. Update profile with oldAvatarUrl so backend prunes orphaned R2 file
      const oldAvatarUrl = user?.avatarUrl || null;
      await profileService.updateProfile({
        avatarUrl: cacheBustedUrl,
        oldAvatarUrl,
      });

      // 5. Instantly sync user state and localStorage
      updateUser({
        avatarUrl: cacheBustedUrl,
        avatarSignature: currentFileSignature,
      });

      setIsImageChanged(false);
      setAvatarPreview(null);
      toast.success(toastId, tToastAvatar("success"), 2000);
    } catch (error) {
      if (isSuspensionError(error)) {
        toast.error(toastId, tAuth("Suspension.profile_restricted_message"));
        return;
      }
      toast.error(toastId, tToastAvatar("error"));
      console.error("Avatar upload error:", error);
      setErrors((prev) => ({ ...prev, avatar: tErr("avatarUploadFailed") }));
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    const oldAvatarUrl = user?.avatarUrl;

    // If only an unsaved local preview exists, simply discard it
    if (!oldAvatarUrl && avatarPreview) {
      setAvatarPreview(null);
      setIsImageChanged(false);
      return;
    }

    if (!oldAvatarUrl) return;

    const toastId = toast.loading(tToastAvatar("removing"));
    try {
      setIsProfileLoading(true);

      // Send { avatarUrl: null, oldAvatarUrl: previousAvatarUrl } for R2 pruning
      await profileService.updateProfile({
        avatarUrl: null,
        oldAvatarUrl,
      });

      // Synchronize AuthContext and localStorage
      updateUser({
        avatarUrl: null,
        avatarSignature: null,
      });

      setAvatarPreview(null);
      setIsImageChanged(false);
      toast.success(toastId, tToastAvatar("removeSuccess"), 2000);
    } catch (error) {
      if (isSuspensionError(error)) {
        toast.error(toastId, tAuth("Suspension.profile_restricted_message"));
        return;
      }
      toast.error(toastId, tToastAvatar("removeError"));
      console.error("Avatar remove error:", error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  return {
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
    setRawImage,
    isCropModalOpen,
    setIsCropModalOpen,
    cameraError,
    setCameraError,
    isLoading,
    isImageChanged,
    isProfileLoading,
    errors,
    setErrors,
    handleAvatarSelect,
    handleCropComplete,
    handlePersonalUpdate,
    handleImageUpdate,
    handleRemoveAvatar,
  };
}
