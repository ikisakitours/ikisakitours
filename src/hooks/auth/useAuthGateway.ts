// src/hooks/auth/useAuthGateway.ts
import { authService } from "@/services/auth/authService";

export function useAuthGateway() {
  const handleSocialLogin = (provider: "google" | "apple") => {
    try {
      console.log(`Redirecting to ${provider} authentication...`);
      authService.socialLogin(provider);
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };

  return {
    handleSocialLogin,
  };
}