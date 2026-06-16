"use client";

import React from "react";
import { RotateCcw, Undo2, Redo2 } from "lucide-react";

export interface UndoRedoButtonsProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  /** Optional reset to initial state */
  reset?: () => void;
  /** Show reset button (default: true if reset is provided) */
  showReset?: boolean;
}

/**
 * UndoRedoButtons - Reusable undo/redo/reset action buttons for playground headers.
 * Renders buttons with consistent styling and keyboard shortcut tooltips.
 */
export default function UndoRedoButtons({
  undo,
  redo,
  canUndo,
  canRedo,
  reset,
  showReset = true,
}: UndoRedoButtonsProps) {
  const buttonBase =
    "flex items-center justify-center p-2 rounded-lg border transition-all";

  const getButtonStyle = (enabled: boolean) => ({
    borderColor: "var(--border)",
    color: enabled ? "var(--text)" : "var(--muted)",
    opacity: enabled ? 1 : 0.5,
    cursor: enabled ? "pointer" : "not-allowed",
    background: enabled ? "var(--card)" : "transparent",
  });

  return (
    <>
      {/* Undo Button */}
      <button
        type="button"
        onClick={undo}
        disabled={!canUndo}
        className={buttonBase}
        style={getButtonStyle(canUndo)}
        title="Undo (Ctrl+Z)"
        aria-label="Undo"
      >
        <Undo2 size={18} />
      </button>

      {/* Redo Button */}
      <button
        type="button"
        onClick={redo}
        disabled={!canRedo}
        className={buttonBase}
        style={getButtonStyle(canRedo)}
        title="Redo (Ctrl+Y)"
        aria-label="Redo"
      >
        <Redo2 size={18} />
      </button>

      {/* Reset Button */}
      {reset && showReset && (
        <button
          type="button"
          onClick={reset}
          className={buttonBase}
          style={getButtonStyle(true)}
          title="Reset to default"
          aria-label="Reset to default"
        >
          <RotateCcw size={18} />
        </button>
      )}
    </>
  );
}
