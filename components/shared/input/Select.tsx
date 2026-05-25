"use client";

export default function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-sm text-slate-300"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-slate-100">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
