"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import ColorControl from "@/components/shared/color/ColorControl";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function FocusRingSection({ state, update }: Props) {
  return (
    <SectionCard title="Focus Ring" subtitle="Keyboard focus outline for accessibility.">
      <div className="space-y-4">
        <Switch label="Enable focus ring" checked={state.focusRingEnabled} onChange={(v) => update("focusRingEnabled", v)} />
        {state.focusRingEnabled && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <LabeledField label={`Width: ${state.focusRingWidth}px`}>
                <Slider value={state.focusRingWidth} min={1} max={8} step={1} onChange={(v) => update("focusRingWidth", v)} />
              </LabeledField>
              <LabeledField label={`Offset: ${state.focusRingOffset}px`}>
                <Slider value={state.focusRingOffset} min={0} max={8} step={1} onChange={(v) => update("focusRingOffset", v)} />
              </LabeledField>
            </div>
            <ColorControl label="Ring color" value={state.focusRingColor} onChange={(v) => update("focusRingColor", v)} />
          </>
        )}
      </div>
    </SectionCard>
  );
}
