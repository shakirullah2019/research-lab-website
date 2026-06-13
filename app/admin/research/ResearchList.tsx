"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { Research } from "@/lib/types";

export default function ResearchList() {
  const router = useRouter();
  const [data, setData] = useState<Research[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await list("research");
      setData(res ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load research projects.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: Research) => {
    if (!confirm("Delete this research project?")) return;
    try {
      await remove("research", item.id);
      fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to delete.");
    }
  };

  const columns = [
    { header: "Title", accessor: (r: Research) => r.title },
    {
      header: "Status",
      accessor: (r: Research) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs ${
            r.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {r.status}
        </span>
      ),
    },
    {
      header: "Featured",
      accessor: (r: Research) => (r.featured ? "Yes" : "No"),
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
        keyExtractor={(r) => r.id}
        onEdit={(r) => router.push(`/admin/research/${r.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
