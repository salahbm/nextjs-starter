# Production Tooling Guide

This document explains the extra production tooling used in this project: what each tool does, why it was added, and how to explain it during a review or handoff.

## Big Picture

The app working locally is only one part of being production-ready. A production project also needs guardrails that answer these questions:

- Will this change still build after it is merged?
- Did formatting, linting, or TypeScript break?
- Did a dependency introduce risk?
- Do key user flows still work in a browser?
- Can we see production errors after deployment?
- Can deployment platforms check whether the app is healthy?
- Can future developers understand the setup quickly?

The tools below were added to cover those areas.

## GitHub Actions

GitHub Actions runs automated workflows on GitHub.

In this project it runs CI checks such as formatting, linting, type-checking, tests, and production builds.

Why it matters:

- It catches broken code before merge.
- It proves the app can build in a clean environment.
- It gives reviewers confidence that a pull request is safe.
- It prevents relying only on one developer's local machine.

How to explain it:

> GitHub Actions is our automated quality gate. Every pull request has to prove that the app formats, lints, type-checks, tests, and builds before we trust it.

## Dependabot

Dependabot watches dependencies and opens update pull requests.

Why it matters:

- Packages receive bug fixes and security patches.
- Small weekly updates are easier than huge upgrades later.
- It keeps GitHub Actions versions updated too.

How to explain it:

> Dependabot keeps dependencies fresh by opening update PRs automatically, so maintenance does not pile up.

## Dependency Review

Dependency Review checks dependency changes in pull requests.

Why it matters:

- It flags vulnerable packages.
- It makes dependency changes visible during code review.
- It helps reduce supply-chain risk.

How to explain it:

> Dependency Review is a security check for package changes. If a PR adds or updates a risky dependency, GitHub can flag it before merge.

## CodeQL

CodeQL is GitHub's static security analysis tool.

Why it matters:

- It scans JavaScript and TypeScript for common security issues.
- It runs automatically on pull requests, pushes, and a schedule.
- It gives the project a baseline security scanner without manual effort.

How to explain it:

> CodeQL scans our code for security patterns that humans might miss during review.

## Vitest

Vitest is the unit and component test runner.

Use it for small, fast tests around components, hooks, utilities, and validation logic.

Why it matters:

- It gives fast feedback.
- It catches regressions close to the code.
- It is easier to debug than full browser tests.

How to explain it:

> Vitest tests small pieces of the app quickly. It is our fast feedback layer.

## React Testing Library

React Testing Library helps test React components by interacting with them like users would.

Why it matters:

- Tests focus on behavior instead of implementation details.
- Components can be refactored without rewriting every test.
- It encourages accessible UI queries such as roles and labels.

How to explain it:

> React Testing Library makes component tests more user-focused. We test what the user can see and do, not private internals.

## Playwright

Playwright runs end-to-end tests in a real browser.

In this project it checks that:

- protected routes redirect to sign-in
- the health endpoint returns `ok`

Why it matters:

- TypeScript can pass even when the real app flow is broken.
- Browser tests catch routing, rendering, redirects, cookies, and integration issues.
- It is ideal for critical flows like login, dashboard loading, forms, and payments.

How to explain it:

> Playwright tests the app like a real user in a browser. It catches integration bugs that unit tests cannot see.

## Lighthouse CI

Lighthouse CI audits pages for performance, accessibility, best practices, and SEO.

Why it matters:

- Production quality includes more than just "it compiles".
- Accessibility issues can be caught automatically.
- Performance regressions become visible during CI.

How to explain it:

> Lighthouse CI helps us watch performance and accessibility over time, so the app does not slowly get worse as features are added.

## Sentry

Sentry captures runtime errors from production.

This project initializes Sentry for:

- client runtime
- server runtime
- edge runtime

Why it matters:

- Users may hit bugs that developers never see locally.
- Sentry provides stack traces and runtime context.
- It helps debug production incidents faster.

How to explain it:

