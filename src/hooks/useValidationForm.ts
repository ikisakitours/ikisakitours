import { useState } from "react";

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
  whatsapp?: string;
  serviceType?: string;

  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
  terms?: boolean;
  otp?: string[];
}

export const useValidationForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: ValidationData) => {
    const newErrors: Record<string, string> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Date Validation
    if (data.date !== undefined) {
      if (!data.date) {
        newErrors.date = "Please select a journey date";
      } else {
        const selectedDate = new Date(data.date.replace(/-/g, " "));
        if (selectedDate <= today) newErrors.date = "Select a future date";
      }
    }

    // 2. Travelers Validation
    if (data.counts !== undefined) {
      const totalTravelers = Object.values(data.counts).reduce((a, b) => a + b, 0);
      if (totalTravelers === 0) newErrors.travelers = "Select at least one traveler";
    }

    // 3. Time Validation
    if (data.time !== undefined && (data.time === "" || data.time === "Select time")) {
      newErrors.time = "Please select a time";
    }

    // 4. Duration Validation
    if (data.days !== undefined && data.days < 1) {
      newErrors.days = "Duration must be at least 1 day";
    }

    // 5. Review Form Validation
    if (data.fullName !== undefined && !data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (data.country !== undefined && !data.country.trim()) newErrors.country = "Country is required";
    if (data.rating !== undefined && data.rating === 0) newErrors.rating = "Please select a star rating";
    if (data.experience !== undefined) {
      if (!data.experience.trim()) {
        newErrors.experience = "Please share your experience";
      } else if (data.experience.trim().length < 10) {
        newErrors.experience = "Experience description must be at least 10 characters long";
      }
    }

    // 6. Image Validation
    if (data.images !== undefined) {
      if (data.images.length > 5) {
        newErrors.images = "Maximum 5 photos allowed";
      } else if (data.images.some((file) => file.size > 5 * 1024 * 1024)) {
        newErrors.images = "Each photo must be less than 5MB";
      }
    }

    // 6. Pickup  Location Validation
    if (data.pickupLocation !== undefined && !data.pickupLocation.trim())
      newErrors.pickupLocation = "Pick-up location is required";

    // 7. Drop-off Location Validation
    if (data.dropoffLocation !== undefined && !data.dropoffLocation.trim())
      newErrors.dropoffLocation = "Drop-off location is required";

    // 8. Language Validation
    if (data.language !== undefined && (!data.language || data.language === ""))
      newErrors.language = "Please select a language";

    // 9. Eamail Validation
    if (data.email !== undefined && !/^\S+@\S+\.\S+$/.test(data.email))
      newErrors.email = "Please enter a valid email address";

    // 10. WhatsApp Validation
    if (data.whatsapp !== undefined && data.whatsapp.length < 9)
      newErrors.whatsapp = "Please enter a valid WhatsApp number";

    // 11. Tour Requests Validation
    if (data.tourRequests !== undefined && !data.tourRequests.trim()) {
      newErrors.tourRequests = "Please describe your tour plan requests";
    }

    // 12. Service Type Validation
    if (data.serviceType !== undefined && !data.serviceType) newErrors.serviceType = "Please select a service type";

    // 13. Password Validation
    if (data.password !== undefined) {
      if (!data.password) newErrors.password = "Password is required";
      else if (data.password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    }

    // 14. Confirm Password Validation
    if (data.confirmPassword !== undefined) {
      if (!data.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
      else if (data.confirmPassword !== data.password) newErrors.confirmPassword = "Passwords do not match";
    }

    // 14. Current Password Validation
    if (data.currentPassword !== undefined) {
      if (!data.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }
    }

    // 15. Terms Validation
    if (data.terms !== undefined && data.terms === false) {
      newErrors.terms = "You must agree to the terms and privacy policy";
    }

    // 16. Otp Validation
    if (data.otp !== undefined) {
      if (data.otp.some((digit) => digit === "")) newErrors.otp = "Please enter the complete verification code";
    }

    // 17. Image Validation for Profile
    if (data.images !== undefined) {
      if (data.images.length > 0) {
        const file = data.images[0];
        if (file.size > 2 * 1024 * 1024) newErrors.images = "Profile image must be less than 2MB";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate, setErrors };
};
