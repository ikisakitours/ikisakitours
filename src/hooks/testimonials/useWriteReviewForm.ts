import { useEffect, useRef, useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { writeReviewService } from "@/services/testimonials/writeReviewService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { clearReviewDraft, loadReviewDraft, saveReviewDraft } from "@/utils/reviewDraft";

const AUTO_SUBMIT_AFTER_LOGIN = false;

type ReviewValues = {
  fullName: string;
  email: string;
  rating: number;
  experience: string;
};

export function useWriteReviewForm() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const accountName = user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "";
  const accountEmail = user?.email || "";

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const fullName = isLoggedIn ? accountName : guestName;
  const email = isLoggedIn ? accountEmail : guestEmail;

  const setFullName = (value: string) => {
    if (!isLoggedIn) setGuestName(value);
  };
  const setEmail = (value: string) => {
    if (!isLoggedIn) setGuestEmail(value);
  };

  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fieldsRestoredRef = useRef(false);
  const autoHandledRef = useRef(false);

  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Review");
  const toast = useToast();

  const submitReview = async (values: ReviewValues) => {
    const apiPayload = {
      content: values.experience,
      type: "WEBSITE",
      isPublic: true,
      rating: values.rating > 0 ? values.rating : undefined,
    };

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);
      const [response] = await Promise.all([
        writeReviewService.submitReview(apiPayload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      toast.success(toastId, tToast("success"), 2000);

      console.log("Testimonial Form valid and submitted!", apiPayload);
      console.log("Testimonial Form Response!", response);

      clearReviewDraft();
      setRating(0);
      setExperience("");
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("ServerErrors.reviewSubmitFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      const draft = loadReviewDraft();
      if (!draft) return;

      if (!fieldsRestoredRef.current) {
        fieldsRestoredRef.current = true;
        setGuestName(draft.fullName);
        setGuestEmail(draft.email);
        setRating(draft.rating);
        setExperience(draft.experience);
      }

      if (user && !autoHandledRef.current) {
        autoHandledRef.current = true;
        clearReviewDraft();

        if (draft.autoSubmit && AUTO_SUBMIT_AFTER_LOGIN) {
          const restored: ReviewValues = {
            fullName: accountName || draft.fullName,
            email: accountEmail || draft.email,
            rating: draft.rating,
            experience: draft.experience,
          };
          if (validate(restored)) {
            void submitReview(restored);
          }
        }
      }
    }, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const values: ReviewValues = { fullName, email, rating, experience };
    if (!validate(values)) return;

    if (!user) {
      saveReviewDraft({ ...values, autoSubmit: AUTO_SUBMIT_AFTER_LOGIN });
      setShowAuthModal(true);
      return;
    }

    await submitReview(values);
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    isLoggedIn,
    rating,
    setRating,
    experience,
    setExperience,
    isLoading,
    errors,
    setErrors,
    handleSubmit,
    showAuthModal,
    closeAuthModal: () => setShowAuthModal(false),
  };
}