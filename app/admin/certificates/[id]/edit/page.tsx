import { notFound } from "next/navigation";
import CertificateForm from "../../CertificateForm";
import { getCertificateList } from "@/lib/actions";

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getCertificateList();
  const item = list.find((c) => c.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Certificate
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <CertificateForm initialData={item} />
      </div>
    </div>
  );
}
