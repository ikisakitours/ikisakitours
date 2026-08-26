import { fieldLabelClass, inputClass } from "@/components/services/formStyles";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import CustomTimePicker from "@/components/ui/CustomTimePicker";
import { VehicleSelector, type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { TravelerPicker } from "@/components/ui/TravelerPicker";
import { TourDurationPicker } from "@/components/ui/TourDurationPicker";
import { FormError } from "@/components/ui/FormError";
import LanguageSelect, { type LanguageOption } from "@/components/services/LanguageSelect";
//Icons
import { Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

type PrivateVehicleJourneyFieldsProps = {
  activeFilter: ActiveVehicleFilter;
  onFilterChange: (filter: ActiveVehicleFilter) => void;
  onVehicleChange: (vehicleId: string) => void;
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (time: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  travelerCounts: Record<string, number>;
  onTravelerChange: (type: string, delta: number) => void;
  tourDays: number;
  onTourDaysChange: (delta: number) => void;
  pickupLocation: string;
  onPickupLocationChange: (loc: string) => void;
  tourRequests: string;
  onTourRequestsChange: (req: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  languagesList: LanguageOption[];
  isLoading?: boolean;
};

const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
  const target = e.currentTarget;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
};

export function PrivateVehicleJourneyFields({
  activeFilter,
  onFilterChange,
  onVehicleChange,
  date,
  onDateChange,
  time,
  onTimeChange,
  language,
  onLanguageChange,
  travelerCounts,
  onTravelerChange,
  tourDays,
  onTourDaysChange,
  pickupLocation,
  onPickupLocationChange,
  tourRequests,
  onTourRequestsChange,
  errors,
  setErrors,
  languagesList,
  isLoading = false,
}: PrivateVehicleJourneyFieldsProps) {
  const tForm = useTranslations("SharedForm");

  const travelerOptions = [
    {
      type: "adult",
      label: tForm("TravelerOptions.adult"),
      pluralLabel: tForm("TravelerOptions.adults"),
      ageRange: tForm("TravelerOptions.adultAge"),
    },
    {
      type: "couple",
      label: tForm("TravelerOptions.couple"),
      pluralLabel: tForm("TravelerOptions.couples"),
      ageRange: tForm("TravelerOptions.coupleAge"),
    },
    {
      type: "child",
      label: tForm("TravelerOptions.child"),
      pluralLabel: tForm("TravelerOptions.children"),
      ageRange: tForm("TravelerOptions.childAge"),
    },
    {
      type: "infant",
      label: tForm("TravelerOptions.infant"),
      pluralLabel: tForm("TravelerOptions.infants"),
      ageRange: tForm("TravelerOptions.infantAge"),
    },
  ];
  const apiClosedDates = ["2026-08-28", "2026-09-05", "2026-09-12"];

  return (
    <div className="space-y-8">
      {/* Vehicle Type Filter */}
      <div>
        <span className={fieldLabelClass + " mb-4 block"}>{tForm("Labels.selectVehicle")}</span>
        <VehicleSelector
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          onVehicleChange={onVehicleChange}
          showDriverIncludedNote={true}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        {/* Pick up location */}
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.pickupLocation")}</span>
          <span className="relative block">
            <MapPin className="absolute left-4 top-1/2 h-4.5 w-4.5 md:h-5 md:w-5 -translate-y-1/2 text-slate-500" />
            <input
              className={`${inputClass} pl-11`}
              placeholder={tForm("Placeholders.pickupLocation")}
              value={pickupLocation}
              disabled={isLoading}
              onChange={(e) => {
                onPickupLocationChange(e.target.value);
                setErrors((prev) => ({ ...prev, pickupLocation: "" }));
              }}
            />
          </span>
          <div className="ml-2">
            <FormError message={errors.pickupLocation} />
          </div>
        </label>
        {/* Language */}
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.conciergeLanguage")}</span>
          <LanguageSelect
            value={language}
            isLoading={isLoading}
            onChange={(val) => {
              onLanguageChange(val);
              setErrors((prev) => ({ ...prev, language: "" }));
            }}
            options={languagesList}
            icon={<Globe className="h-4.5 w-4.5 md:h-5 md:w-5" />}
            placeholder={tForm("Placeholders.selectLanguage")}
          />
          <div className="ml-2">
            <FormError message={errors.language} />
          </div>
        </label>
        {/* Date */}
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.journeyDate")}</span>
          <CustomDatePicker
            value={date}
            closedDates={apiClosedDates}
            isLoading={isLoading}
            onChange={(d) => {
              onDateChange(d);
              setErrors((prev) => ({ ...prev, date: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.date} />
          </div>
        </label>
        {/* Time */}
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.pickupTime")}</span>
          <CustomTimePicker
            value={time}
            isLoading={isLoading}
            onChange={(t) => {
              onTimeChange(t);
              setErrors((prev) => ({ ...prev, time: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.time} />
          </div>
        </label>
        {/* Travelers */}
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.travelers")}</span>
          <TravelerPicker
            options={travelerOptions}
            counts={travelerCounts}
            isLoading={isLoading}
            onChange={(type, delta) => {
              onTravelerChange(type, delta);
              setErrors((prev) => ({ ...prev, travelers: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.travelers} />
          </div>
        </label>
        {/* Durations */}
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.tourDuration")}</span>
          <TourDurationPicker
            isLoading={isLoading}
            days={tourDays}
            onChange={(delta) => {
              onTourDaysChange(delta);
              setErrors((prev) => ({ ...prev, days: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.days} />
          </div>
        </label>
      </div>
      {/*Plan Requests*/}
      <label className="mb-8 flex flex-col gap-1 group">
        <span className={fieldLabelClass}>{tForm("Labels.tourPlanRequests")}</span>
        <textarea
          className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none p-4 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
          placeholder={tForm("Placeholders.tourPlanRequests")}
          onInput={handleInput}
          value={tourRequests}
          disabled={isLoading}
          onChange={(e) => {
            onTourRequestsChange(e.target.value);
            if (errors.tourRequests) {
              setErrors((prev) => ({ ...prev, tourRequests: "" }));
            }
          }}
        />
        <span className="mt-1 block text-caption font-medium text-slate-500 leading-relaxed">
          {tForm("Messages.autoExpand")}
        </span>
        <div className=" relative z-10">
          <FormError message={errors.tourRequests} />
        </div>
      </label>
    </div>
  );
}
