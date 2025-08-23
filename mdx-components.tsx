import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const customComponents: MDXComponents = {
  // Override default HTML elements with styled versions
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mb-6 mt-8" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-semibold mb-4 mt-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold mb-3 mt-5" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed text-gray-700" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <Link
      href={href || "#"}
      className="text-blue-600 hover:text-blue-800 underline"
      {...props}
    >
      {children}
    </Link>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto border border-gray-800 mb-4 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
