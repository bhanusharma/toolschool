# Cloudflare R2 Object Storage

> Source: https://developers.cloudflare.com/r2/

## What is R2?

Cloudflare R2 provides object storage for all your data. It allows you to store large amounts of unstructured data **without the costly egress bandwidth fees** typical of standard cloud storage services.

---

## Use Cases

- Cloud-native applications
- Web content storage
- Podcast hosting
- Data lakes for analytics
- Output from batch processing jobs (e.g., machine learning workflows)
- Media asset storage (images, videos, audio)

---

## Key Features

### Zero Egress Fees
Unlike AWS S3, R2 has no data egress charges. Pay only for storage and operations.

### S3 Compatibility
R2 is S3-compatible, meaning you can use existing S3 SDKs and tools with minimal changes.

### Location Hints
Optional parameters during bucket creation to specify your primary geographical access region.

### CORS Support
Configure cross-origin resource sharing to interact with bucket objects and establish access policies.

### Public Buckets
Make bucket contents directly accessible via the Internet without authentication.

### Bucket-Scoped Tokens
Create granular access controls determining who can reach your data.

---

## Configure R2 Binding

In `wrangler.jsonc`:
```jsonc
{
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket-name"
    }
  ]
}
```

---

## Workers Integration

### Basic Operations

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    switch (request.method) {
      case 'PUT':
        await env.MY_BUCKET.put(key, request.body);
        return new Response(`Put ${key} successfully!`);

      case 'GET':
        const object = await env.MY_BUCKET.get(key);
        if (object === null) {
          return new Response('Object Not Found', { status: 404 });
        }
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        return new Response(object.body, { headers });

      case 'DELETE':
        await env.MY_BUCKET.delete(key);
        return new Response('Deleted!');

      default:
        return new Response('Method Not Allowed', { status: 405 });
    }
  }
}
```

### List Objects

```javascript
const listed = await env.MY_BUCKET.list({
  prefix: 'images/',
  limit: 100,
});

for (const object of listed.objects) {
  console.log(object.key, object.size);
}
```

### Multipart Uploads

```javascript
// Start multipart upload
const multipart = await env.MY_BUCKET.createMultipartUpload('large-file.zip');

// Upload parts
const part1 = await multipart.uploadPart(1, chunk1);
const part2 = await multipart.uploadPart(2, chunk2);

// Complete upload
await multipart.complete([part1, part2]);
```

---

## Pricing

### Storage
- Free: 10 GB/month
- Paid: $0.015 per GB/month

### Class A Operations (writes)
- Free: 1 million/month
- Paid: $4.50 per million

### Class B Operations (reads)
- Free: 10 million/month
- Paid: $0.36 per million

### Egress
**FREE** — No egress fees!

---

## Custom Adapter for Payload CMS

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
      const obj = await bucket?.get(key(params.filename), {
        range: isMiniflare ? undefined : req.headers
      })

      if (obj?.body == undefined) {
        return new Response(null, { status: 404 })
      }

      const headers = new Headers()
      if (!isMiniflare) obj.writeHttpMetadata(headers)

      // Handle conditional requests (ETag)
      const clientEtag = req.headers.get('etag') || req.headers.get('if-none-match')
      if (obj.etag === clientEtag) {
        return new Response(null, { headers, status: 304 })
      }

      return new Response(obj.body, { headers, status: 200 })
    },
  }
}
```

---

## Local Development

R2 works with Miniflare for local development:

```bash
# Wrangler automatically uses Miniflare for local R2
wrangler dev
```

Files are stored in `.wrangler/state/r2/` during local development.
