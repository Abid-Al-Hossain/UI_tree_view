"use client";

import React from "react";

export function SectionCard({
  title,
  subtitle,
  children,
}: {
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
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {title}
          </div>
        {subtitle ? (
          <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            {subtitle}
          </div>
        ) : null}
        </div>
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
