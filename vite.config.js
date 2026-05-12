import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` controls how built asset URLs are prefixed. For deployment under a
// subpath (e.g. GitHub Pages at /REPO/) set VITE_BASE=/REPO/. Locally `npm run
// dev` falls back to "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
});
