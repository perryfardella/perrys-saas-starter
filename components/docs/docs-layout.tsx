"use client";

import {
  DocPage,
  getDocNavigation,
  getAdjacentPages,
} from "@/app/docs/docs-data";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { DocSearch } from "./doc-search";
import { TableOfContents } from "./table-of-contents";

interface DocsLayoutProps {
  currentPage?: DocPage;
  children: React.ReactNode;
}

export function DocsLayout({ currentPage, children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = getDocNavigation();
  const adjacentPages = currentPage
    ? getAdjacentPages(currentPage.slug)
    : { prev: undefined, next: undefined };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-lg border"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:translate-x-0 md:static md:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Link href="/docs" className="block">
            <h1 className="text-xl font-bold text-gray-900">Documentation</h1>
          </Link>
          <div className="mt-4">
            <DocSearch />
          </div>
        </div>

        <nav className="px-6 pb-6">
          <div className="space-y-6">
            {navigation.map(({ section, pages }) => (
              <div key={section.id}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {pages.map((page) => (
                    <li key={page.id}>
                      <Link
                        href={`/docs/${page.slug}`}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          currentPage?.slug === page.slug
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-4 py-8 md:px-8 md:py-12">
          {/* Page header */}
          {currentPage && (
            <header className="mb-8">
              <div className="mb-4">
                <nav className="text-sm text-gray-500">
                  <Link href="/docs" className="hover:text-gray-700">
                    Documentation
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900">{currentPage.title}</span>
                </nav>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {currentPage.title}
              </h1>
              {currentPage.description && (
                <p className="text-xl text-gray-600 mb-6">
                  {currentPage.description}
                </p>
              )}
              {currentPage.lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated:{" "}
                  {new Date(currentPage.lastUpdated).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              )}
            </header>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">{children}</div>

          {/* Table of Contents */}
          <TableOfContents />

          {/* Navigation footer */}
          {(adjacentPages.prev || adjacentPages.next) && (
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between">
                <div className="flex-1">
                  {adjacentPages.prev && (
                    <Link
                      href={`/docs/${adjacentPages.prev.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <div>
                        <div className="text-sm text-gray-500">Previous</div>
                        <div className="font-medium">
                          {adjacentPages.prev.title}
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="flex-1 text-right">
                  {adjacentPages.next && (
                    <Link
                      href={`/docs/${adjacentPages.next.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                    >
                      <div>
                        <div className="text-sm text-gray-500">Next</div>
                        <div className="font-medium">
                          {adjacentPages.next.title}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
}
