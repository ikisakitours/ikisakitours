import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { writeReviewService } from "@/services/testimonials/writeReviewService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

export function useWriteReviewForm() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "");
  const [email, setEmail] = useState(user?.email || "");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      fullName,
      email,
      rating,
      experience,
    };

    const isValid = validate(payload);

    if (!isValid) return;

    const apiPayload = {
      content: experience,
      type: "WEBSITE",
      isPublic: true,
      rating: rating > 0 ? rating : undefined,
    };
    try {
      setIsLoading(true);
      const [response] = await Promise.all([
        writeReviewService.submitReview(apiPayload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      // await writeReviewService.submitReview(apiPayload);

      console.log("Testimonial Form valid and submitted!", apiPayload);
      console.log("Testimonial Form Response!", response);
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
