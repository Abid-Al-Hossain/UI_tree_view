export default function AppShell({
  children,
  contentOverflow = "auto",
}: {
  children: React.ReactNode;
  contentOverflow?: "auto" | "hidden";
}) {
  return (
    <div
      className={
        contentOverflow === "hidden"
          ? "h-full w-full overflow-hidden p-5"
          : "h-full w-full overflow-y-auto scrollbar-thin p-5"
      }
    >
      <div className="fade-in h-full w-full">{children}</div>
    </div>
  );
}
