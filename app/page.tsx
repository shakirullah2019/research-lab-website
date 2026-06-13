import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/public/HeroSection";
import ResearchCard from "@/components/public/ResearchCard";
import PublicationCard from "@/components/public/PublicationCard";
import BlogCard from "@/components/public/BlogCard";
import TeamCard from "@/components/public/TeamCard";
import { getPublishedResearch } from "@/lib/actions";
import { getPublishedPublications } from "@/lib/actions";
import { getPublishedBlogPosts } from "@/lib/actions";
import { getActiveTeamMembers } from "@/lib/actions";

export default async function HomePage() {
  const [research, publications, blogs, team] = await Promise.all([
    getPublishedResearch(),
    getPublishedPublications(),
    getPublishedBlogPosts(),
    getActiveTeamMembers(),
  ]);

  return (
    <>
      <HeroSection />

      {/* Featured Research */}
      {research.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Featured Research
              </h2>
              <Link
                href="/research"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {research.slice(0, 3).map((r) => (
                <ResearchCard key={r.id} research={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Publications */}
      {publications.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Latest Publications
              </h2>
              <Link
                href="/publications"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {publications.slice(0, 4).map((p) => (
                <PublicationCard key={p.id} publication={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {blogs.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Latest News
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((b) => (
                <BlogCard key={b.id} post={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Preview */}
      {team.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Our Team
              </h2>
              <Link
                href="/team"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.slice(0, 4).map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
