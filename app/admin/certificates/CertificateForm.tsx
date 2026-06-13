"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import ImageUploader from "@/components/admin/ImageUploader";

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
    credential_url?: string;
  };
}

export default function CertificateForm({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issue_date: initialData?.issue_date || "",
    expiry_date: initialData?.expiry_date || "",
    description: initialData?.description || "",
    file_url: initialData?.file_url || "",
    image_url: initialData?.image_url || "",
    credential_url: initialData?.credential_url || "",
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
      const { saveCertificate } = await import("@/lib/actions");
      await saveCertificate(initialData?.id || null, form);
      router.push("/admin/certificates");
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
          label="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          label="Issuer"
          required
          value={form.issuer}
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Issue Date"
          type="date"
          required
          value={form.issue_date}
          onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
        />
        <Input
          label="Expiry Date"
          type="date"
          value={form.expiry_date || ""}
          onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
        />
      </div>
      <TextArea
        label="Description"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <ImageUploader onUpload={handleImageUpload} label="Image" />
      <Input
        label="File URL (PDF)"
        value={form.file_url || ""}
        onChange={(e) => setForm({ ...form, file_url: e.target.value })}
      />
      <Input
        label="Credential URL"
        value={form.credential_url || ""}
        onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/certificates")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
