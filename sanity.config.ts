import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "reach-media",
  title: "Reach Media",

  projectId: "6926yn16",
  dataset: "production",
  apiVersion: "2024-01-01",

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],

  schema: {
    types: schemaTypes,
  },
});
