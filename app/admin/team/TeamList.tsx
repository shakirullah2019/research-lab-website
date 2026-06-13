"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { TeamMember } from "@/lib/types";

export default function TeamList() {
  const router = useRouter();
  const [data, setData] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await list("team_members");
      setData(res ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load team members.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: TeamMember) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await remove("team_members", item.id);
      fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to delete.");
    }
  };

  const columns = [
    { header: "Name", accessor: (m: TeamMember) => m.name },
    { header: "Role", accessor: (m: TeamMember) => m.role },
    {
      header: "Status",
      accessor: (m: TeamMember) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs ${
            m.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          }`}
        >
          {m.status}
        </span>
      ),
    },
    { header: "Order", accessor: (m: TeamMember) => m.order_index.toString() },
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
        keyExtractor={(m) => m.id}
        onEdit={(m) => router.push(`/admin/team/${m.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
