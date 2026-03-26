import React from "react";
import { AbsoluteFill } from "remotion";

// Global styles and font imports
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .csarchive-root {
    font-family: 'Source Sans 3', sans-serif;
    color: #FAFAFA;
    background-color: #0A0A0A;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Newsreader', serif;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  code, pre, .mono {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 400;
    font-size: 14px;
  }

  .text-accent {
    color: #3B82F6;
  }

  .bg-accent {
    background-color: #3B82F6;
  }

  .border-accent {
    border-color: #3B82F6;
  }
`;

export const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }} className="csarchive-root">
      <style>{globalStyles}</style>
      {children}
    </AbsoluteFill>
  );
};