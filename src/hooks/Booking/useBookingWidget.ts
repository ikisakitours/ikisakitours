import { useEffect, useRef, useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { isSuspensionError } from "@/utils/apiError";
import {
  bookingWidgetService,
  type CreateBookingData,
  type SelectedBookingOption,
} from "@/services/Booking/bookingWidgetService";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useToast } from "@/context/ToastContext";
import { claimBookingDraft, clearBookingDraft, saveBookingDraft } from "@/utils/draft/bookingDraft";
import { PricingConfig, PricingOption, PricingOptionLocalization } from "@/services/Booking/packageDetails/types";
import { calculateDynamicPricing } from "@/services/Booking/packageDetails/pricingUtils";

// true: after login, the saved draft is submitted automatically
const AUTO_SUBMIT_AFTER_LOGIN = false;

type TourInfo = {
  id?: string;
  slug?: string;
  title: string;
  price?: number;
  pricingConfig?: PricingConfig;
};

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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { count: number; checked: boolean }>>({});

  const { user, isHydrated } = useAuth();
  const { currency } = useCurrency();
  const locale = useLocale();
  const toast = useToast();
  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Booking");
  const tAuth = useTranslations("Auth");

  const draftKey = tour.slug || tour.id || tour.title;

  const roundUsd = (amount: number) => Math.round(amount * 100) / 100;

  const getOptionDisplayName = (name: PricingOptionLocalization | string): string => {
    if (typeof name === "object" && name !== null) {
      return name.en || name.ja || Object.values(name).find(Boolean) || "";
    }
    return String(name || "");
  };

  // Toggle / Change Option Count
  const handleOptionToggle = (optionId: string, isChecked: boolean, defaultCount = 1) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: {
        checked: isChecked,
        count: isChecked ? (prev[optionId]?.count || defaultCount) : 0,
      },
    }));
  };

  const handleOptionCountChange = (optionId: string, delta: number, maxCount?: number) => {
    setSelectedOptions((prev) => {
      const current = prev[optionId]?.count || 1;
      let next = current + delta;
      if (next < 1) next = 1;
      if (maxCount !== undefined && next > maxCount) next = maxCount;
      return {
        ...prev,
        [optionId]: { checked: true, count: next },
      };
    });
  };

  // මොන draft key එක restore කළාද කියලා (එකම draft එක දෙපාරක් restore වෙන්නේ නැති වෙන්න)
  const restoredKeyRef = useRef<string | null>(null);

  const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const submitBooking = async (values: BookingValues): Promise<boolean> => {
    if (!user) return false;

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      // Recalculate base tour pricing & passenger breakdown (USD base for backend verification & admin panel)
      const pricing = calculateDynamicPricing(tour.price || 0, values.travelerCounts, tour.pricingConfig);
      const configuredOptions: PricingOption[] = tour.pricingConfig?.options || [];

      const normalizedOptions: SelectedBookingOption[] = configuredOptions
        .map((opt): SelectedBookingOption | null => {
          const state = selectedOptions[opt.id];
          if (!state || !state.checked) return null;

          const calcType = opt.calculationType || opt.type || "per_booking";
          const isOneTime = calcType === "per_booking" || calcType === "flat";
          const maxCount = isOneTime
            ? 1
            : calcType === "per_person"
              ? Math.max(1, pricing.totalPax)
              : calcType === "per_room"
                ? Math.max(1, pricing.totalPax, 10)
                : 50;

          const quantity = isOneTime ? 1 : Math.min(Math.max(1, state.count || 1), maxCount);
          const unitPrice = roundUsd(Number(opt.price) || 0);
          const subtotal = roundUsd(unitPrice * quantity);

          return {
            id: opt.id,
            name: getOptionDisplayName(opt.name),
            nameLocalized: opt.name,
            calculationType: calcType,
            unitPrice,
            quantity,
            subtotal,
          };
        })
        .filter((item): item is SelectedBookingOption => item !== null);

      const optionsTotal = roundUsd(normalizedOptions.reduce((sum, item) => sum + item.subtotal, 0));
      const basePrice = roundUsd(pricing.totalPrice);
      const totalAmount = roundUsd(basePrice + optionsTotal);

      const bookingPayload: CreateBookingData = {
        packageId: tour.id || "default-id-02",
        packageSlug: tour.slug,
        packageName: tour.title,
        packageType: tourType,
        type: tourType,
        journeyDate: values.journeyDate,
        travelers: {
          adults: values.travelerCounts.adult || 0,
          couples: values.travelerCounts.couple || 0, // Direct couple count (Do not divide by 2!)
          children: values.travelerCounts.child || 0,
          infants: values.travelerCounts.infant || 0,
        },
        totalPax: pricing.totalPax,
        selectedOptions: normalizedOptions,
        basePrice,
        optionsTotal,
        totalAmount,
        currency,
        locale,
        pricingSummary: {
          baseCurrency: "USD",
          displayCurrency: currency,
          appliedTier: pricing.activeTier
            ? {
                label: pricing.activeTier.label,
                minPax: Number(pricing.activeTier.minPax),
                maxPax: Number(pricing.activeTier.maxPax),
                pricePerPerson: roundUsd(Number(pricing.activeTier.pricePerPerson)),
              }
            : null,
          unitPrice: roundUsd(pricing.unitPrice),
          baseTotal: basePrice,
          optionsTotal,
          grandTotal: totalAmount,
          breakdown: pricing.breakdown,
        },
        userId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        country: user.country || "Sri Lanka",
      };

      await Promise.all([
        bookingWidgetService.createBooking(bookingPayload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      clearBookingDraft(draftKey);
      setJourneyDate(getTodayFormatted());
      setTravelerCounts(EMPTY_COUNTS);
      setSelectedOptions({});
      return true;
    } catch (error) {
      if (isSuspensionError(error)) {
        toast.error(toastId, tAuth("Suspension.booking_restricted_message"));
        return false;
      }
      toast.error(toastId, tToast("error"));
      console.error("Booking error:", error);
      setErrors((prev) => ({ ...prev, date: tErr("bookingFailed") }));
      return false;
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
      // Keep 1-to-1 increment for couples so state matches UI (e.g. 2 couples)
      const next = (prev[type] || 0) + delta;
      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  // 1. Check Availability (Opens Modal)
  const handleBookingSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
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

    // Open the review modal
    setIsBookingModalOpen(true);
  };

  // 2. Final Booking Confirmation (Called inside Modal)
  const handleConfirmBooking = async () => {
    const isValid = validate({ date: journeyDate, counts: travelerCounts });
    if (!isValid) return;

    const success = await submitBooking({ journeyDate, travelerCounts });
    if (success) {
      setIsBookingModalOpen(false);
    }
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
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedOptions,
    handleOptionToggle,
    handleOptionCountChange,
    handleConfirmBooking,
  };
}