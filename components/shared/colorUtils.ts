"use client";

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toHex2(n: number) {
  const s = clamp(Math.round(n), 0, 255).toString(16);
  return s.length === 1 ? `0${s}` : s;
}

export function norm(input: string): { ok: boolean; hex: string; rgb: string } {
  const raw = (input || "").trim();

  if (/^#([0-9a-fA-F]{3})$/.test(raw)) {
    const m = raw.slice(1);
    const r = m[0] + m[0];
    const g = m[1] + m[1];
    const b = m[2] + m[2];
    const hex = `#${r}${g}${b}`.toLowerCase();
    const rr = parseInt(r, 16);
    const gg = parseInt(g, 16);
    const bb = parseInt(b, 16);
    return { ok: true, hex, rgb: `rgb(${rr}, ${gg}, ${bb})` };
  }

  if (/^#([0-9a-fA-F]{6})$/.test(raw)) {
    const hex = raw.toLowerCase();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  const rgbFn = raw.match(
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
  );
  if (rgbFn) {
    const r = clamp(Number(rgbFn[1]), 0, 255);
    const g = clamp(Number(rgbFn[2]), 0, 255);
    const b = clamp(Number(rgbFn[3]), 0, 255);
    const hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  const csv = raw.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
  if (csv) {
    const r = clamp(Number(csv[1]), 0, 255);
    const g = clamp(Number(csv[2]), 0, 255);
    const b = clamp(Number(csv[3]), 0, 255);
    const hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  return { ok: false, hex: "#000000", rgb: "rgb(0, 0, 0)" };
}
