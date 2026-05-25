# UI Foundry Tree View Studio

Standalone visual Tree View generator built with Next.js, React, and TypeScript.

Standalone Tree View component studio for building native, preview-honest, React-exportable UI patterns that match the UI Foundry product line.

This project is packaged as an independent component studio for marketplace sale while following the same UI Foundry product language used by the button generator. It keeps local shared controls, local presets, local export utilities, and no runtime dependency on another component app.

## Product summary

This generator is designed for:
- designers building Tree View UI quickly
- developers who need editable React starting points
- marketplace buyers who want a self-contained Tree View generator

The intended workflow is:

1. choose a preset or start from the default state
2. edit the component through sectioned controls
3. inspect the live preview in the shared dark studio canvas
4. switch to code view when needed
5. copy or download the generated React output

## What the product includes

- standalone Next.js app structure
- section-based editor shell
- local shared controls for color, typography, inputs, sliders, switches, sections, and preview/download panels
- live preview panel
- code view with copy support
- React-only export path
- download filename control
- preview background controls
- preset application flow with full-state updates
- accessibility and state-preview guidance where native to the component
- self-contained package files for independent repo publishing

## Native editing surface

The editor is focused on controls that are native to Tree View and useful in real product work:
- nodes, depth, expanded state, selected item, disabled item, and checkbox-like optional intent
- indent, connector, icon, label, hover, focus, selected, and active styling
- file tree, category, settings, and nested navigation archetypes
- tree semantics and keyboard navigation expectations
- React export for nested tree structure

The goal is maximum useful depth without adding unrelated controls that would make the component stop reading as Tree View.

## Preset model

Presets are treated as full editor states, not just color swaps. The suite-wide preset contract is:

- family
- archetype
- variant
- size
- tags
- state

Applying a preset should update the complete editable state and reset transient preview state so the preview and export stay aligned.

## Export workflow

The shipped export contract is React-only. The live preview, visible code, copied code, and downloaded file are expected to come from the same current React payload so users do not see one result and export another.

## Consistency contract

This studio is intentionally structured to be both independently sellable and merge-ready for a future UI Foundry SaaS product:

- no runtime imports from button-component
- no runtime imports from shared-templates
- no runtime imports from another component studio
- common editing tasks use the same local control patterns as the button canon
- shared state names such as previewResetKey, previewBgMode, previewBgInput, and downloadName are preserved where applicable

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- local component/editor utilities

## Commands

    npm install
    npm run typecheck
    npm run lint -- --quiet
    npm run build
    npm run dev

## Verification checklist

Before publishing a new version, verify:

- install completes without dependency errors
- typecheck passes
- lint has no blocking errors
- production build completes
- preview and generated React code match
- copied code and downloaded code match the visible code
- no generated node_modules, .next, or build artifacts are committed

## Repository

This repo is intended to publish as Abid-Al-Hossain/UI_tree_view.
