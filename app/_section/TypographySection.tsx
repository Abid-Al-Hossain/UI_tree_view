"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import FontFamilySelect from "@/components/shared/typography/FontFamilySelect";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function TypographySection({ state, update }: Props) {
  return <SectionCard title="Typography" subtitle="Typography controls for native tree generation."><FontFamilySelect value={state.fontFamily} onChange={(value) => update("fontFamily", value)} />
<Slider label="Title size" value={state.titleSize} min={14} max={48} step={1} onChange={(value) => update("titleSize", value)} />
<Slider label="Body size" value={state.bodySize} min={12} max={24} step={1} onChange={(value) => update("bodySize", value)} />
<Slider label="Title weight" value={state.fontWeight} min={400} max={900} step={50} onChange={(value) => update("fontWeight", value)} /></SectionCard>;
}
