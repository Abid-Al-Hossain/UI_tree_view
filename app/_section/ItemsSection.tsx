"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Items controls for native tree generation.">
        <Slider label="Item count" value={state.itemCount} min={1} max={14} step={1} onChange={(value) => update("itemCount", value)} />
      </SectionCard>
      <SectionCard title="Node geometry" subtitle="Row sizing, indent, and checkbox.">
      <div className="space-y-4">
        <Slider label="Item height" value={state.itemHeight} min={24} max={56} step={1} onChange={(value) => update("itemHeight", value)} />
        <Slider label="Item padding" value={state.itemPadding} min={2} max={24} step={1} onChange={(value) => update("itemPadding", value)} />
        <Slider label="Item radius" value={state.itemRadius} min={0} max={24} step={1} onChange={(value) => update("itemRadius", value)} />
        <Slider label="Indent size" value={state.indentSize} min={8} max={40} step={1} onChange={(value) => update("indentSize", value)} />
        <Slider label="Expand icon size" value={state.expandIconSize} min={10} max={22} step={1} onChange={(value) => update("expandIconSize", value)} />
        <Switch label="Checkboxes" checked={state.checkboxEnabled} onChange={(value) => update("checkboxEnabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
