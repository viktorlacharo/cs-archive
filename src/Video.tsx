import React from "react";
import { Composition } from "remotion";
import { CSArchiveTemplate } from "./templates/CSArchiveTemplate";
import { CSArchiveDemoComposition } from "./compositions/CSArchiveDemo";
import { ReactQueryEconomyComposition } from "./compositions/ReactQueryEconomy";

// This component registers all available compositions
export const Video: React.FC = () => {
  return (
    <>
      {/* CSArchive Template - Base template */}
      <Composition
        id="CSArchiveTemplate"
        component={CSArchiveTemplate}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "CSArchive Template",
          subtitle: "Base template with Viktor Lacharo's branding",
        }}
      />

      {/* CSArchive Demo - Example video showcasing components */}
      <Composition
        id="CSArchiveDemo"
        component={CSArchiveDemoComposition}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* React Query Economy - State sharing through cache */}
      <Composition
        id="ReactQueryEconomy"
        component={ReactQueryEconomyComposition}
        durationInFrames={1500} // 50 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
