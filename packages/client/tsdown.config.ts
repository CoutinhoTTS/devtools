import { defineConfig } from "tsdown";
import Vue from "unplugin-vue/rolldown";
import { buildCSS, GENERATED_CSS } from "./../../scripts/build-css";

export default defineConfig({
  entry: ["index.ts"],
  fixedExtension: true,
  alias: {
    "@client/": "./*",
    "@hooks/": "../hooks/*",
    "@vite/": "../vite/*",
  },
  hooks: {
    "build:prepare": async ({ options }) => {
      await buildCSS();
      let { watch, ignoreWatch = [] } = options;
      if (!watch) return;
      typeof ignoreWatch === "string" && (ignoreWatch = [ignoreWatch]);
      Array.isArray(ignoreWatch) &&
        !ignoreWatch.includes(GENERATED_CSS) &&
        ignoreWatch.push(GENERATED_CSS);
    },
  },
  plugins: [Vue()],
  external: ["vue", "@vueuse/core"],
});
