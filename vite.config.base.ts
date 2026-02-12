import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import fs from "fs";

// This config function can be imported and used by individual packages
export const getBaseViteConfig = (dirname: string) => {
  const entry = fs.existsSync(resolve(dirname, "src/index.ts"))
    ? resolve(dirname, "src/index.ts")
    : resolve(dirname, "src/index.tsx");

  return defineConfig({
    plugins: [
      react(),
      dts({
        cleanVueFileName: true,
        staticImport: true,
        rollupTypes: false,
        insertTypesEntry: true
      })
    ],
    build: {
      lib: {
        entry,
        formats: ["es", "cjs"],
        fileName: format => `index.${format === "es" ? "mjs" : "js"}`
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM"
          }
        }
      },
      sourcemap: true,
      minify: "esbuild"
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./test/setup.ts"
    }
  });
};
