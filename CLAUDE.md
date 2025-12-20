# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**ToolSchool** is an AI creator platform — "Product Hunt meets Behance" for the AI generation. A curated ecosystem where makers discover AI tools, showcase their AI-powered creations, and connect with fellow innovators.

### Vision
Become the go-to destination for anyone creating with AI, from curious beginners to seasoned digital artists, by providing comprehensive tool discovery, inspiring community showcases, educational resources, and a thriving maker community.

### Core Value Propositions
1. **Curated Tool Discovery** - Quality over quantity, with detailed use cases and difficulty ratings
2. **Community Showcase** - Beautiful galleries organized by medium (websites, images, videos, music)
3. **Maker Profiles** - Featured creator profiles highlighting expertise and creations
4. **Educational Content** - News, tutorials, and insights on AI creative techniques

### Target Audiences
- **AI-Curious Creatives (40%)** - Traditional artists exploring AI, designers augmenting their workflow
- **Digital Entrepreneurs (30%)** - Solopreneurs using AI for content/products, small agencies
- **AI Enthusiasts (20%)** - Early adopters, community contributors, technical creators
- **Educators & Students (10%)** - Teachers incorporating AI, students learning digital creation

---

## Tech Stack (MANDATORY — Do Not Deviate)

### Core Framework
| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 15.x | App Router ONLY (no Pages Router) |
| React | 19.x | Server Components by default |
| TypeScript | 5.x | Strict mode enabled |
| Node.js | 22.x LTS | Runtime |

### CMS (Headless)
| Technology | Version | Notes |
|------------|---------|-------|
| Payload CMS | 3.x | Headless CMS on Cloudflare Workers |
| Cloudflare D1 | Latest | Serverless SQLite with global read replicas |
| Cloudflare R2 | Latest | Object storage for media (zero egress fees) |

> **Deployment**: Using Cloudflare Workers with OpenNext adapter. See `CFpayload/` folder for complete documentation.

### UI Layer
| Technology | Version | Notes |
|------------|---------|-------|
| Tailwind CSS | 4.x | CSS-first configuration |
| shadcn/ui | Latest | Copy-paste components, Radix primitives |
| Lucide React | Latest | Icon library |

### Authentication
| Technology | Version | Notes |
|------------|---------|-------|
| Clerk | Latest | Use @clerk/nextjs. Pre-built components |

### Payments
| Technology | Version | Notes |
|------------|---------|-------|
| Stripe | Latest | Checkout + Webhooks pattern |

### Email
| Technology | Version | Notes |
|------------|---------|-------|
| Resend | Latest | Transactional emails |
| React Email | Latest | Email templates as React components |

### Background Jobs
| Technology | Version | Notes |
|------------|---------|-------|
| Inngest | Latest | Event-driven, serverless workflows |

### Analytics & Monitoring
| Technology | Version | Notes |
|------------|---------|-------|
| PostHog | Latest | Analytics + feature flags + session replay |
| Sentry | Latest | Error monitoring |

### File Storage
| Technology | Version | Notes |
|------------|---------|-------|
| Cloudflare R2 | Latest | S3-compatible, zero egress fees |

### Deployment
| Technology | Notes |
|------------|-------|
| Cloudflare Workers | Edge deployment via OpenNext adapter |
| Cloudflare Pages | Static assets via Workers Assets |

---

## Data Models (Payload Collections)

### 1. Tools (AI Tools Directory)
Primary content type for the AI tools catalog.

**Core Fields:**
- `title` (text, required) - Tool name
- `slug` (text, unique) - URL-friendly identifier
- `tagline` (text, max 120 chars) - One-liner description
- `content` (richText) - Full description
- `excerpt` (textarea) - Short summary
- `logo` (upload) - Tool logo (min 200x200px)
- `website` (text, url) - Official website
- `featured` (checkbox) - Featured in discovery listings

**Pricing & Difficulty:**
- `pricingModel` (select: free, freemium, paid, custom)
- `pricingSummary` (text) - Quick pricing overview
- `difficulty` (select: beginner, intermediate, advanced)

**Capabilities:**
- `useCases` (select, multiple: writing, images, video, audio, code, design, data, automation, education, business)
- `platforms` (select, multiple: web, ios, android, mac, windows, api, plugin)
- `keyFeatures` (array) - Repeater with icon, title, description

**Stats:**
- `stats` (group) - Users count, rating, company, launch year

**Taxonomies:**
- `toolCategory` - Categories: Text, Image, Video, Audio, Code, 3D, Design, Web
- `creationType` - What users can create
- `userSituation` - Target user personas

### 2. Makers (Creator Profiles)
Profiles for AI creators and artists.

