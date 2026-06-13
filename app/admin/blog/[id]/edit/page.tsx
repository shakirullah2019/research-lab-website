import { notFound } from "next/navigation";
import BlogForm from "../../BlogForm";
import { getBlogList } from "@/lib/actions";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getBlogList();
  const item = list.find((b) => b.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Blog Post
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <BlogForm initialData={item} />
      </div>
    </div>
  );
}
