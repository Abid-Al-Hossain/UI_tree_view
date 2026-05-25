"use client";

const fonts = ["Inter", "IBM Plex Sans", "Space Grotesk", "Manrope", "Georgia", "JetBrains Mono"];

export default function FontFamilySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>Font family</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-slate-100">
        {fonts.map((font) => <option key={font} value={font}>{font}</option>)}
      </select>
    </label>
  );
}
