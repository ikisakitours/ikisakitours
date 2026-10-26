import { useState, useMemo, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { transferServiceIds, type TransferServiceId } from "@/data/transfers";
import { vehicles } from "@/data/vehicles";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { type ContactData } from "@/components/services/ContactForm";
import { useSearchParams } from "next/navigation";
import { transferServiceApi } from "@/services/services/transferService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function useTransferBookingForm() {
  const defaultCategory = vehicles[0].category;
  const defaultVehicleId = vehicles[0].id;

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as TransferServiceId | null;
  const initialServiceType = typeParam && transferServiceIds.includes(typeParam) ? typeParam : "pickup";

  const [serviceType, setServiceType] = useState<TransferServiceId>(initialServiceType);
  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>(defaultCategory);
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicleId);

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

  const [isLoading, setIsLoading] = useState(false);

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
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0],
    [selectedVehicleId],
  );

  const { errors, validate, setErrors } = useValidationForm();
  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.TransferBooking");
  const toast = useToast();
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
    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);
      let mappedServiceType = "hotel and city";
      if (serviceType === "pickup") mappedServiceType = "airport pickup";
      if (serviceType === "dropoff") mappedServiceType = "airport drop off";

      const payload = {
        serviceType: mappedServiceType,
        vehicleType: activeFilter.toLowerCase(),
        pickupLocation: pickupLocation,
        dropOffLocation: dropoffLocation,
        journeyDate: date,
        pickupTime: time,
        language: language,
        travelers: {
          adults: travelerCounts.adult,
          couples: travelerCounts.couple / 2,
          children: travelerCounts.child,
          infants: travelerCounts.infant,
        },
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phone,
        specialRequests: contact.specialRequests,
      };

      const [response] = await Promise.all([
        transferServiceApi.bookTransfer(payload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      toast.success(toastId, tToast("success"), 2000);
      console.log("Transfer Form valid and submitted", response);

      // Form  Clear
      setPickupLocation("");
      setDropoffLocation("");
      setTime("");
      setLanguage("");
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
      setContact((prev) => ({
        ...prev,
        phone: "",
        specialRequests: "",
      }));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(toastId, tToast("error"));
      setErrors((prev) => ({ ...prev, form: tErr("transferBookingFailed") }));
    } finally {
      setIsLoading(false);
    }
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
  };
}
