"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { Publication } from "@/lib/types";

export default function PublicationList() {
  const router = useRouter();
  const [data, setData] = useState<Publication[]>([]);

  const fetchData = useCallback(async () => {
    const res = await list("publications");
    setData(res ?? []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: Publication) => {
    if (!confirm("Delete this publication?")) return;
    await remove("publications", item.id);
    fetchData();
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
    <DataTable
      columns={columns}
      data={data}
      keyExtractor={(p) => p.id}
      onEdit={(p) => router.push(`/admin/publications/${p.id}/edit`)}
      onDelete={handleDelete}
    />
  );
}
