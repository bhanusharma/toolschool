# Stripe Node.js Documentation

> Source: Context7 - /stripe/stripe-node
> Last Updated: December 2025

## Installation

```bash
npm install stripe
# or
yarn add stripe
```

### Public Preview Version

```bash
npm install stripe@public-preview --save
```

### Private Preview Version

```bash
npm install stripe@private-preview --save
```

### Specific Version

```bash
npm install stripe@<some-version>
# for example:
# npm install stripe@18.6.0-beta.1
```

## Basic Usage

```typescript
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_...');
```

## API Examples

### Send Email with Invoice

```javascript
// Create invoice item
const invoiceItem = await stripe.invoiceItems.create({
  customer: 'cus_123',
  amount: 2500,
  currency: 'usd',
  description: 'One-time setup fee',
  metadata: {service: 'setup'}
});

// Create invoice
const invoice = await stripe.invoices.create({
  customer: 'cus_123',
  collection_method: 'send_invoice',
  days_until_due: 30,
  auto_advance: true,
  description: 'Monthly service invoice',
  metadata: {
    invoice_period: '2024-01',
    department: 'sales'
  }
});

// Finalize invoice
const finalized = await stripe.invoices.finalizeInvoice('in_123', {
  auto_advance: false
});

// Send invoice
const sent = await stripe.invoices.sendInvoice('in_123');

// Pay invoice
const paid = await stripe.invoices.pay('in_123', {
  payment_method: 'pm_card_visa'
});

// Void invoice
const voided = await stripe.invoices.voidInvoice('in_123');

// Search invoices
const unpaidInvoices = await stripe.invoices.search({
  query: 'status:\'open\' AND total>1000'
});
```

### List Customer Payment Methods

```javascript
// GET /v1/customers/{customer}/payment_methods
const paymentMethods = await stripe.customers.listPaymentMethods(
  'cus_123',
  { type: 'card' }
);
```

## Webhook Testing

### Start Webhook Forwarding

```bash
stripe listen --forward-to localhost:3000/webhook
```

### Install Dependencies for Webhook Example

```bash
npm install
```

## Testing with stripe-mock

```bash
go get -u github.com/stripe/stripe-mock
stripe-mock
```

## Key Features

- **Payments**: One-time and recurring payments
- **Subscriptions**: Subscription billing management
- **Invoicing**: Create and send invoices
- **Checkout**: Prebuilt payment pages
- **Payment Methods**: Cards, bank transfers, wallets
- **Webhooks**: Real-time event notifications
- **Connect**: Marketplace payments
- **Billing Portal**: Customer self-service
- **TypeScript**: Full type definitions
