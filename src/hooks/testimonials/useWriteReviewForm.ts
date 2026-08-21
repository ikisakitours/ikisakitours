import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";

export function useWriteReviewForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(""); // 👈 අලුත් Email state එක
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation එකට email එකත් එකතු කළා
    const isValid = validate({
      fullName,
      email,
      country,
      rating,
      experience,
    });

    if (!isValid) return;

    try {
      setIsLoading(true);
      
      // API call එක simulate කිරීම (තත්පර 1.5ක්)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Testimonial Form valid and submitted!", { 
        fullName, 
        email, 
        country, 
        rating, 
        experience 
      });

      // මෙතනින් පස්සේ ඔයාට Form එක reset කරන්න පුළුවන් (අවශ්‍ය නම්)
      
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