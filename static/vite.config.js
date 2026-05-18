import { resolve } from "node:path";
import { readdirSync } from "node:fs";
import { defineConfig } from "vite";

const worksFiles = readdirSync(resolve(__dirname, "works"))
  .filter((file) => file.endsWith(".html"))
  .reduce((acc, file) => {
    const name = file.replace(".html", "");

    acc[name] = resolve(__dirname, `works/${file}`);
    return acc;
  }, {});

export default defineConfig({
  base: "/portfolio-site/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        ...worksFiles,
      },
    },
  },
});
