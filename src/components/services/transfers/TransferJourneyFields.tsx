import { fieldLabelClass, inputClass } from "@/components/services/formStyles";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import CustomTimePicker from "@/components/ui/CustomTimePicker";
import { TravelerPicker } from "@/components/ui/TravelerPicker";
import { VehicleSelector, type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { FormError } from "@/components/ui/FormError";
import LanguageSelect, { type LanguageOption } from "@/components/services/LanguageSelect";
//Icons
import { Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

type TransferJourneyFieldsProps = {
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
  pickupLocation: string;
  onPickupLocationChange: (loc: string) => void;
  dropoffLocation: string;
  onDropoffLocationChange: (loc: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  languagesList: LanguageOption[];
};

export function TransferJourneyFields({
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
  pickupLocation,
  onPickupLocationChange,
  dropoffLocation,
  onDropoffLocationChange,
  errors,
  setErrors,
  languagesList,
}: TransferJourneyFieldsProps) {
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

  return (
    <div className="space-y-8">
      {/* Vehicle Type Filter */}
      <div>
        <span className={fieldLabelClass + " mb-4 block"}>{tForm("Labels.selectVehicleType")}</span>
        <VehicleSelector
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          onVehicleChange={onVehicleChange}
        />
      </div>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.pickupLocation")}</span>
          <span className="relative block">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-gold" />
            <input
              className={`${inputClass} pl-11`}
              placeholder={tForm("Placeholders.pickupLocation")}
              value={pickupLocation}
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

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.dropoffLocation")}</span>
          <span className="relative block">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-gold" />
            <input
              className={`${inputClass} pl-11`}
              placeholder={tForm("Placeholders.dropoffLocation")}
              value={dropoffLocation}
              onChange={(e) => {
                onDropoffLocationChange(e.target.value);
                setErrors((prev) => ({ ...prev, dropoffLocation: "" }));
              }}
            />
          </span>
          <div className="ml-2">
            <FormError message={errors.dropoffLocation} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.journeyDate")}</span>
          <CustomDatePicker
            value={date}
            onChange={(d) => {
              onDateChange(d);
              setErrors((prev) => ({ ...prev, date: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.date} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.pickupTime")}</span>
          <CustomTimePicker
            value={time}
            onChange={(t) => {
              onTimeChange(t);
              setErrors((prev) => ({ ...prev, time: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.time} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.conciergeLanguage")}</span>
          <LanguageSelect
            value={language}
            onChange={(val) => {
              onLanguageChange(val);
              setErrors((prev) => ({ ...prev, language: "" }));
            }}
            options={languagesList}
            icon={<Globe className="h-4 w-4" />}
            placeholder={tForm("Placeholders.selectLanguage")}
          />
          <div className="ml-2">
            <FormError message={errors.language} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>{tForm("Labels.travelers")}</span>
          <TravelerPicker
            options={travelerOptions}
            counts={travelerCounts}
            onChange={(type, delta) => {
              onTravelerChange(type, delta);
              setErrors((prev) => ({ ...prev, travelers: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.travelers} />
          </div>
        </label>
      </div>
    </div>
  );
}
