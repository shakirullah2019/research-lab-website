"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { Publication } from "@/lib/types";

export default function PublicationList() {
  const router = useRouter();
  const [data, setData] = useState<Publication[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await list("publications");
      setData(res ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load publications.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: Publication) => {
    if (!confirm("Delete this publication?")) return;
    try {
      await remove("publications", item.id);
      fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to delete.");
    }
  };

  const columns = [
    { header: "Title", accessor: (p: Publication) => p.title },
    { header: "Authors", accessor: (p: Publication) => p.authors },
    { header: "Year", accessor: (p: Publication) => p.year.toString() },
    {
      header: "Status",
      accessor: (p: Publication) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs ${
            p.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {p.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(p) => p.id}
        onEdit={(p) => router.push(`/admin/publications/${p.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
