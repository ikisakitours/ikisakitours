import { useEffect, useRef, useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { bookingWidgetService } from "@/services/Booking/bookingWidgetService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { claimBookingDraft, clearBookingDraft, loadBookingDraft, saveBookingDraft } from "@/utils/bookingDraft";

// true: after login, the saved draft is submitted automatically
const AUTO_SUBMIT_AFTER_LOGIN = false;

type TourInfo = { id?: string; slug?: string; title: string };

type BookingValues = {
  journeyDate: string;
  travelerCounts: Record<string, number>;
};

const EMPTY_COUNTS = { adult: 0, couple: 0, child: 0, infant: 0 };

export function useBookingWidget(tour: TourInfo, tourType: "oneday" | "multiday") {
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>(EMPTY_COUNTS);
  const [journeyDate, setJourneyDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  const { user } = useAuth();
  const toast = useToast();
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Booking");

  const draftKey = tour.slug || tour.id || tour.title;
  const restoredRef = useRef(false);
  const autoHandledRef = useRef(false);

  const submitBooking = async (values: BookingValues) => {
    if (!user) return;

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      const bookingPayload = {
        packageId: tour.id || "default-id-02",
        packageName: tour.title,
        packageType: tourType,
        journeyDate: values.journeyDate,
        travelers: {
          adults: values.travelerCounts.adult,
          couples: values.travelerCounts.couple / 2,
          children: values.travelerCounts.child,
          infants: values.travelerCounts.infant,
        },
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        country: user.country || "Sri Lanka",
        type: tourType,
      };

      await Promise.all([
        bookingWidgetService.createBooking(bookingPayload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      clearBookingDraft(draftKey);
      setJourneyDate("");
      setTravelerCounts(EMPTY_COUNTS);
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error("Booking error:", error);
      setErrors((prev) => ({ ...prev, date: tErr("bookingFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  // Restore draft (and optionally auto submit) after returning from login
  useEffect(() => {
    const id = setTimeout(() => {
      // Not auto-submitting: just restore the fields (every instance fills itself)
      if (!AUTO_SUBMIT_AFTER_LOGIN || !user) {
        const draft = loadBookingDraft(draftKey);
        if (!draft || restoredRef.current) return;
        restoredRef.current = true;
        setJourneyDate(draft.journeyDate);
        setTravelerCounts({ ...EMPTY_COUNTS, ...draft.travelerCounts });
         setDraftRestored(true); 
        return;
      }

      // Auto-submit mode, logged in: only ONE instance can claim the draft
      if (autoHandledRef.current) return;
      autoHandledRef.current = true;

      const draft = claimBookingDraft(draftKey);
      if (!draft) return; // another instance already took it

      const values: BookingValues = {
        journeyDate: draft.journeyDate,
        travelerCounts: { ...EMPTY_COUNTS, ...draft.travelerCounts },
      };

      setJourneyDate(values.journeyDate);
      setTravelerCounts(values.travelerCounts);

      if (draft.autoSubmit && validate({ date: values.journeyDate, counts: values.travelerCounts })) {
        void submitBooking(values);
      }
    }, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, draftKey]);

  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;
      const next = (prev[type] || 0) + actualDelta;
      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validate({ date: journeyDate, counts: travelerCounts });
    if (!isValid) return;

    // Not logged in: save draft + show modal
    if (!user) {
      saveBookingDraft(draftKey, {
        journeyDate,
        travelerCounts,
        autoSubmit: AUTO_SUBMIT_AFTER_LOGIN,
      });
      setShowAuthModal(true);
      return;
    }

    await submitBooking({ journeyDate, travelerCounts });
  };

  return {
    travelerCounts,
    journeyDate,
    setJourneyDate,
    handleTravelerChange,
    errors,
    setErrors,
    isLoading,
    handleBookingSubmit,
    showAuthModal,
    closeAuthModal: () => setShowAuthModal(false),
     draftRestored,
    clearDraftRestored: () => setDraftRestored(false),
  };
}
