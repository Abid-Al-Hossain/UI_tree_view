"use client";

import React, { useId } from "react";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "min" | "max"> {
  value: string | number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
}

export default function Slider({ label, id, onChange, value, min, max, step = 1, ...rest }: SliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const input = (
    <input
      {...rest}
      id={inputId}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.currentTarget.value))}
      className={`h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-[var(--primary)] transition-all hover:accent-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50 ${rest.className ?? ""}`}
    />
  );

  if (!label) return input;

  return (
    <div className="grid gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
      <span className="flex items-center justify-between gap-3">
        <label htmlFor={inputId}>{label}</label>
        <output htmlFor={inputId} className="text-xs" style={{ color: "var(--muted)" }}>{value}</output>
      </span>
      {input}
    </div>
  );
}
