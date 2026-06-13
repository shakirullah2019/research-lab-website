"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { Research } from "@/lib/types";

export default function ResearchList() {
  const router = useRouter();
  const [data, setData] = useState<Research[]>([]);

  const fetchData = useCallback(async () => {
    const res = await list("research");
    setData(res ?? []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: Research) => {
    if (!confirm("Delete this research project?")) return;
    await remove("research", item.id);
    fetchData();
  };

  const columns = [
    { header: "Title", accessor: (r: Research) => r.title },
    {
      header: "Category",
      accessor: (r: Research) => (
        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {r.category}
        </span>
      ),
    },
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
    <DataTable
      columns={columns}
      data={data}
      keyExtractor={(r) => r.id}
      onEdit={(r) => router.push(`/admin/research/${r.id}/edit`)}
      onDelete={handleDelete}
    />
  );
}
