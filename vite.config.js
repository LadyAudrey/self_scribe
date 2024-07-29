import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { cwd } from "node:process";
import { join } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "FrontEnd",
  build: {
    outDir: join(cwd(), "build/frontend"),
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      "/lists": "http://localhost:3001",
      "/symptoms": "http://localhost:3001",
      "/tasks": "http://localhost:3001",
    },
  },
});
