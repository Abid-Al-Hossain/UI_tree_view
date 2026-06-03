"use client";

import React, { useEffect, useState } from "react";
import {
  PreviewPanel,
  type PreviewCanvasMode,
} from "@/components/shared/layout/PreviewPanel";
import ExportOptionsControl from "@/components/shared/export/ExportOptionsControl";
import { ScrollArea } from "./ScrollArea";
import CodeBlock from "./CodeBlock";
import { AnimatedToggle } from "./AnimatedToggle";
import { motion, AnimatePresence } from "framer-motion";

export type DownloadFormat = "react";

type IframePreviewDownloadPanelProps = {
  mounted: boolean;

  iframeSrcDoc: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  handleIframeLoad: () => void;

  downloadFormat: DownloadFormat;
  setDownloadFormat: (v: DownloadFormat) => void;

  downloadName: string;
  setDownloadName: (v: string) => void;

  handleDownload: () => void;
  previewNode?: React.ReactNode;
  code?: string;

  previewBgMode?: PreviewCanvasMode;
  setPreviewBgMode?: (v: PreviewCanvasMode) => void;
  previewBgInput?: string;
  setPreviewBgInput?: (v: string) => void;
};

type DirectPreviewDownloadPanelProps = {
  preview: React.ReactNode;
  code: string;
  downloadName: string;
  previewBgMode: PreviewCanvasMode;
  previewBgInput: string;
  onPreviewBgMode: (value: PreviewCanvasMode) => void;
  onPreviewBgInput: (value: string) => void;
};

type PreviewDownloadPanelProps =
  | IframePreviewDownloadPanelProps
  | DirectPreviewDownloadPanelProps;

const isDirectPanel = (
  props: PreviewDownloadPanelProps,
): props is DirectPreviewDownloadPanelProps => "preview" in props;

export function SharedPreviewDownloadPanel(props: PreviewDownloadPanelProps) {
  return isDirectPanel(props) ? (
    <DirectPreviewDownloadPanel {...props} />
  ) : (
    <IframePreviewDownloadPanel {...props} />
  );
}

export default SharedPreviewDownloadPanel;

function DirectPreviewDownloadPanel({
  preview,
  code,
  downloadName,
  previewBgMode,
  previewBgInput,
  onPreviewBgMode,
  onPreviewBgInput,
}: DirectPreviewDownloadPanelProps) {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileName, setFileName] = useState(downloadName);

  useEffect(() => {
    setFileName(downloadName);
  }, [downloadName]);

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${fileName || "component"}.jsx`;
    anchor.click();
    URL.revokeObjectURL(href);
    setIsDownloading(true);
    window.setTimeout(() => setIsDownloading(false), 1600);
  };

  return (
    <PanelShell
      viewMode={viewMode}
      setViewMode={setViewMode}
      code={code}
      downloadFormat="react"
      setDownloadFormat={() => undefined}
      downloadName={fileName}
      setDownloadName={setFileName}
      handleDownload={handleDownload}
      isDownloading={isDownloading}
      previewContent={
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
      }
    />
  );
}

function IframePreviewDownloadPanel(props: IframePreviewDownloadPanelProps) {
  const {
    mounted,
    iframeSrcDoc,
    iframeRef,
    handleIframeLoad,
    downloadFormat,
    setDownloadFormat,
    downloadName,
    setDownloadName,
    handleDownload,
    previewNode,
    code,
    previewBgMode,
    setPreviewBgMode,
    previewBgInput,
    setPreviewBgInput,
  } = props;

  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadWithFeedback = () => {
    handleDownload();
    setIsDownloading(true);
    window.setTimeout(() => setIsDownloading(false), 1600);
  };

  return (
    <PanelShell
      viewMode={viewMode}
      setViewMode={setViewMode}
      code={code}
      downloadFormat={downloadFormat}
      setDownloadFormat={setDownloadFormat}
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      handleDownload={handleDownloadWithFeedback}
      isDownloading={isDownloading}
      previewContent={
        <PreviewPanel
          bgMode={previewBgMode}
          setBgMode={setPreviewBgMode}
          customColor={previewBgInput}
          setCustomColor={setPreviewBgInput}
        >
          {previewNode ? (
            <div
              className="h-full w-full flex items-center justify-center"
              data-audit="preview-node-container"
              data-testid="preview-node-container"
            >
              {previewNode}
            </div>
          ) : mounted && iframeSrcDoc ? (
            <iframe
              ref={iframeRef}
              onLoad={handleIframeLoad}
              onFocus={() => {
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "focus-button" },
                  "*",
                );
              }}
              title="Action Button Preview"
              sandbox="allow-scripts"
              srcDoc={iframeSrcDoc}
              tabIndex={0}
              className="h-full w-full border-none"
              data-audit="preview-iframe"
              data-testid="preview-iframe"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </PreviewPanel>
      }
    />
  );
}

function PanelShell(props: {
  viewMode: "preview" | "code";
  setViewMode: (value: "preview" | "code") => void;
  code?: string;
  downloadFormat: DownloadFormat;
  setDownloadFormat: (value: DownloadFormat) => void;
  downloadName: string;
  setDownloadName: (value: string) => void;
  handleDownload: () => void;
  isDownloading: boolean;
  previewContent: React.ReactNode;
}) {
  const {
    viewMode,
    setViewMode,
    code,
    downloadFormat,
    setDownloadFormat,
    downloadName,
    setDownloadName,
    handleDownload,
    isDownloading,
    previewContent,
  } = props;

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
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--text)" }}
            >
              Output
            </div>

            {code && (
              <AnimatedToggle
                value={viewMode}
                onChange={(v) => setViewMode(v as "preview" | "code")}
                options={[
                  { value: "preview", label: "Design" },
                  { value: "code", label: "Code" },
                ]}
              />
            )}
          </div>

          <div data-audit="export-button" data-testid="export-button">
            <ExportOptionsControl
              format={downloadFormat}
              setFormat={setDownloadFormat}
              fileName={downloadName}
              setFileName={setDownloadName}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </div>
        </div>

        <div className="mt-4">
          <div
            className="h-[620px] w-full relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]"
            data-audit="preview-stage"
            data-testid="preview-stage"
          >
            <AnimatePresence mode="wait">
              {viewMode === "preview" ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, type: "spring", bounce: 0 }}
                  className="h-full w-full"
                  data-audit="preview-stage-preview"
                  data-testid="preview-stage-preview"
                >
                  {previewContent}
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, type: "spring", bounce: 0 }}
                  className="h-full w-full bg-[#1e1e1e]"
                  data-audit="code-panel"
                  data-testid="code-panel"
                >
                  <CodeBlock
                    code={code || ""}
                    language="tsx"
                    className="h-full border-none rounded-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
