# Cloudflare D1 Read Replication

> Source: https://developers.cloudflare.com/d1/best-practices/read-replication/

## Overview

D1 read replication creates asynchronously replicated copies of the primary database across multiple regions. All write operations route to the primary instance, while read queries can be directed to geographically closer replicas, reducing latency.

---

## How It Works

- D1 creates multiple asynchronously replicated copies of the primary database instance
- Read replicas only serve read requests
- Maintains sequential consistency through bookmarks that track database state
- Ensures queries within a session see logically consistent data despite potential replica lag

---

## Enable Read Replication

### Via Dashboard
Navigate to your D1 database Settings → "Enable Read Replication"

### Via REST API
```bash
PUT /v4/accounts/{account_id}/d1/database/{database_id}
Body: {"read_replication": {"mode": "auto"}}
```

### Disable
Set `"mode": "disabled"` (takes up to 24 hours to fully disable)

---

## Session Types

The Sessions API offers three initialization approaches:

### 1. Unconstrained Session
```javascript
const session = env.DB.withSession();
```
Routes first query to any available instance—suitable when latest data isn't critical.

### 2. First-Primary Session
```javascript
const session = env.DB.withSession("first-primary");
```
Ensures first query hits the primary database, guaranteeing access to the latest data.

### 3. Bookmark Session
```javascript
const session = env.DB.withSession(bookmark);
```
Resumes from previous session context, maintaining consistency across requests.

---

## Code Example

```typescript
// Create session and retrieve bookmark from previous request
const bookmark = request.headers.get('x-d1-bookmark') ?? 'first-unconstrained';
const session = env.DB.withSession(bookmark);

// Execute query
const result = await session
  .prepare('SELECT * FROM Customers WHERE CompanyName = ?')
  .bind('Bs Beverages')
  .run();

// Store bookmark for continuity
response.headers.set('x-d1-bookmark', session.getBookmark() ?? '');

// Check processing location
console.log({
  region: result.meta.served_by_region,
  fromPrimary: result.meta.served_by_primary
});
```

---

## Performance Benefits

- **Reduced latency**: Query latency decreases for users located close to read replicas
- **Increased throughput**: Multiple instances distribute read load, enabling higher concurrent query capacity

### Measured Improvements (P50/P90/P99)
- P50: 300ms → 120ms (-60%)
- P90: 480ms → 250ms (-48%)
- P99: 760ms → 550ms (-28%)

---

## Available Regions

Read replicas automatically deploy in all supported regions:
- ENAM (Eastern North America)
- WNAM (Western North America)
- WEUR (Western Europe)
- EEUR (Eastern Europe)
- APAC (Asia Pacific)
- OC (Oceania)

---

## Pricing

**No additional costs** — D1 read replication is built into D1. You don't pay extra storage or compute costs. Billing remains based on rows read and written.

---

## Best Practices

1. **Use "first-primary" for critical reads** that need the latest data
2. **Use unconstrained sessions** for data that can tolerate slight staleness
3. **Pass bookmarks between requests** to maintain consistency in multi-request flows
4. **Monitor served_by_region** to understand traffic patterns
