import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import type { Plugin } from "vite";

// Lists every bundled photo so the app can save them for offline use a few at a time (src/lib/offlinePhotos.ts).
const offlinePhotoList = (): Plugin => ({
  name: "offline-photo-list",
  apply: "build",
  generateBundle(_options, bundle) {
    const photos = Object.keys(bundle).filter((f) => f.startsWith("assets/") && /\.(png|jpe?g|webp)$/i.test(f)).sort();
    this.emitFile({ type: "asset", fileName: "offline-photos.json", source: JSON.stringify(photos.map((f) => `/${f}`)) });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/__l5e": {
        target: "https://montessorilifeskillsapp.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    offlinePhotoList(),
    // Offline: the app itself (every page and all lesson text) is saved on first visit; photos are
    // saved gradually afterwards by src/lib/offlinePhotos.ts so the first visit never stalls.
    // Registration happens only from src/lib/registerOffline.ts.
    VitePWA({
      strategies: "generateSW",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectRegister: null,
      manifest: false,
      devOptions: { enabled: false },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg,woff,woff2}"],
        globIgnores: ["**/firebase-messaging-sw.js"],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/~oauth/, /^\/auth\/callback/, /^\/functions\//],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: { cacheName: "pages", networkTimeoutSeconds: 4 },
          },
          {
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith("/assets/"),
            handler: "CacheFirst",
            options: { cacheName: "built-assets", expiration: { maxEntries: 1500 } },
          },
          {
            urlPattern: ({ url, request }) => request.destination === "image" && /supabase\.co$/.test(url.hostname) && url.pathname.includes("/storage/v1/object/public/"),
            handler: "StaleWhileRevalidate",
            options: { cacheName: "public-images", expiration: { maxEntries: 400 } },
          },
        ],
      },
    }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks: cached across app updates, parsed in parallel.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return "vendor-react";
          if (id.includes("@radix-ui")) return "vendor-ui";
          if (id.includes("@supabase")) return "vendor-supabase";
          if (id.includes("@tanstack")) return "vendor-query";
          if (id.includes("lucide-react")) return "vendor-icons";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
