import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { contactApi } from "@/services/Contact/contactService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { clearContactDraft, loadContactDraft, saveContactDraft } from "@/utils/contactDraft";

// if  this true when from auto submit
const AUTO_SUBMIT_AFTER_LOGIN = false;

type ContactValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  tourType: string;
};

export function useContactForm(inquiryOptions: string[]) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "",
    email: user?.email || "",
    phone: "",
    subject: "",
    message: "",
  });

  const toast = useToast();
  const tToastContact = useTranslations("ValidationErrors.ToastMessages.ContactForm");

  const [inquiryType, setInquiryType] = useState("");
  const [tourType, setTourType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [userInteracted, setUserInteracted] = useState(false);
  const [hideMessage, setHideMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fieldsRestoredRef = useRef(false);
  const autoHandledRef = useRef(false);

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

  const buildPayload = (values: ContactValues) => {
    const apiPayload: Record<string, string> = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      inquiryType: values.inquiryType,
      subject: values.subject,
      message: values.message,
    };
    if (values.inquiryType === inquiryOptions[0]) {
      apiPayload.tourInterest = values.tourType;
    }
    return apiPayload;
  };

  const submitContact = async (values: ContactValues) => {
    const apiPayload = buildPayload(values);
    if (!validate(apiPayload)) return;

    const toastId = toast.loading(tToastContact("loading"));
    try {
      setIsLoading(true);

      await contactApi.submitForm(apiPayload);

      toast.success(toastId, tToastContact("success"), 2000);
      clearContactDraft();

      setFormData({
        fullName: user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "",
        email: user?.email || "",
        phone: "",
        subject: "",
        message: "",
      });
      setInquiryType("");
      setTourType("");
      console.log("Contact Form valid and submitted!");
    } catch (error) {
      toast.error(toastId, tToastContact("error"));
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("contactSubmitFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      const draft = loadContactDraft();
      if (!draft) return;

      const accountName = user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "";
      const accountEmail = user?.email || "";

      if (!fieldsRestoredRef.current) {
        fieldsRestoredRef.current = true;
        setFormData({
          fullName: accountName || draft.fullName,
          email: accountEmail || draft.email,
          phone: draft.phone,
          subject: draft.subject,
          message: draft.message,
        });
        setInquiryType(draft.inquiryType);
        setTourType(draft.tourType);

        setTimeout(() => {
          document.getElementById("contact-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      }

      if (user && !autoHandledRef.current) {
        autoHandledRef.current = true;
        clearContactDraft();

        if (draft.autoSubmit && AUTO_SUBMIT_AFTER_LOGIN) {
          void submitContact({
            fullName: accountName || draft.fullName,
            email: accountEmail || draft.email,
            phone: draft.phone,
            subject: draft.subject,
            message: draft.message,
            inquiryType: draft.inquiryType,
            tourType: draft.tourType,
          });
        }
      }
    }, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values: ContactValues = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      inquiryType,
      tourType,
    };

    if (!validate(buildPayload(values))) return;

    if (!user) {
      saveContactDraft({ ...values, autoSubmit: AUTO_SUBMIT_AFTER_LOGIN });
      setShowAuthModal(true);
      return;
    }

    await submitContact(values);
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
    showAuthModal,
    closeAuthModal: () => setShowAuthModal(false),
  };
}