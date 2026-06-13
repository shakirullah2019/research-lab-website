import { notFound } from "next/navigation";
import { getResearchBySlug } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const research = await getResearchBySlug(id);

  if (!research) notFound();

  return (
    <article className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/research"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft size={16} /> Back to Research
        </Link>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
          {research.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {research.title}
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          {research.summary}
        </p>

        {research.image_url && (
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8">
            <img
              src={research.image_url}
              alt={research.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: research.content }}
        />
      </div>
    </article>
  );
}
