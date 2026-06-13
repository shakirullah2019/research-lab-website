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
  const [form, setForm] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    role: initialData?.role || "",
    bio: initialData?.bio || "",
    image_url: initialData?.image_url || "",
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
      const payload = {
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Role"
          required
          placeholder="e.g., Research Scientist"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
      </div>
      <TextArea
        label="Bio"
        required
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />
      <ImageUploader onUpload={handleImageUpload} label="Photo" />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Order Index"
          type="number"
          value={form.order_index}
          onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Website"
          value={form.website || ""}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
        <Input
          label="Twitter URL"
          value={form.twitter || ""}
          onChange={(e) => setForm({ ...form, twitter: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="LinkedIn URL"
          value={form.linkedin || ""}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
        />
        <Input
          label="GitHub URL"
          value={form.github || ""}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={form.status === "active"}
            onChange={(e) =>
              setForm({ ...form, status: e.target.checked ? "active" : "alumni" })
            }
            className="rounded border-gray-300"
          />
          Active
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
