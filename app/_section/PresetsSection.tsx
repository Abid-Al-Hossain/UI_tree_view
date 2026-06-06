"use client";

import { useMemo, useState } from "react";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { TREEVIEW_PRESETS } from "../_data/TreeViewPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 8;

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [variant, setVariant] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(1);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const families = useMemo(() => ["all", ...Array.from(new Set(TREEVIEW_PRESETS.map((preset) => preset.family)))], []);
  const variants = useMemo(() => ["all", ...Array.from(new Set(TREEVIEW_PRESETS.map((preset) => preset.variant)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(TREEVIEW_PRESETS.map((preset) => preset.size)))], []);
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = TREEVIEW_PRESETS.filter((preset) => {
    const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();

    return (!normalizedQuery || haystack.includes(normalizedQuery)) &&
      (family === "all" || preset.family === family) &&
      (variant === "all" || preset.variant === variant) &&
      (size === "all" || preset.size === size);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const source = filtered.length ? filtered : TREEVIEW_PRESETS;
  const hasFilters = Boolean(normalizedQuery) || family !== "all" || variant !== "all" || size !== "all";

  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setVariant("all");
    setSize("all");
    setPage(1);
  };

  const applySurprise = () => {
    const nextIndex = (surpriseIndex + 1) % source.length;
    setSurpriseIndex(nextIndex);
    onApply(source[nextIndex]);
  };

  return (
    <SectionCard title="Presets" subtitle="48 structured full-state presets.">
      <div className="grid gap-3 sm:grid-cols-4" data-audit="preset-filters" data-testid="preset-filters">
        <Input label="Search presets" value={query} onChange={(value) => { setQuery(value); setPage(1); }} />
        <Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); setPage(1); }} />
        <Select label="Variant" value={variant} options={variants} onChange={(value) => { setVariant(value); setPage(1); }} />
        <Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); setPage(1); }} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "var(--muted)" }} data-audit="preset-result-count" data-testid="preset-result-count">
          Showing {visible.length} of {filtered.length} presets
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={resetFilters} disabled={!hasFilters} className="rounded-xl border px-4 py-3 text-sm font-semibold disabled:opacity-45" style={{ borderColor: "var(--border)", color: "var(--text)" }} data-audit="preset-reset-filters" data-testid="preset-reset-filters">Reset filters</button>
          <button type="button" onClick={applySurprise} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }} data-audit="preset-surprise" data-testid="preset-surprise">Surprise me</button>
        </div>
      </div>
      <div className="grid gap-3" data-audit="preset-results" data-testid="preset-results">
        {visible.map((preset) => {
          const applied = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApply(preset)}
              className="rounded-2xl border p-4 text-left"
              style={{
                borderColor: applied ? "var(--primary)" : "var(--border)",
                background: applied ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)",
                color: "var(--text)",
              }}
              data-audit="preset-apply-button"
              data-testid="preset-apply-button"
              data-preset-id={preset.id}
              data-applied={applied ? "true" : "false"}
            >
              <strong>{preset.archetype}</strong>
              <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-3" data-audit="preset-pagination" data-testid="preset-pagination">
        <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-45" style={{ borderColor: "var(--border)", color: "var(--text)" }} data-testid="preset-page-prev">Previous</button>
        <span className="text-sm" style={{ color: "var(--muted)" }}>Page {currentPage} of {pageCount}</span>
        <button type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-45" style={{ borderColor: "var(--border)", color: "var(--text)" }} data-testid="preset-page-next">Next</button>
      </div>
    </SectionCard>
  );
}
