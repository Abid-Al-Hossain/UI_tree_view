"use client";

import { type CSSProperties, type KeyboardEvent, useState } from "react";
import type { TreeViewState } from "../types";

type TreeNode = {
  id: string;
  label: string;
  level: number;
  posinset: number;
  setsize: number;
  expandable: boolean;
  disabled: boolean;
};

function shell(state: TreeViewState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
  };
}

function buildNodes(state: TreeViewState): TreeNode[] {
  const count = Math.max(1, state.itemCount);
  const depth = Math.max(1, state.depth);
  const siblingCounts = new Map<number, number>();

  Array.from({ length: count }).forEach((_, index) => {
    const level = Math.min(depth, (index % depth) + 1);
    siblingCounts.set(level, (siblingCounts.get(level) ?? 0) + 1);
  });

  const positions = new Map<number, number>();

  return Array.from({ length: count }).map((_, index) => {
    const level = Math.min(depth, (index % depth) + 1);
    const nextPosition = (positions.get(level) ?? 0) + 1;
    positions.set(level, nextPosition);

    return {
      id: `${state.id}-node-${index + 1}`,
      label: `${state.label} ${index + 1}`,
      level,
      posinset: nextPosition,
      setsize: siblingCounts.get(level) ?? count,
      expandable: level < depth,
      disabled: index >= Math.max(0, count - state.disabledItems),
    };
  });
}

export default function LivePreview({ state }: { state: TreeViewState }) {
  const nodes = buildNodes(state);
  const initialSelected = state.selectionMode === "none" ? -1 : Math.min(1, nodes.length - 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);
  const [expanded, setExpanded] = useState(() => new Set(nodes.slice(0, state.expandedCount).filter((node) => node.expandable).map((node) => node.id)));
  const isLoading = state.previewState === "loading";
  const isEmpty = state.previewState === "empty";
  const activeNode = nodes[activeIndex] ?? nodes[0];

  const toggleExpanded = (node: TreeNode) => {
    if (!node.expandable) return;
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(node.id)) next.delete(node.id);
      else next.add(node.id);
      return next;
    });
  };

  const onTreeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
  };

  return (
    <section id={state.id} aria-labelledby={`${state.id}-title`} aria-describedby={`${state.id}-help`} style={shell(state)} className="grid gap-4">
      <div className="grid gap-1">
        <h3 id={`${state.id}-title`} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div
        role="tree"
        aria-label={state.ariaLabel}
        aria-busy={isLoading || undefined}
        aria-disabled={state.disabled || undefined}
        tabIndex={state.disabled ? -1 : state.tabIndex}
        onKeyDown={onTreeKeyDown}
        className="grid gap-1 rounded-2xl border p-2 outline-none focus:ring-2"
        style={{ borderColor: state.border, gap: Math.max(4, Math.round(state.gap / 2)) }}
        data-audit="tree-preview"
        data-testid="tree-preview"
      >
        {isLoading ? <div role="status" className="px-3 py-2 text-sm" style={{ color: state.muted }}>Loading tree nodes...</div> : null}
        {isEmpty ? <div role="treeitem" aria-selected={false} aria-level={1} aria-posinset={1} aria-setsize={1} className="px-3 py-2 text-sm" style={{ color: state.muted }}>No tree nodes available.</div> : null}
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
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none transition"
              style={{
                marginLeft: (node.level - 1) * 18,
                background: selected ? `color-mix(in oklab, ${state.accent} 28%, transparent)` : active ? "rgba(255,255,255,.08)" : "transparent",
                color: node.disabled ? state.muted : state.foreground,
                cursor: node.disabled ? "not-allowed" : "pointer",
              }}
            >
              <span aria-hidden="true" style={{ color: state.accent, width: 14 }}>{node.expandable ? (open ? "v" : ">") : "-"}</span>
              {state.showIcons ? <span aria-hidden="true">{node.expandable ? "folder" : "file"}</span> : null}
              <span>{node.label}</span>
            </div>
          );
        }) : null}
      </div>
      <p id={`${state.id}-help`} className="text-xs" style={{ color: state.muted }}>
        {state.helper} Use arrow keys, Home, End, Enter, and Space in the tree preview.
      </p>
    </section>
  );
}
