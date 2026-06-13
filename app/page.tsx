import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResearchCard from "@/components/public/ResearchCard";
import PublicationCard from "@/components/public/PublicationCard";
import BlogCard from "@/components/public/BlogCard";
import TeamCard from "@/components/public/TeamCard";
import {
  getPublishedResearch,
  getPublishedPublications,
  getPublishedBlogPosts,
  getActiveTeamMembers,
  getHomepageContent,
} from "@/lib/actions";
import type { HomepageSection } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [research, publications, blogs, team, homepage] = await Promise.all([
    getPublishedResearch(),
    getPublishedPublications(),
    getPublishedBlogPosts(),
    getActiveTeamMembers(),
    getHomepageContent(),
  ]);

  const hero = homepage
    ? {
        title: homepage.hero_title,
        description: homepage.hero_description,
        image: homepage.hero_image_url,
      }
    : {
        title: "Advancing the Frontiers of Intelligence",
        description:
          "A multidisciplinary research lab exploring Artificial Intelligence, Machine Learning, and beyond.",
        image: null as string | null,
      };

  const sections: HomepageSection[] = homepage?.sections || [];

  function sectionImageStyle(section: HomepageSection): React.CSSProperties {
    const style: React.CSSProperties = {};
    if (section.image_width) style.maxWidth = section.image_width;
    if (section.image_height) style.maxHeight = section.image_height;
    return style;
  }

  function sectionImageClass(section: HomepageSection): string {
    const pos = section.image_position || "center";
    if (pos === "left") return "float-left mr-6 mb-4";
    if (pos === "right") return "float-right ml-6 mb-4";
    return "mx-auto mb-6";
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden"
      >
        {hero.image && (
          <div className="absolute inset-0">
            <img
              src={hero.image}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 mb-8 leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/research"
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-6 py-3 text-base bg-white text-blue-900 hover:bg-blue-50"
              >
                Explore Research
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-6 py-3 text-base border border-white/30 text-white hover:bg-white/10"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {sections.map((section) => {
        if (!section.visible) return null;

        if (section.content_type === "featured_research") {
          return (
            <section key={section.id} className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {section.title || "Featured Research"}
                    </h2>
                    {section.description && (
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {section.description}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/research"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </Link>
                </div>
                {research.length === 0 ? (
                  <p className="text-gray-400 dark:text-gray-500">No research projects yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {research.slice(0, 3).map((r) => (
                      <ResearchCard key={r.id} research={r} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        }
        if (section.content_type === "featured_publications") {
          return (
            <section key={section.id} className="py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {section.title || "Latest Publications"}
                    </h2>
                    {section.description && (
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {section.description}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/publications"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </Link>
                </div>
                {publications.length === 0 ? (
                  <p className="text-gray-400 dark:text-gray-500">No publications yet.</p>
                ) : (
                  <div className="space-y-4">
                    {publications.slice(0, 4).map((p) => (
                      <PublicationCard key={p.id} publication={p} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        }
        return (
          <section key={section.id} className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {section.image_url && (
                <div className={`${sectionImageClass(section)} rounded-xl overflow-hidden`} style={sectionImageStyle(section)}>
                  <img
                    src={section.image_url}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
                {section.description}
              </p>
              {section.button_text && section.button_link && (
                <div className="mt-6">
                  <Link
                    href={section.button_link}
                    className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-5 py-2.5 text-sm bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {section.button_text} <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Default sections if no homepage content configured */}
      {sections.length === 0 && (
        <>
          {research.length > 0 && (
            <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
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

          {publications.length > 0 && (
            <section className="py-16 md:py-20">
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

          {blogs.length > 0 && (
            <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
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

          {team.length > 0 && (
            <section className="py-16 md:py-20">
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
      )}
    </>
  );
}
