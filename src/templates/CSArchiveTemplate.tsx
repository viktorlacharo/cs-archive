import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring } from "remotion";
import { Root } from "../Root";

// Branding colors
const COLORS = {
  background: "#0A0A0A",
  foreground: "#FAFAFA",
  accent: "#3B82F6",
  muted: "#A3A3A3",
  border: "#262626",
} as const;

// Typography
const TYPOGRAPHY = {
  heading: {
    fontFamily: "'Newsreader', serif",
    fontWeight: 500,
    fontSize: 96,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  body: {
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: 400,
    fontSize: 48,
    lineHeight: 1.4,
  },
  code: {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 400,
    fontSize: 36,
    lineHeight: 1.5,
  },
} as const;

interface CSArchiveTemplateProps {
  title?: string;
  subtitle?: string;
  durationInFrames?: number;
}

export const CSArchiveTemplate: React.FC<CSArchiveTemplateProps> = ({
  title = "CSArchive",
  subtitle = "Technical concepts explained",
  durationInFrames = 180,
}) => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Spring animation for title entrance
  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 20,
      mass: 0.5,
      stiffness: 100,
    },
  });

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.9, 1]);

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentLineWidth = interpolate(frame, [60, 90], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Root>
      <AbsoluteFill style={{ padding: 80 }}>
        {/* Title Sequence */}
        <Sequence from={0} durationInFrames={durationInFrames}>
          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              marginBottom: 40,
            }}
          >
            <h1
              style={{
                ...TYPOGRAPHY.heading,
                color: COLORS.foreground,
                marginBottom: 20,
              }}
            >
              {title}
            </h1>
          </div>
        </Sequence>

        {/* Subtitle Sequence */}
        <Sequence from={30} durationInFrames={durationInFrames - 30}>
          <div style={{ opacity: subtitleOpacity }}>
            <p
              style={{
                ...TYPOGRAPHY.body,
                color: COLORS.muted,
                maxWidth: "80%",
                marginBottom: 60,
              }}
            >
              {subtitle}
            </p>
          </div>
        </Sequence>

        {/* Accent line */}
        <Sequence from={60} durationInFrames={durationInFrames - 60}>
          <div
            style={{
              height: 4,
              width: accentLineWidth,
              backgroundColor: COLORS.accent,
              borderRadius: 2,
              marginBottom: 60,
            }}
          />
        </Sequence>

        {/* Branding footer */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            opacity: interpolate(frame, [120, 150], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div>
            <p
              style={{
                ...TYPOGRAPHY.body,
                fontSize: 32,
                color: COLORS.muted,
              }}
            >
              Minimalism Sophisticated with Tech Touches
            </p>
          </div>
          <div>
            <code
              style={{
                ...TYPOGRAPHY.code,
                color: COLORS.accent,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                padding: "12px 24px",
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              #CSArchive
            </code>
          </div>
        </div>
      </AbsoluteFill>
    </Root>
  );
};