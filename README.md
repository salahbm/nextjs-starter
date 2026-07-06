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
- [Nuqs](https://nuqs.47ng.com/) for URL state management
- [Sentry](https://sentry.io/) instrumentation
- [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/), [Ladle](https://ladle.dev/), and [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

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
bun run build:analyze # Generate Turbopack bundle analysis files
bun run start         # Start the production server
bun run lint          # Run ESLint with auto-fix
bun run lint:check    # Run ESLint without auto-fix
bun run format        # Format files with Prettier
bun run format:check  # Check formatting
bun run test          # Run unit/component tests
bun run test:watch    # Run unit/component tests in watch mode
bun run test:e2e      # Run Playwright smoke tests
bun run test:e2e:ui   # Run Playwright UI mode
bun run ui            # Start Ladle for UI stories
bun run ui:build      # Build Ladle stories
bun run lhci          # Run Lighthouse CI against production server
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
src/instrumentation.ts Sentry runtime instrumentation
src/proxy.ts          Next.js proxy for auth and locale routing
tests/e2e/            Playwright smoke tests
docs/                 Architecture and production notes
```

## Environment Variables

Environment variables are defined and validated in `src/env.ts` with `@t3-oss/env-nextjs`.

Copy `.env.example` when you need local runtime values:

```bash
cp .env.example .env.local
```

When adding a new variable:

1. Add it to `src/env.ts`.
2. Include it in `runtimeEnv` or `experimental__runtimeEnv`.
3. Import `env` from `@/env` instead of reading `process.env` directly.

`next.config.ts` imports `src/env.ts`, so environment validation runs during Next.js config loading and production builds.

Current env keys:

```text
NODE_ENV
NEXT_PUBLIC_SITE_URL
SENTRY_DSN
NEXT_PUBLIC_SENTRY_DSN
SENTRY_ORG
SENTRY_PROJECT
SENTRY_AUTH_TOKEN
```

## Styling

Tailwind CSS 4 is configured through `src/styles/globals.css`.

Important notes:

- `postcss.config.mjs` uses `@tailwindcss/postcss`.
- `.prettierrc` uses `tailwindStylesheet` and points to `src/styles/globals.css`.
- There is no `tailwind.config.js` or `tailwind.config.ts`; app-specific theme tokens and utilities live in CSS.
- `tw-animate-css` is imported from the global stylesheet.

## Testing

Unit and component tests use Vitest with React Testing Library.

```bash
bun run test
```

E2E smoke tests use Playwright. Install the Chromium browser once on a local machine:

```bash
bunx playwright install chromium
bun run test:e2e
```

UI primitive stories use Ladle:

```bash
bun run ui
```

Lighthouse CI audits the localized sign-in page against a production server:

```bash
bun run build
bun run lhci
```

Bundle analysis uses Next.js 16's Turbopack analyzer:

```bash
bun run build:analyze
```

The analysis output is written to `.next/diagnostics/analyze`.

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
- GitHub Actions CI
- Dependabot
- Dependency Review
- CodeQL

Use `bun run commit` for an interactive Conventional Commits flow.

## GitHub Automation

The repository includes:

- `.github/workflows/ci.yml`: format, lint, type-check, unit tests, build, Playwright, and Lighthouse
- `.github/workflows/codeql.yml`: scheduled and PR CodeQL analysis
- `.github/workflows/dependency-review.yml`: dependency review on pull requests
- `.github/workflows/preview.yml`: optional Vercel preview deployments when Vercel secrets are configured
- `.github/workflows/release.yml`: manual standard-version release workflow
- `.github/dependabot.yml`: weekly dependency and GitHub Actions updates

For Vercel preview deployments, configure these repository secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

For Sentry release uploads, configure:

```text
SENTRY_AUTH_TOKEN
SENTRY_ORG
SENTRY_PROJECT
```

## Observability and Health

- Sentry is initialized through `src/instrumentation-client.ts` (browser), `sentry.server.config.ts`, `sentry.edge.config.ts`, and `src/instrumentation.ts`.
- `/api/health` returns a simple JSON health response for runtime checks.
- `robots.txt` and `sitemap.xml` are generated through App Router metadata routes.
- Security headers are configured in `next.config.ts`.

## Documentation Files

- `MAKE.md`: build and development workflow notes
- `CONTRIBUTING.md`: contribution guidelines
- `docs/architecture.md`: architecture notes and runtime boundaries
- `docs/production-tooling.md`: explanation of production tooling choices
- `SECURITY.md`: security policy
- `LICENSE`: project license
- `VERSION`: current project version marker

## Deployment

Build the app before deploying:

```bash
bun run build
```

The project is compatible with Vercel and other Next.js hosting targets. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for platform-specific details.

Docker support is included for non-Vercel deployments:

```bash
docker build -t nextjs-starter .
docker run -p 3000:3000 nextjs-starter
```
