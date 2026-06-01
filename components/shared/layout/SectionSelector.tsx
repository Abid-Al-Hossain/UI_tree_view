"use client";

import React from "react";

export interface Section<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

type LegacyProps<T extends string = string> = {
  sections: Section<T>[];
  active?: T;
  onChange?: (id: T) => void;
  activeSection?: T;
  onSectionChange?: (id: T) => void;
  columns?: 2 | 3 | 4 | 5;
  title?: string;
};

export default function SectionSelector<T extends string = string>({
  sections,
  active,
  onChange,
  activeSection,
  onSectionChange,
  columns,
  title = "Sections",
}: LegacyProps<T>) {
  const selected = activeSection ?? active ?? sections[0]?.id;
  const change = onSectionChange ?? onChange ?? (() => undefined);
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
      <div className="mb-3 text-xs font-semibold" style={{ color: "var(--muted)" }}>
        {title}
      </div>
      <div className={`grid gap-3 ${getGridClasses()}`}>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => change(section.id)}
            className="uf-clickable min-h-[52px] w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold leading-snug whitespace-normal break-words transition-all"
            style={{
              borderColor: "var(--border)",
              background: selected === section.id ? "var(--primary)" : "transparent",
              color: selected === section.id ? "white" : "var(--text)",
            }}
          >
            {section.icon ? <span className="mr-2 inline-flex">{section.icon}</span> : null}
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
