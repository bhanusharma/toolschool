# shadcn/ui Documentation

> Source: Context7 - /websites/ui_shadcn
> Last Updated: December 2025

## Installation

### Install CLI

```bash
npm install shadcn@latest
```

### Initialize Project

```bash
npx shadcn@latest init
```

### Add All Components

```bash
npx shadcn@latest add --all
```

## Adding Components

### Single Component

```bash
npx shadcn@latest add button
npx shadcn@latest add menubar
npx shadcn@latest add aspect-ratio
npx shadcn@latest add input-otp
```

### From Registry

```bash
npx shadcn@latest add @v0/dashboard
npx shadcn@latest add @acme/button @lib/utils @ai/prompt
```

### From URL

```bash
npx shadcn@latest add https://registry.example.com/button.json
```

### From Local File

```bash
npx shadcn@latest add ./local-registry/button.json
```

## Manual Installation

### Example: Input OTP

```bash
npm install input-otp
```

### Example: Aspect Ratio

```bash
npm install @radix-ui/react-aspect-ratio
```

## Framework-Specific Setup

### Laravel with React

```bash
laravel new my-app --react
```

### TanStack Start

```bash
npm create @tanstack/start@latest --tailwind --add-ons shadcn
```

## Registry Configuration

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json"
  }
}
```

## Development Server

```bash
npm run dev
```

## Key Features

- **Copy-Paste Components**: Not a npm package, you own the code
- **Radix UI Primitives**: Built on accessible primitives
- **Tailwind CSS**: Styled with Tailwind
- **TypeScript**: Full TypeScript support
- **Themeable**: Easy customization
- **CLI**: Quick component installation
- **Registry**: Share and distribute components

## Available Components

- Accordion, Alert, Alert Dialog, Aspect Ratio
- Avatar, Badge, Breadcrumb, Button
- Calendar, Card, Carousel, Checkbox
- Collapsible, Combobox, Command, Context Menu
- Data Table, Date Picker, Dialog, Drawer
- Dropdown Menu, Form, Hover Card, Input
- Input OTP, Label, Menubar, Navigation Menu
- Pagination, Popover, Progress, Radio Group
- Resizable, Scroll Area, Select, Separator
- Sheet, Skeleton, Slider, Sonner
- Switch, Table, Tabs, Textarea
- Toast, Toggle, Toggle Group, Tooltip
