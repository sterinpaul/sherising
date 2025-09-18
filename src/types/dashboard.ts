export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  featuredImage?: string;
  tags: string[];
  author: {
    id: string;
    name: string;
  };
}

export interface Impact {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  location?: string;
  participants?: number;
}

export interface DashboardStats {
  totalArticles: number;
  totalImpacts: number;
  publishedArticles: number;
  publishedImpacts: number;
  draftArticles: number;
  draftImpacts: number;
  recentViews: number;
}

export interface EditorState {
  isEditing: boolean;
  itemId?: string;
  type: 'article' | 'impact';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}