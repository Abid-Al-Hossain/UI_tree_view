"use client";

import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (value: any) => void;
}

export default function Input(props: InputProps) {
  const { className, label, onChange, id, ...rest } = props;
  const inputId = id ?? (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!onChange) return;

    if (label) {
      (onChange as (value: string) => void)(event.target.value);
      return;
    }

    (onChange as React.ChangeEventHandler<HTMLInputElement>)(event);
  };

  const input = (
    <input
      {...rest}
      id={inputId}
      onChange={handleChange}
      className={`w-full h-9 px-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 outline-none focus:border-[var(--primary)] transition-colors placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--card) 65%, transparent)",
        color: "var(--text)",
        ...props.style,
      }}
    />
  );

  if (!label) return input;

  return (
    <label className="grid gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
      <span>{label}</span>
      {input}
    </label>
  );
}
