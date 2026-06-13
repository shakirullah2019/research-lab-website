"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { list, remove } from "@/lib/api-client";
import type { BlogPost } from "@/lib/types";

export default function BlogList() {
  const router = useRouter();
  const [data, setData] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await list("blog_posts");
      setData(res ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load blog posts.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: BlogPost) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await remove("blog_posts", item.id);
      fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to delete.");
    }
  };

  const columns = [
    { header: "Title", accessor: (b: BlogPost) => b.title },
    { header: "Author", accessor: (b: BlogPost) => b.author_name },
    {
      header: "Status",
      accessor: (b: BlogPost) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs ${
            b.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {b.status}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (b: BlogPost) =>
        new Date(b.created_at).toLocaleDateString(),
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
        keyExtractor={(b) => b.id}
        onEdit={(b) => router.push(`/admin/blog/${b.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
