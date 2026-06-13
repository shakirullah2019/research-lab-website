import BlogCard from "@/components/public/BlogCard";
import { getPublishedBlogPosts } from "@/lib/actions";

export default async function BlogPage() {
  const blogs = await getPublishedBlogPosts();

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & News
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Latest updates, research highlights, and lab news.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500">
              No blog posts yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <BlogCard key={b.id} post={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
