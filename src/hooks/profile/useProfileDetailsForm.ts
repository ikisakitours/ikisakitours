import { useState, type ChangeEvent, type FormEvent } from "react";
import { profileUser } from "@/data/profile";
import { useValidationForm } from "@/hooks/useValidationForm";

export function useProfileDetailsForm(tError: (key: string) => string) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(profileUser.firstName);
  const [lastName, setLastName] = useState(profileUser.lastName);
  const [email, setEmail] = useState(profileUser.email);

  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();

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
    if (!validate({ firstName, lastName, email })) return;

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Details saved successfully:", { firstName, lastName, email });
    } catch (error) {
      console.error("Update error:", error);
      setErrors((prev) => ({ ...prev, form: "Update failed" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = async () => {
    if (!avatarPreview) return;

    try {
      setIsProfileLoading(true);
      // Image Upload API Call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Uploading cropped avatar:", avatarPreview);
    } catch (error) {
      console.error("Avatar upload error:", error);
      setErrors((prev) => ({ ...prev, avatar: "Avatar upload failed" }));
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
