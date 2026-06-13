"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import RichTextEditor from "@/components/ui/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";

interface Props {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url?: string;
    author_name: string;
    status: string;
    featured: boolean;
  };
}

export default function BlogForm({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    author_name: initialData?.author_name || "",
    status: initialData?.status || "draft",
    featured: initialData?.featured || false,
  });

  const handleImageUpload = async (file: File) => {
    const { uploadFile } = await import("@/lib/actions");
    const url = await uploadFile(file);
    setForm((prev) => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { saveBlogPost } = await import("@/lib/actions");
      await saveBlogPost(initialData?.id || null, {
        ...form,
        status: form.status as "draft" | "published",
        slug: form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      });
      router.push("/admin/blog");
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
        label="Author Name"
        required
        value={form.author_name}
        onChange={(e) => setForm({ ...form, author_name: e.target.value })}
      />
      <TextArea
        label="Excerpt"
        required
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />
      <RichTextEditor
        label="Content"
        value={form.content}
        onChange={(content) => setForm({ ...form, content })}
      />
      <ImageUploader onUpload={handleImageUpload} label="Image" />
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
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
