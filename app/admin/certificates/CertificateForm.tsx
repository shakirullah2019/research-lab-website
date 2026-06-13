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
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string;
    description?: string;
    file_url?: string;
    image_url?: string;
    image_width?: number;
    image_height?: number;
    image_position?: string;
    credential_url?: string;
  };
}

export default function CertificateForm({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issue_date: initialData?.issue_date || "",
    expiry_date: initialData?.expiry_date || "",
    description: initialData?.description || "",
    file_url: initialData?.file_url || "",
    image_url: initialData?.image_url || "",
    image_width: initialData?.image_width || undefined as number | undefined,
    image_height: initialData?.image_height || undefined as number | undefined,
    image_position: initialData?.image_position || "center",
    credential_url: initialData?.credential_url || "",
  });

  const handleImageUpload = async (file: File) => {
    const url = await uploadFile(file);
    setForm((prev) => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await update("certificates", initialData.id, form);
      } else {
        await create("certificates", form);
      }
      router.push("/admin/certificates");
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
        <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input label="Issuer" required value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Issue Date" type="date" required value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} />
        <Input label="Expiry Date" type="date" value={form.expiry_date || ""} onChange={(e) => setForm({ ...form, expiry_date: e.target.value })} />
      </div>
      <TextArea label="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <ImageUploader onUpload={handleImageUpload} label="Image" />
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
      <Input label="File URL (PDF)" value={form.file_url || ""} onChange={(e) => setForm({ ...form, file_url: e.target.value })} />
      <Input label="Credential URL" value={form.credential_url || ""} onChange={(e) => setForm({ ...form, credential_url: e.target.value })} />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : initialData ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/certificates")}>Cancel</Button>
      </div>
    </form>
  );
}
