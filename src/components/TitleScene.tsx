import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";

interface TitleSceneProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  animationStartFrame?: number;
  durationInFrames?: number;
}

export const TitleScene: React.FC<TitleSceneProps> = ({
  title,
  subtitle,
  accentColor = "#3B82F6",
  animationStartFrame = 0,
  durationInFrames = 90,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - animationStartFrame;

  // Spring animations
  const titleSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: {
      damping: 20,
      mass: 0.8,
      stiffness: 100,
    },
  });

  const subtitleSpring = spring({
    frame: Math.max(0, relativeFrame - 15),
    fps: 30,
    config: {
      damping: 25,
      mass: 0.6,
      stiffness: 100,
    },
  });

  const titleOpacity = interpolate(relativeFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.85, 1]);
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
  const subtitleTranslateY = interpolate(subtitleSpring, [0, 1], [20, 0]);

  // Accent line animation
  const lineWidth = interpolate(
    relativeFrame,
    [30, 60],
    [0, 400],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (relativeFrame < 0 || relativeFrame > durationInFrames) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 80,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: subtitle ? 30 : 50,
        }}
      >
        <h1
          style={{
            fontFamily: "'Newsreader', serif",
            fontWeight: 500,
            fontSize: 96,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FAFAFA",
            marginBottom: 20,
          }}
        >
          {title}
        </h1>
      </div>

      {subtitle && (
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 400,
              fontSize: 48,
              lineHeight: 1.4,
              color: "#A3A3A3",
              maxWidth: "80%",
            }}
          >
            {subtitle}
          </p>
        </div>
      )}

      <div
        style={{
          height: 4,
          width: lineWidth,
          backgroundColor: accentColor,
          borderRadius: 2,
          marginTop: 20,
        }}
      />
    </div>
  );
};