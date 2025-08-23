import { ReactNode } from "react";
import { BlogPost } from "@/app/blog/blog-data";
import { ArticleLayout } from "@/app/blog/[slug]/article-layout";

interface BlogLayoutProps {
  children: ReactNode;
  post: BlogPost;
}

export function BlogLayout({ children, post }: BlogLayoutProps) {
  return (
    <ArticleLayout post={post}>
      {children}
    </ArticleLayout>
  );
}
