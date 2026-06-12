import type { TreeViewState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: TreeViewState, fileName = "tree-view"): ExportPayload {
  return { fileName: `${fileName || "tree-view"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: TreeViewState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};

function buildNodes(config) {
  const count = Math.max(1, config.itemCount);
  const depth = Math.max(1, config.depth);
  const siblingCounts = new Map();

  Array.from({ length: count }).forEach((_, index) => {
    const level = Math.min(depth, (index % depth) + 1);
    siblingCounts.set(level, (siblingCounts.get(level) ?? 0) + 1);
  });

  const positions = new Map();

  return Array.from({ length: count }).map((_, index) => {
    const level = Math.min(depth, (index % depth) + 1);
    const nextPosition = (positions.get(level) ?? 0) + 1;
    positions.set(level, nextPosition);

    return {
      id: \`\${config.id}-node-\${index + 1}\`,
      label: \`\${config.label} \${index + 1}\`,
      level,
      posinset: nextPosition,
      setsize: siblingCounts.get(level) ?? count,
      expandable: level < depth,
      disabled: index >= Math.max(0, count - config.disabledItems),
    };
  });
}

function panelStyle(config) {
  return {
    width: config.width,
    minHeight: config.height,
    padding: config.padding,
    borderRadius: config.radius,
    border: config.borderWidth + "px solid " + config.border,
    boxShadow: "0 " + Math.round(config.shadow / 3) + "px " + config.shadow + "px rgba(0,0,0,.28)",
    background: config.background,
    color: config.foreground,
    fontFamily: config.fontFamily,
    opacity: config.disabled ? 0.55 : 1,
    display: "grid",
    gap: 16,
  };
}

export default function TreeViewComponent() {
  const nodes = React.useMemo(() => buildNodes(state), []);
  const initialSelected = state.selectionMode === "none" ? -1 : Math.min(1, nodes.length - 1);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(initialSelected);
  const [expanded, setExpanded] = React.useState(() => new Set(nodes.slice(0, state.expandedCount).filter((node) => node.expandable).map((node) => node.id)));
  const isLoading = state.previewState === "loading";
  const isEmpty = state.previewState === "empty";
  const activeNode = nodes[activeIndex] ?? nodes[0];

  function toggleExpanded(node) {
    if (!node.expandable) return;
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(node.id)) next.delete(node.id);
      else next.add(node.id);
      return next;
    });
  }

  function onTreeKeyDown(event) {
    if (state.disabled || isLoading || isEmpty) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(nodes.length - 1, index + 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, index - 1));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(nodes.length - 1);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (state.selectionMode !== "none") setSelectedIndex(activeIndex);
    }

    if (event.key === "ArrowRight" && activeNode?.expandable) {
      event.preventDefault();
      setExpanded((current) => new Set(current).add(activeNode.id));
    }

    if (event.key === "ArrowLeft" && activeNode?.expandable) {
      event.preventDefault();
      setExpanded((current) => {
        const next = new Set(current);
        next.delete(activeNode.id);
        return next;
      });
    }
  }

  return (
    <section id={state.id} aria-labelledby={state.id + "-title"} aria-describedby={state.id + "-help"} style={panelStyle(state)}>
      <div style={{ display: "grid", gap: 4 }}>
        <h3 id={state.id + "-title"} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight, margin: 0 }}>{state.title}</h3>
        <p style={{ color: state.muted, fontSize: state.bodySize, margin: 0 }}>{state.description}</p>
      </div>
      <div
        role="tree"
        aria-label={state.ariaLabel}
        aria-busy={isLoading || undefined}
        aria-disabled={state.disabled || undefined}
        tabIndex={state.disabled ? -1 : state.tabIndex}
        onKeyDown={onTreeKeyDown}
        style={{ display: "grid", gap: Math.max(4, Math.round(state.gap / 2)), border: "1px solid " + state.border, borderRadius: 16, padding: 8, outline: "none" }}
        data-audit="tree-preview"
        data-testid="tree-preview"
      >
        {isLoading ? <div role="status" style={{ padding: "8px 12px", color: state.muted, fontSize: 14 }}>Loading tree nodes...</div> : null}
        {isEmpty ? <div role="treeitem" aria-selected={false} aria-level={1} aria-posinset={1} aria-setsize={1} style={{ padding: "8px 12px", color: state.muted, fontSize: 14 }}>No tree nodes available.</div> : null}
        {!isLoading && !isEmpty ? nodes.map((node, index) => {
          const active = index === activeIndex;
          const selected = state.previewState === "selected" ? index === selectedIndex : state.selectionMode !== "none" && index === selectedIndex;
          const open = expanded.has(node.id);

          return (
            <div
              key={node.id}
              id={node.id}
              role="treeitem"
              aria-level={node.level}
              aria-posinset={node.posinset}
              aria-setsize={node.setsize}
              aria-expanded={node.expandable ? open : undefined}
              aria-selected={state.selectionMode === "none" ? false : selected}
              aria-disabled={node.disabled || undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => {
                if (node.disabled) return;
                setActiveIndex(index);
                if (state.selectionMode !== "none") setSelectedIndex(index);
              }}
              onDoubleClick={() => toggleExpanded(node)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginLeft: (node.level - 1) * 18,
                padding: "8px 12px",
                borderRadius: 12,
                background: selected ? "color-mix(in oklab, " + state.accent + " 28%, transparent)" : active ? "rgba(255,255,255,.08)" : "transparent",
                color: node.disabled ? state.muted : state.foreground,
                cursor: node.disabled ? "not-allowed" : "pointer",
                fontSize: 14,
              }}
            >
              <span aria-hidden="true" style={{ color: state.accent, width: 14, transition: state.motion ? "transform 200ms ease" : "none" }}>{node.expandable ? (open ? "v" : ">") : "-"}</span>
              {state.showIcons ? <span aria-hidden="true">{node.expandable ? "folder" : "file"}</span> : null}
              <span>{node.label}</span>
            </div>
          );
        }) : null}
      </div>
      <p id={state.id + "-help"} style={{ color: state.muted, fontSize: 12, margin: 0 }}>{state.helper} Use arrow keys, Home, End, Enter, and Space in the tree preview.</p>
    </section>
  );
}
`;
}
