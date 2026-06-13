"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import type { BlogPost } from "@/lib/types";

export default function BlogList() {
  const router = useRouter();
  const [data, setData] = useState<BlogPost[]>([]);

  const fetchData = useCallback(async () => {
    const { getBlogList } = await import("@/lib/actions");
    const res = await getBlogList();
    setData(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: BlogPost) => {
    if (!confirm("Delete this blog post?")) return;
    const { deleteBlogPost } = await import("@/lib/actions");
    await deleteBlogPost(item.id);
    fetchData();
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
    <DataTable
      columns={columns}
      data={data}
      keyExtractor={(b) => b.id}
      onEdit={(b) => router.push(`/admin/blog/${b.id}/edit`)}
      onDelete={handleDelete}
    />
  );
}
