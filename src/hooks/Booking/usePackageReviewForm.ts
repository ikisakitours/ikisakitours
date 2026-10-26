import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useTranslations } from "next-intl";
import { PackageReviewService } from "@/services/Booking/PackageReviewService";
import { useAuth } from "@/context/AuthContext";
import { clearBookingReviewDraft, loadBookingReviewDraft, saveBookingReviewDraft } from "@/utils/bookingReviewDraft";
import { useToast } from "@/context/ToastContext";

export function useReviewForm(slug: string) {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(user?.country || "");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fieldsRestoredRef = useRef(false);
  const autoHandledRef = useRef(false);

  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors");

  const tToast = useTranslations("ValidationErrors.ToastMessages.Review");
  const toast = useToast();

  useEffect(() => {
    if (!user) return;
    const id = setTimeout(() => {
      setFullName((prev) => prev || `${user.firstname || ""} ${user.lastname || ""}`.trim());
      setEmail((prev) => prev || user.email || "");
      setCountry((prev) => prev || user.country || "");
    }, 0);
    return () => clearTimeout(id);
  }, [user]);

  useEffect(() => {
    const id = setTimeout(() => {
      const draft = loadBookingReviewDraft(slug);
      if (!draft) return;

      const accountName = user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "";
      const accountEmail = user?.email || "";
      const accountCountry = user?.country || "";

      if (!fieldsRestoredRef.current) {
        fieldsRestoredRef.current = true;
        setFullName(accountName || draft.fullName);
        setEmail(accountEmail || draft.email);
        setCountry(accountCountry || draft.country);
        setRating(draft.rating);
        setExperience(draft.experience);
      }

      if (user && !autoHandledRef.current) {
        autoHandledRef.current = true;
        clearBookingReviewDraft(slug);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [user, slug]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        setErrors((prev) => ({ ...prev, images: tErr("imagesMax") }));
        return;
      }
      const MAX_SIZE = 5 * 1024 * 1024;
      if (filesArray.some((file) => file.size > MAX_SIZE)) {
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

  const submitReview = async () => {
    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      await Promise.all([
        PackageReviewService.submitReview({ fullName, email, country, rating, experience, images }),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      clearBookingReviewDraft(slug);
      setRating(0);
      setExperience("");
      setImages([]);
      setPreviews([]);
      if (user) {
        setFullName(`${user.firstname || ""} ${user.lastname || ""}`.trim());
        setEmail(user.email || "");
      }
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("ServerErrors.reviewSubmitFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate({
      fullName,
      email,
      country: user ? country : country || "pending-login",
      rating,
      experience,
      images,
    });
    if (!isValid) return;

    if (!user) {
      saveBookingReviewDraft(slug, { fullName, email, country, rating, experience });
      setShowAuthModal(true);
      return;
    }

    await submitReview();
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
    showAuthModal,
    closeAuthModal: () => setShowAuthModal(false),
  };
}
