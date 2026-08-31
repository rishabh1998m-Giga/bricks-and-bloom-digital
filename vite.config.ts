// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Outside the Lovable sandbox (e.g. Hostinger's Node 22 builder) the default
  // target is a Cloudflare Worker bundle, which crashes under plain Node with
  // "__exportAll is not a function". Pin the Node server target so `npm run build`
  // emits a runnable Node app at .output/server/index.mjs.
  // Inside Lovable this option is ignored — the sandbox always builds Cloudflare.
  nitro: { preset: "node-server" },
});
