import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import ResearchList from "./ResearchList";

export default async function AdminResearchPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Research Projects
        </h1>
        <Link href="/admin/research/new">
          <Button>
            <Plus size={16} /> New Project
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <ResearchList />
      </div>
    </div>
  );
}
