export interface ReviewType {
  id: string;
  packageId: string;
  packageName: string;
  type: string;
  fullName: string;
  email: string;
  rating: number;
  experience: string;
  imageUrls: string[];
  adminReply: string | null;
  createdAt: string;
  userSnapshot?: {
    avatarUrl?: string;
    isVerified?: boolean; // 💡 Added
    isVip?: boolean; // 💡 Added
    country?: string;
    firstName?: string; // 💡 අලුතින් එකතු කළා
    lastName?: string; // 💡 අලුතින් එකතු කළා
  };
}
