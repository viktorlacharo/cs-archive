import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

// Enable Tailwind CSS (optional, but useful for styling)
// Config.overrideWebpackConfig(enableTailwind);

// Configure default video settings
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("./src/index.ts");

// Default composition dimensions (vertical short)
Config.setDefaultProps({
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 180, // 6 seconds default
});

// Output directory for rendered videos
Config.setOutputLocation("./out");

// Bundle size optimizations
Config.setConcurrency(1);
Config.setMaxTimelineTracks(10);