# Inngest Documentation

> Source: Context7 - /websites/inngest
> Last Updated: December 2025

## Installation

### Node.js

```bash
npm install inngest
```

### Python

```bash
python -m venv .venv && source .venv/bin/activate
pip install fastapi inngest uvicorn
```

## Quick Start

### Next.js Setup

```bash
npm install inngest
```

### Python Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install fastapi inngest uvicorn
```

## Express.js Integration

```typescript
import express from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest";

const app = express();

app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));

// Create a new route to send events
app.get("/api/hello", async function (req, res, next) {
  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testUser@example.com",
    },
  }).catch(err => next(err));
  res.json({ message: 'Event sent!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## Fastify Integration

```typescript
import Fastify from "fastify";
import { fastifyPlugin } from "inngest/fastify";
import { inngest, fnA } from "./inngest";

const fastify = Fastify();

fastify.register(fastifyPlugin, {
  client: inngest,
  functions: [fnA],
  options: {},
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
```

## TanStack Start Integration

```typescript
import { createServerFileRoute } from '@tanstack/react-start/server'
import { serve } from "inngest/edge";
import { inngest, functions } from "../../inngest";

const handler = serve({ client: inngest, functions });

export const ServerRoute = createServerFileRoute('/api/inngest').methods({
  GET: async ({ request }) => handler(request),
  POST: async ({ request }) => handler(request),
  PUT: async ({ request }) => handler(request)
})
```

## Creating Functions

### Onboarding Drip Campaign with waitForEvent

```typescript
import { inngest } from "./client";

export default inngest.createFunction(
  { id: "onboarding-drip-campaign" },
  { event: "user/new.signup" },
  async ({ event, step }) => {
    await step.run("send-welcome-email", async () => {
      return await email.send("welcome", event.data.email);
    });

    // Wait up to 2 days for account setup
    const accountSetupCompleted = await step.waitForEvent(
      "wait-for-setup-complete",
      {
        event: "user/account.setup.completed",
        timeout: "2d",
        match: "data.user_id",
      }
    );

    if (!accountSetupCompleted) {
      await step.run("send-setup-account-guide", async () => {
        return await email.send("account_setup_guide", event.data.email);
      });
    }
  }
);
```

## Starting Development Server

### Python (FastAPI)

```bash
INNGEST_DEV=1 uvicorn main:app --reload
```

### Self-Hosting Help

```bash
inngest start --help
```

## Key Features

- **Durable Functions**: Functions that survive crashes and restarts
- **Step Functions**: Break work into retryable steps
- **Event-Driven**: Trigger functions from events
- **Scheduling**: Cron-based scheduled functions
- **Retries**: Automatic retry with backoff
- **Concurrency Control**: Limit parallel executions
- **Rate Limiting**: Control function execution rates
- **Batching**: Group events for batch processing
- **Middleware**: Add custom logic to functions
- **TypeScript**: Full type safety
- **Multi-Language**: Node.js, Python, Go
