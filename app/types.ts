export type SectionId = "presets" | "basics" | "metadata" | "content" | "items" | "behavior" | "layout" | "placement" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "motion" | "states" | "accessibility";

export type TreeViewState = {
  title: string;
  description: string;
  label: string;
  helper: string;
  id: string;
  ariaLabel: string;
  tabIndex: number;
  width: number;
  height: number;
  gap: number;
  padding: number;
  radius: number;
  borderWidth: number;
  shadow: number;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  fontFamily: string;
  titleSize: number;
  bodySize: number;
  fontWeight: number;
  previewState: "default" | "hover" | "focus" | "active" | "open" | "closed" | "selected" | "loading" | "empty" | "error" | "success";
  motion: boolean;
  disabled: boolean;
  role: "region" | "group" | "status" | "alert" | "dialog" | "menu" | "menubar" | "navigation" | "list" | "tree" | "table" | "tablist" | "form" | "textbox" | "img" | "application";
  itemCount: number;
  depth: number;
  selectionMode: "none" | "single" | "multiple";
  expandedCount: number;
  showIcons: boolean;
  disabledItems: number;
};

export type StudioPreset = { id: string; family: string; archetype: string; variant: string; size: string; tags: string[]; state: TreeViewState };

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  {
    "id": "presets",
    "label": "Presets"
  },
  {
    "id": "basics",
    "label": "Basics"
  },
  {
    "id": "metadata",
    "label": "Metadata"
  },
  {
    "id": "content",
    "label": "Content"
  },
  {
    "id": "items",
    "label": "Items"
  },
  {
    "id": "behavior",
    "label": "Behavior"
  },
  {
    "id": "layout",
    "label": "Layout"
  },
  {
    "id": "placement",
    "label": "Placement"
  },
  {
    "id": "sizing",
    "label": "Sizing"
  },
  {
    "id": "colors",
    "label": "Colors"
  },
  {
    "id": "border",
    "label": "Border"
  },
  {
    "id": "radius",
    "label": "Radius"
  },
  {
    "id": "shadow",
    "label": "Shadow"
  },
  {
    "id": "typography",
    "label": "Typography"
  },
  {
    "id": "motion",
    "label": "Motion"
  },
  {
    "id": "states",
    "label": "State Preview"
  },
  {
    "id": "accessibility",
    "label": "Accessibility"
  }
];
