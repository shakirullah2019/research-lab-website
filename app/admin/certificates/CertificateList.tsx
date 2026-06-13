"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { Certificate } from "@/lib/types";

export default function CertificateList() {
  const router = useRouter();
  const [data, setData] = useState<Certificate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await list("certificates");
      setData(res ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load certificates.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: Certificate) => {
    if (!confirm("Delete this certificate?")) return;
    try {
      await remove("certificates", item.id);
      fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to delete.");
    }
  };

  const columns = [
    { header: "Title", accessor: (c: Certificate) => c.title },
    { header: "Issuer", accessor: (c: Certificate) => c.issuer },
    {
      header: "Issue Date",
      accessor: (c: Certificate) =>
        new Date(c.issue_date).toLocaleDateString(),
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
        keyExtractor={(c) => c.id}
        onEdit={(c) => router.push(`/admin/certificates/${c.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
