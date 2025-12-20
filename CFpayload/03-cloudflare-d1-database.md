# Cloudflare D1 Database

> Source: https://developers.cloudflare.com/d1/

## What is D1?

D1 is Cloudflare's serverless database solution built on SQLite's SQL semantics. It includes built-in disaster recovery, Worker and HTTP API access for querying from your applications.

---

## Key Features

### Database Architecture
- Designed for horizontal scaling across multiple smaller databases (10 GB each)
- Ideal for per-user, per-tenant, or per-entity database models
- Multiple databases can be created without extra isolation costs

### SQL Compatibility
- Executes SQL using SQLite's SQL compatibility
- Access via D1's Client API

### Time Travel/Backups
- Point-in-time-recovery available
- Restore a database to any minute within the last 30 days
- Built-in disaster recovery capabilities

---

## Getting Started

### Create a D1 Database

Via Wrangler CLI:
```bash
wrangler d1 create my-database
```

Via Dashboard:
1. Navigate to Workers & Pages > D1
2. Click "Create database"
3. Name your database

### Configure Binding in wrangler.jsonc

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-database",
      "database_id": "<your-database-id>"
    }
  ]
}
```

### Access in Worker Code

```javascript
export default {
  async fetch(request, env) {
    const result = await env.DB.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).bind(1).first();

    return Response.json(result);
  }
}
```

---

## Common Operations

### Create Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Insert Data
```javascript
await env.DB.prepare(
  "INSERT INTO users (name, email) VALUES (?, ?)"
).bind("John Doe", "john@example.com").run();
```

### Query Data
```javascript
// Single result
const user = await env.DB.prepare(
  "SELECT * FROM users WHERE id = ?"
).bind(1).first();

// Multiple results
const users = await env.DB.prepare(
  "SELECT * FROM users"
).all();

// Raw query
const result = await env.DB.exec("SELECT COUNT(*) FROM users");
```

### Batch Operations
```javascript
const batch = await env.DB.batch([
  env.DB.prepare("INSERT INTO users (name) VALUES (?)").bind("User 1"),
  env.DB.prepare("INSERT INTO users (name) VALUES (?)").bind("User 2"),
]);
```

---

## Pricing & Limits

**Available on Free and Paid plans**

### Free Plan
- 5 million rows read per day
- 100,000 rows written per day
- 5 GB storage

### Paid Plan (Workers Paid)
- 25 billion rows read per month
- 50 million rows written per month
- 5 GB included, then $0.75 per GB

### Database Limits
- Maximum database size: 10 GB
- Maximum row size: 1 MB
- Maximum columns per table: 100

---

## Local Development

D1 works with Miniflare for local development:

```bash
# Run locally with D1
wrangler dev

# Access D1 dashboard locally
wrangler d1 execute my-database --local --command "SELECT * FROM users"
```

---

## Migrations

### Create Migration
```bash
wrangler d1 migrations create my-database migration-name
```

### Apply Migrations
```bash
# Local
wrangler d1 migrations apply my-database --local

# Remote
wrangler d1 migrations apply my-database --remote
```
