"use client";

import React from "react";
import { Download, Check, FileCode, Code2 } from "lucide-react";
import Select from "../input/Select";

export type DownloadFormat = "react";

type ExportOptionsControlProps = {
  format: DownloadFormat;
  setFormat: (v: DownloadFormat) => void;

  fileName: string;
  setFileName: (v: string) => void;

  onDownload: () => void;
  isDownloading?: boolean;
};

export default function ExportOptionsControl({
  format,
  setFormat,
  fileName,
  setFileName,
  onDownload,
  isDownloading,
}: ExportOptionsControlProps) {
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
            onChange={(e) => setFileName(e.target.value)}
            placeholder="component-name"
            className="w-full rounded-xl border px-3 py-2 pl-9 text-sm font-medium outline-none transition-colors focus:border-[var(--primary)]"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--text)",
            }}
          />
          <FileCode
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
            style={{ color: "var(--text)" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-[180px]">
          <Select
            value={format}
            onChange={(v) => setFormat(v as DownloadFormat)}
            startContent={<Code2 size={16} />}
            options={[{ value: "react", label: "React / JSX" }]}
          />
        </div>

        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          aria-label={isDownloading ? "Downloaded React component" : "Export React component"}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: isDownloading
              ? "var(--success, #10b981)"
              : "var(--primary)",
            boxShadow: "0 2px 8px -2px rgba(0,0,0,0.2)",
          }}
        >
          {isDownloading ? (
            <>
              <Check size={16} />
              Downloaded
            </>
          ) : (
            <>
              <Download size={16} />
              Export
            </>
          )}
        </button>
      </div>
    </div>
  );
}
