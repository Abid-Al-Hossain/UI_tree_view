"use client";

import React from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { LabeledField } from "../layout/LabeledField";

export interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Switch({
  label,
  checked,
  onChange,
  disabled,
}: SwitchProps) {
  const switchNode = (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`${
        checked ? "bg-[var(--primary)]" : "bg-slate-700"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </HeadlessSwitch>
  );

  if (label) {
    return (
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300 pointer-events-none">
          {label}
        </label>
        {switchNode}
      </div>
    );
  }

  return switchNode;
}
