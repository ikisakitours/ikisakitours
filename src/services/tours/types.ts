// services/tours/types.ts

export interface PackageSummary {
  id: string;
  title: string;          
  origin: string;         
  price: number;          
  slug: string;
  discount: string;
  badge: string;
  description: string;
  heroImage: string;
  category: string;
  duration: string;
  likes: number;
  averageRating: number;   
}

export interface PaginatedPackageSummary {
  data: PackageSummary[];
  totalCount: number;
  hasMore: boolean;
}