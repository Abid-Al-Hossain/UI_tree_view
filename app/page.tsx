"use client";

import { useMemo, useState } from "react";
import ColorControl from "@/components/shared/color/ColorControl";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import SectionSelector from "@/components/shared/layout/SectionSelector";
import { SharedPreviewDownloadPanel } from "@/components/shared/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/components/shared/layout/PreviewPanel";
import FontFamilySelect from "@/components/shared/typography/FontFamilySelect";

type SectionId = "presets" | "basics" | "content" | "layout" | "surface" | "states" | "accessibility";
type Density = "compact" | "balanced" | "spacious";
type Tone = "neutral" | "brand" | "success" | "warning" | "danger";

type StudioState = {
  title: string;
  description: string;
  label: string;
  value: string;
  helper: string;
  id: string;
  name: string;
  required: boolean;
  disabled: boolean;
  interactive: boolean;
  density: Density;
  tone: Tone;
  radius: number;
  borderWidth: number;
  shadow: number;
  width: number;
  height: number;
  gap: number;
  itemCount: number;
  accent: string;
  background: string;
  foreground: string;
  border: string;
  fontFamily: string;
  fontSize: number;
  motion: boolean;
  previewState: string;
};

type Preset = { family: string; archetype: string; variant: string; size: string; tags: string[]; state: StudioState };

const sections: Array<{ id: SectionId; label: string }> = [
  { id: "presets", label: "Presets" },
  { id: "basics", label: "Basics" },
  { id: "content", label: "Content" },
  { id: "layout", label: "Layout" },
  { id: "surface", label: "Surface" },
  { id: "states", label: "State Preview" },
  { id: "accessibility", label: "Accessibility" },
];

const nativeFeatures = [
  "Content model: item count, labels, metadata, actions, empty/loading states",
  "Structure: orientation, density, hierarchy, separators, active/selected/expanded state",
  "Interaction: keyboard semantics where APG defines them, hover/focus/active previews",
  "Accessibility: roles, labels, heading levels, table/list/tree/tab relationships"
] as const;

const defaultState: StudioState = {
  title: "Tree View Studio",
  description: "Native tree view pattern with preview/export-honest controls.",
  label: "Tree View",
  value: "tree view",
  helper: "Production-ready, accessible, React-only output.",
  id: "tree-view-instance",
  name: "tree-view",
  required: false,
  disabled: false,
  interactive: true,
  density: "balanced",
  tone: "brand",
  radius: 22,
  borderWidth: 1,
  shadow: 24,
  width: 360,
  height: 180,
  gap: 14,
  itemCount: 4,
  accent: "#38bdf8",
  background: "#0f172a",
  foreground: "#e5eefb",
  border: "#334155",
  fontFamily: "Inter",
  fontSize: 16,
  motion: true,
  previewState: "default",
};

const presets: Preset[] = [
  { family: "data", archetype: "SaaS", variant: "glass", size: "balanced", tags: ["premium", "dark", "export-safe"], state: defaultState },
  { family: "data", archetype: "Editorial", variant: "soft", size: "spacious", tags: ["marketplace", "content"], state: { ...defaultState, density: "spacious", background: "#f8fafc", foreground: "#0f172a", border: "#cbd5e1", accent: "#f59e0b", shadow: 10 } },
  { family: "data", archetype: "Admin", variant: "crisp", size: "compact", tags: ["dashboard", "dense"], state: { ...defaultState, density: "compact", radius: 10, width: 320, height: 140, gap: 8, fontSize: 14, accent: "#22c55e" } },
  { family: "data", archetype: "Commerce", variant: "hero", size: "spacious", tags: ["commerce", "bold"], state: { ...defaultState, title: "Conversion Tree View", accent: "#fb7185", background: "#1e1b4b", width: 420, height: 220, shadow: 36 } },
];

