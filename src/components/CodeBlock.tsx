import React from "react";
import { Highlight } from "prism-react-renderer";
import { useCurrentFrame, interpolate } from "remotion";

// CSArchive dark theme based on Viktor Lacharo's style guidelines
const csarchiveTheme = {
  plain: {
    color: "#FAFAFA",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#A3A3A3",
        fontStyle: "italic" as const,
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#FAFAFA",
      },
    },
    {
      types: [
        "property",
        "tag",
        "boolean",
        "number",
        "constant",
        "symbol",
        "deleted",
      ],
      style: {
        color: "#3B82F6", // Accent blue
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#10B981", // Green
      },
    },
    {
      types: ["operator", "entity", "url"],
      style: {
        color: "#F59E0B", // Amber
      },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: {
        color: "#8B5CF6", // Purple
      },
    },
    {
      types: ["function", "class-name"],
      style: {
        color: "#EF4444", // Red
      },
    },
    {
      types: ["regex", "important", "variable"],
      style: {
        color: "#F59E0B",
      },
    },
  ],
};

interface CodeBlockProps {
  code: string;
  language?:
    | "typescript"
    | "javascript"
    | "jsx"
    | "tsx"
    | "json"
    | "css"
    | "html";
  title?: string;
  showLineNumbers?: boolean;
  animationStartFrame?: number;
  animationDuration?: number;
  highlightLines?: number[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  title,
  showLineNumbers = true,
  animationStartFrame = 0,
  animationDuration = 30,
  highlightLines = [],
}) => {
  const frame = useCurrentFrame();

  // Calculate animation progress
  const animationProgress = interpolate(
    frame,
    [animationStartFrame, animationStartFrame + animationDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = interpolate(animationProgress, [0, 1], [0, 1]);
  const translateY = interpolate(animationProgress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 28,
            fontWeight: 600,
            color: "#FAFAFA",
            marginBottom: 0,
            padding: "12px 24px",
            backgroundColor: "#141414",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottom: "1px solid #262626",
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          backgroundColor: "#141414",
          borderRadius: title ? "0 0 12px 12px" : "12px",
          padding: 24,
          border: "1px solid #262626",
          borderTop: title ? "none" : "1px solid #262626",
          overflow: "hidden",
        }}
      >
        <Highlight
          code={code.trim()}
          language={language}
          theme={csarchiveTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                lineHeight: 1.6,
                margin: 0,
                padding: 0,
                backgroundColor: "transparent",
                overflow: "visible",
              }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                const isHighlighted = highlightLines.includes(i + 1);

                return (
                  <div
                    key={i}
                    {...lineProps}
                    style={{
                      ...lineProps.style,
                      display: "flex",
                      marginBottom: 2,
                      padding: "2px 0",
                      backgroundColor: isHighlighted
                        ? "rgba(59, 130, 246, 0.15)"
                        : "transparent",
                      borderLeft: isHighlighted
                        ? "3px solid #3B82F6"
                        : "3px solid transparent",
                      marginLeft: -12,
                      paddingLeft: 9,
                      opacity: interpolate(
                        frame,
                        [
                          animationStartFrame + i * 2,
                          animationStartFrame + i * 2 + 8,
                        ],
                        [0, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                      ),
                    }}
                  >
                    {showLineNumbers && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 36,
                          textAlign: "right",
                          paddingRight: 16,
                          color: isHighlighted ? "#3B82F6" : "#A3A3A3",
                          userSelect: "none",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                    <div style={{ flex: 1 }}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
