"use client";
import { TransferFareSummary } from "./TransferFareSummary";
import { TransferJourneyFields } from "./TransferJourneyFields";
import { TransferServiceSelector } from "./TransferServiceSelector";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { ContactForm } from "@/components/services/ContactForm";
import { CrossPromotionSection } from "@/components/services/CrossPromotionSection";
import FormPanel from "@/components/services/FormPanel";
import StepHeading from "@/components/services/StepHeading";
import { useTranslations } from "next-intl";
import { languages } from "@/data/Languages-CurrencyData";
import { useTransferBookingForm } from "@/hooks/services/useTransferBookingForm";

export function TransferBookingForm() {
  const tStep = useTranslations("Services.StepHeadings");

  // Hook
  const {
    serviceType,
    setServiceType,
    activeFilter,
    setActiveFilter,
    // selectedVehicleId,
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
  } = useTransferBookingForm();

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
              isLoading={isLoading}
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
              isLoading={isLoading}
            />
          </FormPanel>

          <FormPanel className="border-t-2 border-gold/30">
            <StepHeading step="3" subtitle={tStep("stepContactSub")}>
              {tStep("stepContact")}
            </StepHeading>
            <ContactForm
              data={contact}
              setData={setContact}
              errors={errors}
              setErrors={setErrors}
              isLoading={isLoading}
            />
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
