import { createServiceClient } from "./supabase/admin";
import type {
  Research,
  Publication,
  BlogPost,
  TeamMember,
  Certificate,
  HomepageContent,
} from "./types";

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

// ─── Research CRUD ───
export async function getResearchList() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("research")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as Research[];
  }, []);
}

export async function getPublishedResearch() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("research")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    return (data ?? []) as Research[];
  }, []);
}

export async function getResearchBySlug(slug: string) {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("research")
      .select("*")
      .eq("slug", slug)
      .single();
    return data as Research | null;
  }, null);
}

export async function saveResearch(
  id: string | null,
  data: Partial<Research>
) {
  const supabase = await createServiceClient();
  if (id) {
    const { error } = await supabase
      .from("research")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("research").insert(data);
    if (error) throw error;
  }
}

export async function deleteResearch(id: string) {
  const supabase = await createServiceClient();
  const { error } = await supabase.from("research").delete().eq("id", id);
  if (error) throw error;
}

// ─── Publications CRUD ───
export async function getPublicationList() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false });
    return (data ?? []) as Publication[];
  }, []);
}

export async function getPublishedPublications() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("publications")
      .select("*")
      .eq("status", "published")
      .order("year", { ascending: false });
    return (data ?? []) as Publication[];
  }, []);
}

export async function getPublicationBySlug(slug: string) {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("publications")
      .select("*")
      .eq("slug", slug)
      .single();
    return data as Publication | null;
  }, null);
}

export async function savePublication(
  id: string | null,
  data: Partial<Publication>
) {
  const supabase = await createServiceClient();
  if (id) {
    const { error } = await supabase
      .from("publications")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("publications").insert(data);
    if (error) throw error;
  }
}

export async function deletePublication(id: string) {
  const supabase = await createServiceClient();
  const { error } = await supabase.from("publications").delete().eq("id", id);
  if (error) throw error;
}

// ─── Blog Posts CRUD ───
export async function getBlogList() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as BlogPost[];
  }, []);
}

export async function getPublishedBlogPosts() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    return (data ?? []) as BlogPost[];
  }, []);
}

export async function getBlogPostBySlug(slug: string) {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();
    return data as BlogPost | null;
  }, null);
}

export async function saveBlogPost(id: string | null, data: Partial<BlogPost>) {
  const supabase = await createServiceClient();
  if (id) {
    const { error } = await supabase
      .from("blog_posts")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("blog_posts").insert(data);
    if (error) throw error;
  }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createServiceClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

// ─── Team Members CRUD ───
export async function getTeamList() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true });
    return (data ?? []) as TeamMember[];
  }, []);
}

export async function getActiveTeamMembers() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .eq("status", "active")
      .order("order_index", { ascending: true });
    return (data ?? []) as TeamMember[];
  }, []);
}

export async function saveTeamMember(
  id: string | null,
  data: Partial<TeamMember>
) {
  const supabase = await createServiceClient();
  if (id) {
    const { error } = await supabase
      .from("team_members")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("team_members").insert(data);
    if (error) throw error;
  }
}

export async function deleteTeamMember(id: string) {
  const supabase = await createServiceClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
}

// ─── Certificates CRUD ───
export async function getCertificateList() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("issue_date", { ascending: false });
    return (data ?? []) as Certificate[];
  }, []);
}

export async function saveCertificate(
  id: string | null,
  data: Partial<Certificate>
) {
  const supabase = await createServiceClient();
  if (id) {
    const { error } = await supabase
      .from("certificates")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("certificates").insert(data);
    if (error) throw error;
  }
}

export async function deleteCertificate(id: string) {
  const supabase = await createServiceClient();
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) throw error;
}

// ─── Media / Upload ───
export async function uploadFile(file: File, bucket: string = "media") {
  const supabase = await createServiceClient();
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  const { error: dbError } = await supabase.from("media_files").insert({
    name: file.name,
    url: publicUrl,
    type: file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "pdf" : "other",
    size: file.size,
  });
  if (dbError) throw dbError;
  return publicUrl;
}

export async function getMediaFiles() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("media_files")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  }, []);
}

// ─── Homepage Content ───
export async function getHomepageContent() {
  return safeQuery(async () => {
    const supabase = await createServiceClient();
    const { data } = await supabase
      .from("homepage_content")
      .select("*")
      .limit(1)
      .single();
    return data as HomepageContent | null;
  }, null);
}

export async function saveHomepageContent(
  id: string | null,
  data: Partial<HomepageContent>
) {
  const supabase = await createServiceClient();
  if (id) {
    const { error } = await supabase
      .from("homepage_content")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("homepage_content").insert(data);
    if (error) throw error;
  }
}
