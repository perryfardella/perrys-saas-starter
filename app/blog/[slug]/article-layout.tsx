"use client";

import { BlogPost } from "../blog-data";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

interface ArticleLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function ArticleLayout({ post, children }: ArticleLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <Link
                href={`/blog/author/${post.author.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.author.name}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          )}
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-xl text-gray-700 mb-6">{post.description}</p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tagId) => (
              <Link
                key={tagId}
                href={`/blog/tag/${tagId}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {tagId}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
        {children}
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="font-medium">{post.author.name}</p>
              {post.author.bio && (
                <p className="text-gray-600 text-sm">{post.author.bio}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              More Posts
            </Link>
            <Link
              href={`/blog/author/${post.author.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Author Posts
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
