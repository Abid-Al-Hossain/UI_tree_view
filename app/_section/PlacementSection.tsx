"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function PlacementSection({ state, update }: Props) {
  return <SectionCard title="Placement" subtitle="Placement controls for native tree generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
