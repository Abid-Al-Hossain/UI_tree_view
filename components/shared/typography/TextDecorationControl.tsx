"use client";

import React from "react";
import { LabeledField } from "../layout/LabeledField";

export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

type TextDecorationControlProps = {
  italic: boolean;
  setItalic: (v: boolean) => void;

  underline: boolean;
  setUnderline: (v: boolean) => void;

  textTransform: TextTransform;
  setTextTransform: (v: TextTransform) => void;
};

export default function TextDecorationControl({
  italic,
  setItalic,
  underline,
  setUnderline,
  textTransform,
  setTextTransform,
}: TextDecorationControlProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={italic}
            onChange={(e) => setItalic(e.target.checked)}
            className="accent-[var(--primary)]"
          />
          <span className="text-sm" style={{ color: "var(--text)" }}>
            Italic
          </span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={underline}
            onChange={(e) => setUnderline(e.target.checked)}
            className="accent-[var(--primary)]"
          />
          <span className="text-sm" style={{ color: "var(--text)" }}>
            Underline
          </span>
        </label>
      </div>

      <LabeledField label="Text transform">
        <select
          value={textTransform}
          onChange={(e) => setTextTransform(e.target.value as TextTransform)}
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
            color: "var(--text)",
          }}
        >
          <option value="none">None</option>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="capitalize">Capitalize</option>
        </select>
      </LabeledField>
    </div>
  );
}
