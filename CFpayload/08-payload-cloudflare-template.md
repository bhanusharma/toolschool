# Payload CMS Cloudflare D1 Template

> Source: https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1

## Overview

This template provides a pre-configured Payload CMS setup for Cloudflare Workers deployment with D1 database and R2 storage.

**Important**: This can only be deployed on **Paid Workers** right now due to size limits.

---

## Quick Start

### Cloud Deployment (One-Click)

1. Click "Deploy to Cloudflare" button
2. Connect to git provider
3. Configure Workers, D1 Database, and R2 Bucket resources
4. Deploy automatically

### Local Development

After deployment setup:

```bash
# Clone the repository
git clone <your-repo>
cd <your-repo>

# Authenticate with Wrangler
pnpm wrangler login

# Start development server
pnpm dev
```

Local development uses automatic service bindings to connect to your cloud resources.

---

## Pre-Configured Components

### Collections

**Users Collection**
- Authentication-enabled
- Admin panel access
- Email/password login

**Media Collection**
- Upload-enabled
- R2 storage integration
- CDN-compatible

### Infrastructure

| Component | Service |
|-----------|---------|
| Database | D1 SQLite |
| Storage | R2 Bucket |
| Authentication | Payload built-in |
| Read Replicas | D1 (optional) |

---

## File Structure

```
templates/with-cloudflare-d1/
├── src/
│   ├── app/
│   │   ├── (payload)/           # Payload admin routes
│   │   └── ...                  # Your Next.js pages
│   ├── collections/
│   │   ├── Users.ts
│   │   └── Media.ts
│   ├── payload.config.ts        # Payload configuration
│   └── ...
├── public/
├── tests/
├── .cursor/rules/
├── .vscode/
├── wrangler.jsonc               # Cloudflare Workers config
├── next.config.ts               # Next.js config
├── open-next.config.ts          # OpenNext adapter config
├── tsconfig.json
├── package.json
├── .env.example
├── README.md
└── AGENTS.md
```

---

## Configuration Files

### wrangler.jsonc

```jsonc
{
  "name": "payload-cloudflare",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"],

  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "payload-db",
      "database_id": "<your-d1-id>"
    }
  ],

  "r2_buckets": [
    {
      "binding": "BUCKET",
      "bucket_name": "payload-media"
    }
  ],

  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

### payload.config.ts

```typescript
import { buildConfig } from 'payload'
import { d1Adapter } from './adapters/d1'
import { r2Storage } from './adapters/r2'

export default buildConfig({
  collections: [Users, Media],

  db: d1Adapter({
    // D1 binding configuration
  }),

  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: r2Storage,
        },
      },
    }),
  ],
})
```

---

## Database Migrations

### Create Migration

```bash
pnpm payload migrate:create
```

### Apply Migrations (Remote)

```bash
# Migrations run automatically during deploy
pnpm run deploy
```

### Apply Migrations (Local)

```bash
wrangler d1 migrations apply payload-db --local
```

---

## Deployment Process

```bash
# Full deployment command
pnpm run deploy
```

This command:
1. Initiates production mode
2. Executes pending migrations
3. Builds the Next.js application
4. Deploys to Cloudflare Workers

---

## Adding Custom Collections

### 1. Create Collection File

```typescript
// src/collections/Tools.ts
import { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
```

### 2. Register in Config

```typescript
// payload.config.ts
import { Tools } from './collections/Tools'

export default buildConfig({
  collections: [Users, Media, Tools],
  // ...
})
```

### 3. Create Migration

```bash
pnpm payload migrate:create
```

---

## Known Limitations

### Bundle Size
- 3MB Worker size limit requires Paid plan
- Team actively working to reduce bundle footprint

### GraphQL Support
- Upstream Worker issues currently limit full GraphQL functionality in production
- REST API works fully

### Edge Runtime
- Not supported with OpenNext adapter
- Remove `export const runtime = "edge"` from files

---

## Environment Variables

Create `.env` from `.env.example`:

```bash
# Payload
PAYLOAD_SECRET=your-secret-key

# Database (auto-configured via binding)
# No manual DATABASE_URL needed

# Optional: For local development
DATABASE_URL=
```

---

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "opennextjs-cloudflare build && wrangler dev",
    "deploy": "opennextjs-cloudflare build && wrangler deploy",
    "payload": "payload",
    "generate:types": "payload generate:types"
  }
}
```

---

## Support Resources

- Discord: Payload CMS community
- GitHub Discussions: Technical assistance
- Documentation: https://payloadcms.com/docs
