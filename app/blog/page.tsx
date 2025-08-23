import { blogPosts, getAllTags } from './blog-data';
import { BlogPost } from './blog-data';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Perry\'s SaaS Starter',
  description: 'Insights, tutorials, and thoughts on web development, SaaS, and technology.',
  openGraph: {
    title: 'Blog | Perry\'s SaaS Starter',
    description: 'Insights, tutorials, and thoughts on web development, SaaS, and technology.',
    type: 'website',
  },
};

export default function Blog() {
  const tags = getAllTags();
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featuredPosts = sortedPosts.filter(post => post.featured);
  const recentPosts = sortedPosts.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, tutorials, and thoughts on web development, SaaS, and technology.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Tags Filter */}
      <section className="mb-8">
        <h3 className="text-lg font-medium mb-4">Browse by topic</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            All Posts
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tag/${tag.id}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              style={{ backgroundColor: tag.color ? `${tag.color}15` : undefined }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
        <div className="grid gap-6">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
            Featured
          </span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          {post.readTime && <span>• {post.readTime} min read</span>}
        </div>
        <h3 className="text-xl font-semibold mb-3">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
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
            {post.tags.slice(0, 2).map((tagId) => (
              <span
                key={tagId}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {tagId}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="border-b border-gray-200 pb-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
        {post.readTime && <span>• {post.readTime} min read</span>}
      </div>
      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-600 mb-3">{post.description}</p>
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
          {post.tags.slice(0, 3).map((tagId) => (
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
