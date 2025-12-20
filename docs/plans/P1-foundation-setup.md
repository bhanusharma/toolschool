# P1: Foundation Setup

## Overview

**Objective**: Set up a working Payload CMS on Cloudflare Workers with D1 database and R2 storage, including all core data models and seed data.

**Approach**: Use the official Payload Cloudflare D1 template as the starting point.

**End State**: A deployed CMS at `toolschool.pages.dev` (or custom domain) with:
- Admin panel accessible at `/admin`
- All collections defined and migrated
- Sample data seeded
- R2 bucket for media uploads

---

## Phase 1A: Project Scaffold

### Task 1.1: Clone and Configure Template

**Description**: Initialize the project using the official Payload Cloudflare template.

**Steps**:
1. Clone the template:
   ```bash
   npx create-payload-app@latest toolschool -t with-cloudflare-d1
   ```
2. Move contents to project root (or work within the new directory)
3. Install dependencies: `pnpm install`
4. Login to Cloudflare: `pnpm wrangler login`

**Acceptance Criteria**:
- [ ] Project structure matches template
- [ ] `pnpm dev` starts without errors
- [ ] Can access `/admin` locally

---

### Task 1.2: Configure Wrangler Bindings

**Description**: Set up D1 database and R2 bucket bindings.

**Steps**:
1. Create D1 database:
   ```bash
   pnpm wrangler d1 create toolschool-db
   ```
2. Create R2 bucket:
   ```bash
   pnpm wrangler r2 bucket create toolschool-media
   ```
3. Update `wrangler.jsonc` with binding IDs
4. Enable D1 read replicas (optional, can do later)

**Acceptance Criteria**:
- [ ] D1 database created and bound
- [ ] R2 bucket created and bound
- [ ] `wrangler.jsonc` properly configured

---

### Task 1.3: Environment Setup

**Description**: Configure environment variables and local development.

**Steps**:
1. Create `.env` from `.env.example`
2. Generate `PAYLOAD_SECRET`: `openssl rand -base64 32`
3. Create `.dev.vars` for local Cloudflare development
4. Update `.gitignore` to exclude sensitive files

**Files to create**:
```
.env
.dev.vars
```

**Acceptance Criteria**:
- [ ] `.env` contains PAYLOAD_SECRET
- [ ] Local development works with `pnpm dev`

---

## Phase 1B: Taxonomy Collections

### Task 1.4: Tool Categories

**Description**: Create the ToolCategories collection for categorizing AI tools.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Category name (Text, Image, Video, etc.) |
| slug | text | yes | URL-friendly identifier |
| description | textarea | no | Category description |
| icon | text | no | Lucide icon name |
| color | text | no | Hex color for UI |
| order | number | no | Display order |

**Seed Data**:
- Text, Image, Video, Audio, Code, 3D, Design, Web

**Acceptance Criteria**:
- [ ] Collection created in `src/collections/taxonomies/ToolCategories.ts`
- [ ] Registered in `payload.config.ts`
- [ ] Migration created and applied

---

### Task 1.5: Creation Types

**Description**: What users can create with AI tools.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Type name |
| slug | text | yes | URL-friendly identifier |
| icon | text | no | Emoji or icon |
| tagline | text | no | Short description |
| description | textarea | no | Full description |
| color | text | no | Primary color |
| gradientColor | text | no | Gradient end color |
| featuredImage | upload | no | Representative image |

**Seed Data**:
- Writing, Images, Video, Audio, Code, Design, Data, Automation, Education, Business

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Registered in config
- [ ] Migration applied

---

### Task 1.6: Maker Specialties

**Description**: Expertise areas for AI creators.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Specialty name |
| slug | text | yes | URL-friendly identifier |
| description | textarea | no | Description |

**Seed Data**:
- Music, Generative Art, Fashion, Image Generation, Botanical, Video, 3D, Writing, Code, Design

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Registered in config
- [ ] Migration applied

---

### Task 1.7: Community Types

**Description**: Categories for community projects.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Type name |
| slug | text | yes | URL-friendly identifier |
| description | textarea | no | Description |
| icon | text | no | Icon |

**Seed Data**:
- websites, images, videos, music

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Migration applied

---

### Task 1.8: News Categories

**Description**: Categories for news/articles.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Category name |
| slug | text | yes | URL-friendly identifier |
| color | text | no | Badge color |