**Core Fields:**
- `title` (text) - Maker name
- `slug` (text, unique)
- `bio` (textarea) - Biography
- `content` (richText) - Full profile description
- `location` (text) - City, Country
- `profileImage` (upload) - Profile photo
- `backgroundImage` (upload) - Cover image
- `website` (text, url) - Personal website

**Professional Info:**
- `experienceLevel` (select: beginner, intermediate, advanced, expert)
- `toolsExpertise` (select, multiple) - AI tools they use
- `availability` (select: available, selective, unavailable, open-source-only)
- `socialLinks` (array) - Platform + URL pairs

**Featured Settings:**
- `featured` (checkbox) - Feature in homepage slider
- `featuredPosition` (number, 1-10) - Position in slider

**Taxonomies:**
- `makerSpecialty` - Specialties: Music, Generative Art, Fashion, Image Generation, Botanical, etc.

### 3. Projects (Community Showcase)
AI-powered creative projects showcase.

**Core Fields:**
- `title` (text) - Project name
- `slug` (text, unique)
- `content` (richText) - Project description
- `excerpt` (textarea) - Short summary
- `featuredImage` (upload) - Main project image
- `heroBackground` (upload) - Hero banner image

**Project Details:**
- `projectYear` (number) - Year created
- `projectAuthor` (text) - Creator name
- `projectUrl` (text, url) - Live project URL
- `demoUrl` (text, url) - Demo link
- `githubUrl` (text, url) - Repository
- `workflow` (textarea) - Creation process description
- `difficulty` (select: beginner, intermediate, advanced, expert)
- `timeSpent` (text) - Duration to create
- `toolsUsed` (array) - Tool name, category, URL, usage description

**Media & Stats:**
- `views` (number) - View count
- `duration` (text) - For audio/video (e.g., "2:39")
- `genre` (text) - Style/genre
- `audioFile` (upload) - Audio attachment
- `videoFile` (upload) - Video attachment
- `mediaGallery` (upload, multiple) - Additional images
- `socialLinks` (array) - Platform + URL pairs

**Featured Settings:**
- `featuredInHero` (checkbox) - Feature in homepage hero
- `featuredInShowcase` (checkbox) - Feature in showcase section

**Taxonomies:**
- `communityType` - Categories: websites, images, videos, music

### 4. Posts (News/Articles)
News and educational content.

**Fields:**
- `title` (text)
- `slug` (text, unique)
- `content` (richText)
- `excerpt` (textarea)
- `featuredImage` (upload)
- `categoryBadge` (select: TRENDING, BREAKING, NEW RELEASE, ANALYSIS, INDUSTRY, POLICY, RESEARCH, TUTORIAL)
- `publicationDateOverride` (date) - Custom publish date

**Taxonomies:**
- `newsCategory`

### 5. Examples (Templates/Tutorials)
Step-by-step AI creation examples.

**Core Fields:**
- `title` (text)
- `slug` (text, unique)
- `tagline` (text, max 120 chars)
- `content` (richText)
- `difficultyLevel` (select: beginner, intermediate, advanced)
- `timeToCreate` (select: 5-minutes, 10-minutes, 30-minutes, 1-hour, etc.)
- `costRange` (select: free, under-10, 10-25, 25-50, 50-100, over-100)

**Creator & Process:**
- `creatorInfo` (group) - Name, title, website
- `toolsUsed` (array) - Tool name + purpose
- `stepByStep` (array) - Step number, title, description
- `promptsUsed` (array) - Tool + prompt text

**Results:**
- `beforeAfter` (group) - Before/after images
- `keyOutcomes` (array) - Outcome + metric
- `lessonsLearned` (textarea)

**Resources:**
- `downloadFiles` (array) - Name, file, description
- `helpfulLinks` (array) - Title, URL, description

**Taxonomies:**
- `creationType`
- `exampleDifficulty`

---

## Taxonomy Collections

### Tool Categories
Categories for tools: Text, Image, Video, Audio, Code, 3D, Design, Web

### Creation Types
What users can create, with rich metadata:
- `icon` (emoji)
- `color` / `gradientColor` (color pickers)
- `tagline` (text)
- `description` (textarea)
- `featuredImage` (upload)
- `examplePrompts` (array) - Prompt + featured flag
- `stats` (group) - Tools count, difficulty, popularity

### User Situations
Target personas with rich profile data:
- `icon` (emoji)
- `color` / `accentColor` (color pickers)
- `tagline` (text)
- `description` (textarea)
- `avatar` (upload)
- `painPoints` (array) - Title + severity
- `goals` (array) - Title + priority
- `stats` (group) - Experience level, budget range, time availability

### Maker Specialties
Expertise areas: Music, Generative Art, Fashion, Image Generation, Botanical, etc.

