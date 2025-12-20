# Cloudflare Workers Bindings

> Source: https://developers.cloudflare.com/workers/runtime-apis/bindings/

## What Are Bindings?

Bindings are permissions and APIs combined into a single mechanism that grant Workers specific capabilities to interact with Cloudflare resources. They eliminate the need to embed secret keys in your Worker code—the permission is embedded within the API itself.

---

## Available Binding Types (24+)

### Data & Storage
| Binding | Description |
|---------|-------------|
| **D1** | Serverless SQLite database |
| **R2** | Object storage (S3-compatible) |
| **KV** | Key-value store |
| **Vectorize** | Vector database for AI/ML |

### Compute & Processing
| Binding | Description |
|---------|-------------|
| **AI** | Run AI models |
| **Browser Rendering** | Headless browser |
| **Durable Objects** | Stateful coordination |
| **Queues** | Message queues |
| **Workflows** | Multi-step processes |

### Infrastructure
| Binding | Description |
|---------|-------------|
| **Hyperdrive** | Database connection pooling |
| **Analytics Engine** | Custom analytics |
| **Assets** | Static file serving |
| **Rate Limiting** | Request throttling |
| **mTLS** | Mutual TLS certificates |

### Security & Configuration
| Binding | Description |
|---------|-------------|
| **Secrets** | Encrypted environment variables |
| **Environment Variables** | Configuration values |
| **Service bindings** | Worker-to-Worker communication |

---

## Configuration

### wrangler.jsonc Format

```jsonc
{
  // D1 Database
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-database",
      "database_id": "<database-id>"
    }
  ],

  // R2 Storage
  "r2_buckets": [
    {
      "binding": "BUCKET",
      "bucket_name": "my-bucket"
    }
  ],

  // KV Namespace
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "<namespace-id>"
    }
  ],

  // Hyperdrive
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<hyperdrive-id>"
    }
  ],

  // Service Binding
  "services": [
    {
      "binding": "OTHER_WORKER",
      "service": "other-worker-name"
    }
  ],

  // Environment Variables
  "vars": {
    "MY_VAR": "value"
  }
}
```

---

## Accessing Bindings in Code

### Method 1: Function Arguments (Recommended)

```javascript
export default {
  async fetch(request, env, ctx) {
    // Access bindings via env parameter
    const data = await env.DB.prepare("SELECT * FROM users").all();
    const object = await env.BUCKET.get("file.txt");
    const value = await env.KV.get("key");

    return new Response("OK");
  }
}
```

### Method 2: Module Import

```javascript
import { env } from "cloudflare:workers";

// Access at top level
console.log(env.MY_VAR);

export default {
  async fetch(request) {
    const data = await env.DB.prepare("SELECT * FROM users").all();
    return Response.json(data);
  }
}
```

### Method 3: Class Properties

```javascript
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
  async fetch(request) {
    // Access via this.env
    await this.env.BUCKET.put("key", "value");
    return new Response("OK");
  }
}
```

---

## TypeScript Types

Generate types for your bindings:

```bash
wrangler types
```

This creates a `worker-configuration.d.ts` file:

```typescript
interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  KV: KVNamespace;
  HYPERDRIVE: Hyperdrive;
  MY_VAR: string;
}
```

---

## Important Considerations

### Binding Updates
Create new client instances per request rather than caching them in global scope, ensuring they reflect binding changes between deployments.

```javascript
// ❌ Don't cache bindings globally
let cachedDb;

export default {
  async fetch(request, env) {
    // ✅ Create new instance per request
    const result = await env.DB.prepare("...").all();
    return Response.json(result);
  }
}
```

### I/O Constraints
- Environment variables and secrets are accessible at the top level
- Other I/O operations (KV, D1, R2, Durable Objects) only work within request contexts

### Testing
Use the `withEnv` function to override environment values during testing:

```javascript
import { env, withEnv } from "cloudflare:test";

const testEnv = withEnv(env, { MY_VAR: "test-value" });
```

---

## Common Patterns

### Multiple Bindings Together

```javascript
export default {
  async fetch(request, env) {
    // Get user from database
    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).bind(1).first();

    // Get profile image from R2
    const avatar = await env.BUCKET.get(`avatars/${user.id}.jpg`);

    // Cache result in KV
    await env.KV.put(`user:${user.id}`, JSON.stringify(user), {
      expirationTtl: 3600
    });

    return Response.json(user);
  }
}
```

### Service-to-Service Communication

```javascript
export default {
  async fetch(request, env) {
    // Call another Worker
    const response = await env.OTHER_WORKER.fetch(
      new Request("https://internal/api", {
        method: "POST",
        body: JSON.stringify({ action: "process" })
      })
    );

    return response;
  }
}
```
