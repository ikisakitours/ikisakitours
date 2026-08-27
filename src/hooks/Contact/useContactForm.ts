import { useState, type FormEvent, type ChangeEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { contactApi } from "@/services/Contact/contactService";
import { useTranslations } from "next-intl";

export function useContactForm(inquiryOptions: string[]) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [inquiryType, setInquiryType] = useState("");
  const [tourType, setTourType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [userInteracted, setUserInteracted] = useState(false);
  const [hideMessage, setHideMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInquiryChange = (val: string) => {
    setInquiryType(val);
    setErrors((prev) => ({ ...prev, inquiryType: "" }));
    if (val !== inquiryOptions[0]) {
      setTourType("");
    }
  };

  const handleTourChange = (val: string) => {
    setTourType(val);
    setErrors((prev) => ({ ...prev, tourInterest: "" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationPayload: Record<string, string> = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      inquiryType: inquiryType,
      subject: formData.subject,
      message: formData.message,
    };

    if (inquiryType === inquiryOptions[0]) {
      validationPayload.tourInterest = tourType;
    }

    const isValid = validate(validationPayload);

    if (!isValid) return;

    try {
      setIsLoading(true);
      await contactApi.submitForm(validationPayload);
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      console.log("Contact Form valid and submitted!", { ...formData, tourType, inquiryType });
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("contactSubmitFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    inquiryType,
    tourType,
    selectedCountry,
    setSelectedCountry,
    userInteracted,
    setUserInteracted,
    hideMessage,
    setHideMessage,
    isLoading,
    errors,
    setErrors,
    handleTextChange,
    handlePhoneChange,
    handleInquiryChange,
    handleTourChange,
    handleSubmit,
  };
}
