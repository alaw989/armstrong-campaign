# Architecture Research

**Domain:** Nuxt.js single-page political campaign landing sites (SSG)
**Researched:** 2026-02-23
**Confidence:** MEDIUM

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Browser Layer                                 │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Single Page (index.vue)                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐ │   │
│  │  │  Hero    │ │ Donate   │ │  About/  │ │Platform/ │ │Photo  │ │   │
│  │  │ Section  │ │  CTA     │ │   Bio    │ │ Issues   │ │Gallery│ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └───────┘ │   │
│  │                                                                  │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │                    Contact / Footer                        │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│                           Nuxt 3 Layer                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Components (auto-imported)                                      │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │   │
│  │  │ HeroSection    │  │ DonateCTA      │  │ Navigation     │     │   │
│  │  │                │  │                │  │                │     │   │
│  │  │ - Heading      │  │ - Form         │  │ - Links        │     │   │
│  │  │ - Subheading   │  │ - Amount Btns  │  │ - Scroll Spy   │     │   │
│  │  │ - CTA Button   │  │ - Payment Link │  │ - Mobile Menu  │     │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘     │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │   │
│  │  │ AboutSection   │  │ IssuesGrid     │  │ PhotoGallery   │     │   │
│  │  │                │  │                │  │                │     │   │
│  │  │ - Bio Content  │  │ - Issue Cards  │  │ - Lightbox     │     │   │
│  │  │ - Headshot     │  │ - Search/Filter│  │ - Lazy Images  │     │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Composables (shared state & logic)                              │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │   │
│  │  │ useNavigation  │  │ useScrollSpy   │  │ useModal       │     │   │
│  │  │ - Active sect  │  │ - Intersection │  │ - Photo viewer │     │   │
│  │  │ - Smooth scroll│  │ - Visibility   │  │ - State        │     │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│                           Nitro Build Layer                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Static Site Generation (preset: 'static')                       │   │
│  │                                                                  │   │
│  │  .output/public/                                                 │   │
│  │  ├── index.html          (pre-rendered page)                    │   │
│  │  ├── assets/             (optimized JS, CSS, images)            │   │
│  │  ├── _nuxt/              (chunks)                               │   │
│  │  └── 200.html / 404.html (SPA fallbacks)                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| **app.vue** | Root layout wrapper, global styles | All page-level components |
| **pages/index.vue** | Main page composition, section orchestration | All section components |
| **components/HeroSection.vue** | Primary message, main CTA, background image | Navigation composable |
| **components/DonateCTA.vue** | Donation options, payment links | External payment processor |
| **components/AboutSection.vue** | Candidate bio, background, qualifications | None (static content) |
| **components/IssuesSection.vue** | Platform/issue cards display | Filter/search composable |
| **components/PhotoGallery.vue** | Image grid, lightbox modal | Modal composable, @nuxt/image |
| **components/ContactFooter.vue** | Social links, contact info, legal | None (static content) |
| **components/Navigation.vue** | Sticky header, scroll spy, mobile menu | Scroll spy composable |
| **composables/useScrollSpy.ts** | Track active section on scroll | Navigation component |
| **composables/useNavigation.ts** | Smooth scroll to sections | All navigation interactions |

## Recommended Project Structure

```
campaign-site/
├── app/                        # Nuxt 4+ / Nuxt 3 root
│   ├── assets/                 # Uncompiled assets (SCSS, images)
│   │   ├── styles/
│   │   │   ├── main.css        # Global styles
│   │   │   └── variables.css   # Design tokens
│   │   └── images/
│   │       └── raw/            # Source images before optimization
│   ├── components/             # Auto-imported Vue components
│   │   ├── HeroSection.vue
│   │   ├── DonateCTA.vue
│   │   ├── AboutSection.vue
│   │   ├── IssuesSection.vue
│   │   ├── IssueCard.vue       # Reusable issue card
│   │   ├── PhotoGallery.vue
│   │   ├── PhotoLightbox.vue   # Modal for full-size images
│   │   ├── ContactFooter.vue
│   │   ├── Navigation.vue
│   │   └── ui/                 # Reusable UI primitives
│   │       ├── Button.vue
│   │       ├── Card.vue
│   │       └── Section.vue
│   ├── composables/            # Auto-imported composition functions
│   │   ├── useScrollSpy.ts     # Active section tracking
│   │   ├── useNavigation.ts    # Smooth scroll logic
│   │   └── useModal.ts         # Lightbox modal state
│   ├── layouts/                # Layout wrappers
│   │   └── default.vue         # Base layout (header + footer)
│   ├── pages/                  # File-based routing
│   │   └── index.vue           # Single page landing
│   ├── public/                 # Static assets (served as-is)
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── server/                 # Server-side code (minimal for SSG)
│   └── types/                  # TypeScript definitions
├── .output/                    # Build output (generated)
├── nuxt.config.ts              # Nuxt configuration
├── app.config.ts               # Runtime config
└── package.json
```

### Structure Rationale

