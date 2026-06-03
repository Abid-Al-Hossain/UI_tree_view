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
      className="inline-flex w-full rounded-xl border p-1"
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
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold uf-clickable"
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
