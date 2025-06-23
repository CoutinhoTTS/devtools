import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./index.ts", "./webComponents.ts"],
  fixedExtension: true,
  dts: true,
});
