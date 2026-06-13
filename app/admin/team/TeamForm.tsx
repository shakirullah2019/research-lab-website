"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import ImageUploader from "@/components/admin/ImageUploader";
import { create, update, uploadFile } from "@/lib/api-client";

interface Props {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    role: string;
    bio: string;
    image_url?: string;
    image_width?: number;
    image_height?: number;
    image_position?: string;
    email?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    scholar?: string;
    order_index: number;
    status: string;
  };
}

export default function TeamForm({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    role: initialData?.role || "",
    bio: initialData?.bio || "",
    image_url: initialData?.image_url || "",
    image_width: initialData?.image_width || undefined as number | undefined,
    image_height: initialData?.image_height || undefined as number | undefined,
    image_position: initialData?.image_position || "center",
    email: initialData?.email || "",
    website: initialData?.website || "",
    twitter: initialData?.twitter || "",
    linkedin: initialData?.linkedin || "",
    github: initialData?.github || "",
    scholar: initialData?.scholar || "",
    order_index: initialData?.order_index || 0,
    status: initialData?.status || "active",
  });

  const handleImageUpload = async (file: File) => {
    const url = await uploadFile(file);
    setForm((prev) => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = {
        ...form,
        status: form.status as "active" | "alumni",
        slug: form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      };
      if (initialData?.id) {
        await update("team_members", initialData.id, payload);
      } else {
        await create("team_members", payload);
      }
      router.push("/admin/team");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Role" required placeholder="e.g., Research Scientist" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      </div>
      <TextArea label="Bio" required value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <ImageUploader onUpload={handleImageUpload} label="Photo" />
      {form.image_url && (
        <div className="mt-2 space-y-3">
          <img src={form.image_url} alt="" className="h-32 rounded-lg object-cover" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Width (px)" type="number" value={form.image_width || ""} onChange={(e) => setForm({ ...form, image_width: parseInt(e.target.value) || undefined })} />
            <Input label="Height (px)" type="number" value={form.image_height || ""} onChange={(e) => setForm({ ...form, image_height: parseInt(e.target.value) || undefined })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alignment</label>
            <select value={form.image_position} onChange={(e) => setForm({ ...form, image_position: e.target.value })} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <button type="button" onClick={() => setForm({ ...form, image_url: "", image_width: undefined, image_height: undefined, image_position: "center" })} className="text-xs text-red-600 hover:text-red-800">Remove image</button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input label="Email" type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Order Index" type="number" value={form.order_index} onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Website" value={form.website || ""} onChange={(e) => setForm({ ...form, website: e.target.value })} />
        <Input label="Twitter URL" value={form.twitter || ""} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="LinkedIn URL" value={form.linkedin || ""} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
        <Input label="GitHub URL" value={form.github || ""} onChange={(e) => setForm({ ...form, github: e.target.value })} />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={form.status === "active"} onChange={(e) => setForm({ ...form, status: e.target.checked ? "active" : "alumni" })} className="rounded border-gray-300" />
          Active
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : initialData ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>Cancel</Button>
      </div>
    </form>
  );
}
