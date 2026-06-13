import Link from "next/link";
import { Search } from "lucide-react";
import ResearchCard from "@/components/public/ResearchCard";
import { getPublishedResearch } from "@/lib/actions";

export default async function ResearchPage() {
  const research = await getPublishedResearch();
  const categories = [...new Set(research.map((r) => r.category))];

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Research
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Exploring the frontiers of AI, Machine Learning, Robotics, and
            beyond.
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
              placeholder="Search research..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/research?category=${encodeURIComponent(cat)}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>

        {research.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500">
              No research projects published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((r) => (
              <ResearchCard key={r.id} research={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
