import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

// Enable Tailwind CSS v4
Config.overrideWebpackConfig(enableTailwind);

// Configure default video settings
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("./src/index.tsx");

// Output directory for rendered videos
Config.setOutputLocation("./out");

// Bundle size optimizations
Config.setConcurrency(1);
Config.setMaxTimelineTracks(10);