**Seed Data**:
- TRENDING, BREAKING, NEW RELEASE, ANALYSIS, INDUSTRY, POLICY, RESEARCH, TUTORIAL

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Migration applied

---

### Task 1.9: User Situations

**Description**: Target user personas for AI tool recommendations.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Persona name |
| slug | text | yes | URL-friendly identifier |
| icon | text | no | Emoji |
| tagline | text | no | Short tagline |
| description | textarea | no | Full description |
| color | text | no | Primary color |
| accentColor | text | no | Accent color |
| avatar | upload | no | Avatar image |
| painPoints | array | no | Array of {title, severity} |
| goals | array | no | Array of {title, priority} |
| experienceLevel | select | no | beginner/intermediate/advanced |
| budgetRange | select | no | free/low/medium/high |
| timeAvailability | select | no | minimal/moderate/dedicated |

**Seed Data**:
- Content Creator, Indie Hacker, Designer, Developer, Educator, Student, Marketer

**Acceptance Criteria**:
- [ ] Collection created with all fields
- [ ] Migration applied

---

## Phase 1C: Main Collections

### Task 1.10: Tools Collection

**Description**: Primary collection for AI tools directory.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Tool name |
| slug | text | yes | Unique URL slug |
| tagline | text | no | Max 120 chars |
| content | richText | no | Full description |
| excerpt | textarea | no | Short summary |
| logo | upload | no | Tool logo |
| website | text | no | Official URL |
| featured | checkbox | no | Featured flag |
| pricingModel | select | no | free/freemium/paid/custom |
| pricingSummary | text | no | Pricing overview |
| difficulty | select | no | beginner/intermediate/advanced |
| useCases | select (multi) | no | writing/images/video/audio/code/design/data/automation/education/business |
| platforms | select (multi) | no | web/ios/android/mac/windows/api/plugin |
| keyFeatures | array | no | Array of {icon, title, description} |
| toolCategory | relationship | no | → ToolCategories |
| creationTypes | relationship (multi) | no | → CreationTypes |
| userSituations | relationship (multi) | no | → UserSituations |
| stats | group | no | {users, rating, company, launchYear} |

**Acceptance Criteria**:
- [ ] Collection created with all fields
- [ ] Relationships to taxonomies work
- [ ] Admin UI shows tabbed interface
- [ ] Migration applied

---

### Task 1.11: Makers Collection

**Description**: AI creator profiles.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Maker name |
| slug | text | yes | Unique URL slug |
| bio | textarea | no | Short bio |
| content | richText | no | Full profile |
| location | text | no | City, Country |
| profileImage | upload | no | Profile photo |
| backgroundImage | upload | no | Cover image |
| website | text | no | Personal website |
| experienceLevel | select | no | beginner/intermediate/advanced/expert |
| toolsExpertise | relationship (multi) | no | → Tools |
| availability | select | no | available/selective/unavailable/open-source-only |
| socialLinks | array | no | Array of {platform, url} |
| specialties | relationship (multi) | no | → MakerSpecialties |
| featured | checkbox | no | Featured in slider |
| featuredPosition | number | no | 1-10 position |

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Relationships work
- [ ] Migration applied

---

### Task 1.12: Projects Collection

**Description**: Community showcase for AI-powered creations.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Project name |
| slug | text | yes | Unique URL slug |
| content | richText | no | Description |
| excerpt | textarea | no | Short summary |
| featuredImage | upload | no | Main image |
| heroBackground | upload | no | Hero banner |
| projectYear | number | no | Year created |
| projectAuthor | text | no | Creator name |
| projectUrl | text | no | Live URL |
| demoUrl | text | no | Demo link |
| githubUrl | text | no | Repository |
| workflow | textarea | no | Creation process |
| difficulty | select | no | beginner/intermediate/advanced/expert |
| timeSpent | text | no | Duration |
| toolsUsed | array | no | Array of {name, category, url, usage} |
| views | number | no | View count |
| duration | text | no | For audio/video |
| genre | text | no | Style/genre |
| audioFile | upload | no | Audio attachment |
| videoFile | upload | no | Video attachment |
| mediaGallery | upload (multi) | no | Additional images |
| socialLinks | array | no | Array of {platform, url} |
| communityType | relationship | no | → CommunityTypes |
| featuredInHero | checkbox | no | Homepage hero |
| featuredInShowcase | checkbox | no | Showcase section |

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Media uploads work with R2
- [ ] Migration applied

---

### Task 1.13: Posts Collection

