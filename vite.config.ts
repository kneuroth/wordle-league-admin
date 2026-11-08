import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const ALLOWED_MODES = ['dev', 'prod'] as const;

// https://vite.dev/config/
export default defineConfig(({ mode, isPreview }) => {
  // `vite preview` just serves the already-built dist/, so the target was fixed at build time.
  if (!isPreview) {
    if (!(ALLOWED_MODES as readonly string[]).includes(mode)) {
      throw new Error(
        `Unknown mode "${mode}". Run with --mode dev or --mode prod (e.g. npm run start:dev / npm run start:prod).`
      );
    }
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    if (!env.VITE_API_BASE) {
      throw new Error(`VITE_API_BASE is not set for mode "${mode}". Check .env.${mode}.`);
    }
    console.log(`\n  Wordle League Admin → ${mode.toUpperCase()} API: ${env.VITE_API_BASE}\n`);
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
})
