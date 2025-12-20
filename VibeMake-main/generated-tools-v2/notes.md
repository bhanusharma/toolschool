# Design Project

This codebase was generated from a Figma file. Refer to it as the **Figma design**.

---

## Directory Structure

/src  
  App.jsx                         // Entrypoint rendering ordered sections from /shared/sections  
  main.jsx                        // Root mount and ReactDOM rendering  

  /components                     // Shared components  
    Header.jsx  
    Footer.jsx  
    Section1.jsx  
    Section2.jsx  
    ...                           // Additional named or fallback UnnamedSectionX components  

  /hooks  
    useBreakpoint.jsx  

  /pages                          // Optional top-level routeable views (user-defined)  

*Note:*  
- The Container.jsx component **must wrap all layout content** to ensure consistent scaling and spacing.  
- All section components unify layout logic across breakpoints using runtime width.  
- Components fall back to `UnnamedSectionX.jsx` only when semantic names cannot be generated.

---

## Development Rules

- The app uses an adaptive rendering strategy: only one layout path is active at runtime, based on viewport width.  
- Breakpoint detection occurs within section components using `useBreakpoint`.  
- Shared components must be breakpoint-agnostic.  
- Each section must be fully wrapped in the shared Container.jsx component.  
- Outer `section` wrappers must not have fixed height; height must derive from content inside the Container.  
- Layout-affecting styles must use unitless or em-based values scoped to the Container’s typography scale.

---

## Breakpoint Strategy

Two valid models:

1. **Mobile/Desktop**  
   - Base: mobile  
   - ≥768px: desktop  
   - Tailwind screens: base = mobile, `md:` = desktop

2. **Mobile/Tablet/Desktop**  
   - Base: mobile  
   - 640px–1023px: tablet  
   - ≥1024px: desktop  
   - Tailwind screens: base = mobile, `sm:` = tablet, `lg:` = desktop

---

## Fluid Typography and Container Sizing

- Container.jsx sets `font-size` responsively using `cqw` units.  
- Inside the container, all dimensions must use `em` units—because `em` is defined by the container’s font size.  
- Outside the container, only fixed `px` units or percentage-based units (e.g. `w-full`) are valid.  
- `em` units must not be used outside the container—there is no font context to define them.  
- `rem` is strictly forbidden in all contexts.  
- Container enforces a fixed `max-width` in pixels to constrain content.  
- The `scalingFactor` prop determines the font-size multiplier per section and must not be changed arbitrarily.

---

## Embedding and Unit Usage

- This site may be embedded within another site or application.  
- **rem units are strictly forbidden** due to dependence on the root document's font size.  
- Tailwind is configured to use em units only.  
- All styles must comply with this unit strategy to ensure correct embedded behavior.
