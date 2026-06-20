// WCAG 2.x contrast helpers + minimal readable-color enforcement.
// Used to guarantee text remains legible against its background regardless of
// the (randomized) preset color values.

type RGB = { r: number; g: number; b: number; a: number };

function parseRgb(input: string): RGB | null {
  const s = (input || "").trim().toLowerCase();
  if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  let m = s.match(/^#([0-9a-f]{3})$/);
  if (m) { const h = m[1]; return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16), a: 1 }; }
  m = s.match(/^#([0-9a-f]{6})$/);
  if (m) { const h = m[1]; return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) { const p = m[1].split(",").map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }; }
  return null;
}

function channel(v: number): number {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance(c: RGB): number {
  return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
}
function toHex(c: { r: number; g: number; b: number }): string {
  const h = (n: number) => { const s = Math.max(0, Math.min(255, Math.round(n))).toString(16); return s.length === 1 ? "0" + s : s; };
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
}
function mix(a: RGB, b: { r: number; g: number; b: number }, t: number) {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}

/** WCAG relative-contrast ratio between two CSS colors (1..21). */
export function contrastRatio(fg: string, bg: string): number {
  const a = parseRgb(fg), b = parseRgb(bg);
  if (!a || !b) return 21;
  const L1 = luminance(a), L2 = luminance(b);
  const hi = Math.max(L1, L2), lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

/** Pick the first solid (opaque) background; falls back to the last arg. */
export function solidBg(...colors: string[]): string {
  for (const c of colors) { const p = parseRgb(c); if (p && p.a >= 0.6) return c; }
  return colors[colors.length - 1];
}

/**
 * Return `fg` nudged minimally toward black or white so that its WCAG contrast
 * against `bg` is at least `min` (default 4.5 = AA body text). If already
 * sufficient (or colors unparemseable), `fg` is returned unchanged.
 */
export function ensureReadable(fg: string, bg: string, min = 4.5): string {
  const f = parseRgb(fg), b = parseRgb(bg);
  if (!f || !b) return fg;
  if (contrastRatio(fg, bg) >= min) return fg;
  const target = luminance(b) > 0.4 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
  let lo = 0, hi = 1, best = { r: target.r, g: target.g, b: target.b };
  for (let i = 0; i < 22; i++) {
    const t = (lo + hi) / 2;
    const cand = mix(f, target, t);
    if (contrastRatio(toHex(cand), bg) >= min) { best = cand; hi = t; } else { lo = t; }
  }
  return toHex(best);
}
