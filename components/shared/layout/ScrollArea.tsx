"use client";

import React from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ScrollArea({ children, className, ...props }: ScrollAreaProps) {
  return (
    <div
      {...props}
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent ${className || ""}`}
      style={{
        scrollbarGutter: "stable",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}
