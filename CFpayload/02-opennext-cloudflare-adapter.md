# OpenNext Cloudflare Adapter

> Source: https://opennext.js.org/cloudflare/get-started

## Overview

OpenNext enables deploying Next.js applications to Cloudflare Workers, providing a bridge between Next.js features and Cloudflare's serverless platform.

---

## Installation Steps

1. **Install the adapter package**:
   ```bash
   npm install @opennextjs/cloudflare@latest
   ```

2. **Install Wrangler CLI**:
   ```bash
   npm install --save-dev wrangler@latest
   ```
   (version 3.99.0 or later required)

3. Create configuration files (wrangler and open-next configs)
4. Update package.json scripts
5. Deploy to Cloudflare Workers

---

## Configuration Files

### Wrangler Configuration (wrangler.jsonc)

Key requirements:
- Set `main` to `.open-next/worker.js`
- Enable `nodejs_compat` compatibility flag
- Enable `global_fetch_strictly_public` flag
- Set compatibility date to `2024-09-23` or later
- Configure assets binding to `.open-next/assets`
- Add `WORKER_SELF_REFERENCE` service binding
- Optionally add R2 bucket binding for caching

Example `wrangler.jsonc`:
```jsonc
{
  "name": "my-next-app",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "my-next-app"
    }
  ],
  // Optional: R2 for incremental cache
  "r2_buckets": [
    {
      "binding": "NEXT_CACHE_BUCKET",
      "bucket_name": "my-next-cache"
    }
  ]
}
```

### Open-Next Config (open-next.config.ts)

Basic configuration:
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
```

With R2 incremental caching:
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

---

## Environment Variables

Create a `.dev.vars` file with:
```
NEXTJS_ENV=development
```

This determines which Next.js environment files load during local development.

---

## Package.json Scripts

Add these build and deployment commands:

```json
{
  "scripts": {
    "build": "next build",
    "preview": "opennextjs-cloudflare build && wrangler dev",
    "deploy": "opennextjs-cloudflare build && wrangler deploy",
    "upload": "opennextjs-cloudflare build && wrangler versions upload",
    "cf-typegen": "wrangler types"
  }
}
```

- `build`: Invokes Next.js build
- `preview`: Builds your app and serves it locally in Workers runtime
- `deploy`: Builds and deploys to Cloudflare
- `upload`: Builds and uploads a new version
- `cf-typegen`: Generates CloudflareEnv types

---

## Key Limitations

- **Edge runtime not supported yet**: Remove `export const runtime = "edge"` from source files
- **Incompatible with @cloudflare/next-on-pages**: Cannot use both packages together

---

## Development & Deployment

### Local Development
```bash
npm run preview
```
Tests locally in the Workers runtime before deploying.

### Production Deployment
```bash
npm run deploy
```

Or connect a GitHub/GitLab repository for automated deployments via Cloudflare Dashboard.
