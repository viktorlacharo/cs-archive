import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Root } from "../Root";
import { CodeBlock } from "../components/CodeBlock";
import {
  ComponentBox,
  CacheBox,
  ConnectionLine,
  DataFlowDot,
} from "../components/CacheVisualization";

// ============================================
// SCENE 1: The Problem - Traditional Approach
// ============================================
const ProblemScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CodeBlock
        code={`// UserProfile.tsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchUser(userId)
    .then(setUser)
    .catch(setError)
    .finally(() => setLoading(false));
}, [userId]);

// UserAvatar.tsx - ¡Duplicado!
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
// ... mismo código repetido`}
        language="typescript"
        title="Estado duplicado en cada componente"
        animationStartFrame={0}
        animationDuration={40}
        highlightLines={[2, 3, 4, 14, 15]}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: React Query Solution
// ============================================
const SolutionScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CodeBlock
        code={`// UserProfile.tsx
const { data: user, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});

// UserAvatar.tsx - ¡MISMO CACHE!
const { data: user } = useQuery({
  queryKey: ['user', userId],  // misma key = misma cache
  queryFn: () => fetchUser(userId),
});

// Modal, Sidebar, Header... TODOS comparten la cache`}
        language="typescript"
        title="React Query: Estado compartido automáticamente"
        animationStartFrame={0}
        animationDuration={40}
        highlightLines={[3, 9]}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Visual Cache Diagram
