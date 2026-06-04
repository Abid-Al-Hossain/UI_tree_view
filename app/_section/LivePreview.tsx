"use client";

import type { CSSProperties } from "react";
import type { TreeViewState } from "../types";

function shell(state: TreeViewState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, gap: state.gap, borderRadius: state.radius, border: `${state.borderWidth}px solid ${state.border}`, boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`, background: state.background, color: state.foreground, fontFamily: state.fontFamily, opacity: state.disabled ? 0.55 : 1 };
}

export default function LivePreview({ state }: { state: TreeViewState }) {
  const model = state as Record<string, unknown>;
  const numberValue = (key: string, fallback: number) => typeof model[key] === "number" ? model[key] : fallback;
  const stringValue = (key: string, fallback: string) => typeof model[key] === "string" ? model[key] : fallback;
  const boolValue = (key: string) => typeof model[key] === "boolean" ? model[key] : false;
  const count = numberValue("itemCount", numberValue("rowCount", numberValue("slideCount", numberValue("imageCount", numberValue("filterCount", numberValue("controlCount", 5))))));
  const items = Array.from({ length: count }, (_, index) => index + 1);
  const badge = (text: string) => <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: state.border, color: state.accent }}>{text}</span>;
  const panel = shell(state);
  if ("chartType" in model) return <section role="img" aria-label={state.ariaLabel} style={panel} className="grid content-center"><h3 style={{ fontSize: state.titleSize }}>{state.title}</h3><div className="flex items-end gap-3">{items.map((item) => <div key={item} className="w-10 rounded-t-xl" style={{ height: 36 + item * 18, background: state.accent }} />)}</div></section>;
  if ("src" in model && ("showTimeline" in model || "showCaptions" in model)) return <section role={state.role} aria-label={state.ariaLabel} style={panel} className="grid content-center"><h3>{state.title}</h3>{"showTimeline" in model ? <audio controls muted={boolValue("muted")} loop={boolValue("loop")} preload={stringValue("preload", "metadata")} className="w-full" /> : <video controls muted={boolValue("muted")} loop={boolValue("loop")} preload={stringValue("preload", "metadata")} poster={stringValue("poster", "")} className="w-full rounded-xl bg-black/40" />}</section>;
  if (state.role === "dialog") return <div className="grid place-items-center"><section role="dialog" aria-label={state.ariaLabel} style={panel} className="grid"><h3 style={{ fontSize: state.titleSize }}>{state.title}</h3><p style={{ color: stringValue("muted", "#94a3b8") }}>{state.description}</p><div className="flex gap-2"><button type="button" className="rounded-xl px-4 py-2" style={{ background: state.accent, color: "#020617" }}>Action</button><button type="button" className="rounded-xl border px-4 py-2" style={{ borderColor: state.border }}>Cancel</button></div></section></div>;
  if (state.role === "table") return <table role="table" aria-label={state.ariaLabel} style={panel}><caption>{stringValue("caption", state.title)}</caption><tbody>{items.map((item) => <tr key={item}><th className="p-2 text-left">Row {item}</th><td className="p-2">{state.label}</td></tr>)}</tbody></table>;
  return <section id={state.id} role={state.role} aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} className="grid content-center"><h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3><p style={{ color: stringValue("muted", "#94a3b8"), fontSize: state.bodySize }}>{state.description}</p><div className="flex flex-wrap gap-2">{items.map((item) => badge(`${state.label} ${item}`))}</div><p className="text-xs" style={{ color: stringValue("muted", "#94a3b8") }}>{state.helper} · {stringValue("previewState", "default")}</p></section>;
}
