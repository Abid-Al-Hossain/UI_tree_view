"use client";

import React, { useEffect, useRef, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup"; // html
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("html", markup);

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "jsx",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const rawCodeRef = useRef<HTMLTextAreaElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(code);
    } catch {
      rawCodeRef.current?.select();
      document.execCommand("copy");
      rawCodeRef.current?.blur();
      window.getSelection()?.removeAllRanges();
    } finally {
      setCopied(true);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`relative group rounded-xl overflow-hidden border border-[var(--border)] bg-[#1e1e1e] ${className}`}
      data-audit="code-block-root"
      data-testid="code-block-root"
    >
      <textarea
        ref={rawCodeRef}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
        value={code}
        className="sr-only"
        data-audit="code-raw-value"
        data-testid="code-raw-value"
      />
      <motion.button
        type="button"
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Copy code"
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Copy code"
        data-audit="copy-code-button"
        data-testid="copy-code-button"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Check size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Copy size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <ScrollableCode language={language} code={code} />
    </div>
  );
}

function ScrollableCode({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  return (
    <div
      className="custom-scrollbar h-full overflow-auto"
      data-audit="code-panel-scroll"
      data-testid="code-panel-scroll"
    >
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "transparent",
          fontSize: "13px",
          lineHeight: "1.6",
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
        }}
        showLineNumbers={true}
        lineNumberStyle={{
          minWidth: "2em",
          paddingRight: "1em",
          color: "#6e6e6e",
          textAlign: "right",
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
