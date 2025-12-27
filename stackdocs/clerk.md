# Clerk Documentation

> Source: Context7 - /clerk/clerk-docs
> Last Updated: December 2025

## Installation

### Next.js with shadcn/ui CLI (Recommended)

```bash
npx shadcn@latest add @clerk/nextjs-quickstart
```

### React with Vite

```bash
npm create vite@latest clerk-react -- --template react-ts
cd clerk-react
npm install
npm run dev
```

### Remix

```bash
npm install @clerk/remix
```

### Astro

```bash
npm create astro@latest clerk-astro --template react-ts
cd clerk-astro
npm install
npm run dev
```

### TanStack React Start

```bash
npm install @clerk/tanstack-react-start
```

### Fastify

```bash
npm install @clerk/fastify
```

### Vue with Vite

```bash
npm create vite@latest clerk-vue -- --template vue-ts
cd clerk-vue
npm install
npm run dev
```

### Nuxt

```bash
npm create nuxt@latest clerk-nuxt --template react-ts
cd clerk-nuxt
npm install
npm run dev
```

### JavaScript Frontend

```bash
npm create vite@latest clerk-javascript
cd clerk-javascript
npm install
npm run dev
```

## Basic HTML Setup

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

## Environment Variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

## Key Features

- **Prebuilt UI Components**: SignIn, SignUp, UserButton, UserProfile
- **React Hooks**: useUser, useAuth, useClerk, useSession
- **Middleware**: Protect routes with authentication
- **Organizations**: Multi-tenant support
- **OAuth Providers**: Google, GitHub, Microsoft, etc.
- **MFA**: Multi-factor authentication
- **Session Management**: Active sessions control
- **Webhooks**: Sync user data
- **SDK Support**: React, Next.js, Remix, Vue, Nuxt, Astro, Node.js
