# Rendr View

A modern, high-performance monorepo for React utility components and hooks. Optimized for performance, consistency, and a seamless developer experience.

## Tech Stack

- **Package Manager:** [pnpm](https://pnpm.io/)
- **Monorepo Tooling:** [Turborepo](https://turbo.build/)
- **Build System:** [Vite](https://vitejs.dev/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** [ESLint 9](https://eslint.org/) (Flat Config)
- **Documentation:** [Storybook](https://storybook.js.org/)

## Getting Started

### Prerequisites

- **Node.js:** >= 22
- **pnpm:** Installed globally (`npm install -g pnpm`)

### Installation

```bash
pnpm install
```

### Development Scripts

- **Build everything:** `pnpm build`
- **Run tests:** `pnpm test`
- **Linting:** `pnpm lint`
- **Start Storybook:** `pnpm storybook`

## Project Structure

- `packages/*`: Standardized library packages.
- `packages/storybook-v10`: Interactive documentation and playground.
- `packages/_boilerplate`: Template for creating new packages.

## Creating a New Package

1. Copy the `packages/_boilerplate` directory.
2. Update `package.json` with the new package name and metadata.
3. Run `pnpm install` to link workspace dependencies.

## Documentation

- [Publishing Releases](./docs/releasing.md) - How to release new versions of packages to npm.

## License

MIT
