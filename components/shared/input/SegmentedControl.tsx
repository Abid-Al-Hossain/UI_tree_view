"use client";

import React from "react";

export function SegmentedControl(props: {
  label?: string;
  value: string;
  onChange: (v: any) => void;
  items?: { value: string; label: string }[];
  options?: { value: string; label: string }[];
}) {
  const items = props.items ?? props.options ?? [];
  const control = (
    <div
      className="inline-flex w-full rounded-xl border p-1"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 65%, transparent)",
      }}
    >
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          onClick={() => props.onChange(it.value)}
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold uf-clickable transition-all"
          style={{
            background:
              props.value === it.value ? "var(--primary)" : "transparent",
            color: props.value === it.value ? "white" : "var(--text)",
            boxShadow:
              props.value === it.value ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );

  if (!props.label) return control;

  return (
    <div className="grid gap-2">
      <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
        {props.label}
      </div>
      {control}
    </div>
  );
}
