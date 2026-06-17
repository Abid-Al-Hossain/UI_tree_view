"use client";

import React from "react";

export interface SliderProps {
  value: string | number;
  onChange: (v: any) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  disabled?: boolean;
}

export default function Slider(props: SliderProps) {
  const input = (
    <input
      type="range"
      min={props.min}
      max={props.max}
      step={props.step ?? 1}
      value={props.value}
      onChange={(e) => {
        props.onChange(Number(e.target.value));
      }}
      disabled={props.disabled}
      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--primary)] hover:accent-[var(--primary-hover)] transition-all"
    />
  );

  if (!props.label) return input;

  return (
    <label className="grid gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
      <span className="flex items-center justify-between gap-3">
        <span>{props.label}</span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {props.value}
        </span>
      </span>
      {input}
    </label>
  );
}
