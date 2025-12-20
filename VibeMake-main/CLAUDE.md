# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VibeMake is a headless WordPress application with:
- WordPress backend (PHP 8.2+) providing content via WPGraphQL
- Next.js 15 frontend (React 19) with TypeScript
- Custom post types: tools, makers, community_projects
- AI-powered search with fuzzy matching and relevance scoring

## Project Structure

The repository has been reorganized with the following structure:
```
Vibe&Make/
├── Headless Frontend/
│   └── Vibe&Make.com - WP Headless/
│       ├── frontend/          # Next.js application
│       ├── backend/           # WordPress files and custom code
│       ├── all-assets/        # Image and SVG assets
│       └── docs/              # Documentation
└── Wordpress/                 # Local WordPress development environment
    ├── app/public/           # WordPress installation
    └── conf/                 # Server configurations
```

## Essential Commands

### Frontend Development
```bash
cd "Headless Frontend/Vibe&Make.com - WP Headless/frontend"
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
npm run test         # Jest unit tests
npm run test:e2e     # Playwright E2E tests
npm run codegen      # Generate GraphQL types from schema
```

### Backend Development
```bash
cd "Headless Frontend/Vibe&Make.com - WP Headless/backend"
# WordPress runs on http://localhost:8080
# phpMyAdmin: http://localhost:8081
# MailHog: http://localhost:8025
```

## Architecture & Key Concepts

### Design Specifications
- **Container max-width**: 1440px (ALL sections, header, footer, and components)
- **Horizontal padding**: px-12 (48px on each side)
- **Effective content width**: 1440px - 96px = 1344px
- **No full-width sections**: Everything must be constrained within max-w-[1440px]

### Data Flow (Updated Architecture - API Routes)
1. WordPress stores content with ACF custom fields
2. WPGraphQL exposes data via GraphQL API (server-side only)
3. **API Routes** (`/api/*`) fetch from GraphQL using server-only client (`frontend/src/lib/api/graphql-server.ts`)
4. **Server Components** fetch from API routes with Next.js caching
5. **Client Components** receive data as props or use API hooks
6. React Query manages client-side caching for dynamic data
7. Next.js cache tags enable granular revalidation

### API Architecture
All GraphQL queries are now routed through Next.js API endpoints to:
- Keep GraphQL endpoint secure (not exposed to client)
- Enable server-side caching with proper cache headers
- Reduce client bundle size (no GraphQL client code)
- Transform and optimize data before sending to client

#### Available API Endpoints
- `/api/tools` - List tools with pagination and filtering
- `/api/tools/[slug]` - Get single tool
- `/api/tools/categories` - Get tool categories
- `/api/makers` - List makers with pagination
- `/api/makers/featured` - Get featured makers
- `/api/projects` - List projects
- `/api/projects/hero` - Get hero project
- `/api/posts` - List posts/news
- `/api/search` - Unified search across all content types
- `/api/home` - Consolidated home page data

#### API Response Format
```typescript
// Success
{
  "data": {...},
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "hasMore": true
  }
}

// Error
{
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND"
  }
}
```

### Search Implementation
- Located in `frontend/src/components/SearchModal.tsx`
- Uses custom scoring algorithm for relevance
- Fuzzy matching via Fuse.js for typo tolerance
- Keyboard shortcuts: `/` or `Cmd+K` to open
- Search modal renders via React Portal

### GraphQL Type Safety
1. Schema changes require running `npm run codegen`
2. Types are generated in `frontend/src/graphql/generated.ts`
3. Use generated types for all GraphQL operations

### Caching Strategy
- Next.js cache tags: `all-posts`, `post-${id}`, `all-tools`, etc.
- Webhook endpoint: `/api/revalidate` for WordPress updates
- Redis object caching in production
- React Query for client-side state

### Component Architecture
- UI components in `frontend/src/components/ui/` (Radix UI based)
- Feature components organized by domain
- Use `cn()` utility for className composition
- Variants handled via Class Variance Authority (CVA)

## CRITICAL DESIGN RULES

### NO FULL-WIDTH SECTIONS (ABSOLUTE RULE)
**NOTHING in this project should ever be full width. No section will ever go full width.**

❌ **NEVER DO THIS:**
```tsx
<section className="w-full bg-white">
  <div className="max-w-[1440px] mx-auto px-12">
    <!-- content -->
  </div>
</section>
```

