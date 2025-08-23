import { BlogPost } from "@/app/blog/blog-data";
import { getPostsByAuthor, getAuthor } from "@/app/blog/blog-data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ authorId: string }>;
}

export default async function AuthorPage({ params }: Props) {
  const { authorId } = await params;
  const author = getAuthor(authorId);
  if (!author) notFound();

  const posts = getPostsByAuthor(authorId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Posts by {author.name}</h1>
      <div className="grid gap-6">
        {posts.map((post: BlogPost) => (
          <article key={post.id} className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">
              <a href={`/blog/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h2>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <div className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
