import { dirname } from "path";
import { fileURLToPath } from "url";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-onboarding")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const path = await import("path");
    const fs = await import("fs");
    const { fileURLToPath } = await import("url");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Get all packages in the monorepo to alias them to their source files
    const packagesDir = path.resolve(__dirname, "../../");
    const packageDirs = fs
      .readdirSync(packagesDir)
      .filter(f => fs.statSync(path.join(packagesDir, f)).isDirectory());

    const alias: Record<string, string> = {};
    const exclude: string[] = [];

    for (const dir of packageDirs) {
      const pkgPath = path.join(packagesDir, dir, "package.json");
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
        if (pkg.name && pkg.name.startsWith("@rendr-view/")) {
          // Alias the package to its src directory
          alias[pkg.name] = path.resolve(packagesDir, dir, "src");
          exclude.push(pkg.name);
        }
      }
    }

    return mergeConfig(config, {
      resolve: {
        alias,
        preserveSymlinks: true
      },
      optimizeDeps: {
        exclude
      }
    });
  }
};
export default config;
