export default {
  Metadata: {
    title: "Profile Settings",
    description: "Manage IkiSaki profile details, account security, and privacy settings.",
  },
  Dashboard: {
    titleBase: "Account",
    titleAccent: "Settings",
    tabProfile: "Profile Management",
    tabSecurity: "Security & Privacy",
    shortProfile: "Profile",
    shortSecurity: "Security",
    tabReferral: "Invite Friends",
    shortReferral: "Referrals",
    menuBtn: "Menu",
    accountMenuTitle: "Account Menu",
  },
  Badge: {
    verified: "Verified",
    vipMember: "VIP Member",
  },
  Milestone: {
    title: "Adventure Milestone",
    quote:
      "The soul of Sri Lanka is found in the paths we choose to follow. Whether your journey is just beginning or your legacy is already growing, the Pearl of the Indian Ocean always has more wonders to reveal.",
  },
  DetailsPanel: {
    title: "Personal Details",
    toursText: "Tours",
    profilePicTitle: "Profile Picture",
    profilePicDesc: "PNG, JPG or GIF. Max 5MB.",
    savePhotoBtn: "Save Photo",
  },
  SecurityPanel: {
    title: "Security Access",
    forgotPassword: "Forgot Password?",
  },
  ReferralPanel: {
    title: "Invite Friends & Earn",
    subtitle: "Share your unique link and unlock premium travel rewards.",
    offerTitle: "Give 10%, Get",
    offerAmount: "$50",
    offerDescription:
      "When your friends book their first journey using your link, they get 10% off, and you earn $50 travel credit towards your next adventure.",
    yourLink: "Your Unique Invite Link",
    copy: "Copy",
    copied: "Copied!",
    stats: {
      invites: "Invites Sent",
      joined: "Friends Booked",
      earned: "Total Earned",
    },
  },
  Modals: {
    Crop: {
      title: "Adjust Profile Picture",
      zoom: "ZOOM:",
      dragHelp: "Drag to reposition",
      btnProcessing: "Processing...",
      btnCropSave: "Crop & Save",
    },
    Source: {
      title: "Update Profile Picture",
      errorTitle: "Access Error",
      btnTakePhoto: "Take Photo",
      btnTakePhotoSub: "Use device camera",
      btnGallery: "Gallery",
      btnGallerySub: "Browse files",
      errorNotSupported: "Camera is not supported by your browser",
      errorNoCamera: "No camera detected on this device",
      errorDenied: "Camera permission denied. Please allow camera access in your browser settings.",
      errorGeneral: "Unable to access the camera. Please check your device settings.",
      errorUnexpected: "An unexpected error occurred while accessing the camera.",
    },
  },
} as const;
