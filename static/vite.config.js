import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio-site/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
      },
    },
  },
});
