import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { funiDevtools } from "devtools-vite";

export default defineConfig({
  plugins: [vue(), funiDevtools()],
});
