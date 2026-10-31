import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useTranslations } from "next-intl";
import { PackageReviewService } from "@/services/Booking/PackageReviewService";
import { useAuth } from "@/context/AuthContext";
import { clearBookingReviewDraft, loadBookingReviewDraft, saveBookingReviewDraft } from "@/utils/bookingReviewDraft";
import { useToast } from "@/context/ToastContext";

const AUTO_SUBMIT_AFTER_LOGIN = false;

type PackageInfo = { id?: string; title: string };

type ReviewValues = {
  userId: string;
  packageId: string;
  packageName: string;
  email: string;
  rating: number;
  experience: string;
  images: File[];
};

export function useReviewForm(slug: string, pkg: PackageInfo) {
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

  const submitReview = async (values: ReviewValues) => {
    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      await Promise.all([
        PackageReviewService.submitReview(values),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      clearBookingReviewDraft(slug);
      setRating(0);
      setExperience("");
      setImages([]);
      setPreviews([]);
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
      const draft = loadBookingReviewDraft(slug);
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
        clearBookingReviewDraft(slug);

        const canAutoSubmit = AUTO_SUBMIT_AFTER_LOGIN && draft.autoSubmit && !draft.hadImages;

        const restored: ReviewValues = {
          userId: String(user.id),
          packageId: pkg.id || slug,
          packageName: pkg.title,
          email: user.email || draft.email,
          rating: draft.rating,
          experience: draft.experience,
          images: [],
        };

        if (
          canAutoSubmit &&
          validate({
            fullName: accountName,
            email: restored.email,
            rating: restored.rating,
            experience: restored.experience,
            images: [],
          })
        ) {
          void submitReview(restored);
        }
      }
    }, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, slug]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate({
      fullName,
      email,
      rating,
      experience,
      images,
    });
    if (!isValid) return;

    if (!user) {
      saveBookingReviewDraft(slug, {
        fullName,
        email,
        rating,
        experience,
        autoSubmit: AUTO_SUBMIT_AFTER_LOGIN,
        hadImages: images.length > 0,
      });
      setShowAuthModal(true);
      return;
    }

    await submitReview({
      userId: String(user.id),
      packageId: pkg.id || slug,
      packageName: pkg.title,
      email: user.email || email,
      rating,
      experience,
      images,
    });
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
