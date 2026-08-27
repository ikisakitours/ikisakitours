"use client";

import { useToast } from "@/context/ToastContext";

export default function ToastTester() {
  const toast = useToast();

  const handleTestSuccess = () => {
    const toastId = toast.loading("Authenticating");

    setTimeout(() => {
      toast.success(toastId, "Login successful! Redirecting.");
    }, 2000);
  };

  const handleTestError = () => {
    const toastId = toast.loading("Sending message");

    setTimeout(() => {
      toast.error(toastId, "Failed to send message. Try again.");
    }, 2000);
  };

  return (
    <div className="flex gap-4 p-10 justify-center">
      <button
        onClick={handleTestSuccess}
        className="px-6 py-2 bg-gold/20 text-gold border border-gold/50 rounded-xl hover:bg-gold/30 transition"
      >
        Test Success Toast
      </button>

      <button
        onClick={handleTestError}
        className="px-6 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition"
      >
        Test Error Toast
      </button>
    </div>
  );
}
