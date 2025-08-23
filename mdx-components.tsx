import type { MDXComponents } from "mdx/types";
import { BlogLayout } from '@/components/blog/blog-layout'

const components: MDXComponents = {};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Your custom components
    BlogLayout,
    ...components,
  }
}
