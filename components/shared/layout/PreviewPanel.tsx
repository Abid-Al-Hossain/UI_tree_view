"use client";

import { useState } from "react";
import ColorControl from "../color/ColorControl";

export type PreviewCanvasMode = "white" | "black" | "custom";

function PaletteIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 1.3-3.05 1.55 1.55 0 0 1 1.1-2.65H17a4 4 0 0 0 4-4C21 6.7 17 3 12 3Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="7.6" cy="10" r="1" fill="currentColor" />
      <circle cx="10.4" cy="7.4" r="1" fill="currentColor" />
      <circle cx="14" cy="7.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="10.3" r="1" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 mb-1">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 mb-1">
      <path d="M20 14.4A7.7 7.7 0 0 1 9.6 4a8 8 0 1 0 10.4 10.4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 mb-1">
      <rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 20h6m-3-4v4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function PreviewPanel({
  children,
  bgMode: controlledBgMode,
  setBgMode: setControlledBgMode,
  customColor: controlledCustomColor,
  setCustomColor: setControlledCustomColor,
}: {
  children: React.ReactNode;
  bgMode?: PreviewCanvasMode;
  setBgMode?: (v: PreviewCanvasMode) => void;
  customColor?: string;
  setCustomColor?: (v: string) => void;
}) {
  const [localBgMode, setLocalBgMode] = useState<PreviewCanvasMode>("custom");
  const [localCustomColor, setLocalCustomColor] = useState("#0b1220");
  const [isOpen, setIsOpen] = useState(false);

  const bgMode = controlledBgMode ?? localBgMode;
  const customColor = controlledCustomColor ?? localCustomColor;
  const setBgMode = setControlledBgMode ?? setLocalBgMode;
  const setCustomColor = setControlledCustomColor ?? setLocalCustomColor;

  const backgroundStyle = (() => {
    switch (bgMode) {
      case "white":
        return "#ffffff";
      case "black":
        return "#000000";
      case "custom":
        return customColor;
    }
  })();

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-sm transition-colors duration-300"
      data-audit="preview-panel-root"
      data-testid="preview-panel-root"
      style={{
        borderColor: "var(--border)",
        backgroundColor: backgroundStyle,
      }}
    >
      <div
        className="flex-1 overflow-auto p-8 flex items-center justify-center"
        data-audit="preview-canvas"
        data-testid="preview-canvas"
      >
        {children}
      </div>

      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
        {isOpen && (
          <div
            className="mb-2 w-64 rounded-xl border p-3 shadow-xl backdrop-blur-md"
            data-audit="preview-panel-controls"
            data-testid="preview-panel-controls"
            style={{
              backgroundColor: "color-mix(in oklab, var(--card) 90%, transparent)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="mb-3 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Canvas Background
            </div>

            <div className="grid grid-cols-3 gap-1 mb-3">
              <button
                type="button"
                onClick={() => setBgMode("white")}
                className={
                  "flex flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors " +
                  (bgMode === "white"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500")
                }
                title="White"
              >
                <SunIcon />
                Light
              </button>
              <button
                type="button"
                onClick={() => setBgMode("black")}
                className={
                  "flex flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors " +
                  (bgMode === "black"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500")
                }
                title="Black"
              >
                <MoonIcon />
                Dark
              </button>
              <button
                type="button"
                onClick={() => setBgMode("custom")}
                className={
                  "flex flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors " +
                  (bgMode === "custom"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500")
                }
                title="Custom"
              >
                <MonitorIcon />
                Custom
              </button>
            </div>

            {bgMode === "custom" && (
              <div className="space-y-2">
                <ColorControl label="Color" value={customColor} onChange={(v) => setCustomColor(v)} />
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105 active:scale-95"
          data-audit="preview-panel-trigger"
          data-testid="preview-panel-trigger"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: isOpen ? "var(--primary)" : "var(--text)",
          }}
          title="Background Settings"
        >
          <PaletteIcon />
        </button>
      </div>
    </div>
  );
}
