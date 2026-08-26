import { useState, useMemo, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { transferServiceIds, type TransferServiceId } from "@/data/transfers";
import { vehicles } from "@/data/vehicles";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { type ContactData } from "@/components/services/ContactForm";
import { useSearchParams } from "next/navigation";
import { transferServiceApi } from "@/services/services/transferService";

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

    try {
      setIsLoading(true);

      const payload = {
        serviceType,
        selectedVehicleId,
        selectedVehicle,
        pickupLocation,
        dropoffLocation,
        date,
        time,
        language,
        travelerCounts,
        contact,
      };

      await transferServiceApi.bookTransfer(payload);
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Transfer Form valid and submitted!", {
        serviceType,
        selectedVehicleId,
        selectedVehicle,
        pickupLocation,
        dropoffLocation,
        date,
        time,
        language,
        travelerCounts,
        contact,
      });

      // Form  Clear
      setPickupLocation("");
      setDropoffLocation("");
      setDate("");
      setTime("");
      setLanguage("");
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
      setContact({ fullName: "", email: "", phone: "", specialRequests: "" });
      
    } catch (error) {
      console.error("Submission error:", error);
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
