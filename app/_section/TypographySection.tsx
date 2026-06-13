"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import TypographyControl from "@/components/shared/typography/TypographyControl";
import { SYSTEM_FONTS, GOOGLE_FONTS } from "@/components/shared/typography/fontConstants";
import type { TreeViewState } from "../types";

type Props = { state: TreeViewState; update: <K extends keyof TreeViewState>(key: K, value: TreeViewState[K]) => void };

export default function TypographySection({ state, update }: Props) {
  const search = state.fontSearch.toLowerCase();
  const filteredSystem = SYSTEM_FONTS.filter((f) => f.label.toLowerCase().includes(search));
  const filteredGoogle = GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(search));
  return (
    <SectionCard title="Typography" subtitle="Font family, size, weight, spacing, and decoration.">
      <TypographyControl
        fontBucket={state.fontBucket} setFontBucket={(v) => update("fontBucket", v)}
        fontSearch={state.fontSearch} setFontSearch={(v) => update("fontSearch", v)}
        systemFonts={SYSTEM_FONTS} filteredSystemFonts={filteredSystem}
        systemFontIdx={state.systemFontIdx} setSystemFontIdx={(v) => update("systemFontIdx", v)}
        googleFonts={GOOGLE_FONTS} filteredGoogleFonts={filteredGoogle}
        googleFontFamily={state.googleFontFamily} setGoogleFontFamily={(v) => update("googleFontFamily", v)}
        fontSize={state.bodySize} setFontSize={(v) => update("bodySize", v)}
        fontSizeUnit={state.fontSizeUnit} setFontSizeUnit={(v) => update("fontSizeUnit", v)}
        fontSizeMin={10} fontSizeMax={48}
        fontWeight={state.fontWeight} setFontWeight={(v) => update("fontWeight", v)}
        fontStyle={state.fontStyle} setFontStyle={(v) => update("fontStyle", v)}
        textDecoration={state.textDecoration} setTextDecoration={(v) => update("textDecoration", v)}
        textTransform={state.textTransform} setTextTransform={(v) => update("textTransform", v)}
        letterSpacing={state.letterSpacing} setLetterSpacing={(v) => update("letterSpacing", v)}
        letterSpacingUnit={state.letterSpacingUnit} setLetterSpacingUnit={(v) => update("letterSpacingUnit", v)}
        lineHeight={state.lineHeight} setLineHeight={(v) => update("lineHeight", v)}
      />
      <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <LabeledField label={`Title size: ${state.titleSize}${state.fontSizeUnit}`}>
          <Slider value={state.titleSize} min={14} max={64} step={1} onChange={(v) => update("titleSize", v)} />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
