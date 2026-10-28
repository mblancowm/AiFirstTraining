import { tmpdir } from "node:os";
import path from "node:path";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [vike()],
  // Keep Vite's frequently refreshed cache out of OneDrive-synced node_modules.
  cacheDir: path.join(tmpdir(), "wm-ai-first-training-site", "vite"),
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:3001" },
  },
});
