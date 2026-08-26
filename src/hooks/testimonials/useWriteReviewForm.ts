import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { writeReviewService } from "@/services/testimonials/writeReviewService";

export function useWriteReviewForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      fullName,
      email,
      country,
      rating,
      experience,
    };

    const isValid = validate(payload);

    if (!isValid) return;

    try {
      setIsLoading(true);

      // await new Promise((resolve) => setTimeout(resolve, 1500));
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
      setCountry("");
      setRating(0);
      setExperience("");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    country,
    setCountry,
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
