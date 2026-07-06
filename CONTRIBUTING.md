# Contributing to Next JS Starter

Thank you for considering contributing to Next JS Starter! This document outlines the process and guidelines for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please be respectful and considerate of others.

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests and linting to ensure code quality
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Guidelines

### File Naming

- Use kebab-case for all files and folders.

### Pages (Next.js)

- Pages live under `app/[locale]/...`.
- Page file (`page.tsx`) contains ONLY:
  - SSR logic: metadata, headers, etc.
  - Data fetching
  - Passing data to a view component
- Never put UI code directly inside a page.
- Import and render the view from `components/views/...`.

### View Components

- Each view gets its own folder under `components/views/{view-name}/`.
- Export the main view from `index.tsx`.
- Place subcomponents in `components/views/{view-name}/components/`.

### Types

- For multiple types in a view, create `{view-name}.d.ts` in the same folder.

### Utils (Scoped)

- Place logic/helpers for a view in `components/views/{view-name}/utils/`.

### Shared (Scoped)

- If something is reused multiple times within a view, put it in `shared.ts` or `shared/` folder inside that view folder.

### Project-Wide Shared

- If reusable across the project:
  - Components → `components/shared/{name}/index.tsx`
  - Utils → `utils/{name}/` or `utils/{name}.ts`
  - Styles → `styles/{name}.css`
  - Types → `types/{name}.d.ts`
  - Constants → `constants/{name}.ts`

### Forms

- Use `components/shared/form-fields/index.ts` as a wrapper for all input, select, date pickers, file uploads, etc.
- Never use raw `<input>` directly in views unless unavoidable.

### Typography

- Always use classes from `styles/font.css` (`typo-header` … `typo-caption-2`).
- Avoid inline font styles unless absolutely unavoidable.
- All headings, labels, captions, and body text must use predefined classes.

### TypeScript

- Never use `any`.
- Use `unknown` if unavoidable.
- Prefer Zod for runtime validation.

### Imports/Exports

- Use absolute imports (`@/components/...`).
- Export from `index.ts` (barrel) for every folder.

### Code Quality

- Small, focused components.
- Strict ESLint/Prettier rules.
- Separate concerns: SSR (pages) vs CSR (views).

### Internationalization

- Use `next-intl` for all translations.
- Supported locales: `en` (default), `ru`, and `kr`.
- Translations live in `src/messages/{locale}.json`; add every new key to all locales.
- Use descriptive keys with dot-notation.

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate.
2. The PR should work for all supported environments.
3. PRs require approval from at least one maintainer before being merged.
4. Ensure all automated checks pass before requesting a review.

## Testing

- Write tests for new features and bug fixes.
- Ensure all tests pass before submitting a PR.
- Follow the existing testing patterns in the codebase.

## Reporting Bugs

When reporting bugs, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

## Feature Requests

Feature requests are welcome. Please provide:

- A clear and descriptive title
- Detailed description of the proposed feature
- Any relevant examples or mockups
- Explanation of why this feature would be useful

## Questions?

If you have any questions, please open an issue with the "question" label.
