"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import ColorControl from "@/components/shared/color/ColorControl";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function DisabledSection({ state, update }: Props) {
  return (
    <SectionCard title="Disabled" subtitle="Opacity, cursor, and colors while disabled.">
      <div className="space-y-4">
        <LabeledField label={`Opacity: ${state.disabledOpacity.toFixed(2)}`}>
          <Slider value={state.disabledOpacity} min={0} max={1} step={0.05} onChange={(v) => update("disabledOpacity", v)} />
        </LabeledField>
        <div>
          <div className="text-sm font-medium mb-2" style={{ color: "var(--text)" }}>Cursor</div>
          <div className="grid grid-cols-3 gap-2">
            {(["not-allowed", "default", "pointer"] as const).map((c) => (
              <button key={c} type="button" onClick={() => update("disabledCursor", c)}
                className="rounded-lg border px-2 py-1.5 text-xs font-medium transition uf-clickable"
                style={{ borderColor: "var(--border)", background: state.disabledCursor === c ? "var(--primary)" : "color-mix(in oklab, var(--surface) 65%, transparent)", color: state.disabledCursor === c ? "white" : "var(--text)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <Switch label="Custom disabled colors" checked={state.disabledUseCustomColors} onChange={(v) => update("disabledUseCustomColors", v)} />
        {state.disabledUseCustomColors && (
          <div className="space-y-3">
            <ColorControl label="Background" value={state.disabledBg} onChange={(v) => update("disabledBg", v)} />
            <ColorControl label="Text" value={state.disabledText} onChange={(v) => update("disabledText", v)} />
            <ColorControl label="Border" value={state.disabledBorder} onChange={(v) => update("disabledBorder", v)} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
