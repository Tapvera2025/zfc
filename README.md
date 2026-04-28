# ZFC

Modern Next.js foundation for the ZFC project.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint 9
- Turbopack
- React Compiler
- Network-independent system font stack

## Project Structure

```txt
src/
  app/                 App Router routes, layouts, and global styles
  components/
    layout/            Page-level shell components
    ui/                Reusable presentation components
  config/              App-wide constants and configuration
  lib/                 Shared utilities
  types/               Shared TypeScript types
```

## Development Flow

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

The app uses the `@/*` path alias for imports from `src/`.
"# zfc" 
