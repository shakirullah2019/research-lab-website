import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import BlogList from "./BlogList";

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Blog Posts
        </h1>
        <Link href="/admin/blog/new">
          <Button>
            <Plus size={16} /> New Post
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <BlogList />
      </div>
    </div>
  );
}
