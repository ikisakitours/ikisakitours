export type AuthIntroContent = {
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
};

export type AuthFormContent = {
  eyebrow: string;
  title: string;
};

export const authBackgroundImage = "/images/sander-traa-bfdshIHD5Y4-unsplash.webp";

export const loginIntro: AuthIntroContent = {
  eyebrow: "Premium Travel",
  title: "Journey to the",
  accent: "Heart of Paradise",
  body: "Curated experiences in the teardrop of India. Secure your gateway today.",
};

export const loginFormContent: AuthFormContent = {
  eyebrow: "Secure Gateway",
  title: "Welcome back",
};

export const signupIntro: AuthIntroContent = {
  eyebrow: "Member Privileges",
  title: "Begin Your",
  accent: "Elite Experience",
  body: "Join our exclusive circle of travelers and unlock a world of bespoke luxury across Sri Lanka.",
};

export const signupFormContent: AuthFormContent = {
  eyebrow: "Guest Enrollment",
  title: "Create Account",
};

export const accountRecoveryIntro: AuthIntroContent = {
  eyebrow: "Security First",
  title: "Protect Your",
  accent: "Island Access",
  body: "Don't worry, it happens to the best of us. We'll help you get back to your journey in no time.",
};

export const accountRecoveryFormContent: AuthFormContent = {
  eyebrow: "Account Recovery",
  title: "Forgot Password?",
};

export const passwordResetIntro: AuthIntroContent = {
  eyebrow: "New Beginning",
  title: "Secure Your",
  accent: "Paradise Vault",
  body: "Update your password to keep your travel itineraries and profile safe and sound.",
};

export const passwordResetFormContent: AuthFormContent = {
  eyebrow: "Final Step",
  title: "Reset Password",
};

export const authSocialProviders = ["Google", "Apple"] as const;