### Community Types
Project categories: websites, images, videos, music

### News Categories
Article categories: TRENDING, BREAKING, NEW RELEASE, ANALYSIS, etc.

---

## API Architecture

All data is fetched through Next.js API routes for security and caching.

### Available API Endpoints
- `/api/tools` - List tools with pagination and filtering
- `/api/tools/[slug]` - Get single tool
- `/api/tools/categories` - Get tool categories
- `/api/makers` - List makers with pagination
- `/api/makers/featured` - Get featured makers
- `/api/projects` - List projects
- `/api/projects/hero` - Get hero project
- `/api/posts` - List posts/news
- `/api/search` - Unified search across all content types
- `/api/home` - Consolidated home page data
- `/api/revalidate` - Webhook for cache invalidation

### API Response Format
```typescript
// Success
{
  "data": {...},
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "hasMore": true
  }
}

// Error
{
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND"
  }
}
```

---

## CRITICAL DESIGN RULES

### NO FULL-WIDTH SECTIONS (ABSOLUTE RULE)
**NOTHING in this project should ever be full width. No section will ever go full width.**

❌ **NEVER DO THIS:**
```tsx
<section className="w-full bg-white">
  <div className="max-w-[1440px] mx-auto px-12">
    {/* content */}
  </div>
</section>
```

✅ **ALWAYS DO THIS:**
```tsx
<section className="max-w-[1440px] mx-auto px-12 bg-white">
  {/* content */}
</section>
```

- ALL sections must be constrained to `max-w-[1440px]`
- Horizontal padding: `px-12` (48px on each side)
- Effective content width: 1440px - 96px = 1344px
- Background colors applied to the constrained section, not a wrapper
- Use `rounded-lg` for sections with background colors when appropriate

### NO ROUNDED EDGES ON IMAGES (ABSOLUTE RULE)
**NEVER add rounded corners to any images in this project. All images must have sharp corners.**
- ❌ NEVER use `rounded-lg`, `rounded-md`, `rounded` on images
- ✅ Images should always have sharp, square corners
- This applies to ALL images: hero, thumbnails, gallery, profile pictures, etc.

---

## Project Structure

```
.
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth routes (Clerk)
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   ├── (dashboard)/              # Protected routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (marketing)/              # Public routes
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── tools/                # Tools directory
│   │   │   ├── makers/               # Maker profiles
│   │   │   ├── projects/             # Project showcase
│   │   │   └── news/                 # News/articles
│   │   ├── api/                      # API routes
│   │   │   ├── tools/
│   │   │   ├── makers/
│   │   │   ├── projects/
│   │   │   ├── posts/
│   │   │   ├── search/
│   │   │   ├── revalidate/
│   │   │   ├── stripe/webhook/
│   │   │   └── inngest/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── tools/                    # Tool-related components
│   │   ├── makers/                   # Maker components
│   │   ├── projects/                 # Project components
│   │   └── search/                   # Search modal
│   ├── lib/
│   │   ├── payload.ts                # Payload client
│   │   ├── stripe.ts
│   │   ├── resend.ts
│   │   └── inngest.ts
│   ├── actions/                      # Server Actions
│   ├── hooks/                        # Custom React hooks
│   └── emails/                       # React Email templates
├── payload/
│   ├── collections/                  # Payload collections
│   │   ├── Tools.ts
│   │   ├── Makers.ts
│   │   ├── Projects.ts
│   │   ├── Posts.ts
│   │   ├── Examples.ts
│   │   └── taxonomies/
│   │       ├── ToolCategories.ts
│   │       ├── CreationTypes.ts
│   │       ├── UserSituations.ts
│   │       ├── MakerSpecialties.ts
│   │       ├── CommunityTypes.ts
│   │       └── NewsCategories.ts
│   ├── globals/                      # Site settings
│   └── payload.config.ts
├── public/
├── .env.local
├── middleware.ts                     # Clerk middleware
├── next.config.ts
├── tailwind.config.ts
└── CLAUDE.md
```

---

## Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # ESLint
npm run type-check       # TypeScript check

# Payload CMS
npm run payload          # Start Payload admin
npm run generate:types   # Generate TypeScript types from Payload

# shadcn/ui
npx shadcn@latest add [component]  # Add component

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:e2e         # Playwright E2E tests
```

---

## Code Style Conventions

### Imports (Order)
```typescript
// 1. React/Next.js
import { Suspense } from 'react'
import { redirect } from 'next/navigation'

// 2. Third-party libraries
import { auth } from '@clerk/nextjs/server'
import { getPayload } from 'payload'

// 3. Local imports (absolute paths)
import { Button } from '@/components/ui/button'
import { ToolCard } from '@/components/tools/tool-card'

