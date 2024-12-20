## NEXT KIT

This is a Next.js project bootstrapped with bun create next-app@latest.

## NOTE

Make sure you have [bun](https://bun.run) installed. You can install it with:

```bash
npm i -g bun
#or
check on [https://bun.sh/](https://bun.sh/)
```

## Installation

To install this project, run:

```bash
npm install
# or
bun add
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or

bun --bun run dev
```

## LOCAL DEVELOPMENT

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting and Formatting

To lint your code, you can use:

```bash
npm run lint
#or
bun  lint
```

To automatically fix linting errors, use:

```bash
npm run lint:fix
#or
bun  lint:fix
```

For strict linting, use:

```bash
npm run lint:strict
#or
bun  lint:strict
```

To format your code with Prettier, use:

```bash
npm run prettier
#or
bun  prettier
```

## Git Hooks

This project uses Husky to manage Git hooks. You can set up Husky by running:

```bash
npm run prepare
#or
bun  prepare
```

## Testing

Currently, there are no tests specified. You can run the test script to confirm:

```bash
npm run test
#or
bun  test
```

## ENVIRONMENTS

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Next.js](https://nextjs.org/)

# **Commitizen, Standard Version, and Workflow Documentation**

This project is configured with **Commitizen** for standardized commit messages and **Standard Version** for automated versioning and changelog generation.

---

## COMMITIZEN

To use Commitizen, run the following command:

```bash
npm run commit
#or
bun run commit
```

## STANDARD VERSION

To use Standard Version, run the following command:

```bash
bun run release
#or
bun run release:dev # for development
#or
bun run release:prod # for production
```

## WORKFLOW

This project is configured with a GitHub workflow to automatically update the changelog and version when a new release is created.

The workflow is configured to run on the `push` event to the `main` branch.
The workflow will automatically update the changelog and version when a new release is created.

```bash
bun run push
#or
bun run push:dev # for development
```

## VERSIONING

The project is versioned using [standard-version](https://github.com/conventional-changelog/standard-version).

## CHANGELOG

The changelog is generated using [standard-version](https://github.com/conventional-changelog/standard-version) and [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog).

The changelog is stored in the `CHANGELOG.md` file.

The changelog is generated automatically when a new release is created.

## Gitlab ACTIONS

The project is configured with Gitlab Actions to automatically update the changelog and version when a new release is created.

## NOTICE

```bash
The project is configured with Gitlab Actions to automatically update the changelog and version when a new release is created.
```

---

## COMMONLY USED LIBRARIES

- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://react-query.tanstack.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://github.com/typicode/husky)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Next Intl](https://github.com/vercel/next.js/tree/canary/packages/next-intl)
- [Bun](https://bun.run/)
- [Jest](https://jestjs.io/)
- [Tanstack Query Client](https://tanstack.com/query/v4)

## **License**

This project is licensed under the [MIT License](LICENSE).
