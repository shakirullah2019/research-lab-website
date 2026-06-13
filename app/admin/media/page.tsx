"use client";

import { useEffect, useState, useCallback } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import DataTable from "@/components/admin/DataTable";
import { list, remove, uploadFile } from "@/lib/api-client";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

export default function MediaPage() {
  const [data, setData] = useState<MediaFile[]>([]);

  const fetchData = useCallback(async () => {
    const res = await list("media_files");
    setData(res ?? []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpload = async (file: File) => {
    await uploadFile(file);
    fetchData();
  };

  const columns = [
    {
      header: "Preview",
      accessor: (m: MediaFile) =>
        m.type === "image" ? (
          <img
            src={m.url}
            alt={m.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">{m.type}</span>
        ),
    },
    { header: "Name", accessor: (m: MediaFile) => m.name },
    { header: "Type", accessor: (m: MediaFile) => m.type },
    {
      header: "URL",
      accessor: (m: MediaFile) => (
        <a
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          Open
        </a>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Media Library
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <ImageUploader onUpload={handleUpload} accept="image/*,.pdf" label="Upload New File" />
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <DataTable
          columns={columns}
          data={data}
          keyExtractor={(m) => m.id}
        />
      </div>
    </div>
  );
}
