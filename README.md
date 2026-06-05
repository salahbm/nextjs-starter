# Next.js Starter

A modern admin starter built with Next.js, React, Bun, Tailwind CSS, and a small set of production-minded defaults.

## Stack

- [Next.js 16](https://nextjs.org/) App Router
- [React 19](https://react.dev/)
- [Bun](https://bun.sh/) for package management and scripts
- [Tailwind CSS 4](https://tailwindcss.com/) with CSS-first configuration
- [TypeScript 6](https://www.typescriptlang.org/)
- [next-intl](https://next-intl.dev/) for locale routing and translations
- [t3-env](https://env.t3.gg/) for typed environment variables
- [TanStack Query](https://tanstack.com/query/latest) and [TanStack Table](https://tanstack.com/table/latest)
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)
- [Radix UI](https://www.radix-ui.com/) primitives with local UI wrappers
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Zod](https://zod.dev/) for validation
- [Nuqs](https://nuqs.47ng.com/) for URL state management

## Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Routes are locale-prefixed, so the app will serve pages such as `/en`, `/ru`, and `/kr`.

## Scripts

```bash
bun run dev           # Start Next.js dev server
bun run build         # Create a production build
bun run start         # Start the production server
bun run lint          # Run ESLint with auto-fix
bun run format        # Format files with Prettier
bun run format:check  # Check formatting
bun run type-check    # Run TypeScript without emitting files
bun run pre-commit    # Run lint-staged tasks
```

Release helpers:

```bash
bun run commit
bun run release
bun run release:patch
bun run release:minor
bun run release:major
```

## Project Structure

```text
src/app/              App Router routes and route handlers
src/components/       Shared and feature-level React components
src/components/ui/    Local UI primitives
src/constants/        App routes, cookies, brand, fonts, and static constants
src/hooks/            Reusable React hooks
src/i18n/             next-intl routing and request config
src/lib/              Shared utilities and data helpers
src/messages/         Translation messages for en, ru, and kr
src/providers/        Root app providers
src/styles/           Tailwind CSS entrypoint and global styles
src/types/            Shared TypeScript types
src/env.ts            Typed environment schema
src/proxy.ts          Next.js proxy for auth and locale routing
```

## Environment Variables

Environment variables are defined and validated in `src/env.ts` with `@t3-oss/env-nextjs`.

The current schema only validates the shared `NODE_ENV` value:

```ts
NODE_ENV: 'development' | 'test' | 'production';
```

When adding a new variable:

1. Add it to `src/env.ts`.
2. Include it in `runtimeEnv` or `experimental__runtimeEnv`.
3. Import `env` from `@/env` instead of reading `process.env` directly.

`next.config.ts` imports `src/env.ts`, so environment validation runs during Next.js config loading and production builds.

## Styling

Tailwind CSS 4 is configured through `src/styles/globals.css`.

Important notes:

- `postcss.config.mjs` uses `@tailwindcss/postcss`.
- `.prettierrc` uses `tailwindStylesheet` and points to `src/styles/globals.css`.
- There is no `tailwind.config.js` or `tailwind.config.ts`; app-specific theme tokens and utilities live in CSS.
- `tw-animate-css` is imported from the global stylesheet.

## Internationalization

`next-intl` is configured in `src/i18n/routing.ts`.

Supported locales:

- `en`
- `ru`
- `kr`

Locale prefixes are always included in URLs, and the selected language is stored with the configured language cookie.

## Code Quality

This project uses:

- ESLint
- Prettier
- TypeScript strict mode
- Husky
- lint-staged
- commitlint
- Commitizen
- standard-version

Use `bun run commit` for an interactive Conventional Commits flow.

## Documentation Files

- `MAKE.md`: build and development workflow notes
- `CONTRIBUTING.md`: contribution guidelines
- `SECURITY.md`: security policy
- `LICENSE`: project license
- `VERSION`: current project version marker

## Deployment

Build the app before deploying:

```bash
bun run build
```

The project is compatible with Vercel and other Next.js hosting targets. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for platform-specific details.
