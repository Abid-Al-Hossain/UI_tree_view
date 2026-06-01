"use client";

import React from "react";
import { LabeledField } from "../layout/LabeledField";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: Array<SelectOption | string>;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  startContent?: React.ReactNode;
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function normalizeOption(option: SelectOption | string): SelectOption {
  return typeof option === "string" ? { value: option, label: option } : option;
}

export default function Select(props: SelectProps) {
  const {
    label,
    value,
    onChange,
    options,
    children,
    disabled,
    className,
    placeholder,
    startContent,
  } = props;

  const select = (
    <div className={`relative w-full ${className || ""}`}>
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ color: "var(--text)", opacity: 0.5 }}
      >
        {startContent}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-9 pr-8 appearance-none rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed ${
          startContent ? "pl-9" : "pl-3"
        }`}
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--card) 65%, transparent)",
          color: "var(--text)",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options && options.length > 0
          ? options.map((option) => {
              const opt = normalizeOption(option);
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            })
          : children}
      </select>

      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--muted)" }}
      >
        <ChevronDownIcon />
      </div>
    </div>
  );

  if (label) return <LabeledField label={label}>{select}</LabeledField>;
  return select;
}
