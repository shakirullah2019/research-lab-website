import { notFound } from "next/navigation";
import TeamForm from "../../TeamForm";
import { getTeamList } from "@/lib/actions";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getTeamList();
  const item = list.find((m) => m.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Team Member
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <TeamForm initialData={item} />
      </div>
    </div>
  );
}
