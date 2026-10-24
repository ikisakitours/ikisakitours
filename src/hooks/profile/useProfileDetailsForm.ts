import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { profileService } from "@/services/profile/profileService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
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
  const tToastProfile = useTranslations("ValidationErrors.ToastMessages.ProfileUpdate");
  const tToastAvatar = useTranslations("ValidationErrors.ToastMessages.AvatarUpload");

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [originalImageSize, setOriginalImageSize] = useState<number>(0);
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

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    console.log(`📦 Original Image Size: ${sizeInMB} MB`);
    setOriginalImageSize(file.size);

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

      const [response] = await Promise.all([
        profileService.updateDetails(payload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      // 🌟 මෙතැනින් avatarUrl එක අයින් කළා. 
      // මොකද details update කරද්දී avatar එක වෙනස් වෙන්න ඕනේ image upload එක හරහා පමණයි.
      updateUser({
        firstname: firstName,
        lastname: lastName,
        email: email,
        country: country,
      });

      toast.success(toastId, tToastProfile("success"), 2000);
      console.log("Login valid and submitted!", response);
    } catch (error) {
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

      const webpBlob = await new Promise<Blob>((resolve, reject) => {
        const img = new window.Image();
        img.src = avatarPreview;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas context failed"));

          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("WebP conversion failed"));
            },
            "image/webp",
            0.8,
          );
        };
        img.onerror = () => reject(new Error("Image loading failed"));
      });

      const webpSizeMB = (webpBlob.size / (1024 * 1024)).toFixed(2);
      const originalMB = (originalImageSize / (1024 * 1024)).toFixed(2);
      const savedSpace = (Number(originalMB) - Number(webpSizeMB)).toFixed(2);

      console.log(`🚀 Converted WebP Size: ${webpSizeMB} MB`);
      console.log(`🎉 Cloudflare Storage Saved: ${savedSpace} MB!`);

      if (webpBlob.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, avatar: "Converted image is still too large." }));
        setIsProfileLoading(false);
        return;
      }

      const [response] = await Promise.all([
        profileService.uploadAvatar(webpBlob, currentFileSignature || ""),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      setIsImageChanged(false);

      if (response && response.avatarUrl) {
        updateUser({
          avatarUrl: response.avatarUrl,
          avatarSignature: currentFileSignature,
        });
      }

      toast.success(toastId, tToastAvatar("success"), 2000);
      console.log("Avatar uploaded successfully!");
    } catch (error) {
      toast.error(toastId, tToastAvatar("error"));
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
    isImageChanged,
    isProfileLoading,
    errors,
    setErrors,
    handleAvatarSelect,
    handleCropComplete,
    handlePersonalUpdate,
    handleImageUpdate,
  };
}
