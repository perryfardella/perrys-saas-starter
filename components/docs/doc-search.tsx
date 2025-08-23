"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { getAllDocSections } from "@/app/docs/docs-data";

interface SearchResult {
  title: string;
  slug: string;
  section: string;
  description?: string;
}

export function DocSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Generate searchable content
  const searchableContent = getAllDocSections().flatMap((section) =>
    section.pages.map((page) => ({
      title: page.title,
      slug: page.slug,
      section: section.title,
      description: page.description,
    }))
  );

  useEffect(() => {
    // Handle keyboard shortcut (Cmd/Ctrl + K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // Simple search implementation
    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 6)); // Limit to 6 results
  }, [query]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search docs...</span>
        <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
          ⌘K
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl mt-16">
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search results */}
        <div className="max-h-96 overflow-y-auto">
          {query && results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/docs/${result.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    {result.title}
                  </div>
                  <div className="text-sm text-gray-500">{result.section}</div>
                  {result.description && (
                    <div className="text-sm text-gray-600 mt-1">
                      {result.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500 border-t border-gray-200">
          <span>Search by page title and content</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
