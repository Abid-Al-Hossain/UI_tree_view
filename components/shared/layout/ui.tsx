"use client";

import React from "react";

export function SectionCard(props: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--card) 70%, transparent)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            {props.title}
          </div>
          {props.subtitle ? (
            <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
              {props.subtitle}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-4">{props.children}</div>
    </div>
  );
}

export function LabeledField(props: {
  label: React.ReactNode;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {props.label}
        </label>
        {props.hint ? (
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {props.hint}
          </span>
        ) : null}
      </div>
      <div className="mt-2">{props.children}</div>
    </div>
  );
}

export function Segmented(props: {
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
}) {
  return (
    <div
      className="flex flex-wrap w-full gap-1.5 rounded-xl border p-1"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 65%, transparent)",
      }}
    >
      {props.items.map((it) => (
        <button
          key={it.value}
          type="button"
          onClick={() => props.onChange(it.value)}
          className="flex-1 min-w-[72px] rounded-lg px-3 py-2 text-sm font-semibold uf-clickable whitespace-nowrap"
          style={{
            background:
              props.value === it.value ? "var(--primary)" : "transparent",
            color: props.value === it.value ? "white" : "var(--text)",
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/**
 * FilterSelect — same prop shape as `Segmented` (value / onChange(value) /
 * items|options) but renders a compact native dropdown styled like the studio's
 * other selects. Use this for preset FILTERS with several options: a segmented
 * control with many options collapses to a tall one-per-row stack in the narrow
 * filter grid, whereas a dropdown stays compact and consistent.
 */
export function FilterSelect(props: {
  value: string;
  onChange: (value: string) => void;
  items?: { value: string; label: string }[];
  options?: { value: string; label: string }[];
}) {
  const opts = props.items ?? props.options ?? [];
  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 70%, transparent)",
        color: "var(--text)",
      }}
    >
      {opts.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ExportWarningBadge({
  label = "React Export Only",
}: {
  label?: string;
}) {
  return (
    <span
      className="ml-2 inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        color: "#fbbf24",
        border: "1px solid rgba(245, 158, 11, 0.2)",
      }}
      title="This feature requires Javascript/React and will not work in pure HTML/CSS export."
    >
      {label}
    </span>
  );
}

export { default as Slider } from "@/components/shared/input/Slider";