- **components/ui/:** Atomic design pattern for reusable primitives
- **components/:** Feature-specific sections with single responsibility
- **composables/:** Shared logic for scroll behavior and navigation
- **layouts/:** Minimal since it's a single page, but useful for consistency
- **pages/:** Single index.vue for the landing page (could add thank-you pages later)

## Architectural Patterns

### Pattern 1: Section-Based Scroll Navigation

**What:** Single-page layout where each section has an ID, navigation links scroll to sections, and active section is highlighted based on viewport position.

**When to use:** Landing pages, marketing sites, portfolios where content is organized into distinct sections.

**Trade-offs:**
- Pro: Simple content model, fast navigation, mobile-friendly
- Con: Can become unwieldy with many sections, harder to deep-link to specific content

**Example:**
```vue
<!-- pages/index.vue -->
<template>
  <div>
    <Navigation />
    <section id="hero">
      <HeroSection />
    </section>
    <section id="donate">
      <DonateCTA />
    </section>
    <section id="about">
      <AboutSection />
    </section>
    <!-- ... more sections -->
    <ContactFooter />
  </div>
</template>

<!-- composables/useScrollSpy.ts -->
export const useScrollSpy = () => {
  const activeSection = ref('hero')

  const updateActiveSection = () => {
    const sections = ['hero', 'donate', 'about', 'issues', 'gallery']
    const scrollY = window.scrollY

    for (const section of sections) {
      const el = document.getElementById(section)
      if (el && scrollY >= el.offsetTop - 100) {
        activeSection.value = section
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', updateActiveSection)
  })

  return { activeSection }
}
```

### Pattern 2: Composable-Based State Sharing

**What:** Use Nuxt's `useState` for shared state across components without Prop Drilling.

**When to use:** State needed by multiple components (e.g., mobile menu open/closed, active section, modal state).

**Trade-offs:**
- Pro: Clean component APIs, SSR-safe, auto-imported
- Con: Implicit dependencies can be harder to trace

**Example:**
```typescript
// composables/useNavigation.ts
export const useNavigation = () => {
  const isMobileMenuOpen = useState('mobileMenu', () => false)

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    el?.scrollIntoView({ behavior: 'smooth' })
    isMobileMenuOpen.value = false
  }

  return {
    isMobileMenuOpen,
    scrollToSection
  }
}
```

### Pattern 3: Image Optimization with @nuxt/image

**What:** Use `<NuxtImg>` component for automatic format conversion, responsive sizing, and lazy loading.

**When to use:** All images in the application, especially photo galleries with many images.

**Trade-offs:**
- Pro: Significant performance gains, automatic WebP/AVIF, lazy loading
- Con: Requires module setup, build-time processing

**Example:**
```vue
<template>
  <NuxtImg
    src="/images/candidate.jpg"
    format="webp"
    loading="lazy"
    placeholder
    :width="800"
    :height="600"
    sizes="sm:100vw md:50vw lg:400px"
    alt="Candidate portrait"
  />
</template>

<!-- nuxt.config.ts -->
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    formats: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
})
```

## Data Flow

### Page Load Flow

```
User navigates to site
    ↓
Server returns pre-rendered .output/public/index.html
    ↓
Browser loads HTML + critical CSS (fast first paint)
    ↓
Nuxt hydrates Vue app (progressive enhancement)
    ↓
Interactivity enabled (scroll, modals, form handling)
```

### User Interaction Flow

```
User clicks navigation link
    ↓
useNavigation.scrollToSection(sectionId)
    ↓
Native smooth scroll to element
    ↓
useScrollSpy detects new section
    ↓
Navigation component updates active state
```

### Modal Flow (Photo Gallery)

```
User clicks thumbnail
    ↓
useModal.open(imageData)
    ↓
useState updates modal state (SSR-safe)
    ↓
PhotoLightbox component reacts to state
    ↓
Modal renders with full-size image
```

### Key Data Flows

1. **Static Content:** Content is embedded in components at build time. No runtime data fetching for the landing page.

2. **Navigation State:** `useState('activeSection')` shared between Navigation and ScrollSpy. Updated via scroll event listeners.

3. **Modal State:** `useState('modalOpen')`, `useState('modalImage')` shared between PhotoGallery and PhotoLightbox.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k visitors/month | Static SSG on DigitalOcean App Platform is optimal. No changes needed. |
| 1k-100k visitors/month | Same architecture. Ensure CDN caching is configured. Add image compression. |
| 100k+ visitors/month | Consider CDN for all assets. May need to add analytics tracking. Consider A/B testing framework. |

### Scaling Priorities

1. **First bottleneck:** Image load times. Mitigation: Use `@nuxt/image` with proper responsive sizes and lazy loading.

2. **Second bottleneck:** JavaScript bundle size. Mitigation: Lazy load non-critical components (photo gallery lightbox) using `Lazy` prefix.

## Anti-Patterns

### Anti-Pattern 1: Prop Drilling Section State

**What people do:** Passing active section state through component props all the way from root to deeply nested components.

**Why it's wrong:** Creates tight coupling, makes components harder to reuse, and creates prop explosion.

**Do this instead:** Use `useState` composables for shared state. Components that need the state can access it directly via the composable.