**Description**: News and educational articles.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Article title |
| slug | text | yes | Unique URL slug |
| content | richText | no | Article content |
| excerpt | textarea | no | Short summary |
| featuredImage | upload | no | Featured image |
| categoryBadge | select | no | TRENDING/BREAKING/NEW RELEASE/etc. |
| publicationDateOverride | date | no | Custom publish date |
| newsCategory | relationship | no | → NewsCategories |
| author | relationship | no | → Users |

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Migration applied

---

### Task 1.14: Examples Collection

**Description**: Step-by-step AI creation tutorials.

**Fields**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | yes | Example title |
| slug | text | yes | Unique URL slug |
| tagline | text | no | Max 120 chars |
| content | richText | no | Full content |
| difficultyLevel | select | no | beginner/intermediate/advanced |
| timeToCreate | select | no | 5-minutes/10-minutes/30-minutes/1-hour/etc. |
| costRange | select | no | free/under-10/10-25/25-50/50-100/over-100 |
| creatorInfo | group | no | {name, title, website} |
| toolsUsed | array | no | Array of {name, purpose} |
| stepByStep | array | no | Array of {stepNumber, title, description} |
| promptsUsed | array | no | Array of {tool, prompt} |
| beforeAfter | group | no | {before: upload, after: upload} |
| keyOutcomes | array | no | Array of {outcome, metric} |
| lessonsLearned | textarea | no | Lessons learned |
| downloadFiles | array | no | Array of {name, file, description} |
| helpfulLinks | array | no | Array of {title, url, description} |
| creationType | relationship | no | → CreationTypes |

**Acceptance Criteria**:
- [ ] Collection created
- [ ] Migration applied

---

## Phase 1D: Seed Data & Deploy

### Task 1.15: Create Seed Script

**Description**: Script to populate initial data from VibeMake exports.

**Steps**:
1. Create `scripts/seed.ts`
2. Parse `VibeMake-main/generated-tools-v2/` JSON files
3. Map VibeMake tool schema to our Tools collection
4. Create sample makers, projects, news
5. Seed all taxonomy terms

**Data Sources**:
- Tools: `VibeMake-main/generated-tools-v2/*.json`
- Sample makers: Holly Herndon, Refik Anadol, etc. (from vibemake-core.php)
- Sample projects: From community_project examples

**Acceptance Criteria**:
- [ ] Seed script runs without errors
- [ ] All taxonomy terms created
- [ ] At least 20 tools imported
- [ ] At least 5 sample makers created
- [ ] At least 5 sample projects created

---

### Task 1.16: Run Migrations

**Description**: Apply all database migrations.

**Steps**:
1. Create migration: `pnpm payload migrate:create`
2. Apply locally: `wrangler d1 migrations apply toolschool-db --local`
3. Verify schema in D1

**Acceptance Criteria**:
- [ ] All tables created
- [ ] No migration errors
- [ ] Can query tables via D1 console

---

### Task 1.17: Deploy to Cloudflare

**Description**: Deploy the CMS to production.

**Steps**:
1. Run: `pnpm run deploy`
2. Apply production migrations
3. Run seed script against production
4. Verify admin panel at production URL

**Acceptance Criteria**:
- [ ] Deployed successfully
- [ ] Admin panel accessible
- [ ] Can create/edit content
- [ ] Media uploads work (R2)

---

### Task 1.18: Verify & Document

**Description**: Final verification and documentation.

**Steps**:
1. Test all collections in admin
2. Test media uploads
3. Test relationships between collections
4. Document any issues or deviations
5. Update CLAUDE.md with actual URLs/configuration

**Acceptance Criteria**:
- [ ] All collections functional
- [ ] Media uploads to R2 working
- [ ] Admin authentication working
- [ ] Documentation updated

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| D1 adapter issues | High | Check Payload GitHub issues, use workarounds from CFpayload docs |
| Bundle size > 3MB | High | Requires paid plan, already documented |
| R2 uploads fail | Medium | Fall back to external S3 if needed |
| GraphQL not working | Low | Use REST API endpoints instead |

---

## Success Metrics

- [ ] Admin panel loads in < 2s
- [ ] Can CRUD all collections
- [ ] Media uploads work
- [ ] D1 queries execute successfully
- [ ] Zero console errors in production

---

## Next Phase Preview

**P2: Frontend Foundation** will include:
- Next.js App Router setup
- API routes for data fetching
- Homepage with hero, tools, makers sections
- Basic navigation and layout
- Clerk authentication integration
