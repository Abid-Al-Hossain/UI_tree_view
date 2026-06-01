"use client";

import React from "react";

export function LabeledField(props: {
  label: React.ReactNode;
  children: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {props.label}
        </label>
        {props.hint && (
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            {props.hint}
          </div>
        )}
      </div>
      <div className="mt-2">{props.children}</div>
    </div>
  );
}
