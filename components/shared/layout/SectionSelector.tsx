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
  // Build grid classes based on columns prop
  const getGridClasses = () => {
    if (columns) {
      const colMap = {
        2: "grid-cols-2",
        3: "grid-cols-2 sm:grid-cols-3",
        4: "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
        5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      };
      return colMap[columns];
    }
    // Default: adaptive based on section count
    if (sections.length <= 4) return "grid-cols-2 sm:grid-cols-4";
    if (sections.length <= 6) return "grid-cols-2 sm:grid-cols-3";
    return "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4";
  };

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
      <div className={`grid gap-3 ${getGridClasses()}`}>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleSectionChange?.(section.id)}
            className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words transition-all uf-clickable"
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
