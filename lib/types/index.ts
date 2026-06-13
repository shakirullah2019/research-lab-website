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
  summary: string;
  content: string;
  image_url?: string;
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
  status: "draft" | "published";
  featured: boolean;
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
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
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
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
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
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
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
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
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
  width?: number;
  height?: number;
  created_at: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_description: string;
  hero_image_url?: string;
  sections: HomepageSection[];
  created_at: string;
  updated_at: string;
}

export interface HomepageSection {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
  content_type: "text" | "featured_research" | "featured_publications";
  order_index: number;
  visible: boolean;
}

export type Tables = {
  profiles: Profile;
  research: Research;
  publications: Publication;
  blog_posts: BlogPost;
  team_members: TeamMember;
  certificates: Certificate;
  media_files: MediaFile;
  homepage_content: HomepageContent;
};
