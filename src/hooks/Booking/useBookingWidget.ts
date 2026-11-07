import { useEffect, useRef, useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { bookingWidgetService } from "@/services/Booking/bookingWidgetService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { claimBookingDraft, clearBookingDraft, saveBookingDraft } from "@/utils/draft/bookingDraft";

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

  const { user, isHydrated } = useAuth();
  const toast = useToast();
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Booking");

  const draftKey = tour.slug || tour.id || tour.title;

  // මොන draft key එක restore කළාද කියලා (එකම draft එක දෙපාරක් restore වෙන්නේ නැති වෙන්න)
  const restoredKeyRef = useRef<string | null>(null);

  const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

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
      setJourneyDate(getTodayFormatted());
      setTravelerCounts(EMPTY_COUNTS);
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error("Booking error:", error);
      setErrors((prev) => ({ ...prev, date: tErr("bookingFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  // Login වෙලා ආපහු ආවම විතරක් draft එක restore කරනවා
  useEffect(() => {
    // 1. Auth hydrate වෙනකම් / user login වෙලා නැත්නම් / tour එක load වෙලා නැත්නම් කිසිවක් නොකරන්න
    if (!isHydrated || !user || !draftKey) return;
    // 2. මේ draft එක දැනටමත් restore කරලා නම් නවතින්න
    if (restoredKeyRef.current === draftKey) return;

    const id = setTimeout(() => {
      // 3. Draft එක ගන්නවා + storage එකෙන් මකනවා (refresh කළාම ආයෙ modal එක ඇරෙන්නේ නැති වෙන්න)
      const draft = claimBookingDraft(draftKey);
      if (!draft) return;

      restoredKeyRef.current = draftKey;

      const values: BookingValues = {
        journeyDate: draft.journeyDate,
        travelerCounts: { ...EMPTY_COUNTS, ...draft.travelerCounts },
      };

      setJourneyDate(values.journeyDate);
      setTravelerCounts(values.travelerCounts);

      // Auto-submit mode එකේදී කෙලින්ම submit කරනවා
      if (
        AUTO_SUBMIT_AFTER_LOGIN &&
        draft.autoSubmit &&
        validate({ date: values.journeyDate, counts: values.travelerCounts })
      ) {
        void submitBooking(values);
        return;
      }

      // Mobile එකේ StickyBookingBar එකට modal එක ඇරෙන්න signal එක
      setDraftRestored(true);
    }, 0);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, draftKey]);

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