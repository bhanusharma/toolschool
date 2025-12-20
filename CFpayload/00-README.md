# Cloudflare + Payload CMS Documentation

This folder contains comprehensive documentation for deploying Payload CMS on Cloudflare Workers.

## Quick Links

| Document | Description |
|----------|-------------|
| [01-cloudflare-payload-blog.md](./01-cloudflare-payload-blog.md) | Main Cloudflare blog post overview |
| [02-opennext-cloudflare-adapter.md](./02-opennext-cloudflare-adapter.md) | OpenNext adapter setup guide |
| [03-cloudflare-d1-database.md](./03-cloudflare-d1-database.md) | D1 serverless SQLite database |
| [04-d1-read-replication.md](./04-d1-read-replication.md) | Global read replicas for performance |
| [05-cloudflare-r2-storage.md](./05-cloudflare-r2-storage.md) | R2 object storage for media |
| [06-cloudflare-hyperdrive.md](./06-cloudflare-hyperdrive.md) | PostgreSQL connection pooling |
| [07-cloudflare-workers-bindings.md](./07-cloudflare-workers-bindings.md) | Understanding Workers bindings |
| [08-payload-cloudflare-template.md](./08-payload-cloudflare-template.md) | Official Payload template guide |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Cloudflare Edge Network                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Cloudflare      │    │    R2 Bucket     │                   │
│  │  Workers         │───▶│  (Media Assets)  │                   │
│  │  (Next.js +      │    └──────────────────┘                   │
│  │   Payload CMS)   │                                           │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │   D1 Database    │    │   Read Replicas  │                   │
│  │   (Primary)      │───▶│   (Global)       │                   │
│  └──────────────────┘    └──────────────────┘                   │
│                                                                  │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ OR ─ ─ ─ ─ ─ ─ ─ ─ ─                        │
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │    Hyperdrive    │───▶│   PostgreSQL     │                   │
│  │ (Connection Pool)│    │   (Neon/AWS/etc) │                   │
│  └──────────────────┘    └──────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Options

### Option 1: D1 (SQLite) - Recommended for New Projects

**Pros:**
- Zero configuration
- Built-in read replicas
- No external database to manage
- Lower cost
- 60% latency reduction with replicas

**Cons:**
- 10 GB limit per database
- SQLite syntax (not full Postgres)
- Some advanced SQL features missing

**Best for:** New projects, simpler data models, global distribution priority

### Option 2: PostgreSQL via Hyperdrive

**Pros:**
- Full PostgreSQL features
- Use existing databases
- Larger data capacity
- Advanced SQL support

**Cons:**
- External database required (Neon, AWS RDS, etc.)
- Additional cost
- Slightly more complex setup

**Best for:** Complex queries, existing Postgres databases, advanced data requirements

---

## Quick Start Commands

```bash
# Clone the template
npx create-payload-app@latest -t with-cloudflare-d1 my-project

# Navigate to project
cd my-project

# Login to Cloudflare
pnpm wrangler login

# Start local development
pnpm dev

# Create database migration
pnpm payload migrate:create

# Deploy to Cloudflare
pnpm run deploy
```

---

## Key Configuration Files

### wrangler.jsonc
```jsonc
{
  "name": "my-payload-app",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"],

  "d1_databases": [{
    "binding": "DB",
    "database_name": "my-db",
    "database_id": "<id>"
  }],

  "r2_buckets": [{
    "binding": "BUCKET",
    "bucket_name": "my-media"
  }]
}
```

### open-next.config.ts
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
```

---

## Important Limitations

| Limitation | Details |
|------------|---------|
| **Bundle Size** | 3MB limit requires Paid Workers plan |
| **Edge Runtime** | Not supported; remove `export const runtime = "edge"` |
| **GraphQL** | Limited functionality in production currently |
| **D1 Size** | 10 GB per database maximum |

---

## Performance Benchmarks

With D1 Read Replicas enabled:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| P50 | 300ms | 120ms | -60% |
| P90 | 480ms | 250ms | -48% |
| P99 | 760ms | 550ms | -28% |

---

## Cost Comparison

### Cloudflare Workers + D1

| Resource | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Workers Requests | 100K/day | 10M/month included |
| D1 Reads | 5M/day | 25B/month |
| D1 Writes | 100K/day | 50M/month |
| R2 Storage | 10 GB | $0.015/GB |
| R2 Egress | **FREE** | **FREE** |

### vs Traditional Hosting

- No server provisioning costs
- No idle compute charges
- Zero egress fees (R2)
- Global distribution included

---

## Source URLs

- Cloudflare Blog: https://blog.cloudflare.com/payload-cms-workers/
- Payload Template: https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1
- OpenNext Docs: https://opennext.js.org/cloudflare/get-started
- D1 Docs: https://developers.cloudflare.com/d1/
- R2 Docs: https://developers.cloudflare.com/r2/
- Hyperdrive Docs: https://developers.cloudflare.com/hyperdrive/
- Workers Bindings: https://developers.cloudflare.com/workers/runtime-apis/bindings/
