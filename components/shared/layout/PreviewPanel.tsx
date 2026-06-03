"use client";

import React, { useState } from "react";
import { Palette, Monitor, Moon, Sun } from "lucide-react";
import ColorControl from "../color/ColorControl";

export type PreviewCanvasMode = "white" | "black" | "custom";

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

  // Determine actual background style
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

  // Text color for the panel controls (inverse of bg somewhat, or just standard)
  // We'll use a fixed overlay style for the controls.

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
      {/* Content Area */}
      <div
        className="flex-1 overflow-auto p-8 flex items-center justify-center"
        data-audit="preview-canvas"
        data-testid="preview-canvas"
      >
        {children}
      </div>

      {/* Floating Settings Trigger */}
      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
        {/* Expanded Controls */}
        {isOpen && (
          <div
            className="mb-2 w-64 rounded-xl border p-3 shadow-xl backdrop-blur-md"
            data-audit="preview-panel-controls"
            data-testid="preview-panel-controls"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--card) 90%, transparent)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="mb-3 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Canvas Background
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-3 gap-1 mb-3">
              <button
                onClick={() => setBgMode("white")}
                className={`flex flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors ${
                  bgMode === "white"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                }`}
                title="White"
              >
                <Sun className="h-4 w-4 mb-1" />
                Light
              </button>
              <button
                onClick={() => setBgMode("black")}
                className={`flex flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors ${
                  bgMode === "black"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                }`}
                title="Black"
              >
                <Moon className="h-4 w-4 mb-1" />
                Dark
              </button>
              <button
                onClick={() => setBgMode("custom")}
                className={`flex flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors ${
                  bgMode === "custom"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                }`}
                title="Custom"
              >
                <Monitor className="h-4 w-4 mb-1" />
                Custom
              </button>
            </div>

            {/* Custom Color Input */}
            {bgMode === "custom" && (
              <div className="space-y-2">
                <ColorControl
                  label="Color"
                  value={customColor}
                  onChange={(v) => setCustomColor(v)}
                />
              </div>
            )}
          </div>
        )}

        {/* Toggle Button */}
        <button
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
          <Palette className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
