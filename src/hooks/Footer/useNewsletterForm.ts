// src/hooks/useNewsletterForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { newsletterService } from "@/services/Footer/newsletterService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext"; 

export function useNewsletterForm() {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  
  const tToastNewsletter = useTranslations("ValidationErrors.ToastMessages.Newsletter"); 
  const toast = useToast(); 

  const { user } = useAuth();
  const userId = user?.id;

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      email: formData.email,
    });

    if (!isValid) return;

    const toastId = toast.loading(tToastNewsletter("loading"));

    try {
      setIsLoading(true);

      const response = await newsletterService.subscribe(formData.email, userId);

      if (response.status === "already_exists") {
        setErrors((prev) => ({ ...prev, email: response.message }));
        toast.error(toastId, tToastNewsletter("alreadyExists"));
        return;
      }

      setFormData({ email: "" });
      
      toast.success(toastId, tToastNewsletter("success"), 2000); 

    } catch (error: unknown) {
      console.error("Newsletter submission error:", error);
      const errorMessage = error instanceof Error ? error.message : tErr("generalError");
      setErrors((prev) => ({ ...prev, email: errorMessage }));
      
      toast.error(toastId, tToastNewsletter("error")); 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    handleBookingSubmit,
  };
}