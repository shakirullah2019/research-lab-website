import Link from "next/link";
import type { Publication } from "@/lib/types";

interface Props {
  publication: Publication;
}

export default function PublicationCard({ publication }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Link
            href={`/publications/${publication.slug}`}
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors line-clamp-2"
          >
            {publication.title}
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {publication.authors}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {publication.journal && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {publication.journal}
              </span>
            )}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ({publication.year})
            </span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            {publication.doi && (
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                DOI
              </a>
            )}
            {publication.pdf_url && (
              <a
                href={publication.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
