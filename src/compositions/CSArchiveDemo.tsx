import React from "react";
import { Sequence } from "remotion";
import { Root } from "../Root";
import { TitleScene } from "../components/TitleScene";
import { CodeBlock } from "../components/CodeBlock";

// Demo composition showcasing CSArchive components
export const CSArchiveDemoComposition: React.FC = () => {
  const codeExample = `// React Query: State Economy
function UserProfile() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: fetchUser,
  });

  // Same hook in UserAvatar → SAME cache
  return <div>{user?.name}</div>;
}`;

  return (
    <Root>
      {/* Scene 1: Title */}
      <Sequence from={0} durationInFrames={90}>
        <TitleScene
          title="CSArchive Demo"
          subtitle="Technical video template with branding"
          accentColor="#3B82F6"
        />
      </Sequence>

      {/* Scene 2: Code Example */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CodeBlock
            code={codeExample}
            language="typescript"
            title="React Query: State Economy Pattern"
            animationStartFrame={90}
            animationDuration={30}
          />
          <div
            style={{
              marginTop: 60,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 36,
              color: "#A3A3A3",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Single <span style={{ color: "#3B82F6" }}>useQuery</span> replaces:
            <ul style={{ marginTop: 20, paddingLeft: 40 }}>
              <li>useState (data)</li>
              <li>useState (loading)</li>
              <li>useState (error)</li>
              <li>useEffect (fetch)</li>
              <li>Manual cache logic</li>
            </ul>
          </div>
        </div>
      </Sequence>

      {/* Scene 3: Conclusion */}
      <Sequence from={210} durationInFrames={90}>
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontWeight: 500,
              fontSize: 72,
              color: "#FAFAFA",
              marginBottom: 40,
            }}
          >
            Minimalism Sophisticated
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 36,
              color: "#A3A3A3",
              maxWidth: 800,
              lineHeight: 1.4,
              marginBottom: 60,
            }}
          >
            Clean design, technical precision, no distractions.
          </p>
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
            npm run build
          </code>
        </div>
      </Sequence>
    </Root>
  );
};