```typescript
// Don't do this:
<HeroSection :activeSection="activeSection" @update="handleUpdate" />

// Do this instead:
const { activeSection } = useScrollSpy() // in any component that needs it
```

### Anti-Pattern 2: Ignoring Static Generation Benefits

**What people do:** Building a SPA mode site (ssr: false) when all content is static.

**Why it's wrong:** Loses SEO benefits, slower initial page load, no fallback for users without JavaScript.

**Do this instead:** Use SSG with Nitro preset: `'static'`. Pre-render HTML at build time, hydrate on client.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // Keep SSR for pre-rendering
  nitro: {
    preset: 'static'
  }
})
```

### Anti-Pattern 3: Inline Heavy Images

**What people do:** Using large, unoptimized images directly in public folder without optimization.

**Why it's wrong:** Massive file sizes kill LCP scores, especially on mobile. No responsive serving.

**Do this instead:** Use `@nuxt/image` module. Store source images, serve optimized WebP/AVIF at appropriate sizes.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Donate Platform** (ActBlue, WinRed, etc.) | External link to donation page | Simple redirect, no embed needed for MVP |
| **Analytics** (Google Analytics, Plausible) | Nuxt module or script tag in app.vue | Privacy-friendly alternatives preferred |
| **Email** (Mailchimp, etc.) | API call or form embed | Can defer to later phase |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Components ↔ Composables | Direct function calls | Auto-imported, no import statements needed |
| Components ↔ Layout | Props + slots | Keep layout thin, components own their logic |
| Pages ↔ Server | None for static content | Pure static site, no server API needed |

## Build Order for Development

Based on component dependencies:

1. **Foundation First** (No dependencies)
   - Configure Nuxt project with `@nuxt/image` module
   - Set up basic routing (`pages/index.vue`)
   - Create base layout (`layouts/default.vue`)
   - Set up global styles and design tokens

2. **Navigation & Scroll Infrastructure**
   - Build `useNavigation.ts` and `useScrollSpy.ts` composables
   - Create `Navigation.vue` component (sticky header)
   - Implement smooth scroll behavior

3. **Content Sections** (Can be built in parallel after step 2)
   - `HeroSection.vue` - Primary visual and CTA
   - `AboutSection.vue` - Static bio content
   - `DonateCTA.vue` - Donation links/buttons
   - `IssuesSection.vue` + `IssueCard.vue` - Platform/issue cards
   - `PhotoGallery.vue` - Image grid
   - `ContactFooter.vue` - Footer with links

4. **Interactive Features**
   - `PhotoLightbox.vue` - Modal for gallery
   - `useModal.ts` composable for modal state
   - Mobile menu functionality

5. **Optimization & Polish**
   - Image optimization with `@nuxt/image`
   - Lazy loading for non-critical components
   - Meta tags for SEO
   - Accessibility audit
   - Performance tuning

### Dependency Notes

- **HeroSection** should be built early as it's the first impression
- **Navigation** depends on scroll infrastructure being in place
- **PhotoGallery** and **PhotoLightbox** should be built together (lightboxing depends on gallery data structure)
- **DonateCTA** is critical but can be a simple external link initially, enhanced later

## Static Export Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Enable static site generation
  ssr: true,
  nitro: {
    preset: 'static'
  },

  // Image optimization
  modules: ['@nuxt/image'],
  image: {
    formats: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },

  // App configuration
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Build optimization
  experimental: {
    payloadExtraction: false // Not needed for simple static site
  }
})
```

## Deployment to DigitalOcean

1. **Build locally or in CI:**
   ```bash
   npm run generate
   # Output: .output/public/
   ```

2. **Deploy to DigitalOcean App Platform:**
   - Connect GitHub repository
   - Set build command: `npm run generate`
   - Set output directory: `.output/public`
   - Enable CDN in DigitalOcean dashboard

3. **Alternative: Deploy to DigitalOcean Spaces + CDN:**
   - Upload `.output/public/*` to Spaces
   - Enable CDN for the Spaces bucket
   - Configure custom domain with SSL

## Sources

- Nuxt 3 SSG with Nitro static preset - WebSearch results (LOW confidence - verify with official docs)
- Nuxt 3 auto-imports architecture - WebSearch results (LOW confidence - verify with official docs)
- Nuxt 3 composables for state management (useState) - WebSearch results (LOW confidence - verify with official docs)
- @nuxt/image module optimization - WebSearch results (LOW confidence - verify with official docs)
- Political campaign website architecture best practices - WebSearch results (LOW confidence - general web patterns)
- DigitalOcean static hosting and CDN - WebSearch results (LOW confidence - verify with DigitalOcean docs)

**Confidence Note:** Research conducted via WebSearch due to Context7 not being available for Nuxt queries. All findings should be verified against official Nuxt 3 documentation before implementation. Key patterns (SSG, composables, auto-imports) are consistent across multiple sources but specific configuration syntax should be validated.

---
*Architecture research for: Nuxt.js single-page political campaign landing sites*
*Researched: 2026-02-23*
