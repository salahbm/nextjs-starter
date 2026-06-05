# Architecture Notes

## Application Shape

This project is a Next.js App Router starter. Routes are grouped by locale under `src/app/[locale]`, with protected and auth route groups separated by folder.

## Runtime Boundaries

- `src/proxy.ts` handles locale-aware auth redirects before requests reach pages.
- `src/env.ts` is the only place that should read from `process.env`.
- `src/instrumentation.ts` registers Sentry for server and edge runtimes.

## Styling

Tailwind CSS 4 is configured through `src/styles/globals.css`. Theme tokens, custom utilities, and the `tw-animate-css` import live there. There is intentionally no Tailwind JavaScript config file.

## Production Checks

GitHub Actions run formatting, linting, type-checking, unit tests, production build, Playwright smoke tests, dependency review, CodeQL, and Lighthouse CI.

## Adding New Environment Variables

Add variables to `src/env.ts`, mirror public values in `experimental__runtimeEnv`, and use `env` imports throughout the app. Do not read `process.env` directly in components or business logic.
