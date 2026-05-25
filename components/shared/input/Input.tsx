"use client";

export default function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-sm text-slate-300"><span>{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-slate-100" /></label>;
}
