# MicroSaaS Stack V2.1 — Definitive Guide (December 2025)

> **Purpose**: One winner per category. No alternatives. Optimized for Claude Code to generate consistent, production-ready SaaS applications with minimal hallucinations.

---

## 🎯 Philosophy

1. **Use the most popular stack** — More training data = fewer hallucinations
2. **Drop T3** — `create-next-app` is cleaner for AI agents (no tRPC opinions)
3. **CLAUDE.md is the source of truth** — Configure your stack, prevent bad imports
4. **One winner per category** — No decision paralysis for Claude

---

## 🏆 The Stack At A Glance

| Category | Winner | Why |
|----------|--------|-----|
| **Framework** | Next.js 16 (App Router) | Industry standard, Turbopack default, massive training data |
| **Language** | TypeScript 5.x (strict) | Full-stack type safety |
| **UI Framework** | Tailwind CSS v4 | 5x faster builds, CSS-first config |
| **Components** | shadcn/ui | Copy-paste, Radix primitives, full control |
| **Auth** | Clerk | 5-min setup, pre-built UI, organizations built-in |
| **Database** | Neon | Serverless Postgres, scale-to-zero, $1B validation |
| **ORM** | Prisma 6.x | Best DX, mature ecosystem, Prisma Studio |
| **Vector DB** | pgvector (in Neon) | No extra service, same DB |
| **Payments** | Stripe | Industry standard, Checkout + Webhooks |
| **Billing (complex)** | Autumn (optional) | Usage-based pricing layer on Stripe |
| **Email** | Resend + React Email | Developer-first, modern DX |
| **Background Jobs** | Inngest | Event-driven, serverless, 100M+ daily executions |
| **Analytics** | PostHog | All-in-one: analytics, feature flags, replay |
| **Error Monitoring** | Sentry | Industry standard |
| **File Storage** | Uploadthing | Next.js native |
| **Deployment** | Vercel | Native Next.js platform |

### Auth Landscape Update (Dec 2025)

**Auth.js/NextAuth is now maintained by Better Auth team.** Our recommendation:
- **Clerk** (default) — Fastest DX, pre-built UI, most training data for Claude
- **Better Auth** (alternative) — Open source, self-hosted, data ownership

We use Clerk because it has more training data, reducing Claude Code hallucinations.

### Vercel Workflows Note

**Vercel Workflow (WDK) is in Beta** (Oct 2025). We stick with **Inngest** because:
- Battle-tested (100M+ daily executions)
- Explicit APIs (not magic directives) — easier for Claude to understand
- Endorsed by Vercel CEO

---

## 🚀 Quick Start (5 Minutes)

### 1. Create Next.js App

```bash
npx create-next-app@latest my-saas \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack
```

### 2. Install Stack

```bash
cd my-saas

# Core
npm install @clerk/nextjs stripe @stripe/stripe-js

# Database
npm install @prisma/client
npm install -D prisma

# Email
npm install resend @react-email/components

# Background Jobs
npm install inngest

# File Uploads
npm install uploadthing @uploadthing/react

# Analytics & Monitoring
npm install posthog-js @sentry/nextjs

# Utilities
npm install zod date-fns clsx tailwind-merge class-variance-authority
npm install -D @types/node
```

### 3. Initialize Prisma

```bash
npx prisma init --datasource-provider postgresql
```

### 4. Add shadcn/ui

```bash
npx shadcn@latest init

# Select: New York style, Neutral color, CSS variables: yes

# Add essential components
npx shadcn@latest add button card input dialog form label textarea select avatar dropdown-menu sheet toast
```

### 5. Copy CLAUDE.md

Copy the CLAUDE.md template to your project root. Customize the project name and description.

### 6. (Optional) Install Autumn for Usage-Based Billing

Only add if you need usage-based pricing (AI credits, metered billing):

```bash
npm install @useautumn/react
```

---

## 📁 Recommended Project Structure

```
my-saas/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   └── pricing/page.tsx
│   │   ├── api/
│   │   │   ├── stripe/webhook/route.ts
│   │   │   ├── inngest/route.ts
│   │   │   └── uploadthing/route.ts
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── layout/                # Header, Footer, Sidebar
│   │   └── [feature]/             # Feature components
│   ├── lib/
│   │   ├── db.ts                  # Prisma client
│   │   ├── stripe.ts              # Stripe client
│   │   ├── resend.ts              # Resend client
│   │   ├── inngest.ts             # Inngest client + functions
│   │   ├── uploadthing.ts         # Uploadthing config
│   │   └── utils.ts               # cn() helper
│   ├── actions/                   # Server Actions
│   └── emails/                    # React Email templates
├── prisma/
│   └── schema.prisma
├── public/
├── CLAUDE.md                      # Stack configuration for Claude Code
├── .env.local
├── .env.example
├── middleware.ts                  # Clerk middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔧 Essential Configuration Files

### prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  name      String?
  imageUrl  String?
  
  // Stripe
  stripeCustomerId       String?   @unique
  stripeSubscriptionId   String?   @unique
  stripePriceId          String?
  stripeCurrentPeriodEnd DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  projects  Project[]
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### src/lib/db.ts

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### src/lib/utils.ts

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### middleware.ts

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/stripe/webhook',
  '/api/inngest',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### src/lib/stripe.ts

```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})
```

### src/lib/resend.ts

```typescript
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

