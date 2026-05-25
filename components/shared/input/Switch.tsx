"use client";

export default function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <button type="button" onClick={() => onChange(!checked)} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900 px-3 py-2 text-left text-sm text-slate-200"><span>{label}</span><span className={`h-6 w-11 rounded-full p-1 transition ${checked ? "bg-sky-300" : "bg-slate-700"}`}><span className={`block h-4 w-4 rounded-full bg-slate-950 transition ${checked ? "translate-x-5" : ""}`} /></span></button>;
}
