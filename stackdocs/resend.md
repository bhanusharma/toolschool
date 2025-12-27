# Resend Documentation

> Source: Context7 - /websites/resend
> Last Updated: December 2025

## Installation

### Node.js

```bash
npm install resend
```

### Go

```bash
go get github.com/resend/resend-go/v3
```

### Ruby

```bash
gem install resend
```

```ruby
gem 'resend'
```

### .NET

```bash
dotnet add package Resend
```

```powershell
PM> Install-Package Resend
```

### Python (with Django SMTP)

```bash
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
export RESEND_API_KEY="re_xxxxxxxxx"
```

## Send Email

### Node.js

```typescript
import { Resend } from 'resend';

const resend = new Resend('re_xxxxxxxxx');

const { data, error } = await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['delivered@resend.dev'],
  subject: 'hello world',
  html: '<p>it works!</p>',
  replyTo: 'onboarding@resend.dev',
});
```

### Python

```python
import resend

resend.api_key = "re_xxxxxxxxx"

params: resend.Emails.SendParams = {
  "from": "Acme <onboarding@resend.dev>",
  "to": ["delivered@resend.dev"],
  "subject": "hello world",
  "html": "<p>it works!</p>",
  "reply_to": "onboarding@resend.dev"
}

email = resend.Emails.send(params)
```

### Go

```go
import (
  "fmt"
  "github.com/resend/resend-go/v3"
)

func main() {
  ctx := context.TODO()
  client := resend.NewClient("re_xxxxxxxxx")

  params := &resend.SendEmailRequest{
    From:    "Acme <onboarding@resend.dev>",
    To:      []string{"delivered@resend.dev"},
    Subject: "hello world",
    Html:    "<p>it works!</p>",
    ReplyTo: "onboarding@resend.dev"
  }

  sent, err := client.Emails.SendWithContext(ctx, params)
}
```

### cURL

```bash
curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer re_xxxxxxxxx' \
     -H 'Content-Type: application/json' \
     -d '{
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "subject": "hello world",
    "html": "<p>it works!</p>",
    "reply_to": "onboarding@resend.dev"
  }'
```

## Create Webhook

```typescript
import { Resend } from 'resend';

const resend = new Resend('re_xxxxxxxxx');

const { data, error } = await resend.webhooks.create({
  endpoint: 'https://example.com/handler',
  events: ['email.sent'],
});
```

## Templates

### Publish Template

```typescript
import { Resend } from 'resend';

const resend = new Resend('re_xxxxxxxxx');

const { data, error } = await resend.templates.publish(
  '34a080c9-b17d-4187-ad80-5af20266e535',
);
```

## Create Domain

```javascript
import Resend from 'resend';

const resend = new Resend('re_1234567890abcdef1234567890abcdef');

async function createDomain() {
  const data = await resend.domains.create({
    name: 'example.com',
  });
  console.log(data);
}
```

## Key Features

- **Email API**: Simple REST API for sending emails
- **React Email**: Build emails with React components
- **Templates**: Create and manage email templates
- **Domains**: Custom domain management
- **Webhooks**: Event notifications (sent, delivered, bounced, etc.)
- **Topics & Audiences**: Subscriber management
- **Analytics**: Email delivery tracking
- **SDKs**: Node.js, Python, Go, Ruby, PHP, Java, C#, Rust
