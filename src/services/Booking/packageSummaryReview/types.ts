// services/Booking/packageSummaryReview/types.ts

export interface TopReviewType {
  id: string;
  fullName: string;
  rating: number;
  experience: string;
  imageUrls: string[];
  adminReply?: string | null;
  createdAt: string;
  userSnapshot?: {
    avatarUrl?: string;
    isVerified?: boolean; // 💡 Added
    isVip?: boolean; // 💡 Added
    country?: string;
    firstName?: string; // 💡 අලුතින් එකතු කළා
  lastName?: string;  // 💡 අලුතින් එකතු කළා
  };
}

export interface PackageReviewSummaryType {
  packageId: string;
  packageName: string;
  averageRating: number;
  totalReviews: number;
  topReviews: TopReviewType[];
  totalImages?: number;
  randomImageSets: string[][];
}
