// src/hooks/services/useTransferBookingForm.ts
import { useRef, useEffect, useState, useMemo, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { transferServiceIds, type TransferServiceId } from "@/data/transfers";
import { vehicles } from "@/data/vehicles";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { type ContactData } from "@/components/services/ContactForm";
import { useSearchParams } from "next/navigation";
import { transferServiceApi } from "@/services/services/transferService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { claimServiceDraft, loadServiceDraft, saveServiceDraft, clearServiceDraft } from "@/utils/draft/servicesDraft";

const AUTO_SUBMIT_AFTER_LOGIN = false;
const DRAFT_KEY = "transfer_form";

export function useTransferBookingForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as TransferServiceId | null;
  const initialServiceType = typeParam && transferServiceIds.includes(typeParam) ? typeParam : "pickup";

  const [serviceType, setServiceType] = useState<TransferServiceId>(initialServiceType);

  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState<string>("");
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
  const tToast = useTranslations("ValidationErrors.ToastMessages.TransferBooking");

  const restoredRef = useRef(false);
  const autoHandledRef = useRef(false);

  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;
      const current = prev[type] || 0;
      const next = current + actualDelta;
      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.category.toLowerCase() === activeFilter.toLowerCase()) ?? vehicles[0],
    [activeFilter],
  );

  const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const submitTransfer = async (
    payloadDate: string,
    payloadTime: string,
    payloadLanguage: string,
    payloadCounts: Record<string, number>,
    payloadPickup: string,
    payloadDropoff: string,
    payloadServiceType: TransferServiceId,
    payloadContact: ContactData,
  ) => {
    if (!user) return;

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);
      let mappedServiceType = "hotel and city";
      if (payloadServiceType === "pickup") mappedServiceType = "airport pickup";
      if (payloadServiceType === "dropoff") mappedServiceType = "airport drop off";

      const payload = {
        serviceType: mappedServiceType,
        vehicleType: activeFilter.toLowerCase(),
        pickupLocation: payloadPickup,
        dropOffLocation: payloadDropoff,
        journeyDate: payloadDate,
        pickupTime: payloadTime,
        language: payloadLanguage,
        travelers: {
          adults: payloadCounts.adult,
          couples: payloadCounts.couple / 2,
          children: payloadCounts.child,
          infants: payloadCounts.infant,
        },
        fullName: payloadContact.fullName || user.firstname,
        email: payloadContact.email || user.email,
        phoneNumber: payloadContact.phone,
        specialRequests: payloadContact.specialRequests,
      };

      await Promise.all([transferServiceApi.bookTransfer(payload), new Promise((resolve) => setTimeout(resolve, 800))]);

      toast.success(toastId, tToast("success"), 2000);
      clearServiceDraft(DRAFT_KEY);

      // Form Clear
      setPickupLocation("");
      setDropoffLocation("");
      setTime("");
      setDate(getTodayFormatted());
      setLanguage("");
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
      setContact((prev) => ({ ...prev, phone: "", specialRequests: "" }));
      setServiceType(initialServiceType);

      setActiveFilter("");
      setSelectedVehicleId("");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(toastId, tToast("error"));
      setErrors((prev) => ({ ...prev, form: tErr("transferBookingFailed") }));
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
        if (draft.dropoffLocation) setDropoffLocation(draft.dropoffLocation);
        if (draft.date) setDate(draft.date);
        if (draft.time) setTime(draft.time);
        if (draft.language) setLanguage(draft.language);
        if (draft.travelerCounts) setTravelerCounts(draft.travelerCounts);

        if (draft.activeFilter) setActiveFilter(draft.activeFilter as ActiveVehicleFilter);
        if (draft.selectedVehicleId) setSelectedVehicleId(draft.selectedVehicleId);

        if (draft.serviceType && transferServiceIds.includes(draft.serviceType as TransferServiceId)) {
          setServiceType(draft.serviceType as TransferServiceId);
        }

        setContact({
          fullName: draft.fullName,
          email: draft.email,
          phone: draft.phone,
          specialRequests: draft.specialRequests,
        });
        setDraftRestored(true);
        return;
      }

      if (autoHandledRef.current) return;
      autoHandledRef.current = true;

      const draft = claimServiceDraft(DRAFT_KEY);
      if (!draft) return;

      if (draft.pickupLocation) setPickupLocation(draft.pickupLocation);
      if (draft.dropoffLocation) setDropoffLocation(draft.dropoffLocation);
      if (draft.date) setDate(draft.date);
      if (draft.time) setTime(draft.time);
      if (draft.language) setLanguage(draft.language);
      if (draft.travelerCounts) setTravelerCounts(draft.travelerCounts);

      let restoredServiceType: TransferServiceId = "pickup";
      if (draft.tourRequests && transferServiceIds.includes(draft.tourRequests as TransferServiceId)) {
        restoredServiceType = draft.tourRequests as TransferServiceId;
        setServiceType(restoredServiceType);
      }
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
          counts: draft.travelerCounts || {},
          pickupLocation: draft.pickupLocation || "",
          dropoffLocation: draft.dropoffLocation || "",
          fullName: restoredContact.fullName,
          email: restoredContact.email,
          phone: restoredContact.phone,
          specialRequests: restoredContact.specialRequests,
        });

        if (isValid) {
          void submitTransfer(
            draft.date || "",
            draft.time || "",
            draft.language || "",
            draft.travelerCounts || { adult: 0, couple: 0, child: 0, infant: 0 },
            draft.pickupLocation || "",
            draft.dropoffLocation || "",
            restoredServiceType,
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
      counts: travelerCounts,
      pickupLocation,
      dropoffLocation,
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
        serviceType,
        pickupLocation,
        dropoffLocation,
        date,
        time,
        language,
        travelerCounts,
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        specialRequests: contact.specialRequests,
        autoSubmit: AUTO_SUBMIT_AFTER_LOGIN,
      });
      setShowAuthModal(true);
      return;
    }

    await submitTransfer(date, time, language, travelerCounts, pickupLocation, dropoffLocation, serviceType, contact);
  };

  return {
    serviceType,
    setServiceType,
    activeFilter,
    setActiveFilter,
    selectedVehicleId,
    setSelectedVehicleId,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    date,
    setDate,
    time,
    setTime,
    language,
    setLanguage,
    travelerCounts,
    handleTravelerChange,
    selectedVehicle,
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
