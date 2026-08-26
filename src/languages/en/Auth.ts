export default {
  Metadata: {
    Gateway: {
      title: "Sign In or Register",
      description:
        "Access your IkiSaki account or join our exclusive travel community to unlock bespoke Sri Lankan itineraries.",
    },
    Signup: {
      title: "Create Account",
      description:
        "Create a IkiSaki member account for private travel planning, exclusive tour bookings, and personalized Sri Lankan itineraries.",
    },
    Login: { title: "Secure Gateway", description: "Sign in to the IkiSaki secure travel gateway." },
    Recovery: { title: "Account Recovery", description: "Request a IkiSaki account recovery email." },
    Reset: {
      title: "Reset Password",
      description: "Set a new IkiSaki account password after email verification.",
    },
  },
  Intros: {
    Gateway: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "A breathtaking view of a Sri Lankan tea estate",
      eyebrow: "Welcome to IkiSaki",
      title: "Your Journey",
      accent: "Starts Here",
      body: "Sign in or create an account to manage your bookings, discover exclusive tours, and curate your ultimate Sri Lankan adventure.",
    },
    Signup: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "A breathtaking view of a Sri Lankan tea estate",
      eyebrow: "Member Privileges",
      title: "Begin Your",
      accent: "Elite Experience",
      body: "Join our exclusive circle of travelers and unlock a world of bespoke luxury across Sri Lanka.",
    },
    Login: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "Luxury coastal resort in Sri Lanka at sunset",
      eyebrow: "Premium Travel",
      title: "Journey to the",
      accent: "Heart of Paradise",
      body: "Curated experiences in the teardrop of India. Secure your gateway today.",
    },
    Recovery: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "Calm and peaceful beach waves in Mirissa",
      eyebrow: "Security First",
      title: "Protect Your",
      accent: "Island Access",
      body: "Don't worry, it happens to the best of us. We'll help you get back to your journey in no time.",
    },
    Reset: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "Beautiful sunrise over the mountains in Ella",
      eyebrow: "New Beginning",
      title: "Secure Your",
      accent: "Paradise Vault",
      body: "Update your password to keep your travel itineraries and profile safe and sound.",
    },
  },
  FormHeaders: {
    Gateway: { eyebrow: "Select an Option", title: "Sign in or register" },
    Signup: { eyebrow: "Guest Enrollment", title: "Create Account" },
    Login: { eyebrow: "Secure Gateway", title: "Welcome back" },
    Recovery: { eyebrow: "Account Recovery", title: "Forgot Password?" },
    Reset: { eyebrow: "Final Step", title: "Reset Password" },
  },
  Social: {
    continueGoogle: "Continue with Google",
    continueApple: "Continue with Apple",
    continueEmail: "Continue with Email",
    orContinueWith: "Or continue with",
  },
  Links: {
    alreadyHaveAccount: "Already a member?",
    signInHere: "Enter Gateway",
    firstTime: "New to IkiSaki?",
    createAccount: "Join the Circle",
    forgotPassword: "Lost your key?",
    rememberIt: "Found my key!",
    backToProfile: "Back to Profile",
    backToLogin: "Back to Login",
    backToSignIn: "Back to Gateway",
  },
} as const;
