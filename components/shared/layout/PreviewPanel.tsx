"use client";

export type PreviewCanvasMode = "studio" | "white" | "black" | "custom";

export function PreviewPanel({ children, bgMode = "studio", bgInput = "#0f172a" }: { children: React.ReactNode; bgMode?: PreviewCanvasMode; bgInput?: string }) {
  const background = bgMode === "white" ? "#ffffff" : bgMode === "black" ? "#000000" : bgMode === "custom" ? bgInput : "radial-gradient(circle at 30% 20%, rgba(56,189,248,.22), transparent 20rem), #0f172a";
  return (
    <div className="min-h-[430px] rounded-[2rem] border border-white/10 p-8 shadow-inner shadow-black/30" style={{ background }}>
      <div className="flex min-h-[360px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur">{children}</div>
    </div>
  );
}
