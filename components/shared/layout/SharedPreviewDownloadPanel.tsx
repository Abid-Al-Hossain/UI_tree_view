"use client";

import { useState } from "react";
import { PreviewPanel, type PreviewCanvasMode } from "./PreviewPanel";
import { ScrollArea } from "./ScrollArea";

type SharedPreviewDownloadPanelProps = {
  preview: React.ReactNode;
  code: string;
  downloadName: string;
  previewBgMode: PreviewCanvasMode;
  previewBgInput: string;
  onPreviewBgMode: (value: PreviewCanvasMode) => void;
  onPreviewBgInput: (value: string) => void;
};

function OutputToggle({
  value,
  onChange,
}: {
  value: "preview" | "code";
  onChange: (value: "preview" | "code") => void;
}) {
  const options = [
    { value: "preview", label: "Design" },
    { value: "code", label: "Code" },
  ] as const;

  return (
    <div
      className="flex p-1 rounded-full relative"
      style={{
        background: "color-mix(in oklab, var(--surface) 90%, transparent)",
        border: "1px solid var(--border)",
      }}
    >
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={
            "relative z-10 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-300 " +
            (value === option.value
              ? "text-white"
              : "text-[var(--muted)] hover:text-[var(--text)]")
          }
          style={{
            WebkitTapHighlightColor: "transparent",
            background: value === option.value ? "var(--primary)" : "transparent",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function FileCodeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M7 3h7l5 5v13H7z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M14 3v5h5" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="m10 13-2 2 2 2m4-4 2 2-2 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path d="m8 9-3 3 3 3m8-6 3 3-3 3M13 5l-2 14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ExportOptionsControl({
  fileName,
  onDownload,
  isDownloaded,
}: {
  fileName: string;
  onDownload: () => void;
  isDownloaded: boolean;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-2xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 50%, transparent)",
      }}
    >
      <div className="flex-1 min-w-[200px]">
        <div className="relative group">
          <input
            type="text"
            value={fileName}
            readOnly
            aria-label="Export filename"
            className="w-full rounded-xl border px-3 py-2 pl-9 text-sm font-medium outline-none transition-colors focus:border-[var(--primary)]"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--text)",
            }}
          />
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
            style={{ color: "var(--text)" }}
          >
            <FileCodeIcon />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-[180px]">
          <div
            className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold outline-none"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--text)",
            }}
          >
            <CodeIcon />
            React / JSX
          </div>
        </div>

        <button
          type="button"
          onClick={onDownload}
          aria-label={isDownloaded ? "Downloaded React component" : "Export React component"}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white transition-all active:scale-95"
          style={{
            background: isDownloaded ? "var(--success, #10b981)" : "var(--primary)",
            boxShadow: "0 2px 8px -2px rgba(0,0,0,0.2)",
          }}
        >
          {isDownloaded ? <CheckIcon /> : <DownloadIcon />}
          {isDownloaded ? "Downloaded" : "Export"}
        </button>
      </div>
    </div>
  );
}

function CodePanel({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="relative group h-full overflow-hidden border-none rounded-none bg-[#1e1e1e]"
      data-audit="code-block-root"
      data-testid="code-block-root"
    >
      <textarea
        readOnly
        tabIndex={-1}
        aria-hidden="true"
        value={code}
        className="sr-only"
        data-audit="code-raw-value"
        data-testid="code-raw-value"
      />
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute top-3 right-3 z-10 rounded-lg bg-white/10 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:bg-white/20 group-hover:opacity-100 focus:opacity-100"
        title="Copy code"
        data-audit="copy-code-button"
        data-testid="copy-code-button"
      >
        {copied ? <CheckIcon /> : <FileCodeIcon />}
      </button>
      <div
        className="custom-scrollbar h-full overflow-auto"
        data-audit="code-panel-scroll"
        data-testid="code-panel-scroll"
      >
        <pre className="m-0 bg-transparent p-6 font-mono text-[13px] leading-[1.6] text-slate-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function SharedPreviewDownloadPanel({
  preview,
  code,
  downloadName,
  previewBgMode,
  previewBgInput,
  onPreviewBgMode,
  onPreviewBgInput,
}: SharedPreviewDownloadPanelProps) {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [isDownloaded, setIsDownloaded] = useState(false);

  const download = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (downloadName || "component") + ".tsx";
    a.click();
    URL.revokeObjectURL(url);
    setIsDownloaded(true);
    window.setTimeout(() => setIsDownloaded(false), 1600);
  };

  return (
    <ScrollArea className="lg:pl-2 h-full">
      <div
        className="rounded-2xl border p-5 transition-all duration-300"
        data-audit="preview-download-panel"
        data-testid="preview-download-panel"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--surface) 80%, transparent)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              Output
            </div>
            <OutputToggle value={viewMode} onChange={setViewMode} />
          </div>

          <div data-audit="export-button" data-testid="export-button">
            <ExportOptionsControl fileName={downloadName} onDownload={download} isDownloaded={isDownloaded} />
          </div>
        </div>

        <div className="mt-4">
          <div
            className="h-[620px] w-full relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]"
            data-audit="preview-stage"
            data-testid="preview-stage"
          >
            {viewMode === "preview" ? (
              <div
                className="h-full w-full"
                data-audit="preview-stage-preview"
                data-testid="preview-stage-preview"
              >
                <PreviewPanel
                  bgMode={previewBgMode}
                  setBgMode={onPreviewBgMode}
                  customColor={previewBgInput}
                  setCustomColor={onPreviewBgInput}
                >
                  <div
                    className="h-full w-full flex items-center justify-center"
                    data-audit="preview-node-container"
                    data-testid="preview-node-container"
                  >
                    {preview}
                  </div>
                </PreviewPanel>
              </div>
            ) : (
              <div
                className="h-full w-full bg-[#1e1e1e]"
                data-audit="code-panel"
                data-testid="code-panel"
              >
                <CodePanel code={code} />
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-4 text-xs flex justify-between items-center"
          data-audit="preview-download-tip"
          data-testid="preview-download-tip"
          style={{ color: "var(--muted)" }}
        >
          <span>
            {viewMode === "preview"
              ? "Tip: Switch to 'Code' view to copy the snippet."
              : "Code updates live as you edit the design."}
          </span>
        </div>
      </div>
    </ScrollArea>
  );
}
