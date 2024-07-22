import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/lists": "http://localhost:3001",
      "/symptoms": "http://localhost:3001",
      "/tasks": "http://localhost:3001",
    },
  },
});
