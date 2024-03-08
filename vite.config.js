import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://test-system-backend.vercel.app",
        // target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
