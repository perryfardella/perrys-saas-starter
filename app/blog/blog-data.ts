export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
  };
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
  readTime?: number;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  website?: string;
  twitter?: string;
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

// Centralized data
export const authors: Record<string, Author> = {
  perry: {
    id: "perry",
    name: "Perry",
    bio: "Full-stack developer and tech enthusiast",
    avatar: "/authors/perry.jpg",
    twitter: "@perrydev",
  },
  jane: {
    id: "jane",
    name: "Jane Smith",
    bio: "UX Designer and accessibility advocate",
    avatar: "/authors/jane.jpg",
  },
};

export const tags: Record<string, Tag> = {
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    description: "React framework for production",
    color: "#000000",
  },
  mdx: {
    id: "mdx",
    name: "MDX",
    description: "Markdown with JSX",
    color: "#1a365d",
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    description: "Typed JavaScript",
    color: "#3178c6",
  },
};

export const blogPosts: BlogPost[] = [
  {
    id: "welcome-mdx",
    title: "Welcome to my MDX blog page!",
    slug: "test",
    author: authors.perry,
    date: "2024-01-15",
    description: "This is a sample blog post about MDX",
    tags: ["mdx", "nextjs"],
    readTime: 3,
    featured: true, // Mark as featured
  },
  {
    id: "typescript-tips",
    title: "TypeScript Best Practices",
    slug: "typescript-tips",
    author: authors.jane,
    date: "2024-01-10",
    description: "Essential TypeScript patterns for better code",
    tags: ["typescript", "nextjs"],
    readTime: 8,
  },
];

// Helper functions for filtering
export function getPostsByAuthor(authorId: string): BlogPost[] {
  return blogPosts.filter((post) => post.author.id === authorId);
}

export function getPostsByTag(tagId: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tagId));
}

export function getAllTags(): Tag[] {
  return Object.values(tags);
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

export function getAuthor(authorId: string): Author | undefined {
  return authors[authorId];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
