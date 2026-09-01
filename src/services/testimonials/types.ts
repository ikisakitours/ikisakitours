// src/services/testimonials/types.ts

export interface Review {
  id: string;
  source: string;
  isPubliclyVisible: boolean;
  authorName: string;
  country: string;
  avatarUrl?: string | null;
  isVerified: boolean;
  isVip: boolean;
  hasAccess: boolean;
  content: string;
  date: string;
  adminReply?: string;
  rating?: number;
}

export interface ReviewsResponse {
  comments: Review[];
  totalComments: number;
  averageRating: number;
}