✅ **ALWAYS DO THIS:**
```tsx
<section className="max-w-[1440px] mx-auto px-12 bg-white">
  <!-- content -->
</section>
```

- ALL sections must be constrained to `max-w-[1440px]` (updated from 1280px to match Figma design)
- Maximum width is 1440px as per the design specifications
- Background colors should be applied to the constrained section, not a full-width wrapper
- Use `rounded-lg` for sections with background colors when appropriate
- This applies to EVERY component and page in the entire project

### NO ROUNDED EDGES ON IMAGES (ABSOLUTE RULE)
**NEVER add rounded corners/edges to any images in this project. All images must have sharp corners.**
- ❌ NEVER use `rounded-lg`, `rounded-md`, `rounded`, or any rounded class on images
- ✅ Images should always have sharp, square corners
- This applies to ALL images: hero images, thumbnails, gallery images, profile pictures, etc.

### SCREENSHOT ANALYSIS PROTOCOL (ABSOLUTE RULE)
**When given a screenshot, ALWAYS analyze it thoroughly before proposing solutions.**
1. **LOOK FIRST**: Carefully examine and describe what I see in the image
2. **IDENTIFY THE ISSUE**: Clearly articulate the specific problem being shown
3. **CONFIRM UNDERSTANDING**: Ask for confirmation that I've understood correctly
4. **NO RUSHING**: Never jump to fixes without fully understanding the problem
5. **NO HALLUCINATION**: If I cannot see the image properly, I must say so instead of making assumptions
6. **SLOW DOWN**: Take time to think and understand before attempting any fixes

## Critical Files

- `frontend/src/app/api/revalidate/route.ts` - Webhook for cache invalidation
- `frontend/src/lib/api/graphql-server.ts` - Server-only GraphQL client
- `frontend/src/lib/api/base.ts` - API response helpers and error handling
- `frontend/src/lib/api/client.ts` - Frontend API client for consuming endpoints
- `frontend/src/app/api/*` - API route handlers for all data types
- `frontend/src/graphql/queries.ts` - All GraphQL queries (server-side only)
- `backend/wp-content/themes/vibemake-api/` - Headless WordPress theme
- `backend/wp-content/plugins/vibemake-functionality/` - Custom post types & fields

## Development Guidelines

### When Adding Features
1. Create API route in `frontend/src/app/api/`
2. Use server-only GraphQL client in API routes
3. Define GraphQL queries in `frontend/src/graphql/queries.ts`
4. Run `npm run codegen` after schema changes
5. Update or create React Query hooks to use API endpoints
6. Add appropriate cache tags for revalidation
7. Follow existing component patterns (CVA for variants)

### Testing Requirements
- Write unit tests for utilities and hooks
- Add E2E tests for critical user flows
- Ensure TypeScript types are properly defined
- Run `npm run lint` and `npm run type-check` before commits

### Performance Considerations
- Use Next.js Image component for all images
- Implement loading states with skeletons
- Add proper error boundaries
- Consider bundle size (run `npm run analyze`)
- Use dynamic imports for heavy components

## Environment Variables

Frontend requires:
- `NEXT_PUBLIC_WORDPRESS_URL` - WordPress API endpoint
- `WORDPRESS_AUTH_REFRESH_TOKEN` - For authenticated requests
- `REVALIDATION_SECRET` - Webhook security

## Performance Monitoring with SpeedMeister (Easter Egg)

SpeedMeister is our hidden visual performance monitoring tool. It's an Easter egg feature for advanced users:
- **Toggle**: Press `Cmd+Shift+\` (Mac) or `Ctrl+Shift+\` (Windows/Linux) - backslash for hidden access
- **Position**: Bottom-left corner to stay out of the way
- **Documentation**: See `/frontend/docs/SPEEDMEISTER.md`

Key features:
- Lazy-loaded after page is fully loaded (zero performance impact)
- Page load timing waterfall
- Color-coded performance indicators (green=fast, red=slow)
- Filterable by page type
- Minimizable overlay

Note: URL parameter access has been removed to keep this feature hidden from regular users.

## Common Tasks

### Adding a New Post Type
1. Define in `backend/wp-content/plugins/vibemake-functionality/`
2. Add ACF field group via WordPress admin
3. Create GraphQL query in frontend
4. Generate types with `npm run codegen`
5. Build React components to display data

### Updating Search Functionality
- Search logic in `frontend/src/hooks/useSearch.ts`
- Scoring algorithm in `frontend/src/lib/search.ts`
- Modal UI in `frontend/src/components/SearchModal.tsx`

### Cache Debugging
- Check Next.js cache headers in browser DevTools
- Monitor webhook logs at `/api/revalidate`
- Use React Query DevTools in development

## MCP Servers

### MCP Configuration
- **Project Configuration**: `.mcp.json` in project root (version controlled)
- **WordPress MCP**: Connects to `http://vibemake.local/wp-json/wp/v2/wpmcp/streamable` with JWT authentication
- **Figma Dev Mode**: Runs on `http://127.0.0.1:3845/sse` for design-to-code conversion

