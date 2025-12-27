# Sentry Documentation

> Source: Context7 - /getsentry/sentry-docs
> Last Updated: December 2025

## Installation

### TanStack Start React

```bash
npm install @sentry/tanstackstart-react --save
# or
yarn add @sentry/tanstackstart-react
# or
pnpm add @sentry/tanstackstart-react
```

### Go SDKs

```bash
# Old raven-go (deprecated)
go get github.com/getsentry/raven-go

# New sentry-go
go get github.com/getsentry/sentry-go
```

## Development Server

```bash
# Start dev server for user docs
yarn dev

# Start dev server for developer docs
yarn dev:developer-docs
```

## Deploy Demo App

```bash
make deploy
```

## Start Next.js Development

```bash
npm run dev
```

## Configuration Example (SDK YAML)

```yaml
title: JavaScript
caseStyle: camelCase
supportLevel: production
sdk: "sentry.javascript.browser"
categories:
  - browser
```

## Relay Configuration

```yaml
relay:
  upstream: https://___ORG_INGEST_DOMAIN___
  host: 0.0.0.0
  port: 3000
logging:
  level: info
  format: json
metrics:
  statsd: 127.0.0.1:8126
  prefix: relay
limits:
  max_thread_count: 8
```

## Basic Usage (JavaScript)

```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

## Basic Usage (Next.js)

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  tracesSampleRate: 1.0,
});
```

## Key Features

- **Error Tracking**: Capture and aggregate errors
- **Performance Monitoring**: Track transaction performance
- **Session Replay**: Record user sessions
- **Distributed Tracing**: Trace across services
- **Release Health**: Monitor release stability
- **Alerts**: Configure error and performance alerts
- **Issue Grouping**: Smart error grouping
- **Source Maps**: Map minified code to source
- **Breadcrumbs**: Track events leading to errors
- **Context**: Add user and app context
- **Tags**: Categorize and filter issues

## Supported Platforms

- JavaScript (Browser, Node.js, Electron)
- React, Next.js, Remix, Vue, Angular, Svelte
- React Native, Flutter, iOS, Android
- Python (Django, Flask, FastAPI, Celery)
- Go, Java, Ruby, PHP, .NET, Rust
- Unity, Unreal Engine
