import Link from "next/link";
import type { Research } from "@/lib/types";

interface Props {
  research: Research;
}

export default function ResearchCard({ research }: Props) {
  return (
    <Link
      href={`/research/${research.slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {research.image_url && (
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img
            src={research.image_url}
            alt={research.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors mb-2">
          {research.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {research.summary}
        </p>
      </div>
    </Link>
  );
}
