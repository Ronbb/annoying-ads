import { defineConfig } from "vite";
import { builtinModules } from "../node";

export default defineConfig({
  build: {
    outDir: "build/main",
    lib: {
      entry: "src/main/index.ts",
      fileName: "index",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [...builtinModules, "electron"],
    },
    minify: false,
  },
  optimizeDeps: {
    exclude: [...builtinModules, "electron"],
  },
});
