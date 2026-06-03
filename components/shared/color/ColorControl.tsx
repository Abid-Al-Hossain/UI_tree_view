"use client";

import React, { useEffect, useState } from "react";
import { norm } from "./colorUtils";

/**
 * Smart ColorControl: Matches Action Button's exact UI but manages text state internally.
 *
 * Props:
 * - label: Title
 * - value: The actual hex color (source of truth)
 * - onChange: Callback for new hex color
 * - palette: Optional array of hex colors
 */
export default function ColorControl(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  palette?: readonly string[];
}) {
  const { value, onChange, label, palette } = props;

  // Local state for the text input, initialized from prop
  const [text, setText] = useState(value);

  // Derived validation
  const { ok, hex, rgb } = norm(text);

  // Sync text if prop changes externally (and isn't just valid equivalent of current text)
  // We avoid clobbering user typing if they are typing "rgb(..."
  useEffect(() => {
    // If exact match, ignore
    if (value === text) return;

    // If the prop value matches the *parsed* text, ignore (allows user to type "rgb(0,0,0)" while value is "#000000")
    // But if prop changed to something else entirely (e.g. undo), update text.
    const currentParsed = norm(text);
    if (currentParsed.ok && currentParsed.hex === value) return;

    setText(value);
  }, [text, value]);

  const handleChange = (newText: string) => {
    setText(newText);
    const parsed = norm(newText);
    if (parsed.ok) {
      onChange(parsed.hex);
    }
  };

  const defaultPalette = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#d946ef",
    "#f43f5e",
    "#64748b",
    "#0f172a",
    "#ffffff",
  ];
  const activePalette = palette || defaultPalette;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {label}
        </label>
        <input
          type="color"
          value={ok ? hex : "#000000"}
          onChange={(e) => handleChange(e.target.value)}
          className="h-9 w-12 rounded-lg border uf-clickable"
          style={{ borderColor: "var(--border)", cursor: "pointer" }}
          aria-label={`Pick ${label} color`}
        />
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {activePalette.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => handleChange(c)}
            className="h-7 w-7 rounded-lg border transition uf-clickable"
            style={{
              background: c,
              borderColor: "var(--border)",
              cursor: "pointer",
              boxShadow: hex === c ? "0 0 0 2px var(--primary)" : "none",
            }}
            title={c}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <input
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="#RRGGBB or rgb(r,g,b)"
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
            color: "var(--text)",
          }}
        />
        <div
          className="rounded-xl border px-3 py-2 text-sm text-center"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
            color: "var(--muted)",
          }}
        >
          {ok ? rgb : "invalid"}
        </div>
      </div>
    </div>
  );
}
