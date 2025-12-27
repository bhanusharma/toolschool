# Lucide React Documentation

> Source: Context7 - /websites/lucide_dev_guide_packages
> Last Updated: December 2025

## Installation

```bash
# pnpm
pnpm add lucide-react

# yarn
yarn add lucide-react

# npm
npm install lucide-react

# bun
bun add lucide-react
```

## Other Lucide Packages

### Core Package

```bash
pnpm add lucide
# or
yarn add lucide
# or
npm install lucide
# or
bun add lucide
```

### Vue 3

```bash
pnpm add lucide-vue-next
# or
yarn add lucide-vue-next
# or
npm install lucide-vue-next
# or
bun add lucide-vue-next
```

### Vue 2

```bash
yarn add lucide-vue
# or
bun add lucide-vue
```

### Solid

```bash
pnpm add lucide-solid
# or
yarn add lucide-solid
# or
npm install lucide-solid
# or
bun add lucide-solid
```

### Static (SVG files)

```bash
pnpm add lucide-static
# or
yarn add lucide-static
# or
npm install lucide-static
# or
bun add lucide-static
```

## Basic Usage (React)

```jsx
import { Camera, Heart, Menu, X } from 'lucide-react';

function App() {
  return (
    <div>
      <Camera />
      <Heart color="red" size={32} />
      <Menu strokeWidth={1.5} />
      <X absoluteStrokeWidth />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number \| string | 24 | Icon size |
| `color` | string | currentColor | Stroke color |
| `strokeWidth` | number | 2 | Stroke width |
| `absoluteStrokeWidth` | boolean | false | Use absolute stroke width |
| `className` | string | - | CSS class |

## Astro Usage

### Generic Icon Component

```astro
---
import LucideIcon from './LucideIcon.astro';
---

<LucideIcon name="Menu" />
```

### With Lab Icons

```astro
---
import { Icon } from '@lucide/astro';
import { burger, sausage } from '@lucide/lab';
---

<Icon iconNode={burger} />
<Icon iconNode={sausage} color="red"/>
```

## Dynamic Icon Component (Not Recommended)

This approach imports all icons and may impact bundle size:

### Vue 3

```vue
<script setup>
import { computed } from 'vue';
import * as icons from "lucide-vue-next";

const props = defineProps({
  name: { type: String, required: true },
  size: Number,
  color: String,
  strokeWidth: Number,
})

const icon = computed(() => icons[props.name]);
</script>

<template>
  <component :is="icon" :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
```

### Solid

```tsx
import { icons, type LucideProps } from 'lucide-solid';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = (props: IconProps) => {
  const [local, others] = splitProps(props, ["name"]);
  return <Dynamic component={icons[local.name]} {...others} />
};
```

## Key Features

- **1400+ Icons**: Comprehensive icon set
- **Tree-Shakeable**: Only import what you use
- **Customizable**: Size, color, stroke width
- **TypeScript**: Full type definitions
- **Consistent Design**: 24x24 grid, 2px stroke
- **Multi-Framework**: React, Vue, Solid, Svelte, Angular, Astro
- **Lab Icons**: Experimental icon set
