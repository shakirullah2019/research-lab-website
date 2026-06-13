import Link from "next/link";
import ResearchCard from "@/components/public/ResearchCard";
import { getPublishedResearch } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const research = await getPublishedResearch();

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Research
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Exploring the frontiers of science and technology.
          </p>
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
