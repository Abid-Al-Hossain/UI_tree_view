"use client";

import React from "react";
import { LabeledField } from "../layout/LabeledField";
import Select from "../input/Select";

export default function FontWeightSelect(props: {
  value: number;
  onChange: (v: number) => void;
}) {
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <LabeledField label="Weight">
      <Select
        value={String(props.value)}
        onChange={(v) => props.onChange(Number(v))}
        options={weights.map((w) => ({ value: String(w), label: String(w) }))}
      />
    </LabeledField>
  );
}
