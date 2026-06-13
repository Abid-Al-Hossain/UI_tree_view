"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function RadiusSection({ state, update }: Props) {
  const setLinked = (linked: boolean) => {
    update("radiusLinked", linked);
    if (linked) {
      update("radiusTL", state.radius);
      update("radiusTR", state.radius);
      update("radiusBR", state.radius);
      update("radiusBL", state.radius);
    }
  };

  const setUniform = (v: number) => {
    update("radius", v);
    update("radiusTL", v);
    update("radiusTR", v);
    update("radiusBR", v);
    update("radiusBL", v);
  };

  return (
    <SectionCard title="Corner Radius" subtitle="Uniform or per-corner rounding.">
      <div className="space-y-4">
        <Switch
          label={`Link corners: ${state.radiusLinked ? "On" : "Off"}`}
          checked={state.radiusLinked}
          onChange={setLinked}
        />
        {state.radiusLinked ? (
          <LabeledField label={`Radius: ${state.radius}px`}>
            <Slider value={state.radius} min={0} max={56} step={1} onChange={setUniform} />
          </LabeledField>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <LabeledField label={`Top-left: ${state.radiusTL}px`}>
              <Slider value={state.radiusTL} min={0} max={56} step={1} onChange={(v) => update("radiusTL", v)} />
            </LabeledField>
            <LabeledField label={`Top-right: ${state.radiusTR}px`}>
              <Slider value={state.radiusTR} min={0} max={56} step={1} onChange={(v) => update("radiusTR", v)} />
            </LabeledField>
            <LabeledField label={`Bottom-right: ${state.radiusBR}px`}>
              <Slider value={state.radiusBR} min={0} max={56} step={1} onChange={(v) => update("radiusBR", v)} />
            </LabeledField>
            <LabeledField label={`Bottom-left: ${state.radiusBL}px`}>
              <Slider value={state.radiusBL} min={0} max={56} step={1} onChange={(v) => update("radiusBL", v)} />
            </LabeledField>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
