import type { Plugin } from "vite";
import { join } from "node:path";

const PLUGIN_NAME = "funidevtols";
export function funiDevtools(): Plugin {
  let IDS: string[] = [];
  let ROOT = "";
  let DEV = false;
  return {
    name: PLUGIN_NAME,
    enforce: "pre",
    configResolved(config) {
      const { env, root } = config;
      DEV = env.DEV;
      ROOT = root;
      IDS = [join(ROOT, "src/main.js"), join(ROOT, "src/main.ts")];
    },
    transform(code, id) {
      if (DEV && IDS.includes(id)) {
        code =
          `import {Entry} from "devtools-vite/webComponents"; \n` +
          code +
          "\n const entryDom = new Entry();\ndocument.body.appendChild(entryDom)";
        return code;
      }
    },
  };
}
