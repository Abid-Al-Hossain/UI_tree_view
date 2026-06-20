"use client";

// Self-contained WCAG contrast guard for the live preview.
// Renders nothing. While mounted it watches the preview area and, for any text
// element whose color fails WCAG AA against its ACTUAL rendered background,
// overrides the color to the nearest readable value. It only touches text that
// genuinely fails (good colors are left untouched), and it measures the real
// effective background (walking up the DOM), so it correctly accounts for the
// studio canvas behind components that don't draw their own surface.
//
// This guarantees "Surprise me" / any preset / any live edit never displays
// unreadable garbage, for every component, without per-component color wiring.

import { useEffect } from "react";
import { contrastRatio, ensureReadable } from "./wcag";

function parseRgba(s: string): { r: number; g: number; b: number; a: number } | null {
  const m = (s || "").match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const p = m[1].split(",").map((x) => parseFloat(x));
  return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
}

function effectiveBg(el: Element): string {
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const c = getComputedStyle(node).backgroundColor;
    const p = parseRgba(c);
    if (p && p.a >= 0.6) return `rgb(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)})`;
    node = node.parentElement;
  }
  return "rgb(11, 18, 32)"; // studio default canvas fallback
}

function hasOwnText(el: Element): boolean {
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === 3 && (n.textContent || "").trim().length > 0) return true;
  }
  return false;
}

export default function ContrastGuard({ min = 4.5 }: { min?: number }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const fix = () => {
      const root =
        document.querySelector('[data-testid="preview-node-container"]') ||
        document.querySelector('[data-testid="preview-stage-preview"]');
      if (!root) return;
      const els = root.querySelectorAll<HTMLElement>("*");
      for (const el of Array.from(els)) {
        if (el.closest('[aria-hidden="true"]')) continue; // decorative — WCAG exempt
        if (!hasOwnText(el)) continue;
        const cs = getComputedStyle(el);
        const fg = cs.color;
        const fgA = parseRgba(fg);
        if (!fgA) continue;
        // Text sits on its OWN background if it has one, else the nearest opaque ancestor.
        const bg = effectiveBg(el);
        // WCAG AA threshold: 3.0 for large text (>=24px, or >=18.66px bold), else 4.5.
        const fontSize = parseFloat(cs.fontSize) || 16;
        const bold = (parseInt(cs.fontWeight, 10) || 400) >= 700;
        const threshold = fontSize >= 24 || (fontSize >= 18.66 && bold) ? 3 : min;
        const ratio = fgA.a < 0.5 ? 0 : contrastRatio(fg, bg);
        if (ratio >= threshold) continue;
        const fixed = ensureReadable(fgA.a < 1 ? `rgb(${Math.round(fgA.r)}, ${Math.round(fgA.g)}, ${Math.round(fgA.b)})` : fg, bg, threshold);
        el.style.setProperty("color", fixed, "important");
      }
    };

    const observeOpts: MutationObserverInit = {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"],
      characterData: true,
    };
    const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

    // Leading + trailing throttle. Critically, we do NOT cancel a pending run on
    // every mutation — otherwise a continuous animation (framer-motion preview
    // transitions, skeleton shimmer) would starve the fix forever. Instead we run
    // at most once per ~120ms, but we DO keep running during animations.
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver;
    const runFix = () => {
      if (observer) observer.disconnect();
      try { fix(); } finally { if (observer) observer.observe(document.body, observeOpts); }
      last = now();
    };
    const schedule = () => {
      const dt = now() - last;
      if (dt >= 120) { runFix(); }
      else if (!timer) { timer = setTimeout(() => { timer = null; runFix(); }, 120 - dt); }
    };
    observer = new MutationObserver(schedule);

    runFix();
    observer.observe(document.body, observeOpts);
    return () => { observer.disconnect(); if (timer) clearTimeout(timer); };
  }, [min]);

  return null;
}
