# Cloudflare Hyperdrive

> Source: https://developers.cloudflare.com/hyperdrive/

## What is Hyperdrive?

Hyperdrive is a Cloudflare service that accelerates queries you make to existing databases by enabling faster global data access from Cloudflare Workers, regardless of user location. It transforms regional databases into globally distributed systems.

---

## How It Works

### Connection Pooling
Hyperdrive maintains connection pools across the Cloudflare network, eliminating the need to establish new database connections for each request.

### Query Caching
Default-enabled query caching for frequently executed queries, improving response times for popular data requests.

### Global Distribution
Users access their database via Hyperdrive's generated connection string rather than direct database connections.

---

## Supported Databases

**Primary Support:**
- PostgreSQL
- MySQL

**PostgreSQL-Compatible:**
- CockroachDB
- Timescale
- Neon
- Supabase

**Hosting Providers:**
- AWS RDS
- Google Cloud SQL
- Azure Database
- Neon
- PlanetScale

---

## Setup Instructions

### 1. Create Hyperdrive Configuration

```bash
wrangler hyperdrive create my-hyperdrive \
  --connection-string="postgres://user:pass@host:5432/database"
```

### 2. Configure Binding in wrangler.jsonc

```jsonc
{
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<your-hyperdrive-id>",
      "localConnectionString": "postgres://localhost:5432/local_db"
    }
  ]
}
```

### 3. Access in Worker Code

**PostgreSQL Example:**
```javascript
import postgres from 'postgres';

export default {
  async fetch(request, env) {
    const sql = postgres(env.HYPERDRIVE.connectionString);

    const results = await sql`SELECT * FROM users LIMIT 10`;

    return Response.json(results);
  }
}
```

**MySQL Example:**
```javascript
import mysql from 'mysql2/promise';

export default {
  async fetch(request, env) {
    const connection = await mysql.createConnection({
      host: env.HYPERDRIVE.host,
      user: env.HYPERDRIVE.user,
      password: env.HYPERDRIVE.password,
      database: env.HYPERDRIVE.database,
      port: env.HYPERDRIVE.port,
      disableEval: true, // Required for Workers compatibility
    });

    const [rows] = await connection.execute('SELECT * FROM users');
    return Response.json(rows);
  }
}
```

---

## Performance Benefits

### Latency Reduction
- **40% reduction in P50 latency** with connection pooling
- Global query acceleration from any geographic location
- Reduced cold start times

### Connection Efficiency
- Maintains warm connection pools at edge locations
- Eliminates connection establishment overhead
- Supports existing code—no rewrites needed

---

## Configuration with Payload CMS

```javascript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Get Cloudflare context for Hyperdrive binding
const cloudflare = await getCloudflareContext({ async: true });

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: cloudflare.env.HYPERDRIVE.connectionString,
      maxUses: 1, // Required: connections cannot be shared across requests
    },
  }),
});
```

---

## Caching Configuration

### Default Behavior
Query caching is enabled by default for read queries.

### Disable Caching (for specific queries)
```javascript
// Use prepared statements or transaction blocks
// to bypass caching when fresh data is required
```

---

## Pricing

**Available on Free and Paid plans**

### Free Plan
- 100,000 queries/month

### Paid Plan (Workers Paid)
- Included with Workers subscription
- Higher query limits

---

## Best Practices

1. **Use `maxUses: 1`** in serverless environments where connections cannot be shared
2. **Leverage caching** for frequently-read data
3. **Use local connection string** for development
4. **Monitor query patterns** to optimize cache hit rates
