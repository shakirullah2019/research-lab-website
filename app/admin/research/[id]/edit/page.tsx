import { notFound } from "next/navigation";
import ResearchForm from "../../ResearchForm";
import { getResearchList } from "@/lib/actions";

export default async function EditResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getResearchList();
  const item = list.find((r) => r.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Research
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <ResearchForm initialData={item} />
      </div>
    </div>
  );
}
