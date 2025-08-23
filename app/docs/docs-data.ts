export interface DocSection {
  id: string;
  title: string;
  description?: string;
  pages: DocPage[];
}

export interface DocPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  sectionId: string;
  order: number;
  lastUpdated?: string;
}

export interface DocNavItem {
  section: DocSection;
  pages: DocPage[];
}

// Documentation sections and pages
export const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Quick start guide and basic setup",
    pages: [
      {
        id: "installation",
        title: "Installation",
        slug: "installation",
        description: "How to install and set up the project",
        sectionId: "getting-started",
        order: 1,
        lastUpdated: "2024-01-15",
      },
      {
        id: "configuration",
        title: "Configuration",
        slug: "configuration",
        description: "Configure your environment and settings",
        sectionId: "getting-started",
        order: 2,
        lastUpdated: "2024-01-14",
      },
      {
        id: "first-steps",
        title: "First Steps",
        slug: "first-steps",
        description: "Your first steps with the application",
        sectionId: "getting-started",
        order: 3,
        lastUpdated: "2024-01-13",
      },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "User authentication and authorization",
    pages: [
      {
        id: "auth-overview",
        title: "Overview",
        slug: "auth-overview",
        description: "Authentication system overview",
        sectionId: "authentication",
        order: 1,
        lastUpdated: "2024-01-12",
      },
      {
        id: "sign-in-up",
        title: "Sign In & Sign Up",
        slug: "sign-in-up",
        description: "User registration and login flows",
        sectionId: "authentication",
        order: 2,
        lastUpdated: "2024-01-11",
      },
      {
        id: "social-auth",
        title: "Social Authentication",
        slug: "social-auth",
        description: "OAuth with Google, GitHub, and more",
        sectionId: "authentication",
        order: 3,
        lastUpdated: "2024-01-10",
      },
    ],
  },
  {
    id: "database",
    title: "Database",
    description: "Database setup and management with Supabase",
    pages: [
      {
        id: "database-setup",
        title: "Database Setup",
        slug: "database-setup",
        description: "Setting up your Supabase database",
        sectionId: "database",
        order: 1,
        lastUpdated: "2024-01-09",
      },
      {
        id: "migrations",
        title: "Migrations",
        slug: "migrations",
        description: "Managing database schema changes",
        sectionId: "database",
        order: 2,
        lastUpdated: "2024-01-08",
      },
      {
        id: "rls-policies",
        title: "Row Level Security",
        slug: "rls-policies",
        description: "Implementing secure data access policies",
        sectionId: "database",
        order: 3,
        lastUpdated: "2024-01-07",
      },
    ],
  },
  {
    id: "api",
    title: "API",
    description: "API endpoints and integration",
    pages: [
      {
        id: "api-overview",
        title: "API Overview",
        slug: "api-overview",
        description: "Understanding the API structure",
        sectionId: "api",
        order: 1,
        lastUpdated: "2024-01-06",
      },
      {
        id: "edge-functions",
        title: "Edge Functions",
        slug: "edge-functions",
        description: "Serverless functions with Supabase",
        sectionId: "api",
        order: 2,
        lastUpdated: "2024-01-05",
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Deploy your application to production",
    pages: [
      {
        id: "vercel-deployment",
        title: "Deploy to Vercel",
        slug: "vercel-deployment",
        description: "Deploy your app to Vercel",
        sectionId: "deployment",
        order: 1,
        lastUpdated: "2024-01-04",
      },
      {
        id: "environment-variables",
        title: "Environment Variables",
        slug: "environment-variables",
        description: "Managing environment configurations",
        sectionId: "deployment",
        order: 2,
        lastUpdated: "2024-01-03",
      },
    ],
  },
];

// Helper functions
export function getAllDocSections(): DocSection[] {
  return docSections;
}

export function getDocSectionById(sectionId: string): DocSection | undefined {
  return docSections.find((section) => section.id === sectionId);
}

export function getDocPageBySlug(slug: string): DocPage | undefined {
  for (const section of docSections) {
    const page = section.pages.find((page) => page.slug === slug);
    if (page) return page;
  }
  return undefined;
}

export function getDocNavigation(): DocNavItem[] {
  return docSections.map((section) => ({
    section,
    pages: section.pages.sort((a, b) => a.order - b.order),
  }));
}

export function getAdjacentPages(currentSlug: string): {
  prev?: DocPage;
  next?: DocPage;
} {
  const allPages: DocPage[] = [];

  // Flatten all pages in order
  for (const section of docSections) {
    const sortedPages = section.pages.sort((a, b) => a.order - b.order);
    allPages.push(...sortedPages);
  }

  const currentIndex = allPages.findIndex((page) => page.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? allPages[currentIndex - 1] : undefined,
    next:
      currentIndex < allPages.length - 1
        ? allPages[currentIndex + 1]
        : undefined,
  };
}
