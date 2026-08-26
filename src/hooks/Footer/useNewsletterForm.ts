// src/hooks/useNewsletterForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { newsletterService } from "@/services/Footer/newsletterService";

export function useNewsletterForm() {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      email: formData.email,
    });

    if (!isValid) return;

    try {
      setIsLoading(true);

      // await new Promise((resolve) => setTimeout(resolve, 1500));
      await newsletterService.subscribe(formData.email);
      console.log("Newsletter form is valid, API call triggered!", { ...formData });
      setFormData({ email: "" });
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setErrors((prev) => ({ ...prev, email: "Something went wrong. Try again." }));
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
