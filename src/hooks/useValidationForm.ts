import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTranslations } from "next-intl";
export interface ValidationData {
  date?: string;
  counts?: Record<string, number>;
  time?: string;
  days?: number;
  fullName?: string;
  country?: string;
  rating?: number;
  experience?: string;
  images?: File[];

  pickupLocation?: string;
  dropoffLocation?: string;
  language?: string;
  tourRequests?: string;
  specialRequests?: string;
  email?: string;
  serviceType?: string;

  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
  terms?: boolean;
  otp?: string[];

  phone?: string;
  subject?: string;
  message?: string;
  tourInterest?: string;

  inquiryType?: string;
}

export const useValidationForm = () => {
  const t = useTranslations("ValidationErrors");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: ValidationData) => {
    const newErrors: Record<string, string> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Date Validation
    if (data.date !== undefined) {
      if (!data.date) {
        newErrors.date = t("dateRequired");
      } else {
        const selectedDate = new Date(data.date.replace(/-/g, " "));
        if (selectedDate <= today) newErrors.date = t("dateFuture");
      }
    }

    // 2. Travelers Validation
    if (data.counts !== undefined) {
      const totalTravelers = Object.values(data.counts).reduce((a, b) => a + b, 0);
      if (totalTravelers === 0) newErrors.travelers = t("travelersRequired");
    }

    // 3. Time Validation
    if (data.time !== undefined && (data.time === "" || data.time === "Select time")) {
      newErrors.time = t("timeRequired");
    }

    // 4. Duration Validation
    if (data.days !== undefined && data.days < 1) {
      newErrors.days = t("daysMin");
    }

    // 5. Review Form Validation
    if (data.fullName !== undefined && !data.fullName.trim()) newErrors.fullName = t("fullNameRequired");
    if (data.country !== undefined && !data.country.trim()) newErrors.country = t("countryRequired");
    if (data.rating !== undefined && data.rating === 0) newErrors.rating = t("ratingRequired");
    if (data.experience !== undefined) {
      if (!data.experience.trim()) {
        newErrors.experience = t("experienceRequired");
      } else if (data.experience.trim().length < 10) {
        newErrors.experience = t("experienceMinLength");
      }
    }

    // 6. Image Validation
    if (data.images !== undefined) {
      if (data.images.length > 5) {
        newErrors.images = t("imagesMax");
      } else if (data.images.some((file) => file.size > 5 * 1024 * 1024)) {
        newErrors.images = t("imagesSize");
      }
    }

    // 7. Pickup  Location Validation
    if (data.pickupLocation !== undefined && !data.pickupLocation.trim())
      newErrors.pickupLocation = t("pickupRequired");

    // 8. Drop-off Location Validation
    if (data.dropoffLocation !== undefined && !data.dropoffLocation.trim())
      newErrors.dropoffLocation = t("dropoffRequired");

    // 9. Language Validation
    if (data.language !== undefined && (!data.language || data.language === ""))
      newErrors.language = t("languageRequired");

    // 10. Eamail Validation
    if (data.email !== undefined) {
      const trimmedEmail = data.email.trim();

      if (trimmedEmail === "") {
        newErrors.email = t("emailRequired");
      } else {
        const secureEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!secureEmailRegex.exec(trimmedEmail)) {
          newErrors.email = t("emailInvalid");
        }
      }
    }
    // 11. Tour Requests Validation
    if (data.tourRequests !== undefined && !data.tourRequests.trim()) {
      newErrors.tourRequests = t("tourRequestsRequired");
    }

    // 12. Service Type Validation
    if (data.serviceType !== undefined && !data.serviceType) newErrors.serviceType = "Please select a service type";

    // 13. Password Validation
    if (data.password !== undefined) {
      if (!data.password) {
        newErrors.password = t("passwordRequired");
      } else if (data.password.length < 8) {
        newErrors.password = t("passwordMinLength");
      } else if (!/[A-Z]/.test(data.password)) {
        newErrors.password = t("passwordUppercase");
      } else if (!/[a-z]/.test(data.password)) {
        newErrors.password = t("passwordLowercase");
      } else if (!/\d/.test(data.password)) {
        newErrors.password = t("passwordNumber");
      } else if (!/[^A-Za-z0-9]/.test(data.password)) {
        newErrors.password = t("passwordSpecial");
      }
    }

    // 14. Confirm Password Validation
    if (data.confirmPassword !== undefined) {
      if (!data.confirmPassword) newErrors.confirmPassword = t("confirmPasswordRequired");
      else if (data.confirmPassword !== data.password) newErrors.confirmPassword = t("passwordsMatch");
    }

    // 15. Current Password Validation
    if (data.currentPassword !== undefined) {
      if (!data.currentPassword) {
        newErrors.currentPassword = t("currentPasswordRequired");
      }
    }

    // 16. Terms Validation
    if (data.terms !== undefined && data.terms === false) {
      newErrors.terms = t("termsRequired");
    }

    // 17. Otp Validation
    if (data.otp !== undefined) {
      if (data.otp.some((digit) => digit === "")) newErrors.otp = t("otpRequired");
    }

    // 18. Image Validation for Profile
    if (data.images !== undefined) {
      if (data.images.length > 0) {
        const file = data.images[0];

        // Allowed File Types (Formats)
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
          newErrors.images = t("imageFormat");
        }
        // File Size Limit (5MB)
        else if (file.size > 5 * 1024 * 1024) {
          newErrors.images = t("imageSizeProfile");
        }
      }
    }

    // 19. Phone Validation
    if (data.phone !== undefined) {
      if (!data.phone || !data.phone.trim()) {
        newErrors.phone = t("phoneRequired");
      } else if (!isValidPhoneNumber(data.phone)) {
        newErrors.phone = t("phoneInvalid");
      }
    }

    // 20. Tour Interest Validation
    if (data.tourInterest !== undefined && !data.tourInterest) {
      newErrors.tourInterest = t("tourInterestRequired");
    }

    // 21. Subject Validation
    if (data.subject !== undefined && !data.subject.trim()) {
      newErrors.subject = t("subjectRequired");
    }

    // 22. Message Validation
    if (data.message !== undefined) {
      if (!data.message.trim()) {
        newErrors.message = t("messageRequired");
      } else if (data.message.trim().length < 10) {
        newErrors.message = t("messageMinLength");
      }
    }

    // 23. Inquiry Type Validation (අලුතින් එකතු කළ කොටස)
    if (data.inquiryType !== undefined && (!data.inquiryType || data.inquiryType.trim() === "")) {
      newErrors.inquiryType = t("inquiryTypeRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate, setErrors };
};
