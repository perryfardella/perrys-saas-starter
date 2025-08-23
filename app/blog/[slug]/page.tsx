import { getPostBySlug, blogPosts, BlogPost } from "../blog-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ReadingProgress } from "@/app/blog/[slug]/reading-progress";

// Static imports for MDX files
import TestMDX from "../posts/test.mdx";
import TypeScriptTipsMDX from "../posts/typescript-tips.mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

// Map of slugs to their MDX components
const mdxComponents: Record<string, React.ComponentType> = {
  test: TestMDX,
  "typescript-tips": TypeScriptTipsMDX,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Perry's SaaS Starter Blog`,
    description: post.description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function PostFallback({ post }: { post: BlogPost }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 my-6">
          <p className="text-yellow-800 italic">
            This post doesn&apos;t have a full content file yet. The MDX file
            should be created at <code>app/blog/posts/{post.slug}.mdx</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const MDXContent = mdxComponents[slug];

  return (
    <>
      <ReadingProgress />
      {MDXContent ? <MDXContent /> : <PostFallback post={post} />}
    </>
  );
}
