# React Documentation

> Source: Context7 - /websites/react_dev
> Last Updated: December 2025

## Installation

```bash
npm install react react-dom
```

## Basic Component Rendering

```javascript
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

## Component with JSX

```javascript
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

## State Management with useState

```javascript
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

## React Compiler (New)

### Installation

```bash
npm install -D babel-plugin-react-compiler@latest
# or
yarn add -D babel-plugin-react-compiler@latest
# or
pnpm install -D babel-plugin-react-compiler@latest
```

### ESLint Plugin

```bash
npm install -D eslint-plugin-react-hooks@latest
```

### Babel Configuration

```javascript
module.exports = {
  plugins: [
    'babel-plugin-react-compiler', // must run first!
    // ... other plugins
  ],
  // ... other config
};
```

### Vite Configuration

```javascript
// vite.config.js
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});
```

## Creating a React App

```bash
npx create-next-app@latest
```

## Key Concepts

- **Components**: Reusable UI building blocks
- **Props**: Pass data to components
- **State**: Component-local reactive data
- **Hooks**: Functions for state and side effects (useState, useEffect, etc.)
- **Server Components**: Components that render on the server (React 19+)
