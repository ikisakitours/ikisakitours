// src/services/blogs/types.ts

export interface BlogPreview {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  readTime: string;
  author: string;
  previewImage: string | null;
  likes: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  readTime: string;
  content: string;
  author: string;
  gallery: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}
