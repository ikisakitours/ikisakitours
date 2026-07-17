import React from "react";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className={`mt-1 text-[13px] sm:text-[13px] md:text-[13px] font-medium text-red-500 ${className}`}>{message}</p>
  );
}
