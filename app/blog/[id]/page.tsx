import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostBySlug(id);

  if (!post) notFound();

  const imgStyle: React.CSSProperties = {};
  if (post.image_width) imgStyle.maxWidth = post.image_width;
  if (post.image_height) imgStyle.maxHeight = post.image_height;
  const imgFloat = post.image_position === "left" ? "float-left mr-6 mb-4" : post.image_position === "right" ? "float-right ml-6 mb-4" : "mx-auto mb-8";

  return (
    <article className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          &middot; By {post.author_name}
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>

        {post.image_url && (
          <div className={`${imgFloat} rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800`} style={imgStyle}>
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
