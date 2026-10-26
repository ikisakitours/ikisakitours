import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { type ContactData } from "@/components/services/ContactForm";
import { vehicles } from "@/data/vehicles";
import { privateVehicleService } from "@/services/services/privateVehicleService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function usePrivateVehicleForm() {
  const defaultCategory = vehicles[0].category;
  const defaultVehicleId = vehicles[0].id;

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
  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>(defaultCategory);
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicleId);

  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();

  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.VehicleBooking");
  const toast = useToast();

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
    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      const payload = {
        vehicleType: activeFilter.toLowerCase(),
        tourPackageType: `with ${tourPackageType}`,
        pickupLocation: pickupLocation,
        language: language,
        journeyDate: date,
        pickupTime: time,
        travelers: {
          adults: travelerCounts.adult,
          couples: travelerCounts.couple / 2,
          children: travelerCounts.child,
          infants: travelerCounts.infant,
        },
        tourDuration: `${tourDays}day`,
        description: tourRequests,
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phone,
        specialRequests: contact.specialRequests,
      };

      const [response] = await Promise.all([
        privateVehicleService.bookVehicle(payload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      console.log("Private Vehicle Form valid and submitted!", response);

      // Form  Clear
      setPickupLocation("");
      setTourRequests("");
      setTime("");
      setLanguage("");
      setTourDays(0);
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
      setContact((prev) => ({
        ...prev,
        phone: "",
        specialRequests: "",
      }));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(toastId, tToast("error"));
      setErrors((prev) => ({ ...prev, form: tErr("vehicleBookingFailed") }));
    } finally {
      setIsLoading(false);
    }
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
  };
}
