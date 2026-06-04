# Next JS Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and using [Bun](https://bun.sh/) as the JavaScript runtime.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Code Quality and Standards

This project uses the following tools to ensure code quality and consistency:

### Linting and Formatting

- **ESLint**: For code linting
- **Prettier**: For code formatting

Run the following commands:

```bash
# Lint code
bun run lint

# Format code
bun run format

# Check formatting without making changes
bun run format:check

# Type checking
bun run type-check
```

### Git Hooks and Commit Standards

This project uses:

- **Husky**: For Git hooks
- **lint-staged**: For running linters on staged files
- **commitlint**: For enforcing commit message conventions
- **Commitizen**: For standardized commit messages
- **Standard Version**: For automated versioning and changelog generation

### Commit Process

To create a standardized commit, use:

```bash
bun run commit
```

This will launch an interactive prompt to help you create a properly formatted commit message.

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:

- `feat`: A new feature
- `improve`: Improvements to existing features
- `fix`: A bug fix
- `deploy`: Deployment changes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Build system or dependency changes
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverting previous changes
- `merge`: Merging branches

Example: `feat: add user authentication`

### Versioning

This project uses semantic versioning. To create a new version:

```bash
# Automatic versioning based on commits
bun run release

# Specific version bumps
bun run release:patch  # 0.0.x
bun run release:minor  # 0.x.0
bun run release:major  # x.0.0
```

This will:

1. Update the version in package.json
2. Update the VERSION file
3. Generate/update the CHANGELOG.md file
4. Create a git tag
5. Create a version commit

## Project Documentation

This project includes several documentation files:

### `MAKE.md`

Contains build and development instructions, including:

- Prerequisites and dependencies
- Installation steps
- Development workflow
- Production build process
- Testing procedures
- Project structure overview
- Environment variables
- Deployment information

### `CONTRIBUTING.md`

Guidelines for contributing to the project, including:

- Code of conduct
- Contribution process
- Development guidelines and standards
- Pull request process
- Testing requirements
- Bug reporting guidelines
- Feature request guidelines

### `LICENSE`

MIT License for the project, which allows for:

- Free use, modification, and distribution
- Limited liability protection
- Requirements to include the license notice

### `SECURITY.md`

Security policy for the project, including:

- Supported versions
- Vulnerability reporting process
- Security best practices
- Update procedures

## Configuration Files

This project includes several configuration files for development and versioning:

### `.czrc`

Configures Commitizen to use the conventional changelog adapter. This enables the interactive commit prompt.

### `.versionrc`

Configures Standard Version for changelog generation and versioning. It defines:

- Which commit types appear in which changelog sections
- URL formats for commits, comparisons, and issues
- Release commit message format

### `commitlint.config.js`

Defines rules for commit message validation, including:

- Required format and structure
- Allowed types and their descriptions
- Interactive prompt configuration

### `.husky/`

Contains Git hooks:

- `pre-commit`: Runs linting and formatting on staged files before commits
- `commit-msg`: Validates commit messages against commitlint rules

### `bunfig.toml`

Configures Bun behavior for the project, including:

- Installation settings
- Cache directory
- Test coverage
- Debug options

### `.npmrc`

Configures npm/Bun package management behavior:

- `save-exact=true`: Saves exact versions of dependencies
- `engine-strict=true`: Enforces Node.js version requirements
- `legacy-peer-deps=false`: Uses modern peer dependency resolution
- `node-linker=hoisted`: Controls how dependencies are linked

### `VERSION`

Stores the current project version as a simple text file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
