# Claude Tips

## Important Project Rules

### NO FULL-WIDTH SECTIONS (VibeMake Project)
**CRITICAL RULE: NOTHING in the VibeMake project should ever be full width. No section will ever go full width.**

❌ **NEVER DO THIS:**
```tsx
<section className="w-full bg-white">
  <div className="max-w-[1280px] mx-auto px-12">
    <!-- content -->
  </div>
</section>
```

✅ **ALWAYS DO THIS:**
```tsx
<section className="max-w-[1280px] mx-auto px-12 bg-white">
  <!-- content -->
</section>
```

- ALL sections must be constrained to `max-w-[1440px]` (updated from 1280px to match Figma design)
- Background colors should be applied to the constrained section, not a full-width wrapper
- Use `rounded-lg` for sections with background colors when appropriate
- This applies to EVERY component and page in the entire VibeMake project

## Diff Compare Process

When finishing UI implementation work:
1. User will provide a screenshot of the implemented design
2. Fetch the original Figma design using get_image with the relevant node ID
3. Compare the screenshot with the Figma design
4. Create a detailed list of differences including:
   - Visual differences (colors, spacing, borders, shadows)
   - Layout issues (positioning, alignment, sizing)
   - Typography differences (font family, size, weight, spacing)
   - Missing elements or incorrect hierarchy
   - Interactive state differences
5. Mark each item as ❌ (missing/wrong) or ⚠️ (partially correct)
6. Provide a summary of the main issues to fix

## General Tips

- When asked to remember something important, store it in both CLAUDE.md and Claude Tips.md
- Always check documentation first before implementing solutions
- Search GitHub issues and forums before creating custom solutions
- Follow official patterns from documentation
- Document solutions for future reference