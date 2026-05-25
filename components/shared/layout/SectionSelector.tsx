"use client";

export default function SectionSelector<T extends string>({ sections, active, onChange }: { sections: Array<{ id: T; label: string }>; active: T; onChange: (id: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-white/10 bg-slate-950/50 p-2">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onChange(section.id)}
          className={`rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${active === section.id ? "bg-sky-300 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}
