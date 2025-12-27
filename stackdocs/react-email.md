# React Email Documentation

> Source: Context7 - /resend/react-email
> Last Updated: December 2025

## Installation

### Automatic Setup (Recommended)

```bash
npx create-email@latest
# or
yarn create email
# or
pnpm create email
# or
bun create email
```

### Install Dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Manual Setup

```bash
# npm
npm install react-email @react-email/preview-server -D -E
npm install @react-email/components react react-dom -E

# yarn
yarn add react-email @react-email/preview-server -D -E
yarn add @react-email/components react react-dom -E

# pnpm
pnpm add react-email @react-email/preview-server -D -E
pnpm add @react-email/components react react-dom -E

# bun
bun add react-email @react-email/preview-server -D -E
bun add @react-email/components react react-dom -E
```

## Development Server

### Add Script to package.json

```json
{
  "scripts": {
    "email:dev": "email dev"
  }
}
```

### Run Development Server

```bash
npm run email:dev
# or
yarn email:dev
# or
pnpm email:dev
# or
bun email:dev
```

### Automatic Setup Dev Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Contributing

### Clone Repository

```bash
git clone https://github.com/resend/react-email
```

### Install Dependencies

```bash
pnpm install
```

### Preview Documentation

```bash
cd apps/docs
pnpm dev
```

## Key Components

- **Html**: Root component for emails
- **Head**: Email head section
- **Body**: Email body section
- **Container**: Centered container
- **Section**: Email section wrapper
- **Row**: Horizontal layout
- **Column**: Vertical layout
- **Text**: Text component
- **Link**: Anchor links
- **Button**: Call-to-action buttons
- **Image**: Image component
- **Hr**: Horizontal rule
- **Preview**: Preview text (inbox snippet)
- **Heading**: Heading text (h1-h6)

## Key Features

- **React Components**: Build emails with familiar React syntax
- **Preview Server**: Local development with hot reload
- **Dark Mode Support**: Built-in dark mode styling
- **Responsive**: Mobile-friendly email templates
- **TypeScript**: Full TypeScript support
- **No Dependencies**: Zero runtime dependencies
- **Cross-Client**: Works across email clients
