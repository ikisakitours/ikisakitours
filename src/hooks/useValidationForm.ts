import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
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

    // 7. Pickup  Location Validation
    if (data.pickupLocation !== undefined && !data.pickupLocation.trim())
      newErrors.pickupLocation = "Pick-up location is required";

    // 8. Drop-off Location Validation
    if (data.dropoffLocation !== undefined && !data.dropoffLocation.trim())
      newErrors.dropoffLocation = "Drop-off location is required";

    // 9. Language Validation
    if (data.language !== undefined && (!data.language || data.language === ""))
      newErrors.language = "Please select a language";

    // 10. Eamail Validation
    if (data.email !== undefined) {
      const trimmedEmail = data.email.trim();

      if (trimmedEmail === "") {
        newErrors.email = "Email address is required";
      } else {
        const secureEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!secureEmailRegex.exec(trimmedEmail)) {
          newErrors.email = "Please enter a valid email address";
        }
      }
    }
    // 11. Tour Requests Validation
    if (data.tourRequests !== undefined && !data.tourRequests.trim()) {
      newErrors.tourRequests = "Please describe your tour plan requests";
    }

    // 12. Service Type Validation
    if (data.serviceType !== undefined && !data.serviceType) newErrors.serviceType = "Please select a service type";

    // 13. Password Validation
    if (data.password !== undefined) {
      if (!data.password) {
        newErrors.password = "Password is required";
      } else if (data.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(data.password)) {
        newErrors.password = "Password must contain at least 1 uppercase letter";
      } else if (!/[a-z]/.test(data.password)) {
        newErrors.password = "Password must contain at least 1 lowercase letter";
      } else if (!/\d/.test(data.password)) {
        newErrors.password = "Password must contain at least 1 numeral";
      } else if (!/[^A-Za-z0-9]/.test(data.password)) {
        newErrors.password = "Password must contain at least 1 special character";
      }
    }

    // 14. Confirm Password Validation
    if (data.confirmPassword !== undefined) {
      if (!data.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
      else if (data.confirmPassword !== data.password) newErrors.confirmPassword = "Passwords do not match";
    }

    // 15. Current Password Validation
    if (data.currentPassword !== undefined) {
      if (!data.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }
    }

    // 16. Terms Validation
    if (data.terms !== undefined && data.terms === false) {
      newErrors.terms = "You must agree to the terms and privacy policy";
    }

    // 17. Otp Validation
    if (data.otp !== undefined) {
      if (data.otp.some((digit) => digit === "")) newErrors.otp = "Please enter the complete verification code";
    }

    // 18. Image Validation for Profile
    if (data.images !== undefined) {
      if (data.images.length > 0) {
        const file = data.images[0];
        if (file.size > 2 * 1024 * 1024) newErrors.images = "Profile image must be less than 2MB";
      }
    }

    // 19. Phone Validation
    if (data.phone !== undefined) {
      if (!data.phone || !data.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!isValidPhoneNumber(data.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // 20. Tour Interest Validation
    if (data.tourInterest !== undefined && !data.tourInterest) {
      newErrors.tourInterest = "Please select your tour interest";
    }

    // 21. Subject Validation
    if (data.subject !== undefined && !data.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // 22. Message Validation
    if (data.message !== undefined) {
      if (!data.message.trim()) {
        newErrors.message = "Message is required";
      } else if (data.message.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters long";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate, setErrors };
};
