import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { writeReviewService } from "@/services/testimonials/writeReviewService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

export function useWriteReviewForm() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "");
  const [email, setEmail] = useState(user?.email || "");
  const [country] = useState(user?.country || "");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      // type
      // publicVisibility
      rating,
      experience,

    };

    const isValid = validate(payload);

    if (!isValid) return;

    try {
      setIsLoading(true);

      await writeReviewService.submitReview(payload);

      console.log("Testimonial Form valid and submitted!", {
        fullName,
        email,
        country,
        rating,
        experience,
      });

      // Form Clear
      setFullName("");
      setEmail("");
      setRating(0);
      setExperience("");
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("ServerErrors.reviewSubmitFailed") }));
    } finally {
      setIsLoading(false);
    }
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
  };
}
