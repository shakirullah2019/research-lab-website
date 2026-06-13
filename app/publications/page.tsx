import Link from "next/link";
import { Search } from "lucide-react";
import PublicationCard from "@/components/public/PublicationCard";
import { getPublishedPublications } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  const publications = await getPublishedPublications();

  const years = [...new Set(publications.map((p) => p.year))].sort(
    (a, b) => b - a
  );

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Publications
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Peer-reviewed research papers, conference proceedings, and
            preprints.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search publications..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {years.map((year) => (
            <Link
              key={year}
              href={`/publications?year=${year}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {year}
            </Link>
          ))}
        </div>

        {publications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500">
              No publications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {publications.map((p) => (
              <PublicationCard key={p.id} publication={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
