"use client";

import React from "react";

export interface Section<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SectionSelectorProps<T extends string = string> {
  /** Array of section definitions */
  sections: Section<T>[];
  /** Currently active section ID */
  activeSection?: T;
  active?: T;
  /** Callback when section changes */
  onSectionChange?: (id: T) => void;
  onChange?: (id: T) => void;
  /** Number of columns in grid (default: adapts to screen size) */
  columns?: 2 | 3 | 4 | 5;
  /** Title above sections (default: "Sections") */
  title?: string;
}

/**
 * SectionSelector - Reusable section tabs/buttons for playground controls.
 * Used to switch between different editing sections (Basics, Sizing, Colors, etc.)
 */
export default function SectionSelector<T extends string = string>({
  sections,
  activeSection,
  active,
  onSectionChange,
  onChange,
  columns,
  title = "Sections",
}: SectionSelectorProps<T>) {
  const selectedSection = activeSection ?? active ?? sections[0]?.id;
  const handleSectionChange = onSectionChange ?? onChange;
  // Columns are sized to the editor PANEL width (not the viewport) via an
  // auto-fill grid with a sensible minimum track width, so labels like
  // "Accessibility" never get squeezed into a too-narrow column and break.
  // An explicit `columns` prop still pins an exact count when needed.
  const gridStyle: React.CSSProperties = columns
    ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    : { gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))" };

  return (
    <div
      className="rounded-2xl border p-3"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--card) 70%, transparent)",
      }}
    >
      <div
        className="text-xs font-semibold mb-3"
        style={{ color: "var(--muted)" }}
      >
        {title}
      </div>
      <div className="grid gap-2.5" style={gridStyle}>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleSectionChange?.(section.id)}
            className="min-h-[52px] w-full rounded-xl border px-3 py-2.5 text-sm font-semibold leading-tight text-center whitespace-normal break-words hyphens-none transition-all uf-clickable"
            style={{
              borderColor: "var(--border)",
              background:
                selectedSection === section.id ? "var(--primary)" : "transparent",
              color: selectedSection === section.id ? "white" : "var(--text)",
            }}
          >
            {section.icon && (
              <span className="mr-2 inline-flex">{section.icon}</span>
            )}
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
