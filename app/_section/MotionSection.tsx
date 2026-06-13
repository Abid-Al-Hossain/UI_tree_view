"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

const EASING_OPTIONS = [
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In/Out" },
  { value: "linear", label: "Linear" },
];

export default function MotionSection({ state, update }: Props) {
  return (
    <SectionCard title="Transitions" subtitle="Duration and easing for interactive state changes.">
      <div className="space-y-4">
        <LabeledField label={`Duration: ${state.transitionDuration}ms`}>
          <Slider value={state.transitionDuration} min={0} max={1000} step={10} onChange={(v) => update("transitionDuration", v)} />
        </LabeledField>
        <LabeledField label="Easing">
          <Select
            value={state.transitionEasing}
            onChange={(v) => update("transitionEasing", v as TreeViewState["transitionEasing"])}
            options={EASING_OPTIONS}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
