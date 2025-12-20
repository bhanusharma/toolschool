# Payload CMS on Cloudflare Workers

> Source: https://blog.cloudflare.com/payload-cms-workers/

## Overview

Payload is an open-source CMS with 35,000+ GitHub stars, recently acquired by Figma. A new template enables "a full-fledged CMS to Cloudflare's platform in a single click" with automatic bindings to D1 and R2.

## Key Architecture Components

### Serverless Benefits
Payload runs on Cloudflare Workers without 24/7 server provisioning. The system "spins up at the closest Cloudflare server" when accessed and "spins down" when idle, eliminating compute costs during downtime.

### Technology Stack
- **Framework**: Next.js (native support added in 2024)
- **Deployment**: OpenNext adapter for Workers
- **Database Options**: PostgreSQL (external) or D1 (SQLite)
- **Storage**: R2 for media assets

---

## Database Configuration

### Option 1: PostgreSQL with Hyperdrive

Basic configuration disables connection pooling since "connections cannot be shared across requests":

```javascript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      maxUses: 1,
    },
  }),
});
```

**Performance Enhancement with Hyperdrive**:
Hyperdrive maintains connection pools across the Cloudflare network and adds query caching, reducing P50 latency by 40%.

```javascript
import { getCloudflareContext } from '@opennextjs/cloudflare';

const cloudflare = await getCloudflareContext({ async: true });

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: cloudflare.env.HYPERDRIVE.connectionString,
      maxUses: 1,
    },
  }),
});
```

### Option 2: D1 Custom Adapter

Since Payload lacks native D1 support, a custom adapter was built using the SQLite adapter as a foundation with Drizzle ORM. The key difference involves mapping D1 result objects to libSQL format:

```javascript
export const execute = function execute({ db, drizzle, raw, sql: statement }) {
  const executeFrom = (db ?? drizzle)!
  const mapToLibSql = (query) => {
    const execute = query.execute
    query.execute = async () => {
      const result = await execute()
      const resultLibSQL = {
        columns: undefined,
        columnTypes: undefined,
        lastInsertRowid: BigInt(result.meta.last_row_id),
        rows: result.results,
        rowsAffected: result.meta.rows_written,
      }
      return Object.assign(result, resultLibSQL)
    }
    return query
  }
  // Implementation continues...
}
```

**Database Migrations**: Use Wrangler's remote bindings feature to connect to remote D1 databases without API token configuration.

---

## Storage Configuration: R2 Custom Adapter

Payload's official S3 adapter is compatible with R2, but a custom adapter using R2 bindings eliminates API token requirements:

```javascript
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import path from 'path'

const isMiniflare = process.env.NODE_ENV === 'development';

export const r2Storage = (bucket) => ({ prefix = '' }) => {
  const key = (filename) => path.posix.join(prefix, filename)
  return {
    name: 'r2',
    handleDelete: ({ filename }) => bucket.delete(key(filename)),
    handleUpload: async ({ file }) => {
      const buffer = isMiniflare ? new Blob([file.buffer]) : file.buffer
      await bucket.put(key(file.filename), buffer)
    },
    staticHandler: async (req, { params }) => {
      const obj = await bucket?.get(key(params.filename),
        { range: isMiniflare ? undefined : req.headers })
      if (obj?.body == undefined) return new Response(null, { status: 404 })

      const headers = new Headers()
      if (!isMiniflare) obj.writeHttpMetadata(headers)

      return obj.etag === (req.headers.get('etag') || req.headers.get('if-none-match'))
        ? new Response(null, { headers, status: 304 })
        : new Response(obj.body, { headers, status: 200 })
    },
  }
}
```

---

## Performance Optimization: D1 Read Replicas

Global read replication deploys read-only replicas worldwide. Enable with "first-primary" session type where "the first query will always hit the primary instance and subsequent queries may hit one of the replicas":

```javascript
this.drizzle = drizzle(this.binding.withSession("first-primary"),
  { logger, schema: this.schema });
```

**Performance Improvements** (P50/P90/P99 wall-time from globally distributed locations):
- P50: 300ms → 120ms (-60%)
- P90: 480ms → 250ms (-48%)
- P99: 760ms → 550ms (-28%)

---

## Deployment Instructions

1. Click the "Deploy to Cloudflare" button from the template
2. Automatic configuration includes D1 database and R2 bucket bindings
3. Template provides two default tables: media and users
4. Expand with custom collections by modifying Payload configuration

---

## Real-World Implementation

Cloudflare TV uses this setup with "over 2,000 episodes and 70,000 assets." The deployment leverages Payload's "filtering and search features" for content library navigation.

---

## Alternative CMS Options

- **SonicJs**: Built on Workers, D1, and Astro (https://github.com/lane711/sonicjs)
- **microfeed**: Lightweight self-hosted CMS for podcasts, blogs, and photos (https://github.com/microfeed/microfeed)
