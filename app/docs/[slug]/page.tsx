import { notFound } from "next/navigation";
import { getAllDocSections, getDocPageBySlug } from "../docs-data";
import { DocsLayout } from "@/components/docs/docs-layout";

// Import all the MDX files dynamically
const mdxFiles: Record<string, any> = {
  installation: () => import("../pages/installation.mdx"),
  configuration: () => import("../pages/configuration.mdx"),
  "first-steps": () => import("../pages/first-steps.mdx"),
  "auth-overview": () => import("../pages/auth-overview.mdx"),
  "sign-in-up": () => import("../pages/sign-in-up.mdx"),
  "social-auth": () => import("../pages/social-auth.mdx"),
  "database-setup": () => import("../pages/database-setup.mdx"),
  migrations: () => import("../pages/migrations.mdx"),
  "rls-policies": () => import("../pages/rls-policies.mdx"),
  "api-overview": () => import("../pages/api-overview.mdx"),
  "edge-functions": () => import("../pages/edge-functions.mdx"),
  "vercel-deployment": () => import("../pages/vercel-deployment.mdx"),
  "environment-variables": () => import("../pages/environment-variables.mdx"),
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getDocPageBySlug(slug);

  if (!page || !mdxFiles[slug]) {
    notFound();
  }

  // Dynamically import the MDX component
  const MDXComponent = (await mdxFiles[slug]()).default;

  return (
    <DocsLayout currentPage={page}>
      <MDXComponent />
    </DocsLayout>
  );
}

// Generate static params for all documentation pages
export function generateStaticParams() {
  const sections = getAllDocSections();

  const slugs: string[] = [];
  sections.forEach((section: any) => {
    section.pages.forEach((page: any) => {
      slugs.push(page.slug);
    });
  });

  return slugs.map((slug) => ({
    slug,
  }));
}
