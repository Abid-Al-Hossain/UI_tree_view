"use client";

import React, { useState } from "react";
import { LabeledField } from "../layout/LabeledField";

import Slider from "./Slider";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Smart SizeControl: Matches Action Button's exact UI but manages text state internally.
 */
export default function SizeControl(props: {
  label: string;
  value: number; // The actual numeric value (source of truth)
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hintRight?: string;
}) {
  const { value, onChange, min, max, step = 1, unit = "" } = props;

  const [draft, setDraft] = useState({ source: value, text: String(value) });
  const text =
    draft.source !== value && parseFloat(draft.text) !== value
      ? String(value)
      : draft.text;

  if (draft.source !== value) {
    setDraft({ source: value, text });
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({ source: value, text: e.target.value });
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      // We don't clamp immediately on type, only on blur or effectively?
      // Start Button logic actually just parses.
      // But we should clamped it for the "Computed" display at least.
      onChange(parsed);
    }
  };

  // Clamp only for the slider and computed value
  const numericVal = parseFloat(text);
  const safeVal = isNaN(numericVal) ? min : numericVal;
  const clamped = clamp(safeVal, min, max);

  return (
    <LabeledField label={props.label} hint={props.hintRight}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(val) => {
          setDraft({ source: value, text: String(val) });
          onChange(val);
        }}
      />
      <input
        value={text}
        onChange={handleTextChange}
        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          color: "var(--text)",
        }}
        placeholder={`${min}-${max}${unit}`}
      />
      <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
        Applied:{" "}
        <b style={{ color: "var(--text)" }}>
          {clamped}
          {unit}
        </b>
      </div>
    </LabeledField>
  );
}
