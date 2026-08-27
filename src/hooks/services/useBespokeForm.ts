// src/hooks/auth/useBespokeForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { type ContactData } from "@/components/services/ContactForm";
import { vehicles } from "@/data/vehicles";
import { bespokeService } from "@/services/services/bespokeService";
import { useTranslations } from "next-intl";

export function useBespokeForm() {
  const defaultCategory = vehicles[0].category;
  const defaultVehicleId = vehicles[0].id;

  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>(defaultCategory);
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicleId);

  const [pickupLocation, setPickupLocation] = useState("");
  const [tourRequests, setTourRequests] = useState("");

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

  const [isLoading, setIsLoading] = useState(false);
  const { errors, validate, setErrors } = useValidationForm();

  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const tErr = useTranslations("ValidationErrors.ServerErrors");

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

    try {
      setIsLoading(true);

      const payload = {
        activeFilter,
        selectedVehicleId,
        pickupLocation,
        tourRequests,
        date,
        time,
        language,
        tourDays,
        travelerCounts,
        contact,
      };

      // await new Promise((resolve) => setTimeout(resolve, 1500));
      await bespokeService.submitBespokeTour(payload);
      console.log("Bespoke Form valid and submitted!", {
        activeFilter,
        selectedVehicleId,
        pickupLocation,
        tourRequests,
        date,
        time,
        language,
        tourDays,
        travelerCounts,
        contact,
      });

      // Form  Clear
      setPickupLocation("");
      setTourRequests("");
      setDate("");
      setTime("");
      setLanguage("");
      setTourDays(0);
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
      setContact({ fullName: "", email: "", phone: "", specialRequests: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("submissionFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
