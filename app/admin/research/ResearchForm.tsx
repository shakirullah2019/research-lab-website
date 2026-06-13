"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import RichTextEditor from "@/components/ui/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import { create, update, uploadFile } from "@/lib/api-client";

interface Props {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string;
    content: string;
    image_url?: string;
    status: string;
    featured: boolean;
  };
}

export default function ResearchForm({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    status: initialData?.status || "draft",
    featured: initialData?.featured || false,
  });

  const handleImageUpload = async (file: File) => {
    const url = await uploadFile(file);
    setForm((prev) => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        status: form.status as "draft" | "published",
        slug: form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      };
      if (initialData?.id) {
        await update("research", initialData.id, payload);
      } else {
        await create("research", payload);
      }
      router.push("/admin/research");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <Input
        label="Title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Input
        label="Category"
        required
        placeholder="e.g., AI, ML, Robotics"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <TextArea
        label="Summary"
        required
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />
      <RichTextEditor
        label="Content"
        value={form.content}
        onChange={(content) => setForm({ ...form, content })}
      />
      <ImageUploader onUpload={handleImageUpload} label="Image" />
      {form.image_url && (
        <img src={form.image_url} alt="" className="h-24 rounded-lg object-cover" />
      )}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={form.status === "published"}
            onChange={(e) =>
              setForm({ ...form, status: e.target.checked ? "published" : "draft" })
            }
            className="rounded border-gray-300"
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="rounded border-gray-300"
          />
          Featured
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/research")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
