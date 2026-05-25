"use client";

export function SegmentedControl<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Array<{ value: T; label: string }>; onChange: (value: T) => void }) {
  return (
    <div className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      <div className="flex flex-wrap gap-2 rounded-2xl bg-white/5 p-1">
        {options.map((option) => (
          <button key={option.value} type="button" onClick={() => onChange(option.value)} className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${value === option.value ? "bg-sky-300 text-slate-950" : "text-slate-300 hover:bg-white/10"}`}>{option.label}</button>
        ))}
      </div>
    </div>
  );
}
