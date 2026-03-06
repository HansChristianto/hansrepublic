# Research Findings: Hans Republic Corporate Portfolio & Monitoring Dashboard

**Date**: 2026-03-06 | **Branch**: 001-hans-republic-portfolio | **Status**: Complete

## Technology Stack Decisions

### Decision: SvelteKit 2.x with Svelte 5

**Rationale**:

- SvelteKit 2.x with Svelte 5 provides Server Components via `+page.server.ts` load functions
- Svelte 5 runes (`$state`, `$props`, `$derived`) provide reactive state management
- Native support for TypeScript with strict mode
- Built-in file-based routing
- Node.js adapter for flexible deployment options

**Alternatives Considered**:

- Next.js 15: More complex, larger bundle size
- Plain Svelte: Requires manual SSR setup for SEO

---

### Decision: Tailwind CSS v4 with @theme Directive

**Rationale**:

- Tailwind CSS v4 uses CSS-first configuration with `@theme` directive
- Supports mobile-first responsive design out of the box
- CSS custom properties integration for design tokens
- Low bundle size with tree-shaking
- `@tailwindcss/vite` plugin for seamless Vite integration

**Implementation**:

```css
/* src/app.css */
@import "tailwindcss";

@theme {
  --color-primary: #0071e3;
  --color-primary-hover: #0077ed;
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
}
```

**Alternatives Considered**:

- Tailwind CSS v3: Legacy config-based approach
- CSS Modules: More verbose, requires custom responsive utilities

---

### Decision: JSON/YAML Configuration Files for Content

**Rationale**:

- Server-side loading via `+page.server.ts` provides optimal performance
- No database required for simple content management
- Easy to version control brand data
- Non-technical team members can edit via simple text files

**Alternatives Considered**:

- Headless CMS (Contentful/Sanity): Overkill for 5-brand portfolio, adds complexity
- Markdown files with MDX: More flexible but additional build complexity

---

### Decision: Basic Password Protection via Environment Credentials

**Rationale**:

- Simple implementation using SvelteKit hooks and environment variables
- No external auth provider needed for internal dashboard
- Future upgrade path to proper auth (Auth.js, Lucia)
- Meets current requirements without over-engineering

**Alternatives Considered**:

- Auth.js: Adds complexity, requires database for session storage
- Clerk: External dependency, overkill for single-admin use case

---

### Decision: Third-Party Uptime Monitoring (UptimeRobot)

**Rationale**:

- UptimeRobot offers free tier with adequate monitoring (up to 50 monitors)
- Webhook integration for status updates
- No need to build custom monitoring infrastructure
- Reliable, battle-tested service

**Alternatives Considered**:

- Pingdom: More expensive, similar functionality
- Custom health check endpoint: Requires hosting infrastructure

---

## Implementation Patterns

### SvelteKit 2.x with Svelte 5 Patterns

1. **Server-Side Data Loading**: Use `+page.server.ts` for data fetching

   ```typescript
   // src/routes/brands/+page.server.ts
   import type { PageServerLoad } from "./$types";

   export const load: PageServerLoad = async () => {
     return { brands: getBrands() };
   };
   ```

2. **Client Interactivity**: Use Svelte 5 runes in components

   ```svelte
   <!-- src/lib/components/ui/Button.svelte -->
   <script lang="ts">
     let { variant = 'primary', children } = $props();
   </script>

   <button class="bg-{variant}">{children}</button>
   ```

3. **Dynamic Routes**: `src/routes/brands/[slug]/+page.svelte` for brand detail pages

4. **Layouts**: `src/routes/+layout.svelte` for consistent UI

### Monitoring Dashboard Pattern

1. **API Route**: `src/routes/api/monitoring/+server.ts` to proxy monitoring data
2. **Auto-refresh**: useEffect with 5-minute interval
3. **Environment Variables**: `UPTIME_ROBOT_API_KEY` stored in `.env`

---

## Design System Implementation

### Tailwind CSS v4 with Custom Theme

The UI/UX Design System from `plans/ui-ux-design-system.md` is implemented via:

```css
@theme {
  /* Colors */
  --color-primary: #0071e3;
  --color-primary-hover: #0077ed;
  --color-gray-900: #171717;

  /* Typography */
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;

  /* Custom utilities */
  .text-fluid-hero {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
  }
  .section-padding {
    padding-block: clamp(3rem, 8vw, 8rem);
  }
}
```

---

## Performance Considerations

- **Server-Side Rendering**: Brand pages rendered on server via `+page.server.ts`
- **CSS Optimization**: Tailwind v4 generates minimal CSS
- **Font Loading**: System fonts for zero layout shift
- **Build Output**: Node.js adapter produces optimized bundle

---

## Accessibility Requirements (WCAG 2.1 AA)

- All interactive elements have focus management
- Keyboard navigation support
- Proper ARIA labels
- Color contrast ratios meet AA standards
- Touch targets minimum 44x44px

---

## Conclusion

All technical decisions align with:

1. Constitution requirements (strict TypeScript, mobile-first, accessibility)
2. Project requirements (5 brands, monitoring dashboard)
3. Performance budgets (FCP < 1.5s, LCP < 2.5s)
