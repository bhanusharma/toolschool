# Product Requirements Document: ToolSchool.ai MVP for Marketing Operations

## 1.0 Overview & Strategic Context

This Product Requirements Document (PRD) defines the scope and specifications for the Minimum Viable Product (MVP) of ToolSchool.ai. This new web-based platform is designed to capitalize on specific, identified gaps in the AI education market by delivering practical, outcome-driven training. The strategic focus of this MVP is to validate the core value proposition with an initial, high-value target segment: Marketing Operations (Marketing Ops) professionals.

### 1.1 Product Vision

The vision for ToolSchool.ai is to be the premier destination for professionals seeking to master the modern AI-powered tool stack. Our positioning is simple and direct: **"Learn the tools. Build real systems. Get certified."** ToolSchool.ai is not another platform for general AI theory or basic prompting. It is a modern "trade school for AI tools," focused on teaching vendor-neutral, cross-tool workflow mastery that delivers tangible, career-relevant outcomes.

### 1.2 Problem Statement

Non-technical professionals, particularly in roles like Marketing Operations, face a significant and growing challenge. They are expected to leverage a rapidly evolving ecosystem of AI tools to build and maintain complex, automated systems, but they lack a viable educational path to do so.

**Core Frustrations:**

| Pain Point | Description |
|------------|-------------|
| **Tool Churn** | The UI, features, and capabilities of essential tools change monthly, rendering skills and tutorials obsolete almost as soon as they are learned |
| **Siloed Training** | Vendor academies (e.g., Zapier Learn) teach their own products but fail to instruct on end-to-end workflows with other tools |
| **No Verifiable Competence** | Competing programs offer certificates of completion, but these lack the weight of a real, portfolio-worthy project that proves actual capability |

### 1.3 Strategic Opportunity

| Advantage | Description |
|-----------|-------------|
| **Cross-Tool Workflow Mastery** | Teach what vendor academies cannot: end-to-end, multi-tool workflows (e.g., Notion → Airtable → Zapier → Slack → AI model) |
| **Role-Based Outcomes** | Focus exclusively on Marketing Ops job family with tangible, role-relevant outcomes |
| **Practical Competence** | Portfolio-worthy projects ("graded builds") vs. simple completion certificates |
| **Rapid Curriculum Updates** | Using Claude Code for development enables shipping curriculum updates faster than university-backed competitors |

### 1.4 Current Assets (Live)

The MVP builds upon existing, deployed features:

| Asset | Status | Details |
|-------|--------|---------|
| **Tool Library** | Live | 50+ AI tools catalogued with categories and use-cases |
| **News Section** | Live | 16+ curated AI news articles |
| **Builders Section** | Live | 10 practitioner profiles showcasing real-world tool usage |
| **Infrastructure** | Live | Next.js 16, PayloadCMS, Cloudflare Workers, D1 database |

---

## 2.0 Target Audience: The Marketing Operations Professional

### 2.1 User Persona Profile

| Attribute | Details |
|-----------|---------|
| **Name** | Alex Chen |
| **Role** | Marketing Operations Manager |
| **Experience** | 3-7 years in a tech-focused company |

**Goals:**
- Automate repetitive marketing tasks (lead enrichment, campaign reporting, content pipeline)
- Demonstrate tangible ROI on the marketing technology stack
- Build reliable, multi-step AI-powered workflows without depending on engineering
- Stay current with latest AI tools and best practices

**Frustrations:**
- *"I learn a new tool, and its UI changes completely the next month."*
- *"Vendor tutorials only show their product, not how to connect it to our stack."*
- *"Online courses give me certificates, but I don't have a working project to show my manager."*
- *"Most 'AI for Marketing' content is just theory. I need outputs—a workflow that runs, an agent that ships."*

### 2.2 Key User Stories

| # | User Story |
|---|------------|
| 1 | **Discovery & Trial**: "As a Marketing Ops Manager, I want to access a free, hands-on tutorial so that I can evaluate if the platform's practical focus is right for me." |
| 2 | **Core Learning**: "As a subscriber, I want access to a complete learning track for Marketing Ops so that I can master a curated stack of tools relevant to my job." |
| 3 | **Practical Application**: "As a learner, I want to download pre-built workflow templates so that I can quickly implement solutions for common tasks." |
| 4 | **Skill Validation**: "As a professional, I want to complete a capstone project so that I can build a portfolio piece and earn meaningful certification." |
| 5 | **Staying Current**: "As a user, I want regular updates on key AI tools so that my skills don't become obsolete." |

---

## 3.0 MVP Feature Requirements

### 3.1 Core Experience: The "Marketing Ops School" Track

The central pillar of the MVP—a structured, role-based curriculum guiding users through increasingly complex, cross-tool workflows.

**Curated Tool Stack:**
- ChatGPT Plus / Claude
- Zapier / Make.com / n8n
- Notion / Airtable
- Miro (workflow design)

**Curriculum Structure:**
- 5-7 modules from foundations to advanced system building
- Each module produces a portfolio-worthy output
- Hands-on instruction, not just video lectures

### 3.2 Feature: "ToolSchool Certified Workflow" Library

A curated library of ready-to-use workflow templates (3-5 for MVP):

| Workflow | Description |
|----------|-------------|
| Marketing Content Pipeline | Content ideation → drafting → scheduling → distribution |
| Lead Enrichment Workflow | Ingest → enrich with AI → score → route to CRM |
| Campaign Reporting Automation | Data aggregation → AI summary → Slack delivery |

