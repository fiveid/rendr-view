# AI Agent Reference Document (AGENTS.md)

Welcome to the `rendr-view` project. This document serves as the master guide for any AI agents interacting with the `rendr-view-monorepo`. It outlines the technologies, repository structure, workflows, and core commands of the project to ensure tasks are executed safely and conventionally.

## 1. Project Overview & Purpose

- **Name:** rendr-view-monorepo
- **Purpose:** A modern, high-performance monorepo for React utility components and hooks. Optimized for performance, consistency, and a seamless developer experience.

## 2. Technology Stack & Environment

When writing or modifying code, agents must adhere to the following tools and standard conventions:

- **Package Manager:** `pnpm` (Workspace/Monorepo aware). **DO NOT** use `npm` or `yarn` directly.
- **Task Runner:** Turborepo (`turbo`)
- **Build System:** Vite
- **Testing:** Vitest & React Testing Library (`@testing-library/react`)
- **Linting:** ESLint 9 (Flat Config)
- **Formatting:** Prettier
- **Documentation:** Storybook
- **Versioning/Releases:** Changesets
- **Language / Framework:** TypeScript, React (v19.x), Node (>= 20.11.0)

## 3. Repository Structure

- `packages/*`: The core package library. Each sub-folder is a separate, standardized npm package containing React components or hooks (e.g. `packages/btn`, `packages/text`).
- `packages/storybook-v10`: The interactive Storybook playground / documentation site for the project.
- `packages/_boilerplate`: A standalone template. Any **new package** MUST be cloned from here to maintain consistency.
- `standardize_packages.py`: A root utility script for ensuring package consistency.
- `scripts/`: Contains internal utility scripts (e.g., `verify_release.py`).
- `docs/`: Contains core project documentation (e.g., `releasing.md`).

## 4. Core Development Patterns

All UI components in `rendr-view` must follow these established patterns:

- **Styling Convention:** Use BEM-like naming for internal classes (e.g., `Btn`, `Btn__icon`, `Btn__label`).
- **Class Customization:** Use the `clx` prop to allow consumers to override specific internal elements.
- **Utilities:** Prefer `clsx` for conditional class joining.
- **Icons:** Use `react-icons` for standard iconography.
- **React 19:** This project uses React 19. Prefer modern patterns, such as passing `ref` as a standard prop instead of using `forwardRef`.

## 5. Monorepo Dependency Management

- **Internal Dependencies:** To add an internal package as a dependency, use: `pnpm add @rendr-view/<name> --workspace --filter @rendr-view/<target-package>`.
- **External Dependencies:** Always use `--filter` to target the specific package you are modifying.

## 6. Testing & Verification

- **Global Setup:** Global test configuration is located in `test/setup.ts`.
- **Package Tests:** Each package should have its own tests using Vitest and React Testing Library (`*.test.tsx`).
- **Storybook:** Every new component MUST have a corresponding story in `packages/storybook-v10/src/stories`.

## 7. Standard Workflows & Commands

**Do not run ad-hoc build scripts unless necessary**. Use the standard `pnpm` scripts invoked from the project root (`package.json`):

- **Install Dependencies:** `pnpm install`
- **Clean Artifacts:** `pnpm clean` (removes `node_modules` and `dist` folders across all packages)
- **Build All Packages:** `pnpm build` (Invokes Turborepo)
- **Run Tests:** `pnpm test` (Invokes Turborepo)
- **Lint Code:** `pnpm lint` (Invokes Turborepo)
- **Format Code:** `pnpm format` (Runs Prettier on `packages/**/*.{ts,tsx,md,json}`)

## 8. Agent Instructions: Creating a New Package

When tasked with creating a new component or hook package, strictly follow this procedure:

1. Copy the template: Copy `packages/_boilerplate` -> `packages/<new-package-name>`.
2. Configure Package: Modify `packages/<new-package-name>/package.json` with the new package name, description, and metadata.
3. Link Workspace: Run `pnpm install` from the monorepo root to link the new workspace package to the environment.
4. Implement: Write the code, ensuring exports are correctly specified in `package.json` and `vite.config.base.ts` configurations are respected.
5. Document & Test: Add Storybook stories and unit tests (`*.test.tsx` / `*.spec.tsx` using Vitest) for the new package.
6. Standardize: Run `python3 standardize_packages.py` from the root to ensure the new package's metadata and configuration are consistent with the rest of the monorepo.

## 9. Agent Instructions: Code Review & Linting Context

The repository strictly uses `ESLint 9` (Flat Config) defined in `eslint.config.js`.

- Always ensure any JS/TS files you write abide by the strict TypeScript checks and React lint rules.
- You can format your changes by running `pnpm format` or using the formatting tool.

## 10. Agent Instructions: Release Workflow

Releases are handled manually via Changesets. You should document breaking changes with `pnpm changeset`, but **NEVER** run the publish/release scripts directly unless explicitly told to push to npm.

- **Generate a Changeset:** `pnpm changeset` (Do this to record changes for the changelog).
- **Bump Versions:** `pnpm version-packages`
- **Publish to NPM:** `pnpm release` (Runs builds, custom Python verifiers, and publishes to public npm - **WARNING:** use extreme caution).

For deeper context on releasing, always refer to `docs/releasing.md`.

## 11. Agent Instructions: Git Commits

Never automatically stage changes, create a commit/branch, or fetch or push any code to remote, unless explicitly told to do so.
