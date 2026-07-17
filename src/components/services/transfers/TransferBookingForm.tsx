"use client";

import { type FormEvent, useMemo, useState } from "react";
import { transferServiceTypes, type TransferServiceId, transferLanguages } from "@/data/transfers";
import { vehicles } from "@/data/vehicles";
import { TransferFareSummary } from "./TransferFareSummary";
import { TransferJourneyFields } from "./TransferJourneyFields";
import { TransferServiceSelector } from "./TransferServiceSelector";
import { type ActiveVehicleFilter } from "./TransferVehicleSelector";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { ContactForm, type ContactData } from "@/components/services/ContactForm";
import { useValidationForm } from "@/hooks/useValidationForm";
import { CrossPromotionSection } from "@/components/services/CrossPromotionSection";
import FormPanel from "@/components/services/FormPanel";
import StepHeading from "@/components/services/StepHeading";

export function TransferBookingForm() {
  const defaultCategory = vehicles[0].category;
  const defaultVehicleId = vehicles[0].id;

  const [serviceType, setServiceType] = useState<TransferServiceId>("pickup");
  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>(defaultCategory);
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicleId);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState<string>(transferLanguages[0] || "English");

  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    adult: 0,
    couple: 0,
    child: 0,
    infant: 0,
  });

  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;
      const current = prev[type] || 0;
      const next = current + actualDelta;

      if (next < 0) return prev;

      return { ...prev, [type]: next };
    });
  };

  const selectedService = useMemo(
    () => transferServiceTypes.find((service) => service.id === serviceType) ?? transferServiceTypes[0],
    [serviceType],
  );

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0],
    [selectedVehicleId],
  );

  const { errors, validate, setErrors } = useValidationForm();
  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    email: "",
    whatsapp: "",
    specialRequests: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
      whatsapp: contact.whatsapp,
      specialRequests: contact.specialRequests,
    });

    if (isValid) {
      console.log("Form is valid, proceed to API call");
    }
  };

  return (
    <ContainerLayout className="relative z-20 -mt-24 pb-24">
      <div className="grid gap-8 xl:grid-cols-12 xl:items-start">
        <form className="space-y-8 xl:col-span-8" onSubmit={handleSubmit}>
          <FormPanel>
            <StepHeading step="1">Service Type</StepHeading>
            <TransferServiceSelector
              selectedServiceId={serviceType}
              onServiceChange={(id) => {
                setServiceType(id);
              }}
            />
          </FormPanel>

          <FormPanel className="z-10">
            <StepHeading step="2">Journey Details</StepHeading>
            <TransferJourneyFields
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onVehicleChange={setSelectedVehicleId}
              date={date}
              onDateChange={setDate}
              time={time}
              onTimeChange={setTime}
              language={language}
              onLanguageChange={setLanguage}
              travelerCounts={travelerCounts}
              onTravelerChange={handleTravelerChange}
              pickupLocation={pickupLocation}
              onPickupLocationChange={setPickupLocation}
              dropoffLocation={dropoffLocation}
              onDropoffLocationChange={setDropoffLocation}
              errors={errors}
              setErrors={setErrors}
            />
          </FormPanel>

          <FormPanel className="border-t-2 border-gold/30">
            <StepHeading step="3" subtitle="Chauffeur assignment details">
              Contact Information
            </StepHeading>
            <ContactForm data={contact} setData={setContact} errors={errors} setErrors={setErrors} />
          </FormPanel>
        </form>

        {/* Fare Summary Sidebar */}
        <TransferFareSummary selectedService={selectedService} selectedVehicle={selectedVehicle} />
      </div>
      <div className="xl:col-span-12">
        <CrossPromotionSection />
      </div>
    </ContainerLayout>
  );
}