// 4. Types
import type { Tool } from '@/payload-types'
```

### Components
- Use functional components with arrow functions
- Server Components by default, add `'use client'` only when needed
- Destructure props inline
- Co-locate types with components

```typescript
// ✅ Correct
export function ToolCard({ tool, onEdit }: { tool: Tool; onEdit: () => void }) {
  return <div>...</div>
}

// ❌ Wrong - Don't use React.FC
const ToolCard: React.FC<Props> = ({ tool }) => { ... }
```

### Naming
- **Files**: `kebab-case.tsx` for components, `camelCase.ts` for utilities
- **Components**: `PascalCase`
- **Functions/Variables**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

---

## Search Implementation

Search uses custom scoring algorithm for relevance with Fuse.js for fuzzy matching.

**Features:**
- Multi-field fuzzy matching with typo tolerance
- Keyboard shortcuts: `/` or `Cmd+K` to open
- Searches across tools, makers, projects, posts
- Renders via React Portal
- Custom relevance scoring based on field type

---

## Caching Strategy

- Next.js cache tags: `all-tools`, `tool-${slug}`, `all-makers`, etc.
- Webhook endpoint: `/api/revalidate` for CMS updates
- React Query for client-side state (where needed)

---

## Environment Variables

```bash
# Payload
PAYLOAD_SECRET="..."

# Note: D1 and R2 are configured via wrangler.jsonc bindings, not env vars

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Stripe
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend
RESEND_API_KEY="re_..."

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Inngest
INNGEST_SIGNING_KEY="signkey_..."
INNGEST_EVENT_KEY="eventkey_..."
```

---

## DO NOT USE (Prevents Hallucinations)

| Package | Reason |
|---------|--------|
| `next-auth` / `auth.js` | Use Clerk |
| `lucia` / `lucia-auth` | Deprecated |
| `prisma` | Use Payload's built-in database layer |
| `drizzle-orm` | Use Payload (Drizzle is used internally) |
| `mongoose` | Use Payload with D1/Postgres |
| `wordpress` / `wpgraphql` | Replaced by Payload CMS |
| `supabase` | Use D1 for DB, Clerk for auth |
| `neon` (direct) | Use D1 or Hyperdrive for Postgres |
| `uploadthing` | Use R2 storage |
| `vercel` (hosting) | Use Cloudflare Workers |
| `redux` / `zustand` | Use React Context or URL state |
| `react-query` / `swr` | Use Server Components + Server Actions |
| `axios` | Use native `fetch` |
| `express` / `fastify` / `hono` | Use Next.js API routes |
| `styled-components` / `emotion` / `sass` | Use Tailwind |
| `material-ui` / `chakra-ui` / `ant-design` | Use shadcn/ui |
| `moment` | Use `date-fns` or native Date |
| `lodash` | Use native JS methods |

---

## Sample Tools Data (Seed Categories)

- **Text**: ChatGPT, Claude, Jasper, Copy.ai, Writesonic
- **Image**: Midjourney, DALL-E 3, Stable Diffusion, Leonardo, Ideogram
- **Video**: Runway, Pika, Synthesia, HeyGen, Descript
- **Audio**: ElevenLabs, Suno, Udio, Mubert, AIVA
- **Code**: GitHub Copilot, Cursor, v0, Replit, Tabnine
- **Web**: Framer, Webflow, 10Web, Hostinger AI, B12

---

## Competitive Positioning

**Key Differentiators:**
1. **Creator-First vs Tool-First** - Focus on makers and their work, not just tools
2. **Showcase vs Directory** - Shows actual creations, not just tool listings
3. **Community vs Catalog** - Interactive maker community over static catalog
4. **Curation vs Aggregation** - Quality-focused editorial approach vs exhaustive lists

**Competitors:**
- There's An AI For That (17,000+ tools) - Database aggregation
- Futurepedia (5,000+ tools) - Educational focus
- Future Tools (2,500+ tools) - Influencer-driven
- Product Hunt (49% AI launches)

**Our Advantage:** Focus on the intersection of creators and communities, not just tool discovery.

---

## Monetization Strategy (Future)

1. **Phase 1: Audience Building** - Organic growth, SEO, newsletter
2. **Phase 2: Affiliate & Partnerships** - Tool affiliate programs, sponsored features
3. **Phase 3: Premium Features** - Pro maker profiles, advanced search, API access
4. **Phase 4: Marketplace** - Template/prompt marketplace, service marketplace

---

## important-instruction-reminders

- Do what has been asked; nothing more, nothing less.
- NEVER create files unless absolutely necessary.
- ALWAYS prefer editing existing files to creating new ones.
- NEVER proactively create documentation files unless explicitly requested.
