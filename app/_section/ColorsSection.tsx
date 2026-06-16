"use client";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Base container colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Node states" subtitle="Default, hover, focus, and selected node colors.">
      <div className="space-y-4">
        <ColorControl label="Selected background" value={state.itemActiveBg} onChange={(v) => update("itemActiveBg", v)} />
        <ColorControl label="Node background" value={state.itemBg} onChange={(v) => update("itemBg", v)} />
        <ColorControl label="Node text" value={state.itemText} onChange={(v) => update("itemText", v)} />
        <ColorControl label="Hover background" value={state.itemHoverBg} onChange={(v) => update("itemHoverBg", v)} />
        <ColorControl label="Hover text" value={state.itemHoverText} onChange={(v) => update("itemHoverText", v)} />
        <ColorControl label="Focus background" value={state.itemFocusBg} onChange={(v) => update("itemFocusBg", v)} />
        <ColorControl label="Selected text" value={state.itemSelectedText} onChange={(v) => update("itemSelectedText", v)} />
        <ColorControl label="Selected border" value={state.itemSelectedBorder} onChange={(v) => update("itemSelectedBorder", v)} />
        <ColorControl label="Disabled text" value={state.itemDisabledColor} onChange={(v) => update("itemDisabledColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Icons, indent & checkbox" subtitle="Expand/folder icons, guides, and checkboxes.">
      <div className="space-y-4">
        <ColorControl label="Expand icon" value={state.expandIconColor} onChange={(v) => update("expandIconColor", v)} />
        <ColorControl label="Indent guide" value={state.indentGuideColor} onChange={(v) => update("indentGuideColor", v)} />
        <ColorControl label="Leaf icon" value={state.leafIconColor} onChange={(v) => update("leafIconColor", v)} />
        <ColorControl label="Folder icon" value={state.folderIconColor} onChange={(v) => update("folderIconColor", v)} />
        <ColorControl label="Folder open icon" value={state.folderOpenIconColor} onChange={(v) => update("folderOpenIconColor", v)} />
        <ColorControl label="Checkbox" value={state.checkboxColor} onChange={(v) => update("checkboxColor", v)} />
        <ColorControl label="Checkbox checked" value={state.checkboxCheckedBg} onChange={(v) => update("checkboxCheckedBg", v)} />
        <ColorControl label="Loading" value={state.loadingSpinnerColor} onChange={(v) => update("loadingSpinnerColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
