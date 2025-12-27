# Tailwind CSS Documentation

> Source: Context7 - /websites/tailwindcss
> Last Updated: December 2025

## Installation with Vite

```bash
npm create vite@latest my-project
cd my-project
npm run dev
```

## Basic Usage

### HTML with Tailwind Classes

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

### CSS Entry Point

```css
@import "tailwindcss";
```

## Framework-Specific Setup

### Laravel

```bash
laravel new my-project
cd my-project
```

### Astro

```bash
npm create astro@latest my-project
cd my-project
```

### Gatsby

```bash
gatsby develop
```

### Qwik

```bash
npm create qwik@latest empty my-project
cd my-project
```

### TanStack Start

```bash
npx create-start-app@latest my-project
cd my-project
```

### Parcel

```bash
npx parcel src/index.html
```

## Common Utility Classes

### Typography
- `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- `text-left`, `text-center`, `text-right`
- `underline`, `line-through`, `no-underline`

### Spacing
- `p-{0-12}`, `px-{0-12}`, `py-{0-12}`
- `m-{0-12}`, `mx-{0-12}`, `my-{0-12}`
- `space-x-{0-12}`, `space-y-{0-12}`

### Flexbox
- `flex`, `inline-flex`
- `flex-row`, `flex-col`
- `items-start`, `items-center`, `items-end`
- `justify-start`, `justify-center`, `justify-end`, `justify-between`

### Grid
- `grid`, `grid-cols-{1-12}`
- `gap-{0-12}`

### Colors
- `text-{color}-{shade}` (e.g., `text-blue-500`)
- `bg-{color}-{shade}`
- `border-{color}-{shade}`

### Borders
- `border`, `border-{0-8}`
- `rounded`, `rounded-lg`, `rounded-full`

### Shadows
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Key Features

- **Utility-First**: Build designs directly in HTML
- **JIT Mode**: On-demand CSS generation
- **Responsive**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes
- **Dark Mode**: `dark:` prefix for dark mode styles
- **Custom Colors**: Extend with custom color palette
- **Plugins**: Extend with official and community plugins
