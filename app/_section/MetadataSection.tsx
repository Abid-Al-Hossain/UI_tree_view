"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function MetadataSection({ state, update }: Props) {
  return <SectionCard title="Metadata" subtitle="Metadata controls for native tree generation."><Input label="id" value={state.id} onChange={(value) => update("id", value)} />
<Input label="aria-label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<Select label="Role" value={state.role} options={[
  "region",
  "group",
  "status",
  "alert",
  "dialog",
  "menu",
  "menubar",
  "navigation",
  "list",
  "tree",
  "table",
  "tablist",
  "form",
  "textbox",
  "img",
  "application"
]} onChange={(value) => update("role", value)} />
<Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} /></SectionCard>;
}