### src/lib/inngest.ts

```typescript
import { Inngest } from 'inngest'

export const inngest = new Inngest({ id: 'my-saas' })

// Example function
export const sendWelcomeEmail = inngest.createFunction(
  { id: 'send-welcome-email' },
  { event: 'user/created' },
  async ({ event, step }) => {
    const { userId, email } = event.data
    
    await step.run('send-email', async () => {
      // Use Resend
    })
    
    await step.sleep('wait-3-days', '3 days')
    
    await step.run('send-onboarding', async () => {
      // Send onboarding email
    })
  }
)
```

### src/app/api/inngest/route.ts

```typescript
import { serve } from 'inngest/next'
import { inngest, sendWelcomeEmail } from '@/lib/inngest'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendWelcomeEmail],
})
```

---

## 🔐 Environment Variables Template

Create `.env.example`:

```bash
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_MONTHLY="price_..."
STRIPE_PRICE_ID_YEARLY="price_..."

# Resend
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@yourdomain.com"

# Inngest
INNGEST_SIGNING_KEY="signkey-..."
INNGEST_EVENT_KEY="..."

# Uploadthing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Sentry
SENTRY_AUTH_TOKEN="..."
NEXT_PUBLIC_SENTRY_DSN="https://..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 📦 Complete package.json

```json
{
  "name": "my-saas",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.0.0",
    "@prisma/client": "^6.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-label": "^2.0.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.0",
    "@radix-ui/react-toast": "^1.0.0",
    "@react-email/components": "^0.0.30",
    "@sentry/nextjs": "^8.0.0",
    "@stripe/stripe-js": "^4.0.0",
    "@uploadthing/react": "^7.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^4.0.0",
    "inngest": "^3.0.0",
    "lucide-react": "^0.460.0",
    "next": "16.0.0",
    "posthog-js": "^1.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^4.0.0",
    "stripe": "^17.0.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss-animate": "^1.0.0",
    "uploadthing": "^7.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "16.0.0",
    "postcss": "^8.0.0",
    "prisma": "^6.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 🤖 How to Use with Claude Code

### Option 1: Copy CLAUDE.md to Project Root (Recommended)

1. **Download CLAUDE.md** from this guide
2. **Copy to your project root**:
   ```bash
   cp ~/Downloads/CLAUDE.md ./my-saas/CLAUDE.md
   ```
3. **Open terminal in project folder**
4. **Run Claude Code**:
   ```bash
   claude
   ```

Claude Code automatically reads `CLAUDE.md` from your project root and uses it as context for all code generation.

### Option 2: Use claude-config-composer (Optional, Advanced)

```bash
npx claude-config-composer nextjs-15 shadcn tailwindcss
```

This generates a `.claude/` directory with:
- Specialized agents for different tasks
- Slash commands
- Hooks for automation
- settings.json

### Verifying Claude Code is Using Your Config

When you start Claude Code, it should acknowledge the CLAUDE.md file. You can verify by asking:

```
What tech stack are you configured to use for this project?
```

Claude should respond with Next.js 16, Clerk, Prisma, Neon, Inngest, etc.

### Example Claude Code Prompts

With CLAUDE.md in place, you can give prompts like:

```
Add a new settings page where users can update their profile
```

```
Create a subscription checkout flow with monthly and yearly plans
```

```
Add a background job that sends a welcome email when a user signs up
```

```
Build a file upload feature for user avatars
```

Claude will use the correct packages (Clerk for auth, Prisma for DB, Stripe for payments, Inngest for jobs, Uploadthing for files) without you specifying them.

---

## ✅ Claude Code Checklist

Before asking Claude Code to generate features, verify:

1. ✅ CLAUDE.md is in project root
2. ✅ Using Next.js 16 with App Router (not Pages Router)
3. ✅ TypeScript in strict mode
4. ✅ Tailwind v4 + shadcn/ui for all components
5. ✅ Clerk for auth (not Auth.js, not Lucia, not Better Auth)
6. ✅ Neon for database (not Supabase, not PlanetScale)
7. ✅ Prisma for ORM (not Drizzle)
8. ✅ Stripe Checkout + Webhooks for payments
9. ✅ Resend + React Email for transactional emails
10. ✅ Inngest for background jobs/workflows (not Vercel Workflows)
11. ✅ Deploy to Vercel

---

## 🧠 Why This Stack Reduces Hallucinations

1. **Popularity = Training Data**: Next.js, Tailwind, Prisma, Stripe are the most documented technologies
2. **Explicit Bans**: CLAUDE.md's "DO NOT USE" list prevents Claude from suggesting deprecated/wrong packages
3. **One Winner Per Category**: No decision paralysis, consistent patterns
4. **Modern Patterns**: Server Components, Server Actions — matches Claude's training cutoff
5. **Type Safety**: TypeScript strict mode catches errors before runtime

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://docs.stripe.com)
- [Resend Docs](https://resend.com/docs)
- [Inngest Docs](https://www.inngest.com/docs)
- [Autumn Docs](https://docs.useautumn.com) (for usage-based billing)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📋 Files Included

1. **CLAUDE.md** — Drop this in your project root for Claude Code
2. **MICROSAAS-STACK-V2.md** — This documentation file

---

*Last Updated: December 2025 — Stack V2.1*
