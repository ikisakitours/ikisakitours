import { useState, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useTranslations } from "next-intl";
import { PackageReviewService } from "@/services/Booking/PackageReviewService";

export function useReviewForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors");
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        setErrors((prev) => ({ ...prev, images: tErr("imagesMax") }));
        return;
      }
      const MAX_SIZE = 5 * 1024 * 1024;
      const hasLargeFile = filesArray.some((file) => file.size > MAX_SIZE);
      if (hasLargeFile) {
        setErrors((prev) => ({ ...prev, images: tErr("imagesSize") }));
        return;
      }
      setErrors((prev) => ({ ...prev, images: "" }));
      const newImages = [...images, ...filesArray];
      setImages(newImages);
      setPreviews(newImages.map((file) => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newImages.map((file) => URL.createObjectURL(file)));
    if (newImages.length <= 5) setErrors((prev) => ({ ...prev, images: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate({ fullName, email, country, rating, experience, images });

    if (!isValid) return;

    try {
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      await PackageReviewService.submitReview({ fullName, email, country, rating, experience, images });
      console.log("Review Form valid and submitted!", {
        fullName,
        country,
        rating,
        experience,
        images,
      });

      //From Clear
      setFullName("");
      setEmail("");
      setCountry("");
      setRating(0);
      setExperience("");
      setImages([]);
      setPreviews([]);
      
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
    images,
    previews,
    handleImageChange,
    removeImage,
    isLoading,
    errors,
    setErrors,
    handleSubmit,
  };
}
