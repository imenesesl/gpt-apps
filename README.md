# TypeScript Monorepo Template

A modern TypeScript monorepo using Yarn workspaces and Turborepo for efficient package management and build orchestration.

## ✨ Features

- 📦 Yarn Workspaces for efficient package management
- ⚡ Turborepo for fast and incremental builds
- 🔷 Shared TypeScript configuration
- 🎨 Unified ESLint setup with modern config
- 🔄 Hot-reload development environment
- ✅ Strict type checking enabled
- 📁 Clean and scalable monorepo structure

## 🔧 Prerequisites

- Node.js v20.11.1 (use nvm for version management)
- Yarn v1.22.19

## 🚀 Quick Start

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-name>
```

2. **Install dependencies**

```bash
yarn install
```

3. **Available Scripts**

```bash
# Build all packages in the monorepo
yarn build

# Start development mode with hot-reload
yarn dev

# Run ESLint across all packages
yarn lint

# Automatically fix ESLint issues
yarn lint:fix

# Run TypeScript type checking
yarn type-check
```

## 📁 Project Structure

```
├── packages/
│   ├── ai-improvement/        # Main package
│   │   ├── src/              # Source code
│   │   ├── dist/             # Compiled output
│   │   └── package.json      # Package configuration
│   │
│   └── config/               # Shared configurations
│       ├── eslint/           # ESLint base config
│       └── typescript/       # TypeScript base config
│
├── package.json              # Root package.json
├── turbo.json               # Turborepo configuration
└── .nvmrc                   # Node.js version lock
```

## 🛠 Configuration Details

### TypeScript

- Target: ES2020
- Strict mode enabled
- Source maps enabled
- Common JS modules
- Shared base configuration in `@repo/config`

### ESLint

- Modern ESLint flat config
- TypeScript-specific rules
- Shared configuration via `@repo/config`
- Automatic fixing support

### Turborepo

- Optimized task running
- Caching enabled for builds
- Configured for monorepo tasks:
  - build
  - lint
  - dev
  - type-check

## 📦 Working with Packages

### Creating a New Package

1. Create a new directory in `packages/`
2. Initialize package.json:
```json
{
  "name": "@repo/your-package",
  "version": "1.0.0",
  "private": true
}
```
3. Extend shared configs:
```json
// tsconfig.json
{
  "extends": "@repo/config/typescript/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Using Shared Configurations

- TypeScript: Extend from `@repo/config/typescript/base.json`
- ESLint: Import from `@repo/config/eslint/base.mjs`

## 🔄 Development Workflow

1. Make changes in package source code
2. Run `yarn dev` for development with hot-reload
3. Use `yarn type-check` to verify types
4. Use `yarn lint` to ensure code quality
5. Run `yarn build` before committing

## 📝 License

ISC

## 👤 Author

imenesesl