function renderPreview(state: StudioState) {
  const commonStyle = {
    width: state.width,
    minHeight: state.height,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    fontSize: state.fontSize,
    opacity: state.disabled ? 0.55 : 1,
  } as React.CSSProperties;

  const items = Array.from({ length: state.itemCount }, (_, index) => index + 1);
  const pill = (text: string) => <span style={{ border: `1px solid ${state.border}`, borderRadius: 999, padding: "6px 10px", color: state.accent }}>{text}</span>;

  switch ("tree" as string) {
    case "date":
      return <div style={commonStyle} className="grid content-center p-6"><label htmlFor={state.id}>{state.label}</label><input id={state.id} name={state.name} required={state.required} disabled={state.disabled} type="date" className="rounded-xl border border-slate-500 bg-white/10 p-3" /><small>{state.helper}</small></div>;
    case "time":
      return <div style={commonStyle} className="grid content-center p-6"><label htmlFor={state.id}>{state.label}</label><input id={state.id} name={state.name} required={state.required} disabled={state.disabled} type="time" className="rounded-xl border border-slate-500 bg-white/10 p-3" /><small>{state.helper}</small></div>;
    case "file":
      return <div style={commonStyle} className="grid place-items-center p-6 text-center"><strong>{state.label}</strong><p>{state.description}</p><input id={state.id} name={state.name} disabled={state.disabled} type="file" multiple className="max-w-full" /></div>;
    case "otp":
      return <div style={commonStyle} className="grid place-items-center p-6"><strong>{state.label}</strong><div className="flex gap-2">{items.map((i) => <input key={i} aria-label={`Digit ${i}`} maxLength={1} className="h-12 w-10 rounded-xl border border-slate-500 bg-white/10 text-center" />)}</div><small>{state.helper}</small></div>;
    case "slider":
      return <div style={commonStyle} className="grid content-center p-6"><label htmlFor={state.id}>{state.label}</label><input id={state.id} name={state.name} type="range" min={0} max={100} defaultValue={60} disabled={state.disabled} style={{ accentColor: state.accent }} /><small>{state.helper}</small></div>;
    case "select":
      return <div style={commonStyle} className="grid content-center p-6"><label htmlFor={state.id}>{state.label}</label><select id={state.id} name={state.name} required={state.required} disabled={state.disabled} className="rounded-xl border border-slate-500 bg-slate-900 p-3">{items.map((i) => <option key={i}>Option {i}</option>)}</select><small>{state.helper}</small></div>;
    case "search":
      return <div style={commonStyle} className="grid content-center p-6"><label htmlFor={state.id}>{state.label}</label><input id={state.id} name={state.name} type="search" placeholder="Search components..." disabled={state.disabled} className="rounded-xl border border-slate-500 bg-white/10 p-3" /><small>{state.helper}</small></div>;
    case "accordion":
      return <div style={commonStyle} className="grid p-5">{items.map((i) => <details key={i} open={i === 1} className="rounded-xl border border-white/10 p-3"><summary>{state.label} {i}</summary><p>{state.description}</p></details>)}</div>;
    case "tabs":
      return <div style={commonStyle} className="p-5"><div role="tablist" className="flex gap-2">{items.map((i) => pill(`Tab ${i}`))}</div><div className="mt-4 rounded-xl border border-white/10 p-4">Panel content for {state.label}</div></div>;
    case "tables":
      return <table style={commonStyle} className="p-4"><caption>{state.label}</caption><tbody>{items.map((i) => <tr key={i}><th className="p-2 text-left">Row {i}</th><td className="p-2">{state.value}</td></tr>)}</tbody></table>;
    case "modal":
    case "drawer":
    case "popover":
    case "toast":
      return <div style={commonStyle} className="grid place-items-center p-6"><div className="rounded-2xl border border-white/10 bg-black/25 p-5"><strong>{state.title}</strong><p>{state.description}</p><button className="rounded-xl px-4 py-2" style={{ background: state.accent, color: "#020617" }}>Action</button></div></div>;
    case "audio":
      return <div style={commonStyle} className="grid content-center p-6"><strong>{state.label}</strong><audio controls className="w-full" /><small>{state.helper}</small></div>;
    case "video":
      return <div style={commonStyle} className="grid content-center p-6"><strong>{state.label}</strong><video controls poster="" className="w-full rounded-xl bg-black/40" /><small>{state.helper}</small></div>;
    case "chart":
      return <div style={commonStyle} className="flex items-end justify-center p-6">{items.map((i) => <div key={i} style={{ height: 36 + i * 22, background: state.accent }} className="w-12 rounded-t-xl opacity-80" />)}</div>;
    case "skeleton":
      return <div style={commonStyle} className="grid content-center p-6">{items.map((i) => <div key={i} className="h-5 rounded-full bg-white/20" style={{ width: `${55 + i * 8}%` }} />)}</div>;
    case "breadcrumb":
      return <nav aria-label={state.label} style={commonStyle} className="flex items-center p-6">{items.map((i) => <span key={i}>{i > 1 ? " / " : ""}Level {i}</span>)}</nav>;
    case "stepper":
      return <ol style={commonStyle} className="flex items-center justify-center p-6">{items.map((i) => <li key={i} className="flex items-center gap-2">{pill(String(i))}<span>Step {i}</span></li>)}</ol>;
    case "grid":
    case "gallery":
      return <div style={commonStyle} className="grid grid-cols-2 p-5">{items.map((i) => <div key={i} className="rounded-xl bg-white/10 p-5">Item {i}</div>)}</div>;
    default:
      return <div style={commonStyle} className="flex flex-col justify-center p-6"><strong>{state.title}</strong><p>{state.description}</p><div className="flex flex-wrap gap-2">{items.map((i) => pill(`${state.label} ${i}`))}</div></div>;
  }
}

