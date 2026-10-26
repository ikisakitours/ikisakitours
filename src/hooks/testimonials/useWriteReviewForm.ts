import { useEffect, useRef, useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { writeReviewService } from "@/services/testimonials/writeReviewService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { clearReviewDraft, loadReviewDraft, saveReviewDraft } from "@/utils/reviewDraft";

// if  this true when from auto submit
const AUTO_SUBMIT_AFTER_LOGIN = false;

type ReviewValues = {
  fullName: string;
  email: string;
  rating: number;
  experience: string;
};

export function useWriteReviewForm() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "");
  const [email, setEmail] = useState(user?.email || "");
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
    if (!validate(values)) return;

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
      setFullName(user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "");
      setEmail(user?.email || "");
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
    if (!user) return;
    const id = setTimeout(() => {
      setFullName((prev) => prev || `${user.firstname || ""} ${user.lastname || ""}`.trim());
      setEmail((prev) => prev || user.email || "");
    }, 0);
    return () => clearTimeout(id);
  }, [user]);

  useEffect(() => {
    const id = setTimeout(() => {
      const draft = loadReviewDraft();
      if (!draft) return;

      const accountName = user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "";
      const accountEmail = user?.email || "";

      if (!fieldsRestoredRef.current) {
        fieldsRestoredRef.current = true;
        setFullName(accountName || draft.fullName);
        setEmail(accountEmail || draft.email);
        setRating(draft.rating);
        setExperience(draft.experience);
      }

      if (user && !autoHandledRef.current) {
        autoHandledRef.current = true;
        clearReviewDraft();

        if (draft.autoSubmit && AUTO_SUBMIT_AFTER_LOGIN) {
          void submitReview({
            fullName: accountName || draft.fullName,
            email: accountEmail || draft.email,
            rating: draft.rating,
            experience: draft.experience,
          });
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
