import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import PublicationList from "./PublicationList";

export default function AdminPublicationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Publications
        </h1>
        <Link href="/admin/publications/new">
          <Button>
            <Plus size={16} /> New Publication
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <PublicationList />
      </div>
    </div>
  );
}
