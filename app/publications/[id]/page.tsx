import { notFound } from "next/navigation";
import { getPublicationBySlug } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publication = await getPublicationBySlug(id);

  if (!publication) notFound();

  return (
    <article className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/publications"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft size={16} /> Back to Publications
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {publication.title}
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
          {publication.authors}
        </p>

        <div className="flex items-center gap-3 mb-6">
          {publication.journal && (
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {publication.journal}
            </span>
          )}
          <span className="text-sm text-gray-400 dark:text-gray-500">
            ({publication.year})
          </span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              <ExternalLink size={14} /> DOI
            </a>
          )}
          {publication.pdf_url && (
            <a
              href={publication.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:hover:bg-emerald-800"
            >
              <ExternalLink size={14} /> Download PDF
            </a>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
            Abstract
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {publication.abstract}
          </p>
        </div>
      </div>
    </article>
  );
}
