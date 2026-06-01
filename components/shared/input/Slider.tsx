"use client";

import { LabeledField } from "../layout/LabeledField";

export interface SliderProps {
  label?: string;
  value: string | number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
}

export default function Slider(props: SliderProps) {
  const slider = (
    <input
      type="range"
      min={props.min}
      max={props.max}
      step={props.step ?? 1}
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
      disabled={props.disabled}
      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--primary)] hover:accent-[var(--primary-hover)] transition-all"
    />
  );

  if (props.label) {
    return (
      <LabeledField label={props.label} hint={props.value}>
        {slider}
      </LabeledField>
    );
  }

  return slider;
}
