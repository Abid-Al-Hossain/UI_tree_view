"use client";

import React from "react";
import FontFamilySelect, { type SystemFontItem } from "./FontFamilySelect";
import FontWeightSelect from "./FontWeightSelect";
import TextDecorationControl, {
  type TextTransform,
} from "./TextDecorationControl";
import SizeControl from "../input/SizeControl";
import { SegmentedControl } from "../input/SegmentedControl";
import { LabeledField } from "../layout/LabeledField";

export type TypographyControlProps = {
  // Font Family
  fontBucket: "system" | "google";
  setFontBucket: (v: "system" | "google") => void;
  fontSearch: string;
  setFontSearch: (v: string) => void;
  systemFonts: SystemFontItem[];
  filteredSystemFonts: SystemFontItem[];
  systemFontIdx: number;
  setSystemFontIdx: (v: number) => void;
  googleFonts: string[];
  filteredGoogleFonts: string[];
  googleFontFamily: string;
  setGoogleFontFamily: (v: string) => void;

  // Font Size
  fontSize: number;
  setFontSize: (v: number) => void;
  fontSizeUnit: "px" | "rem";
  setFontSizeUnit: (v: "px" | "rem") => void;
  fontSizeMin?: number;
  fontSizeMax?: number;

  // Weight
  fontWeight: number;
  setFontWeight: (v: number) => void;

  // Decoration
  fontStyle: "normal" | "italic";
  setFontStyle: (v: "normal" | "italic") => void;
  textDecoration: "none" | "underline";
  setTextDecoration: (v: "none" | "underline") => void;
  textTransform: TextTransform;
  setTextTransform: (v: TextTransform) => void;

  // Spacing
  letterSpacing: number;
  setLetterSpacing: (v: number) => void;
  letterSpacingUnit: "px" | "em";
  setLetterSpacingUnit: (v: "px" | "em") => void;

  lineHeight: number;
  setLineHeight: (v: number) => void;
};

export default function TypographyControl(props: TypographyControlProps) {
  return (
    <div className="space-y-6">
      <FontFamilySelect
        fontBucket={props.fontBucket}
        setFontBucket={props.setFontBucket}
        fontSearch={props.fontSearch}
        setFontSearch={props.setFontSearch}
        systemFonts={props.systemFonts}
        filteredSystemFonts={props.filteredSystemFonts}
        systemFontIdx={props.systemFontIdx}
        setSystemFontIdx={props.setSystemFontIdx}
        googleFonts={props.googleFonts}
        filteredGoogleFonts={props.filteredGoogleFonts}
        googleFontFamily={props.googleFontFamily}
        setGoogleFontFamily={props.setGoogleFontFamily}
      />

      <div
        className="space-y-4 pt-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="text-xs font-semibold tracking-wide"
          style={{ color: "var(--muted)" }}
        >
          STYLE & SIZE
        </div>

        <LabeledField label="Font size unit">
          <SegmentedControl
            value={props.fontSizeUnit}
            onChange={(v) => props.setFontSizeUnit(v as "px" | "rem")}
            items={[
              { value: "px", label: "px" },
              { value: "rem", label: "rem" },
            ]}
          />
        </LabeledField>

        <SizeControl
          label={`Font size`}
          value={props.fontSize}
          onChange={props.setFontSize}
          min={props.fontSizeMin ?? 10}
          max={props.fontSizeMax ?? 100}
        />

        <FontWeightSelect
          value={props.fontWeight}
          onChange={props.setFontWeight}
        />

        <TextDecorationControl
          italic={props.fontStyle === "italic"}
          setItalic={(v) => props.setFontStyle(v ? "italic" : "normal")}
          underline={props.textDecoration === "underline"}
          setUnderline={(v) =>
            props.setTextDecoration(v ? "underline" : "none")
          }
          textTransform={props.textTransform}
          setTextTransform={props.setTextTransform}
        />
      </div>

      <div
        className="space-y-4 pt-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="text-xs font-semibold tracking-wide"
          style={{ color: "var(--muted)" }}
        >
          SPACING
        </div>

        <LabeledField label="Letter spacing unit">
          <SegmentedControl
            value={props.letterSpacingUnit}
            onChange={(v) => props.setLetterSpacingUnit(v as "px" | "em")}
            items={[
              { value: "px", label: "px" },
              { value: "em", label: "em" },
            ]}
          />
        </LabeledField>

        <SizeControl
          label="Letter spacing"
          value={props.letterSpacing}
          onChange={props.setLetterSpacing}
          min={props.letterSpacingUnit === "em" ? -0.5 : -5}
          max={props.letterSpacingUnit === "em" ? 1 : 20}
          step={props.letterSpacingUnit === "em" ? 0.01 : 1}
        />

        <SizeControl
          label="Line height"
          value={props.lineHeight}
          onChange={props.setLineHeight}
          min={0.8}
          max={3}
          step={0.05}
        />
      </div>
    </div>
  );
}
