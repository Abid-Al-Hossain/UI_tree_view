"use client";

import { LabeledField } from "../layout/LabeledField";

type Option<T extends string = string> = { value: T; label: string };

export function SegmentedControl<T extends string = string>(props: {
  label?: string;
  value: T;
  onChange: (v: T) => void;
  items?: Option<T>[];
  options?: Option<T>[];
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
            background: props.value === it.value ? "var(--primary)" : "transparent",
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

  if (props.label) return <LabeledField label={props.label}>{control}</LabeledField>;
  return control;
}
