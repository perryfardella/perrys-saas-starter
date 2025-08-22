import { getPostsByTag, tags, blogPosts } from "../../blog-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { BlogPost } from "../../blog-data";

interface Props {
  params: Promise<{ tagId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tagId } = await params;
  const tag = tags[tagId];

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `${tag.name} Posts | Perry's SaaS Starter Blog`,
    description: tag.description || `Posts tagged with ${tag.name}`,
  };
}

export async function generateStaticParams() {
  return Object.keys(tags).map((tagId) => ({
    tagId,
  }));
}

export default async function TagPage({ params }: Props) {
  const { tagId } = await params;
  const tag = tags[tagId];
  const posts = getPostsByTag(tagId);

  if (!tag) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span>Tags</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{tag.name}</span>
        </nav>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold">{tag.name}</h1>
          <span
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: tag.color ? `${tag.color}20` : "#f3f4f6",
              color: tag.color || "#374151",
            }}
          >
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </div>
        {tag.description && (
          <p className="text-lg text-gray-600">{tag.description}</p>
        )}
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found for this tag.</p>
          <Link
            href="/blog"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Browse All Posts
          </Link>
        </div>
      )}
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
        {post.readTime && <span>• {post.readTime} min read</span>}
      </div>
      <h2 className="text-xl font-semibold mb-3">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full"
            />
          )}
          <Link
            href={`/blog/author/${post.author.id}`}
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            {post.author.name}
          </Link>
        </div>
        <div className="flex gap-1">
          {post.tags.map((tagId) => (
            <Link
              key={tagId}
              href={`/blog/tag/${tagId}`}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
            >
              {tagId}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
