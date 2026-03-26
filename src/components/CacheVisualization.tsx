import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

// Colors from CSArchive branding
const COLORS = {
  background: "#0A0A0A",
  card: "#141414",
  foreground: "#FAFAFA",
  muted: "#A3A3A3",
  accent: "#3B82F6",
  accentHover: "#60A5FA",
  border: "#262626",
  green: "#10B981",
  purple: "#8B5CF6",
  red: "#EF4444",
  amber: "#F59E0B",
};

interface ComponentBoxProps {
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  isActive?: boolean;
  delay?: number;
  children?: React.ReactNode;
}

export const ComponentBox: React.FC<ComponentBoxProps> = ({
  name,
  x,
  y,
  width = 200,
  height = 120,
  isActive = false,
  delay = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const glowOpacity = isActive
    ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.3, 0.6])
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Glow effect */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 16,
            background: `radial-gradient(ellipse at center, ${COLORS.accent}40 0%, transparent 70%)`,
            opacity: glowOpacity,
            filter: "blur(8px)",
          }}
        />
      )}

      {/* Main box */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.card,
          border: `2px solid ${isActive ? COLORS.accent : COLORS.border}`,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: isActive
              ? `${COLORS.accent}20`
              : COLORS.background,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 500,
              color: isActive ? COLORS.accent : COLORS.foreground,
            }}
          >
            {name}
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

interface CacheBoxProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  delay?: number;
  entries?: { key: string; value: string; isNew?: boolean }[];
}

export const CacheBox: React.FC<CacheBoxProps> = ({
  x,
  y,
  width = 280,
  height = 200,
  delay = 0,
  entries = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Pulsing glow
  const glowOpacity = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.2, 0.5]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: 20,
          background: `radial-gradient(ellipse at center, ${COLORS.green}30 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(12px)",
        }}
      />

      {/* Main cache box */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.card,
          border: `2px solid ${COLORS.green}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: `${COLORS.green}15`,
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: COLORS.green,
              boxShadow: `0 0 8px ${COLORS.green}`,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 500,
              color: COLORS.green,
            }}
          >
            QueryCache
          </span>
        </div>

        {/* Entries */}
        <div style={{ padding: 12 }}>
          {entries.map((entry, i) => {
            const entryDelay = delay + i * 8;
            const entryEntrance = spring({
              frame: frame - entryDelay,
              fps,
              config: { damping: 25, stiffness: 120 },
            });
            const entryOpacity = interpolate(entryEntrance, [0, 1], [0, 1]);
            const entryX = interpolate(entryEntrance, [0, 1], [20, 0]);

            return (
              <div
                key={entry.key}
                style={{
                  opacity: entryOpacity,
                  transform: `translateX(${entryX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  padding: "8px 12px",
                  backgroundColor: entry.isNew
                    ? `${COLORS.accent}15`
                    : COLORS.background,
                  borderRadius: 8,
                  border: `1px solid ${entry.isNew ? COLORS.accent : COLORS.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: COLORS.purple,
                  }}
                >
                  {entry.key}
                </span>
                <span style={{ color: COLORS.muted, fontSize: 13 }}>→</span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: entry.isNew ? COLORS.accent : COLORS.foreground,
                  }}
                >
                  {entry.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
  color?: string;
  dashed?: boolean;
  animated?: boolean;
  label?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  from,
  to,
  delay = 0,
  color = COLORS.accent,
  dashed = false,
  animated = false,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const dashOffset = animated ? -frame * 2 : 0;

  // Arrow head
  const arrowSize = 10;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${from.x}-${to.x}`}
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={arrowSize - 2}
          refY={arrowSize / 2}
          orient="auto"
        >
          <polygon
            points={`0 0, ${arrowSize} ${arrowSize / 2}, 0 ${arrowSize}`}
            fill={color}
            opacity={progress}
          />
        </marker>
      </defs>

      <line
        x1={from.x}
        y1={from.y}
        x2={from.x + (to.x - from.x) * progress}
        y2={from.y + (to.y - from.y) * progress}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "8,4" : "none"}
        strokeDashoffset={dashOffset}
        markerEnd={
          progress > 0.9 ? `url(#arrowhead-${from.x}-${to.x})` : undefined
        }
        opacity={0.8}
      />

      {label && progress > 0.5 && (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 10}
          fill={color}
          fontSize={14}
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
          opacity={interpolate(progress, [0.5, 1], [0, 1])}
        >
          {label}
        </text>
      )}
    </svg>
  );
};

interface DataFlowDotProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
  duration?: number;
  color?: string;
}

export const DataFlowDot: React.FC<DataFlowDotProps> = ({
  from,
  to,
  delay = 0,
  duration = 30,
  color = COLORS.accent,
}) => {
  const frame = useCurrentFrame();

  const relativeFrame = frame - delay;

  if (relativeFrame < 0 || relativeFrame > duration) return null;

  const progress = interpolate(relativeFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = interpolate(progress, [0, 1], [from.x, to.x]);
  const y = interpolate(progress, [0, 1], [from.y, to.y]);

  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 6,
        top: y - 6,
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}60`,
        opacity,
      }}
    />
  );
};
