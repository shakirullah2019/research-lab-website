export type Role = "admin" | "editor";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Research {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  image_url?: string;
  status: "draft" | "published";
  featured: boolean;
  researcher_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  slug: string;
  authors: string;
  journal?: string;
  year: number;
  doi?: string;
  abstract: string;
  pdf_url?: string;
  image_url?: string;
  status: "draft" | "published";
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  author_id?: string;
  author_name: string;
  status: "draft" | "published";
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  image_url?: string;
  email?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  order_index: number;
  status: "active" | "alumni";
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  description?: string;
  file_url?: string;
  image_url?: string;
  credential_url?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "pdf" | "other";
  size: number;
  created_at: string;
}

export type Tables = {
  profiles: Profile;
  research: Research;
  publications: Publication;
  blog_posts: BlogPost;
  team_members: TeamMember;
  certificates: Certificate;
  media_files: MediaFile;
};
