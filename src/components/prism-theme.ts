import { PrismTheme } from "prism-react-renderer";

export const dark: PrismTheme = {
  plain: {
    color: "#FAFAFA",
    backgroundColor: "transparent",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "22px",
    lineHeight: "1.5",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#A3A3A3",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#FAFAFA",
      },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
      style: {
        color: "#3B82F6", // Accent blue
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#10B981", // Green
      },
    },
    {
      types: ["operator", "entity", "url"],
      style: {
        color: "#F59E0B", // Amber
      },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: {
        color: "#8B5CF6", // Purple
      },
    },
    {
      types: ["function"],
      style: {
        color: "#EF4444", // Red
      },
    },
    {
      types: ["regex", "important", "variable"],
      style: {
        color: "#F59E0B",
      },
    },
    {
      types: ["bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
  ],
};