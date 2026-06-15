"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Selection" subtitle="Node selection mode.">
        <Select label="Selection" value={state.selectionMode} options={["none", "single", "multiple"]} onChange={(value) => update("selectionMode", value)} />
      </SectionCard>
      <SectionCard title="Structure" subtitle="Tree depth, expanded nodes, icons, and disabled items.">
        <Slider label="Depth" value={state.depth} min={1} max={5} step={1} onChange={(value) => update("depth", value)} />
        <Slider label="Expanded count" value={state.expandedCount} min={0} max={10} step={1} onChange={(value) => update("expandedCount", value)} />
        <Slider label="Disabled items" value={state.disabledItems} min={0} max={5} step={1} onChange={(value) => update("disabledItems", value)} />
        <Switch label="Show icons" checked={state.showIcons} onChange={(value) => update("showIcons", value)} />
      </SectionCard>
      <SectionCard title="State" subtitle="Component-level disabled state.">
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </SectionCard>
    </div>
  );
}
