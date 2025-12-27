# Next.js Documentation

> Source: Context7 - /vercel/next.js
> Last Updated: December 2025

## Installation

### Quick Start with create-next-app

```bash
npx create-next-app@latest
```

### Manual Installation

```bash
# npm
npm i next@latest react@latest react-dom@latest

# yarn
yarn add next@latest react@latest react-dom@latest

# pnpm
pnpm i next@latest react@latest react-dom@latest

# bun
bun add next@latest react@latest react-dom@latest
```

### With Defaults (TypeScript, Tailwind, ESLint, App Router, Turbopack)

```bash
bun create next-app@latest my-app --yes
cd my-app
bun dev
```

## Build Output

```bash
Route (app)
┌ ○ /_not-found
└ ƒ /products/[id]

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Testing with Playwright

### Quick Setup

```bash
npx create-next-app@latest --example with-playwright with-playwright-app
```

### Manual Installation

```bash
npm init playwright
# or
yarn create playwright
# or
pnpm create playwright
```

## Create from GitHub Example

```bash
npx create-next-app@latest --example "https://github.com/.../" [your-project-name]
```

## Key Features

- **App Router**: File-system based routing with React Server Components
- **Server Components**: Components render on the server by default
- **Static & Dynamic Rendering**: Automatic optimization
- **API Routes**: Build API endpoints
- **Middleware**: Run code before requests complete
- **Image Optimization**: Automatic image optimization
- **TypeScript**: Built-in TypeScript support
