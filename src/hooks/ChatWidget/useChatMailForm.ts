import { useState, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useUserLocation } from "@/hooks/useUserLocation";
import { chatMailService } from "@/services/ChatWidget/chatMailService";
import { useTranslations } from "next-intl";

export function useChatMailForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);
  const [hideMessage, setHideMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: locationData, isDetecting } = useUserLocation();
  const detectedCode = locationData?.country_code || "";

  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
    setUserInteracted(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (!isValid) return;

    try {
      setIsLoading(true);

      // await new Promise((resolve) => setTimeout(resolve, 1500));
      await chatMailService.submitMail(formData);
      console.log("Chat Mail Form valid and submitted!", formData);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("messageSendFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    selectedCountry,
    setSelectedCountry,
    userInteracted,
    setUserInteracted,
    hideMessage,
    setHideMessage,
    isLoading,
    errors,
    detectedCode,
    isDetecting,
    handleTextChange,
    handlePhoneChange,
    handleSubmit,
  };
}
