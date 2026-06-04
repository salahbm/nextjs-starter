# Build and Development Guide

This document provides instructions for building, testing, and developing the Next JS Starter application.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/salahbm/nextjs-starter.git
cd nextjs-starter
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Testing

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

## Project Structure

The project follows a specific structure as outlined in the project guidelines:

- Pages live under `app/[locale]/...`
- View components are in `components/views/...`
- Shared components are in `components/shared/...`
- Utilities are in `utils/...`

For more detailed information about the project structure and coding standards, please refer to the CONTRIBUTING.md file.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables as needed
```

## Deployment

The application can be deployed to various platforms that support Next.js applications, such as Vercel, Netlify, or a custom server.

For detailed deployment instructions, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
