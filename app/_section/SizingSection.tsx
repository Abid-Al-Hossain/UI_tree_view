"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return <SectionCard title="Sizing" subtitle="Sizing controls for native tree generation."><Slider label="Width" value={state.width} min={220} max={900} step={1} onChange={(value) => update("width", value)} />
<Slider label="Height" value={state.height} min={120} max={720} step={1} onChange={(value) => update("height", value)} />
<Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
<Slider label="Padding" value={state.padding} min={8} max={64} step={1} onChange={(value) => update("padding", value)} /></SectionCard>;
}
