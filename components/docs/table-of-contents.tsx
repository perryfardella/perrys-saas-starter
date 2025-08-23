"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Generate table of contents from headings
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      if (heading.id) {
        tocItems.push({
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        });
      }
    });

    setToc(tocItems);

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <div className="hidden xl:block fixed right-8 top-1/2 transform -translate-y-1/2 w-64">
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-4 text-sm">
          On this page
        </h4>
        <nav>
          <ul className="space-y-2 text-sm">
            {toc.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className={`block transition-colors hover:text-blue-600 ${
                    activeId === item.id
                      ? "text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                  style={{
                    paddingLeft: `${(item.level - 1) * 0.75}rem`,
                  }}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