### WordPress GraphQL via MCP
- **GraphQL Endpoint**: `http://vibemake.local/graphql`
- **Authentication**: Bearer JWT token in Authorization header
- **Available Types**: `makers`, `tools`, `community_projects`, `posts`, `pages`
- Use GraphQL endpoint instead of REST API for authenticated queries

### Figma Dev Mode MCP Rules
- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided
- IMPORTANT: Always use components from `/src/components/ui` when possible (our design system location)
- Prioritize Figma fidelity to match designs exactly
- Avoid hardcoded values, use design tokens from Figma where available
- Follow WCAG requirements for accessibility
- Add component documentation
- Place UI components in `/src/components/ui`; avoid inline styles unless truly necessary

## Git Best Practices (ALWAYS FOLLOW)

### Before Making Risky Changes:
1. **Always commit stable state first**:
   ```bash
   git add -A
   git commit -m "Stable: [describe what's working]"
   ```

2. **Create feature branch for risky work**:
   ```bash
   git checkout -b fix/[descriptive-name]
   ```

3. **Push stable state to remote**:
   ```bash
   git push origin main
   ```

### During Development:
- Commit frequently with clear messages
- Never work directly on main for experimental changes
- If something breaks, you can always: `git checkout main`

### Signs It's Time to Commit:
- Just fixed a major issue and everything works
- About to attempt something that might break things
- Completed a feature that the user is happy with
- Before any major refactoring
- When the user mentions "stable" or expresses satisfaction

### Commit Message Format:
- "Fix: [what was broken]"
- "Add: [new feature]"  
- "Stable: [what's working]"
- "Refactor: [what was changed]"

## Production Deployment Workflow

### Pre-Push Checklist
Before pushing any code to GitHub for production deployment, Claude Code MUST follow this workflow:

1. **Run All Tests**
   ```bash
   cd "Headless Frontend/Vibe&Make.com - WP Headless/frontend"
   npm run lint              # Must pass with no errors
   npm run type-check        # Must pass with no TypeScript errors
   npm run test              # All unit tests must pass
   npm run test:e2e          # All E2E tests must pass (if time permits)
   npm run build             # Production build must succeed
   ```

2. **Show Running Application to User**
   ```bash
   npm run dev               # Start development server
   # Inform user: "The application is running at http://localhost:3000"
   # Wait for user confirmation before proceeding
   ```

3. **Only After User Approval**
   - Commit changes with descriptive message
   - Push to GitHub production

IMPORTANT: Always show the running application to the user BEFORE pushing to production. This allows the user to test and verify changes work correctly.

2. **Verify GraphQL Types**
   ```bash
   npm run codegen           # Ensure types are up-to-date
   git status                # Check for uncommitted generated files
   ```

3. **Performance Checks**
   ```bash
   npm run analyze           # Check bundle size hasn't regressed
   ```

4. **Backend Validation** (if backend changes)
   ```bash
   cd "Headless Frontend/Vibe&Make.com - WP Headless/backend"
   # Run WordPress coding standards check
   ./vendor/bin/phpcs
   # Run PHP unit tests if available
   ./vendor/bin/phpunit
   ```

### Deployment Process
1. Create a new branch for the feature/fix
2. Complete all pre-push checks above
3. Commit with clear, descriptive messages
4. Push to GitHub and create a pull request
5. Wait for CI/CD pipeline to complete
6. Merge only after all checks pass

### Emergency Hotfixes
Even for urgent fixes:
- Run at minimum: `npm run lint`, `npm run type-check`, and `npm run build`
- Document why full test suite was skipped in commit message
- Schedule follow-up for comprehensive testing

### Production Environment Notes
- Main branch deploys automatically to production
- Staging branch deploys to staging environment
- Feature branches can be deployed to preview environments
- Database migrations must be tested on staging first
- Always backup production database before major updates

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.