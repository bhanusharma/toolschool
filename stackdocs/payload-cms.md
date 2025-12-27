# Payload CMS Documentation

> Source: Context7 - /payloadcms/payload
> Last Updated: December 2025

## Installation

### Quick Start

```bash
npx create-payload-app@latest my-app
cd my-app
pnpm dev
```

## Environment Setup

```bash
cp .env.example .env
pnpm dev
# or
yarn dev
# or
npm run dev
```

## Environment Variables

```bash
DATABASE_URI=mongodb://127.0.0.1/plugin-dev
PAYLOAD_SECRET=your-secret-here
```

## Basic Configuration

```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  db: mongooseAdapter({ url: process.env.DATABASE_URI! }),
  plugins: [
    // your plugins here
  ],
  collections: [
    {
      slug: 'posts',
      fields: [{ name: 'title', type: 'text' }],
    },
  ],
})
```

## Production Commands

### Build

```bash
npm run build
```

### Start Production Server

```bash
pnpm start
```

## Ecommerce Template Setup

```bash
cd my-project && cp .env.example .env && pnpm install && pnpm dev
```

## Development Workflow

```shell
# Install dependencies
pnpm install

# Set docs directory (for contributing)
DOCS_DIR=/Users/yourname/Documents/GitHub/payload/docs

# Fetch local documentation
pnpm fetchDocs:local

# Start development server
pnpm dev
```

## Key Features

- **Code-First**: Define schema in TypeScript
- **Admin Panel**: Auto-generated admin UI
- **REST & GraphQL APIs**: Automatic API generation
- **Authentication**: Built-in auth system
- **File Storage**: Media management with adapters (S3, R2, etc.)
- **Hooks**: Before/after operation hooks
- **Access Control**: Field and collection level permissions
- **Localization**: Multi-language content support
- **Versions & Drafts**: Content versioning
