"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import Button from "../ui/Button";

interface Props {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  label?: string;
}

export default function ImageUploader({
  onUpload,
  accept = "image/*",
  label = "Upload Image",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      await onUpload(file);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="mt-1 flex items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Upload size={16} />
          {uploading ? "Uploading..." : "Choose File"}
        </label>
        {preview && (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="h-16 w-16 object-cover rounded-lg"
            />
            <button
              onClick={clearPreview}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
