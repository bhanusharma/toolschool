# Phase 1: First Tutorial — "Build Your AI Second Brain"

## Overview

**Goal:** Ship one complete tutorial for 10 friends & family testers.

**What they build:** A personal system that captures ideas, processes them with AI, and organizes them automatically.

**The framework:**
- **Knowledge Base** = Memory (Notion or Airtable)
- **AI Model** = Reasoning (Claude or ChatGPT)
- **Automation** = Hands (Zapier or Make)

---

## Tutorial Spec

### Title
"Build Your AI Second Brain in 45 Minutes"

### Subtitle
"Create a system that captures your ideas, processes them with AI, and organizes everything automatically."

### What User Gets
A working automation where:
- They add a thought/note/idea to their knowledge base
- AI automatically summarizes, tags, and extracts action items
- Everything is organized and searchable

---

## Tool Options

| Role | Primary Path | Alternative |
|------|--------------|-------------|
| **Knowledge Base** | Notion | Airtable |
| **AI Reasoning** | Claude (via Zapier) | ChatGPT (via Zapier) |
| **Automation** | Zapier | Make |

Tutorial teaches the **primary path** but provides alternative instructions at each step.

---

## Tutorial Structure

### Introduction (5 min read)
- What is an "AI Second Brain"?
- Why this matters (never lose an idea, always organized)
- What you'll build today
- Prerequisites: Free accounts for Notion, Zapier, and Claude/ChatGPT

### Part 1: Set Up Your Knowledge Base (10 min)

**Primary: Notion**
1. Create a new Notion database called "Second Brain"
2. Add fields:
   - `Content` (text) — your raw thought
   - `Source` (select) — where it came from (manual, email, voice, etc.)
   - `Summary` (text) — AI-generated summary
   - `Tags` (multi-select) — AI-generated tags
   - `Action Items` (text) — AI-extracted tasks
   - `Processed` (checkbox) — automation status
   - `Date` (date) — auto-set on creation
3. Create a template for quick entry
4. Test: Add one sample thought

**Alternative: Airtable**
> Collapsible section with Airtable-specific setup

### Part 2: Connect Your Automation Tool (10 min)

**Primary: Zapier**
1. Create Zapier account (free tier works)
2. Start new Zap
3. Trigger: "New Database Item" in Notion
4. Connect Notion account, select "Second Brain" database
5. Filter: Only run when `Processed` is unchecked
6. Test trigger with your sample thought

**Alternative: Make**
> Collapsible section with Make-specific setup

### Part 3: Add AI Processing (15 min)

**Primary: Claude via Zapier**
1. Add action: "Anthropic (Claude)" → "Send Message"
2. Connect Claude account (uses native Zapier integration, no API key)
3. Configure prompt:

```
Analyze this note and provide:

1. SUMMARY: A 1-2 sentence summary
2. TAGS: 3-5 relevant tags (comma-separated)
3. ACTION ITEMS: Any tasks or to-dos mentioned (or "None")

Note content:
{{Content}}

Respond in this exact format:
SUMMARY: [your summary]
TAGS: [tag1, tag2, tag3]
ACTION ITEMS: [task1; task2] or None
```

4. Test with sample data

**Alternative: ChatGPT via Zapier**
> Same flow but using OpenAI integration instead

### Part 4: Update Your Knowledge Base (10 min)

1. Add action: "Notion" → "Update Database Item"
2. Map AI response to fields:
   - Parse SUMMARY → `Summary` field
   - Parse TAGS → `Tags` field
   - Parse ACTION ITEMS → `Action Items` field
   - Set `Processed` → checked
3. Test full automation
4. Verify: Check Notion to see updated entry

### Part 5: Test End-to-End (5 min)

1. Add a new real thought to your Notion database
2. Wait for Zapier to process (usually <2 min)
3. Check that all fields populated correctly
4. Celebrate — you built an AI system!

### What's Next (2 min read)

**Expand your inputs:**
- Add email forwarding to capture ideas from inbox
- Connect voice memos via transcription
- Capture Twitter/X bookmarks
- Add Slack messages

**Level up:**
- Create views in Notion (by tag, by date, action items only)
- Add weekly digest automation
- Build a "review queue" for unprocessed items

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Completion rate | 8/10 testers finish |
| Time to complete | ~45 min average |
| Working automation | Automation runs successfully |
| Real usage | Tester adds 1+ real notes after tutorial |

---

## Feedback Questions for Testers

1. Did you complete the full tutorial? If not, where did you stop?
2. How long did it actually take you?
3. Which step was most confusing?
4. Would you keep using this system? Why/why not?
5. What workflow would you want to learn next?
6. How would you describe this to a friend?

---

## Build Requirements

### Content
- [ ] Write full tutorial content (markdown)
- [ ] Create/source screenshots for each step
- [ ] Write alternative paths (Airtable, ChatGPT, Make)
- [ ] Create Notion template users can duplicate

### Platform
- [ ] Create `/learn` route
- [ ] Build tutorial page layout
- [ ] Add collapsible sections for alternatives
- [ ] Mobile-friendly design

---

## Timeline

| Task | Owner | Status |
|------|-------|--------|
| Finalize tutorial content | TBD | Not started |
| Build tutorial page | Claude Code | Not started |
| Create Notion template | TBD | Not started |
| Internal testing | TBD | Not started |
| Ship to 10 testers | TBD | Not started |

---

*Document created: December 2025*
