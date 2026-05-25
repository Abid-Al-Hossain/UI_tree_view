"use client";

import { PreviewPanel, type PreviewCanvasMode } from "./PreviewPanel";

export function SharedPreviewDownloadPanel({ preview, code, downloadName, previewBgMode, previewBgInput, onPreviewBgMode, onPreviewBgInput }: { preview: React.ReactNode; code: string; downloadName: string; previewBgMode: PreviewCanvasMode; previewBgInput: string; onPreviewBgMode: (v: PreviewCanvasMode) => void; onPreviewBgInput: (v: string) => void }) {
  const copy = async () => navigator.clipboard?.writeText(code);
  const download = () => {
    const blob = new Blob([code], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${downloadName || "component"}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">Output</h2>
          <p className="text-sm text-slate-400">Preview, code, copy, and download use one React payload.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["studio", "white", "black", "custom"] as PreviewCanvasMode[]).map((mode) => (
            <button key={mode} type="button" onClick={() => onPreviewBgMode(mode)} className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${previewBgMode === mode ? "bg-sky-300 text-slate-950" : "bg-white/10 text-slate-200"}`}>{mode}</button>
          ))}
          <input aria-label="Custom preview background" value={previewBgInput} onChange={(e) => onPreviewBgInput(e.target.value)} className="w-28 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
        </div>
      </div>
      <PreviewPanel bgMode={previewBgMode} bgInput={previewBgInput}>{preview}</PreviewPanel>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button type="button" onClick={copy} className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/15">Copy code</button>
        <button type="button" onClick={download} className="rounded-2xl bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-200">Download React</button>
      </div>
      <pre className="mt-4 max-h-[360px] overflow-auto rounded-2xl border border-white/10 bg-black/50 p-4 text-xs leading-6 text-slate-200"><code>{code}</code></pre>
    </section>
  );
}
