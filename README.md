# CSArchive Remotion Templates

Professional video templates for CSArchive YouTube channel, following Viktor Lacharo's branding guidelines.

## 🎨 Branding Guidelines

- **Colors**: Dark mode first (`#0A0A0A` background, `#FAFAFA` foreground, `#3B82F6` accent)
- **Typography**: Newsreader (serif) for headings, Source Sans 3 for body, JetBrains Mono for code
- **Animation**: Fluid but subtle, never intrusive
- **Philosophy**: Minimalism sophisticated with tech touches

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start Remotion Studio** (development)
   ```bash
   npm start
   ```
   Opens `http://localhost:3000` where you can preview and edit videos.

3. **Render a video**
   ```bash
   npm run build
   ```
   Renders the default composition to `./out`.

## 📁 Project Structure

```
src/
├── components/         # Reusable components (CodeBlock, TitleScene, etc.)
├── compositions/       # Complete video compositions
├── templates/          # Base templates with branding
├── utils/              # Helper functions and animations
└── index.tsx          # Entry point
```

## 🎬 Available Compositions

### CSArchiveTemplate
Base template with animated title, subtitle, and branding elements.

**Props:**
- `title`: Main title text
- `subtitle`: Subtitle text
- `durationInFrames`: Video length in frames (default: 180 @ 30fps = 6s)

**Usage:**
```tsx
<CSArchiveTemplate
  title="Your Video Title"
  subtitle="Technical concept explained"
  durationInFrames={240}
/>
```

### CSArchiveDemo
Example composition showcasing available components and animation patterns.

## 🧩 Components

### CodeBlock
Syntax-highlighted code block with line numbers and animations.

**Props:**
- `code`: Code string
- `language`: Programming language (default: "typescript")
- `title`: Optional title above code block
- `animationStartFrame`: Frame when animation starts
- `animationDuration`: Duration of entrance animation

### TitleScene
Animated title scene with spring animations and accent line.

**Props:**
- `title`: Main title
- `subtitle`: Optional subtitle
- `accentColor`: Color of accent line (default: `#3B82F6`)
- `animationStartFrame`: Frame when animation starts
- `durationInFrames`: Duration of this scene

## 🎨 Customizing Branding

All branding colors and typography are defined in:

1. `src/Root.tsx` - Global styles and font imports
2. `src/templates/CSArchiveTemplate.tsx` - Base template colors
3. `src/components/prism-theme.ts` - Code syntax highlighting theme

To modify colors, update the `COLORS` constant in relevant files:
```typescript
const COLORS = {
  background: "#0A0A0A",
  foreground: "#FAFAFA",
  accent: "#3B82F6",
  muted: "#A3A3A3",
  border: "#262626",
};
```

## 📝 Creating a New Video

1. Create a new composition in `src/compositions/`:
   ```tsx
   import React from "react";
   import { Sequence } from "remotion";
   import { Root } from "../Root";
   import { TitleScene } from "../components/TitleScene";

   export const MyVideo: React.FC = () => {
     return (
       <Root>
         <Sequence from={0} durationInFrames={90}>
           <TitleScene title="My Video" />
         </Sequence>
       </Root>
     );
   };
   ```

2. Register it in `src/Video.tsx`:
   ```tsx
   <Composition
     id="MyVideo"
     component={MyVideo}
     durationInFrames={180}
     fps={30}
     width={1080}
     height={1920}
   />
   ```

## 🔧 Configuration

- **Video dimensions**: 1080x1920 (vertical 9:16) by default
- **Frame rate**: 30 FPS
- **Output format**: MP4 via Remotion CLI

Modify default settings in `remotion.config.ts`.

## 📚 Resources

- [Remotion Documentation](https://www.remotion.dev/docs)
- [CSArchive Branding Guidelines](./memory/branding-guidelines.md)
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)

## 📄 License

MIT © Viktor Lacharo