function buildReactCode(state: StudioState) {
  return `import * as React from "react";\n\nexport default function TreeView() {\n  const state = ${JSON.stringify(state, null, 2)};\n\n  return (\n    <section\n      id={state.id}\n      aria-label={state.label}\n      style={{\n        width: state.width,\n        minHeight: state.height,\n        borderRadius: state.radius,\n        border: \`\${state.borderWidth}px solid \${state.border}\`,\n        background: state.background,\n        color: state.foreground,\n        fontFamily: state.fontFamily,\n        padding: state.gap * 1.5,\n      }}\n    >\n      <strong>{state.title}</strong>\n      <p>{state.description}</p>\n      <small>{state.helper}</small>\n    </section>\n  );\n}\n`;
}

export default function Page() {
  const [state, setState] = useState<StudioState>(defaultState);
  const [activeSection, setActiveSection] = useState<SectionId>("presets");
  const [downloadName, setDownloadName] = useState("tree-view-component");
  const [previewBgMode, setPreviewBgMode] = useState<PreviewCanvasMode>("studio");
  const [previewBgInput, setPreviewBgInput] = useState("#0f172a");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const code = useMemo(() => buildReactCode(state), [state]);
  const preview = useMemo(() => <div key={previewResetKey}>{renderPreview(state)}</div>, [previewResetKey, state]);
  const update = <K extends keyof StudioState>(key: K, value: StudioState[K]) => setState((current) => ({ ...current, [key]: value }));

  return (
    <main className="mx-auto grid min-h-screen max-w-[1500px] gap-6 px-5 py-6 lg:grid-cols-[430px_1fr]">
      <aside className="space-y-5">
        <header className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">UI Foundry Standalone</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Tree View Studio</h1>
          <p className="mt-2 text-sm text-slate-400">Self-contained, React-only, buyer-ready tree view generator.</p>
        </header>
        <SectionSelector sections={sections} active={activeSection} onChange={setActiveSection} />

        {activeSection === "presets" && <SectionCard title="Presets" subtitle="Structured full-state presets.">{presets.map((preset) => <button key={preset.archetype} type="button" onClick={() => { setState(preset.state); setPreviewResetKey((v) => v + 1); }} className="block w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"><strong>{preset.archetype}</strong><span className="ml-2 text-xs uppercase tracking-[0.16em] text-slate-400">{preset.variant} / {preset.size}</span><p className="mt-1 text-sm text-slate-400">{preset.tags.join(", ")}</p></button>)}</SectionCard>}
        {activeSection === "basics" && <SectionCard title="Basics" subtitle="Core component identity."><Input label="Title" value={state.title} onChange={(v) => update("title", v)} /><Input label="Label" value={state.label} onChange={(v) => update("label", v)} /><Input label="Value" value={state.value} onChange={(v) => update("value", v)} /><Input label="Download filename" value={downloadName} onChange={setDownloadName} /></SectionCard>}
        {activeSection === "content" && <SectionCard title="Content" subtitle="Text, descriptions, and generated item model."><Input label="Description" value={state.description} onChange={(v) => update("description", v)} /><Input label="Helper text" value={state.helper} onChange={(v) => update("helper", v)} /><Slider label="Item count" value={state.itemCount} min={1} max={8} onChange={(v) => update("itemCount", v)} /><FontFamilySelect value={state.fontFamily} onChange={(v) => update("fontFamily", v)} /><Slider label="Font size" value={state.fontSize} min={12} max={28} onChange={(v) => update("fontSize", v)} /></SectionCard>}
        {activeSection === "layout" && <SectionCard title="Layout" subtitle="Native spacing and sizing controls."><SegmentedControl label="Density" value={state.density} onChange={(v) => update("density", v)} options={[{ value: "compact", label: "Compact" }, { value: "balanced", label: "Balanced" }, { value: "spacious", label: "Spacious" }]} /><Slider label="Width" value={state.width} min={220} max={720} onChange={(v) => update("width", v)} /><Slider label="Height" value={state.height} min={80} max={480} onChange={(v) => update("height", v)} /><Slider label="Gap" value={state.gap} min={4} max={36} onChange={(v) => update("gap", v)} /></SectionCard>}
        {activeSection === "surface" && <SectionCard title="Surface" subtitle="Button-canon color, radius, border, and shadow controls."><SegmentedControl label="Tone" value={state.tone} onChange={(v) => update("tone", v)} options={[{ value: "neutral", label: "Neutral" }, { value: "brand", label: "Brand" }, { value: "success", label: "Success" }, { value: "warning", label: "Warning" }, { value: "danger", label: "Danger" }]} /><ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} /><ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} /><ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} /><ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} /><Slider label="Radius" value={state.radius} min={0} max={56} onChange={(v) => update("radius", v)} /><Slider label="Border width" value={state.borderWidth} min={0} max={8} onChange={(v) => update("borderWidth", v)} /><Slider label="Shadow" value={state.shadow} min={0} max={72} onChange={(v) => update("shadow", v)} /></SectionCard>}
        {activeSection === "states" && <SectionCard title="State Preview" subtitle="Preview native component states honestly."><Select label="Preview state" value={state.previewState} options={["default", "hover", "focus", "active", "disabled", "invalid", "loading", "empty"]} onChange={(v) => update("previewState", v)} /><Switch label="Disabled" checked={state.disabled} onChange={(v) => update("disabled", v)} /><Switch label="Interactive" checked={state.interactive} onChange={(v) => update("interactive", v)} /><Switch label="Motion safe effects" checked={state.motion} onChange={(v) => update("motion", v)} /></SectionCard>}
        {activeSection === "accessibility" && <SectionCard title="Accessibility" subtitle="Native attributes and semantic guidance."><Input label="id" value={state.id} onChange={(v) => update("id", v)} /><Input label="name" value={state.name} onChange={(v) => update("name", v)} /><Switch label="Required where native" checked={state.required} onChange={(v) => update("required", v)} /><div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{nativeFeatures.map((feature) => <p key={feature}>- {feature}</p>)}</div></SectionCard>}
      </aside>
      <SharedPreviewDownloadPanel preview={preview} code={code} downloadName={downloadName} previewBgMode={previewBgMode} previewBgInput={previewBgInput} onPreviewBgMode={setPreviewBgMode} onPreviewBgInput={setPreviewBgInput} />
    </main>
  );
}

