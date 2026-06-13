import { notFound } from "next/navigation";
import PublicationForm from "../../PublicationForm";
import { getPublicationList } from "@/lib/actions";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getPublicationList();
  const item = list.find((p) => p.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Publication
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <PublicationForm initialData={item} />
      </div>
    </div>
  );
}
