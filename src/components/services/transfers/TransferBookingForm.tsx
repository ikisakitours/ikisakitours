"use client";

import { type FormEvent, useMemo, useState } from "react";
import { transferServiceIds, type TransferServiceId } from "@/data/transfers";
import { vehicles } from "@/data/vehicles";
import { TransferFareSummary } from "./TransferFareSummary";
import { TransferJourneyFields } from "./TransferJourneyFields";
import { TransferServiceSelector } from "./TransferServiceSelector";
import { type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { ContactForm, type ContactData } from "@/components/services/ContactForm";
import { useValidationForm } from "@/hooks/useValidationForm";
import { CrossPromotionSection } from "@/components/services/CrossPromotionSection";
import FormPanel from "@/components/services/FormPanel";
import StepHeading from "@/components/services/StepHeading";
import { useTranslations } from "next-intl";
import { languages } from "@/data/Languages-CurrencyData";
import { useSearchParams } from "next/navigation";

export function TransferBookingForm() {
  const tStep = useTranslations("Services.StepHeadings");
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
      phone: contact.phone,
      specialRequests: contact.specialRequests,
    });

    if (isValid) {
      console.log("Form is valid, proceed to API call");
    }
  };

  return (
    <ContainerLayout className="relative z-20 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="grid gap-8 xl:grid-cols-12 xl:items-start">
        <form className="space-y-8 xl:col-span-8" onSubmit={handleSubmit}>
          <FormPanel>
            <StepHeading step="1">{tStep("step1Service")}</StepHeading>
            <TransferServiceSelector
              selectedServiceId={serviceType}
              onServiceChange={(id) => {
                setServiceType(id);
              }}
            />
          </FormPanel>

          <FormPanel className="z-10">
            <StepHeading step="2">{tStep("step2Journey")}</StepHeading>
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
              languagesList={languages}
            />
          </FormPanel>

          <FormPanel className="border-t-2 border-gold/30">
            <StepHeading step="3" subtitle={tStep("stepContactSub")}>
              {tStep("stepContact")}
            </StepHeading>
            <ContactForm data={contact} setData={setContact} errors={errors} setErrors={setErrors} />
          </FormPanel>
        </form>

        {/* Fare Summary Sidebar */}
        <TransferFareSummary selectedServiceId={serviceType} selectedVehicle={selectedVehicle} />
      </div>
      <div className="xl:col-span-12">
        <CrossPromotionSection />
      </div>
    </ContainerLayout>
  );
}
