"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  className = "",
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript" -> "typescript")
  const language = className.replace(/language-/, "") || "text";

  // Clean up the code content
  const code = children.trim();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Language display names
  const languageDisplayNames: Record<string, string> = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    jsx: "JSX",
    tsx: "TSX",
    json: "JSON",
    bash: "Bash",
    shell: "Shell",
    css: "CSS",
    html: "HTML",
    python: "Python",
    sql: "SQL",
    yaml: "YAML",
    yml: "YAML",
    markdown: "Markdown",
    text: "Plain Text",
  };

  const displayLanguage =
    languageDisplayNames[language] || language.toUpperCase();

  return (
    <div className="relative group mb-6">
      {/* Header with language tab and copy button */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 text-sm px-4 py-2 rounded-t-lg border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {displayLanguage}
          </div>
        </div>
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 hover:bg-gray-700 px-2 py-1 rounded text-xs hover:cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.5rem 0.5rem",
          }}
          lineNumberStyle={{
            color: "#6b7280",
            paddingRight: "1rem",
            marginRight: "1rem",
            borderRight: "1px solid #374151",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
