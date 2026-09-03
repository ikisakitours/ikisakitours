import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { profileService } from "@/services/profile/profileService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

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

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ avatar: tError("imageSizeProfile") });
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

  const handlePersonalUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate({ firstName, lastName, email, country })) return;

    try {
      setIsLoading(true);
      await profileService.updateDetails({ firstName, lastName, email, country });

      updateUser({
        firstname: firstName,
        lastname: lastName,
        email: email,
        country: country,
      });
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Details saved successfully:", { firstName, lastName, email });
    } catch (error) {
      console.error("Update error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("updateFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

 const handleImageUpdate = async () => {
    if (!avatarPreview) return;

    try {
      setIsProfileLoading(true);
      
      // 1. Base64 (Data URL) එක Blob/File එකක් බවට පත් කිරීම
      const res = await fetch(avatarPreview);
      const blob = await res.blob();

      // 2. Blob එක Service එකට යැවීම
      await profileService.uploadAvatar(blob);
      
      console.log("Uploading cropped avatar success");
    } catch (error) {
      console.error("Avatar upload error:", error);
      setErrors((prev) => ({ ...prev, avatar: tErr("avatarUploadFailed") }));
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
    isProfileLoading,
    errors,
    setErrors,
    handleAvatarSelect,
    handleCropComplete,
    handlePersonalUpdate,
    handleImageUpdate,
  };
}
