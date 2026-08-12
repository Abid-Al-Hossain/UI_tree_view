"use client";

import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (value: string) => void;
  onNativeChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input(props: InputProps) {
  const { className, label, onChange, onNativeChange, id, ...rest } = props;
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.currentTarget.value);
    onNativeChange?.(event);
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
    <label htmlFor={inputId} className="grid gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
      <span>{label}</span>
      {input}
    </label>
  );
}
