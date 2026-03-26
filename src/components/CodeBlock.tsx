import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useCurrentFrame, interpolate } from "remotion";
import { dark } from "./prism-theme";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  animationStartFrame?: number;
  animationDuration?: number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  title,
  showLineNumbers = true,
  animationStartFrame = 0,
  animationDuration = 30,
}) => {
  const frame = useCurrentFrame();

  // Calculate animation progress
  const animationProgress = interpolate(
    frame,
    [animationStartFrame, animationStartFrame + animationDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
            marginBottom: 16,
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
          overflow: "hidden",
        }}
      >
        <Highlight
          {...defaultProps}
          code={code.trim()}
          language={language}
          theme={dark}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                lineHeight: 1.5,
                margin: 0,
                padding: 0,
                backgroundColor: "transparent",
                overflow: "visible",
              }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{
                    display: "flex",
                    marginBottom: 4,
                    opacity: interpolate(
                      frame,
                      [
                        animationStartFrame + i * 3,
                        animationStartFrame + i * 3 + 10,
                      ],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                  }}
                >
                  {showLineNumbers && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 40,
                        textAlign: "right",
                        paddingRight: 16,
                        color: "#A3A3A3",
                        userSelect: "none",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <div style={{ flex: 1 }}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};