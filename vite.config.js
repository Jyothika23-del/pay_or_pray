import { defineConfig } from "vite";

export default defineConfig({
  root: "payorpray",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
  strictPort: true,
  fs: {
      strict: false,
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
});