> Sentry tells us when real users hit errors in production, with enough context to debug them.

## Health Check Route

The `/api/health` route returns a simple JSON response:

```json
{
  "status": "ok"
}
```

Why it matters:

- Hosting platforms can check whether the app is alive.
- Uptime monitors can ping it.
- It is useful for Docker, Kubernetes, load balancers, and smoke tests.

How to explain it:

> The health endpoint is a simple heartbeat for deployments and monitoring.

## Security Headers

Security headers are configured in `next.config.ts`.

Examples include:

- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Content-Security-Policy`

Why it matters:

- They let the browser enforce extra safety rules.
- They reduce risks like clickjacking and MIME sniffing.
- They restrict unused browser APIs like camera, microphone, geolocation, and payment.

How to explain it:

> Security headers make the browser enforce safer defaults for our app.

## t3-env

`@t3-oss/env-nextjs` validates environment variables with Zod.

Why it matters:

- Raw `process.env` values are usually just `string | undefined`.
- Invalid or missing env values can break production.
- Typed env access gives better autocomplete and safer deploys.

How to explain it:

> t3-env makes environment variables typed and validated, so configuration problems fail early instead of becoming runtime surprises.

## `.env.example`

`.env.example` documents expected environment variables without committing real secrets.

Why it matters:

- New developers know what to configure.
- Deployment requirements are visible.
- Real secret values stay out of Git.

How to explain it:

> `.env.example` is the safe template for local and deployment configuration.

## Docker

The Dockerfile packages the app into a container.

Why it matters:

- The app can run outside Vercel.
- Runtime is consistent across machines and servers.
- It helps with VPS, Kubernetes, internal platforms, and container-based hosting.

How to explain it:

> Docker makes the app portable. If we do not deploy on Vercel, we still have a standard way to run it.

## Bundle Analysis

`bun run build:analyze` uses Next.js 16's Turbopack analyzer.

Why it matters:

- JavaScript bundle size affects load time.
- Large dependencies can sneak into client bundles.
- The analyzer helps identify what is making pages heavy.

How to explain it:

> Bundle analysis helps us see what JavaScript we ship to users and catch size regressions.

## Ladle

Ladle is a UI component workshop, similar to a lighter Storybook.

Why it matters:

- UI primitives can be developed outside the full app.
- Designers and developers can review component states.
- It provides a place for visual examples of buttons, inputs, dialogs, and other shared UI.

How to explain it:

> Ladle gives us a small UI playground for shared components, so we can develop and review them in isolation.

## robots.txt and sitemap.xml

The app generates `robots.txt` and `sitemap.xml` through Next.js metadata routes.

Why it matters:

- Search crawlers understand what can be indexed.
- Public pages get a standard SEO baseline.
- Even if this is an admin starter, these routes are common production defaults.

How to explain it:

> robots and sitemap are standard production metadata for crawlers and SEO readiness.

## Node and Bun Version Pinning

The project pins runtime expectations through `.nvmrc`, `packageManager`, and `engines`.

Why it matters:

- Different runtime versions can behave differently.
- CI, local development, and deployments should use predictable versions.
- Next.js 16 requires modern Node versions.

How to explain it:

> Version pinning keeps local machines, CI, and deployment closer to the same runtime environment.

## Documentation

The README and `docs/architecture.md` explain how the project is organized.

Why it matters:

- Future developers can onboard faster.
- Decisions are easier to review.
- Production projects need maintainability, not only code.

How to explain it:

> Documentation reduces hidden knowledge. It helps future maintainers understand why the project is set up this way.

## Short Summary

If someone asks why we added all of this, say:

> We added production guardrails. CI proves the app still formats, lints, type-checks, tests, and builds. Security workflows watch code and dependencies. Sentry and health checks help after deploy. Playwright, Vitest, Lighthouse, and bundle analysis catch regressions from different angles. Docker, env docs, and architecture docs make deployment and onboarding easier.
