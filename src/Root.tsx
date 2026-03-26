import React from "react";
import { AbsoluteFill } from "remotion";
import "./tailwind.css";

export const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill className="bg-background text-foreground font-sans">
      {children}
    </AbsoluteFill>
  );
};
