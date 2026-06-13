"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import type { Certificate } from "@/lib/types";

export default function CertificateList() {
  const router = useRouter();
  const [data, setData] = useState<Certificate[]>([]);

  const fetchData = useCallback(async () => {
    const { getCertificateList } = await import("@/lib/actions");
    const res = await getCertificateList();
    setData(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (item: Certificate) => {
    if (!confirm("Delete this certificate?")) return;
    const { deleteCertificate } = await import("@/lib/actions");
    await deleteCertificate(item.id);
    fetchData();
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
    <DataTable
      columns={columns}
      data={data}
      keyExtractor={(c) => c.id}
      onEdit={(c) => router.push(`/admin/certificates/${c.id}/edit`)}
      onDelete={handleDelete}
    />
  );
}
