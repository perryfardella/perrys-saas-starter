import { DocsLayout } from "@/components/docs/docs-layout";
import { getAllDocSections } from "./docs-data";
import Link from "next/link";
import { Book, ArrowRight } from "lucide-react";

export default function Docs() {
  const sections = getAllDocSections();

  return (
    <DocsLayout>
      <div className="max-w-4xl">
        {/* Hero section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Book className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know to get started with your SaaS
            application. From setup to deployment, we&apos;ve got you covered.
          </p>
        </div>

        {/* Quick start */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 Quick Start
          </h2>
          <p className="text-gray-700 mb-6">
            New to the project? Start here to get up and running in minutes.
          </p>
          <Link
            href="/docs/installation"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Documentation sections */}
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>
              {section.description && (
                <p className="text-gray-600 mb-4">{section.description}</p>
              )}

              <ul className="space-y-2 mb-6">
                {section.pages.slice(0, 3).map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/docs/${page.slug}`}
                      className="flex items-start gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 mt-0.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      <div>
                        <div className="font-medium">{page.title}</div>
                        {page.description && (
                          <div className="text-gray-500 text-xs">
                            {page.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {section.pages.length > 3 && (
                <Link
                  href={`/docs/${section.pages[0].slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View all {section.pages.length} articles →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Help section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need more help?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to
            help.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/docs/api-overview"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              API Reference
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Blog & Tutorials
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