// ============================================
const CacheDiagramScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cache entries appear progressively
  const cacheEntries = [
    {
      key: "['user', 1]",
      value: "{ name: 'Viktor' }",
      isNew: frame > 90 && frame < 150,
    },
    {
      key: "['posts']",
      value: "[...posts]",
      isNew: frame > 150 && frame < 210,
    },
    { key: "['settings']", value: "{ theme: 'dark' }", isNew: frame > 210 },
  ];

  const visibleEntries = cacheEntries.filter((_, i) => frame > 60 + i * 60);

  return (
    <AbsoluteFill style={{ padding: 60 }}>
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: 48,
            fontWeight: 500,
            color: "#FAFAFA",
            marginBottom: 12,
          }}
        >
          Cache como Fuente de Verdad
        </h2>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 24,
            color: "#A3A3A3",
          }}
        >
          Múltiples componentes, una sola fuente de datos
        </p>
      </div>

      {/* Diagram container */}
      <div
        style={{
          position: "relative",
          flex: 1,
          marginTop: 20,
        }}
      >
        {/* Central Cache */}
        <CacheBox
          x={400}
          y={300}
          width={280}
          height={220}
          delay={30}
          entries={visibleEntries}
        />

        {/* Components around the cache */}
        <ComponentBox
          name="<UserProfile />"
          x={100}
          y={100}
          width={180}
          height={100}
          delay={60}
          isActive={frame > 90 && frame < 180}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            useQuery(['user', 1])
          </span>
        </ComponentBox>

        <ComponentBox
          name="<UserAvatar />"
          x={700}
          y={100}
          width={180}
          height={100}
          delay={75}
          isActive={frame > 120 && frame < 180}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            useQuery(['user', 1])
          </span>
        </ComponentBox>

        <ComponentBox
          name="<PostList />"
          x={100}
          y={550}
          width={180}
          height={100}
          delay={90}
          isActive={frame > 150 && frame < 240}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            useQuery(['posts'])
          </span>
        </ComponentBox>

        <ComponentBox
          name="<Settings />"
          x={700}
          y={550}
          width={180}
          height={100}
          delay={105}
          isActive={frame > 210}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono'",
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            useQuery(['settings'])
          </span>
        </ComponentBox>

        {/* Connection lines */}
        <ConnectionLine
          from={{ x: 280, y: 150 }}
          to={{ x: 400, y: 350 }}
          delay={90}
          color="#3B82F6"
          animated
        />
        <ConnectionLine
          from={{ x: 700, y: 150 }}
          to={{ x: 680, y: 350 }}
          delay={120}
          color="#3B82F6"
          animated
        />
        <ConnectionLine
          from={{ x: 280, y: 600 }}
          to={{ x: 400, y: 480 }}
          delay={150}
          color="#8B5CF6"
          animated
        />
        <ConnectionLine
          from={{ x: 700, y: 600 }}
          to={{ x: 680, y: 480 }}
          delay={210}
          color="#10B981"
          animated
        />

        {/* Data flow dots */}
        {frame > 90 && frame < 130 && (
          <DataFlowDot
            from={{ x: 540, y: 350 }}
            to={{ x: 280, y: 150 }}
            delay={90}
            duration={30}
            color="#3B82F6"
          />
        )}
        {frame > 120 && frame < 160 && (
          <DataFlowDot
            from={{ x: 540, y: 350 }}
            to={{ x: 700, y: 150 }}
            delay={120}
            duration={30}
            color="#3B82F6"
          />
        )}
      </div>

      {/* Bottom annotation */}
      <Sequence from={240} durationInFrames={60}>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 60,
            right: 60,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              color: "#3B82F6",
              opacity: interpolate(frame, [240, 260], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Misma queryKey = Misma instancia de cache
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: Modal Example - Real World Use Case
// ============================================
const ModalExampleScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CodeBlock
        code={`// ProductCard.tsx - Lista de productos
const { data: product } = useQuery({
  queryKey: ['product', productId],
  queryFn: () => fetchProduct(productId),
});

// ProductModal.tsx - Modal de detalles
const { data: product } = useQuery({
  queryKey: ['product', productId],
  queryFn: () => fetchProduct(productId),
  // staleTime: Infinity  // opcional: nunca refetch
});

// ¡El modal se abre INSTANTÁNEAMENTE!
// Los datos ya estaban en cache desde la lista`}
        language="typescript"
        title="Zero loading time en modales"
        animationStartFrame={0}
        animationDuration={35}
        highlightLines={[3, 9, 14, 15]}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: Conclusion
// ============================================
const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    "Una cache centralizada",
    "Múltiples consumidores",
    "Sincronización automática",
    "Zero boilerplate",
  ];

  return (
    <AbsoluteFill
      style={{
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Main title */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame, [0, 30], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })})`,
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: 72,
            fontWeight: 500,
            color: "#FAFAFA",
            marginBottom: 20,
          }}
        >
          State Economy
        </h1>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 32,
            color: "#A3A3A3",
          }}
        >
          React Query simplifica tu gestión de estado
        </p>
      </div>

      {/* Key points */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 60,
        }}
      >
        {items.map((item, i) => {
          const itemDelay = 45 + i * 15;
          const itemSpring = spring({
            frame: frame - itemDelay,
            fps,
            config: { damping: 20, stiffness: 100 },
          });
          const itemOpacity = interpolate(itemSpring, [0, 1], [0, 1]);
          const itemX = interpolate(itemSpring, [0, 1], [-30, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#3B82F6",
                  boxShadow: "0 0 12px #3B82F6",
                }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 32,
                  color: "#FAFAFA",
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <Sequence from={120} durationInFrames={90}>
        <div
          style={{
            opacity: interpolate(frame, [120, 150], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <code
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 28,
              color: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              padding: "20px 40px",
              borderRadius: 12,
              border: "1px solid #262626",
            }}
          >
            npm install @tanstack/react-query
          </code>
        </div>
      </Sequence>

      {/* Branding footer */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: interpolate(frame, [150, 180], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: "#A3A3A3",
          }}
        >
          @viktorlacharo
        </span>
        <span style={{ color: "#262626" }}>|</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: "#3B82F6",
          }}
        >
          #CSArchive
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================
export const ReactQueryEconomyComposition: React.FC = () => {
  return (
    <Root>
      {/* Scene 1: Problem (0-240 frames = 8s) */}
      <Sequence from={0} durationInFrames={240} name="Problem">
        <ProblemScene />
      </Sequence>

      {/* Scene 2: Solution (240-480 frames = 8s) */}
      <Sequence from={240} durationInFrames={240} name="Solution">
        <SolutionScene />
      </Sequence>

      {/* Scene 3: Cache Diagram (480-780 frames = 10s) */}
      <Sequence from={480} durationInFrames={300} name="Cache Diagram">
        <CacheDiagramScene />
      </Sequence>

      {/* Scene 4: Modal Example (780-1020 frames = 8s) */}
      <Sequence from={780} durationInFrames={240} name="Modal Example">
        <ModalExampleScene />
      </Sequence>

      {/* Scene 5: Conclusion (1020-1230 frames = 7s) */}
      <Sequence from={1020} durationInFrames={210} name="Conclusion">
        <ConclusionScene />
      </Sequence>
    </Root>
  );
};
