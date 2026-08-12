type PresetLike<State extends object> = {
  id: string;
  state: Partial<State>;
};

const catalogCache = new WeakMap<
  readonly object[],
  WeakMap<object, Map<string, string>>
>();

function canonicalize(value: unknown): string {
  if (value === undefined) return '"__undefined__"';
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;

  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`)
    .join(",")}}`;
}

export function findActivePresetId<State extends object>(
  state: State,
  defaults: State,
  presets: readonly PresetLike<State>[],
): string | null {
  const presetKey = presets as readonly object[];
  let byDefaults = catalogCache.get(presetKey);
  if (!byDefaults) {
    byDefaults = new WeakMap<object, Map<string, string>>();
    catalogCache.set(presetKey, byDefaults);
  }

  let signatures = byDefaults.get(defaults);
  if (!signatures) {
    signatures = new Map<string, string>();
    for (const preset of presets) {
      const signature = canonicalize({ ...defaults, ...preset.state });
      if (!signatures.has(signature)) signatures.set(signature, preset.id);
    }
    byDefaults.set(defaults, signatures);
  }

  return signatures.get(canonicalize(state)) ?? null;
}
