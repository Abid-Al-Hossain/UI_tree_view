"use client";

import { type CSSProperties, type KeyboardEvent, useState } from "react";
import type { TreeViewState } from "../types";
import { SYSTEM_FONTS } from "@/components/shared/typography/fontConstants";

type TreeNode = {
  id: string;
  label: string;
  level: number;
  posinset: number;
  setsize: number;
  expandable: boolean;
  disabled: boolean;
};

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

function shell(state: TreeViewState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
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
  const [hoverIndex, setHoverIndex] = useState(-1);
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
        {isLoading ? <div role="status" className="px-3 py-2 text-sm" style={{ color: state.loadingSpinnerColor }}>Loading tree nodes...</div> : null}
        {isEmpty ? <div role="treeitem" aria-selected={false} aria-level={1} aria-posinset={1} aria-setsize={1} className="px-3 py-2 text-sm" style={{ color: state.muted }}>No tree nodes available.</div> : null}
        {!isLoading && !isEmpty ? nodes.map((node, index) => {
          const active = index === activeIndex;
          const selected = state.previewState === "selected" ? index === selectedIndex : state.selectionMode !== "none" && index === selectedIndex;
          const hovered = hoverIndex === index && !node.disabled && !selected;
          const open = expanded.has(node.id);
          const nodeBg = selected ? state.itemActiveBg : active && !hovered ? state.itemFocusBg : hovered ? state.itemHoverBg : state.itemBg;
          const nodeColor = node.disabled ? state.itemDisabledColor : selected ? state.itemSelectedText : hovered ? state.itemHoverText : state.itemText;
          const folderColor = node.expandable ? (open ? state.folderOpenIconColor : state.folderIconColor) : state.leafIconColor;

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
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              onDoubleClick={() => toggleExpanded(node)}
              className="flex items-center gap-2 text-sm outline-none transition"
              style={{
                marginLeft: (node.level - 1) * state.indentSize,
                minHeight: state.itemHeight,
                padding: `0 ${state.itemPadding}px`,
                borderRadius: state.itemRadius,
                borderLeft: node.level > 1 ? `2px solid ${state.indentGuideColor}` : undefined,
                background: nodeBg,
                color: nodeColor,
                outline: selected ? `1px solid ${state.itemSelectedBorder}` : undefined,
                cursor: node.disabled ? "not-allowed" : "pointer",
              }}
            >
              <svg aria-hidden="true" width={state.expandIconSize} height={state.expandIconSize} viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: state.expandIconColor, transition: state.transitionDuration > 0 ? "transform 200ms ease" : "none", transform: node.expandable ? (open ? "rotate(90deg)" : "rotate(0deg)") : "none" }}>
                {node.expandable
                  ? <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  : <circle cx="7" cy="7" r="1.5" fill="currentColor" />}
              </svg>
              {state.checkboxEnabled ? (
                <span aria-hidden="true" className="grid place-items-center" style={{ width: 16, height: 16, flexShrink: 0, borderRadius: 4, border: `1.5px solid ${state.checkboxColor}`, background: selected ? state.checkboxCheckedBg : "transparent" }}>
                  {selected ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-5" stroke={state.background} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
                </span>
              ) : null}
              {state.showIcons ? (
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: folderColor }}>
                  {node.expandable
                    ? <path d="M1 3.5A1.5 1.5 0 012.5 2h3.086a1.5 1.5 0 011.06.44l.915.914A1.5 1.5 0 008.621 4H11.5A1.5 1.5 0 0113 5.5v5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 011 10.5v-7z" stroke="currentColor" strokeWidth="1.2" />
                    : <><rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></>}
                </svg>
              ) : null}
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