**Each template includes:**
- Reference architecture diagram
- Downloadable setup scripts/files
- Step-by-step implementation guide with screenshots

### 3.3 Feature: Capstone Project & Certification

**MVP Capstone Scope** (achievable in 2-4 hours):
- Build a marketing automation that: ingests leads → enriches with AI → routes based on score → logs to a database → sends weekly summary

**Grading Rubric:**
- Reliability (does it run without errors?)
- Observability (can you see what happened?)
- Safety (error handling, no data leaks)
- Maintainability (documented, modular)

**Certification:**
- "ToolSchool Certified Marketing Ops Automation"
- Manual instructor review for MVP (automated checks in future)

### 3.4 Feature: "Tool Churn Insurance" Updates

A dashboard section showing:
- "What Changed This Week" feed
- Version notes for key tools in curriculum
- Direct links to patched lessons or updated templates
- Deprecation alerts

*This turns a market-wide negative into a key retention driver.*

### 3.5 Feature: Builder Profiles (Live)

Showcase real practitioners who have built workflows:
- Link projects to tools and techniques taught in curriculum
- Provide social proof and aspirational examples
- Enable community connection

### 3.6 Feature: User Accounts & Subscription Management

- User registration and secure login
- Basic profile management
- Subscription handling via Stripe

---

## 4.0 User Flow & Onboarding

### 4.1 First-Time User Experience (Free Tier)

1. User lands on homepage: **"Learn the tools. Build real systems. Get certified."**
2. Signs up with minimal friction
3. Immediately guided to free "getting started" workflow
4. Goal: **Ship a working workflow in 45 minutes**
5. Full curriculum visible but locked (clear upgrade path)

### 4.2 Pro User Experience (Paid Tier)

- Seamless upgrade via Stripe Checkout
- Instant access to full curriculum
- Complete "Certified Workflow" library
- Capstone submission and certification

---

## 5.0 Technical Requirements

### 5.1 Current Technology Stack

| Category | Technology | Notes |
|----------|------------|-------|
| **Framework** | Next.js 16 (App Router) | React 19, TypeScript, Turbopack |
| **CMS** | PayloadCMS | Headless CMS with admin UI |
| **Database** | Cloudflare D1 (SQLite) | Serverless, edge-deployed |
| **Storage** | Cloudflare R2 | Media and file storage |
| **Deployment** | Cloudflare Workers | Via OpenNext adapter |
| **Styling** | Tailwind CSS v4 | With custom design system |

### 5.2 Development Approach

**"Vibe Coding" with Claude Code:**
- Primary development using Claude Code (Anthropic's CLI for Claude)
- Enables rapid iteration and curriculum updates
- Faster shipping than traditional development or university-backed competitors
- This agility directly enables the "Tool Churn Insurance" feature

### 5.3 Additions for MVP

| Feature | Technology |
|---------|------------|
| **Auth** | Clerk (pre-built components, fast setup) |
| **Payments** | Stripe (Checkout + Webhooks) |
| **Email** | Resend + React Email |
| **Background Jobs** | Inngest (for drip campaigns, notifications) |
| **Analytics** | PostHog (analytics + feature flags) |

### 5.4 AI Model Integration

- Curriculum leverages multiple AI providers (OpenAI, Anthropic, etc.)
- Future: In-app AI assistance for learners

---

## 6.0 Monetization & Packaging

### 6.1 Pricing Structure

| Feature | Free Tier | Pro Tier |
|---------|-----------|----------|
| Access to "Marketing Ops School" | First module only | Full access |
| "Certified Workflow" Library | 1 sample workflow | All workflows |
| "Tool Churn" Updates | Included | Included |
| Capstone Project Submission | Not included | Included |
| Official Certification | Not included | Included upon completion |
| **Price** | $0 | $49/month or $399/year |

*Annual plan = 32% discount, encourages commitment*

---

## 7.0 Success Metrics for MVP

### 7.1 Key Performance Indicators

| Metric | Target | Description |
|--------|--------|-------------|
| **User Activation Rate** | >40% | % of signups completing free workflow in week 1 |
| **Conversion Rate** | >5% | % of free users upgrading to Pro within 30 days |
| **Weekly Active Users** | 500+ | Engaged users per week |
| **Course Progression** | >50% | % of Pro users reaching halfway point |
| **Capstone Completion** | >60% | % of Pro users completing capstone |
| **Traffic** | 10K/month | Monthly visitors to tool library |
| **Email Subscribers** | 500+ | Launch list signups |

---

## 8.0 Phased Rollout

### Phase 1: Foundation (Month 1)
- Free workflow library + tool updates feed
- Email capture and waitlist
- Enhanced tool library content

### Phase 2: Core Curriculum (Month 2)
- First 3 modules of Marketing Ops School
- Pro tier launch with Stripe integration
- Onboarding flow optimization

### Phase 3: Certification (Month 3)
- Full curriculum + capstone project
- Manual certification review process
- Builder profile expansion

---

## 9.0 Future Considerations (Out of Scope for MVP)

| Feature | Description |
|---------|-------------|
| **Additional Role Schools** | Sales Ops, Founders, Customer Support Automation |
| **Team & Enterprise Plans** | Per-seat pricing, admin dashboards, team analytics |
| **ROI Telemetry** | In-platform tools to calculate workflow ROI |
| **Community & Cohorts** | Forums, live capstone reviews, cohort-based learning |
| **Tool Partnerships** | Co-created content with tool vendors |
| **Automated Grading** | Programmatic capstone assessment |

---

*Document Version: 1.1*
*Last Updated: December 2025*
