// src/hooks/services/usePrivateVehicleForm.ts
import { useRef, useEffect, useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { type ContactData } from "@/components/services/ContactForm";
import { vehicles } from "@/data/vehicles";
import { privateVehicleService } from "@/services/services/privateVehicleService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { claimServiceDraft, loadServiceDraft, saveServiceDraft, clearServiceDraft } from "@/utils/draft/servicesDraft";

const AUTO_SUBMIT_AFTER_LOGIN = false;
const DRAFT_KEY = "private_vehicle_form";

export function usePrivateVehicleForm() {
  const defaultCategory = vehicles[0].category;
  const defaultVehicleId = vehicles[0].id;

  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>(defaultCategory);
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicleId);

  const [pickupLocation, setPickupLocation] = useState("");
  const [tourRequests, setTourRequests] = useState("");
  const [tourPackageType, setTourPackageType] = useState<"driver" | "guide">("driver");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [tourDays, setTourDays] = useState<number>(0);
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    adult: 0,
    couple: 0,
    child: 0,
    infant: 0,
  });

  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  const { user } = useAuth();
  const toast = useToast();
  const { errors, validate, setErrors } = useValidationForm();

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.VehicleBooking");

  const restoredRef = useRef(false);
  const autoHandledRef = useRef(false);

  const handleTourDaysChange = (delta: number) => {
    setTourDays((prev) => Math.max(0, prev + delta));
  };

  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;
      const current = prev[type] || 0;
      const next = current + actualDelta;
      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const submitPrivateVehicle = async (
    payloadDate: string,
    payloadTime: string,
    payloadLanguage: string,
    payloadDays: number,
    payloadCounts: Record<string, number>,
    payloadPickup: string,
    payloadRequests: string,
    payloadType: "driver" | "guide",
    payloadContact: ContactData,
  ) => {
    if (!user) return;

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      const payload = {
        vehicleType: activeFilter.toLowerCase(),
        tourPackageType: `with ${payloadType}`,
        pickupLocation: payloadPickup,
        language: payloadLanguage,
        journeyDate: payloadDate,
        pickupTime: payloadTime,
        travelers: {
          adults: payloadCounts.adult,
          couples: payloadCounts.couple / 2,
          children: payloadCounts.child,
          infants: payloadCounts.infant,
        },
        tourDuration: `${payloadDays}day`,
        description: payloadRequests,
        fullName: payloadContact.fullName || user.firstname,
        email: payloadContact.email || user.email,
        phoneNumber: payloadContact.phone,
        specialRequests: payloadContact.specialRequests,
      };

      await Promise.all([
        privateVehicleService.bookVehicle(payload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      clearServiceDraft(DRAFT_KEY);

      // Form Clear
      setPickupLocation("");
      setTourRequests("");
      setTime("");
      setDate(getTodayFormatted());
      setLanguage("");
      setTourDays(0);
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
      setContact((prev) => ({ ...prev, phone: "", specialRequests: "" }));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(toastId, tToast("error"));
      setErrors((prev) => ({ ...prev, form: tErr("vehicleBookingFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  // Restore draft
  useEffect(() => {
    const id = setTimeout(() => {
      if (!AUTO_SUBMIT_AFTER_LOGIN || !user) {
        const draft = loadServiceDraft(DRAFT_KEY);
        if (!draft || restoredRef.current) return;
        restoredRef.current = true;

        if (draft.pickupLocation) setPickupLocation(draft.pickupLocation);
        if (draft.date) setDate(draft.date);
        if (draft.time) setTime(draft.time);
        if (draft.language) setLanguage(draft.language);
        if (draft.tourDays) setTourDays(draft.tourDays);
        if (draft.travelerCounts) setTravelerCounts(draft.travelerCounts);
        if (draft.tourRequests) setTourRequests(draft.tourRequests);
        if (draft.tourPackageType) setTourPackageType(draft.tourPackageType);
        if (draft.activeFilter) {
          setActiveFilter(draft.activeFilter as ActiveVehicleFilter);
        }
        if (draft.selectedVehicleId) {
          setSelectedVehicleId(draft.selectedVehicleId);
        }
      setContact({
          fullName: draft.fullName || "",
          email: draft.email || "",
          phone: draft.phone || "",
          specialRequests: draft.specialRequests || "", 
        });
        setDraftRestored(true);
        return;
      }

      if (autoHandledRef.current) return;
      autoHandledRef.current = true;

      const draft = claimServiceDraft(DRAFT_KEY);
      if (!draft) return;

      if (draft.pickupLocation) setPickupLocation(draft.pickupLocation);
      if (draft.date) setDate(draft.date);
      if (draft.time) setTime(draft.time);
      if (draft.language) setLanguage(draft.language);
      if (draft.tourDays) setTourDays(draft.tourDays);
      if (draft.travelerCounts) setTravelerCounts(draft.travelerCounts);
      if (draft.tourRequests) setTourRequests(draft.tourRequests);
      if (draft.tourPackageType) setTourPackageType(draft.tourPackageType);
      if (draft.activeFilter) {
        setActiveFilter(draft.activeFilter as ActiveVehicleFilter);
      }
      if (draft.selectedVehicleId) {
        setSelectedVehicleId(draft.selectedVehicleId);
      }
      const restoredContact = {
        fullName: draft.fullName,
        email: draft.email,
        phone: draft.phone,
        specialRequests: draft.specialRequests,
      };
      setContact(restoredContact);

      if (draft.autoSubmit) {
        const isValid = validate({
          date: draft.date || "",
          time: draft.time || "",
          language: draft.language || "",
          days: draft.tourDays || 0,
          counts: draft.travelerCounts || {},
          pickupLocation: draft.pickupLocation || "",
          tourRequests: draft.tourRequests || "",
          fullName: restoredContact.fullName,
          email: restoredContact.email,
          phone: restoredContact.phone,
          specialRequests: restoredContact.specialRequests,
        });

        if (isValid) {
          void submitPrivateVehicle(
            draft.date || "",
            draft.time || "",
            draft.language || "",
            draft.tourDays || 0,
            draft.travelerCounts || { adult: 0, couple: 0, child: 0, infant: 0 },
            draft.pickupLocation || "",
            draft.tourRequests || "",
            draft.tourPackageType || "driver",
            restoredContact,
          );
        }
      }
    }, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      date,
      time,
      language,
      days: tourDays,
      counts: travelerCounts,
      pickupLocation,
      tourRequests,
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      specialRequests: contact.specialRequests,
    });

    if (!isValid) return;

    if (!user) {
      saveServiceDraft(DRAFT_KEY, {
        activeFilter,
        selectedVehicleId,
        pickupLocation,
        date,
        time,
        language,
        tourDays,
        travelerCounts,
        tourRequests,
        tourPackageType,
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        specialRequests: contact.specialRequests,
        autoSubmit: AUTO_SUBMIT_AFTER_LOGIN,
      });
      setShowAuthModal(true);
      return;
    }

    await submitPrivateVehicle(
      date,
      time,
      language,
      tourDays,
      travelerCounts,
      pickupLocation,
      tourRequests,
      tourPackageType,
      contact,
    );
  };

  return {
    tourPackageType,
    setTourPackageType,
    activeFilter,
    setActiveFilter,
    selectedVehicleId,
    setSelectedVehicleId,
    pickupLocation,
    setPickupLocation,
    tourRequests,
    setTourRequests,
    date,
    setDate,
    time,
    setTime,
    language,
    setLanguage,
    tourDays,
    handleTourDaysChange,
    travelerCounts,
    handleTravelerChange,
    contact,
    setContact,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
    showAuthModal,
    closeAuthModal: () => setShowAuthModal(false),
    draftRestored,
    clearDraftRestored: () => setDraftRestored(false),
  };
}
