## EXPORUM

This is a Next.js project bootstrapped with bun create next-app@latest.

## Installation

To install this project, run:

```bash
bun install
```

## Getting Started

First, run the development server:

```bash
bun --bun run dev
#or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

The following scripts are available:

```bash
bun --bun run dev      # Start development server
bun run build      # Build the production application
bun run start      # Start production server on port 4000
bun run format     # Format code with Prettier
bun run lint       # Run ESLint
bun run rules      # Fix ESLint issues
bun run prepare    # Setup Husky
bun run commit     # Commit using Commitizen
bun run release    # Create a new release
bun run release:dev # Create a new pre-release (alpha)
bun run push       # Add, commit, release and push to current branch
bun run push:dev   # Add, commit, pre-release and push to current branch
```

## Git Workflow

This project uses:

- Husky for Git hooks
- Commitizen for standardized commit messages
- Standard Version for release management
- Conventional Changelog for generating changelogs

## Development Tools

- [Node.js](https://nodejs.org/en/)
- [Bun](https://bun.sh/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Core Libraries

### UI Components and Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCn UI](https://ui.shadcn.com/) - UI component library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide React](https://lucide.dev/) - Icon set
- [FullCalendar](https://fullcalendar.io/) - Calendar component
- [Embla Carousel](https://www.embla-carousel.com/) - Carousel component
- [Vaul](https://vaul.emilkowal.ski/) - Drawer component

### State Management and Data Fetching

- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Development and Tools

- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://github.com/typicode/husky) - Git hooks
- [Commitizen](https://commitizen.github.io/cz-cli/) - Commit conventions
- [Standard Version](https://github.com/conventional-changelog/standard-version) - Version management

### Internationalization

- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) - Country codes and names

### Charts and Data Visualization

- [Recharts](https://recharts.org/) - Composable charting library

### Additional Features

- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Sendbird UIKit](https://sendbird.com/) - Chat functionality
