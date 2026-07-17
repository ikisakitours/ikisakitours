export type ProfileTabId = "profile" | "security";

export type ProfileTab = {
  id: ProfileTabId;
  label: string;
};

export const profileUser = {
  name: "Alex Thompson",
  email: "pramodpremudu10@gmail.com",
  initials: "AT",
  status: "Verified",
  membership: "VIP Member",
  toursCompleted: 0,
  milestoneTitle: "Adventure Milestone",
  milestoneQuote:
    "The soul of Sri Lanka is found in the paths we choose to follow. Whether your journey is just beginning or your legacy is already growing, the Pearl of the Indian Ocean always has more wonders to reveal.",
};

export const profileTabs: ProfileTab[] = [
  { id: "profile", label: "Profile Management" },
  { id: "security", label: "Security & Privacy" },
];

export const passwordRequirements = [
  "At least 8 characters",
  "1 Uppercase letter",
  "1 Lowercase letter",
  "1 Numeral",
  "1 Special character",
] as const;
