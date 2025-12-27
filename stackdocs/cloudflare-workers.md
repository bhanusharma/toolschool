# Cloudflare Workers Documentation

> Source: Context7 - /websites/developers_cloudflare_workers
> Last Updated: December 2025

## Installation

### Create Workers AI Project

```bash
# npm
npm create cloudflare@latest -- hello-ai

# yarn
yarn create cloudflare hello-ai

# pnpm
pnpm create cloudflare@latest hello-ai

# Navigate to project
cd hello-ai
```

### Install KV Asset Handler

```bash
npm i -D @cloudflare/kv-asset-handler
```

### Install AI Utilities

```bash
npm i @cloudflare/ai-utils
# or
pnpm add @cloudflare/ai-utils
```

## Clone Workers Sites Template

```bash
git clone --depth=1 --branch=wrangler2 https://github.com/cloudflare/worker-sites-template my-site
```

## Development

### Preview Locally

```bash
wrangler dev
```

## Basic Worker

```javascript
export default {
  fetch() {
    return new Response(`Running in ${navigator.userAgent}!`);
  },
};
```

## Miniflare Testing

### Start HTTP Server

```javascript
import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  script: `
  export default {
    async fetch(request, env, ctx) {
      return new Response("Hello Miniflare!");
    }
  }
  `,
  port: 5000,
});
await mf.ready;
console.log("Listening on :5000");
```

### HTTPS Server

```javascript
const mf = new Miniflare({
  https: true,
});
```

```javascript
const mf = new Miniflare({
  httpsKeyPath: "./key.pem",
  httpsCertPath: "./cert.pem",
});
```

### Multi-Worker Setup

```javascript
workers: [{
  name: "worker2",
  kvNamespaces: { COUNTS: "counts" },
  serviceBindings: {
    INCREMENTER: "incrementer",
    async CUSTOM(request) {
      return new Response(message);
    },
  },
  modules: true,
  script: `export default {
    async fetch(request, env, ctx) {
      const response = await env.CUSTOM.fetch("http://host/");
      const message = await response.text();

      await env.INCREMENTER.fetch("http://host/");
      await env.INCREMENTER.fetch("http://host/");
      await env.INCREMENTER.fetch("http://host/");
      const count = await env.COUNTS.get("count");

      return new Response(message + count);
    }
  }`,
}]
```

## Key Features

- **Serverless**: No servers to manage
- **Edge Computing**: Run code globally, close to users
- **V8 Isolates**: Fast cold starts, efficient execution
- **KV Storage**: Key-value storage at the edge
- **R2 Storage**: S3-compatible object storage
- **D1 Database**: Serverless SQLite
- **Durable Objects**: Stateful serverless
- **Queues**: Message queuing
- **Workers AI**: Run AI models at the edge
- **Cron Triggers**: Scheduled execution
- **WebSockets**: Real-time connections
- **Workflows**: Durable execution engine
- **Service Bindings**: Worker-to-worker communication

## Bindings

```toml
# wrangler.toml
[[kv_namespaces]]
binding = "MY_KV"
id = "abc123"

[[d1_databases]]
binding = "MY_DB"
database_name = "my-database"
database_id = "abc123"

[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"
```
