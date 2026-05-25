"use client";

export default function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      <div className="flex gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 rounded-xl border border-white/10 bg-transparent" />
        <input value={value} onChange={(e) => onChange(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-slate-100" />
      </div>
    </label>
  );
}
