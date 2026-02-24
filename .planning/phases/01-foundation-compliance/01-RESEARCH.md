# Phase 1 Research: Foundation & Compliance

**Phase:** 1 - Foundation & Compliance
**Research Date:** 2026-02-23
**Objective:** What do I need to know to PLAN this phase well?

---

## Executive Summary

Phase 1 establishes the technical foundation and legal compliance infrastructure for the campaign website. This phase focuses on five critical areas: (1) Nuxt 4 project setup with static site generation, (2) DigitalOcean App Platform deployment pipeline, (3) FEC and Georgia GTCFC legal compliance in footers, (4) WCAG 2.1 AA accessibility with color contrast validation, and (5) Sticky navigation with smooth scrolling and mobile hamburger menu.

**Key Finding:** Legal compliance (disclaimers) and accessibility (contrast) must be established BEFORE any visual design or content is created. These are not "add-ons"—they shape the entire design system.

---

## 1. Nuxt 4 Static Site Generation (SSG)

### What You Need to Know

Nuxt 4 uses the Nitro server engine for static site generation. The output is fully pre-rendered HTML that can be deployed to any static hosting service.

### Configuration Pattern

**nuxt.config.ts for SSG:**
```typescript
export default defineNuxtConfig({
  // Enable static site generation
  ssr: true,
  nitro: {
    preset: 'static'
  },

  // SEO module (handles meta tags, sitemap, robots.txt)
  modules: ['@nuxtjs/seo'],

  // Site configuration
  site: {
    url: 'https://armstrong-for-houston-ga.com', // Replace with actual domain
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA. Learn about Xzandria Armstrong\'s platform, vision, and campaign.',
    defaultLocale: 'en',
    indexable: true
  }
})
```

### Build Commands

```bash
# Generate static site
npx nuxi generate
# or
npm run generate

# Output directory: .output/public/
```

### Output Structure

The `.output/public/` directory contains deployment-ready static files:
- `index.html` - Pre-rendered homepage
- `_nuxt/` - JavaScript and CSS assets
- Asset files - Images, fonts, etc.

### Dependencies for Phase 1

| Module | Purpose | Required for Phase 1 |
|--------|---------|---------------------|
| `@nuxtjs/seo` | Meta tags, sitemap.xml, robots.txt | Yes (PERF-03, PERF-04) |
| `@nuxt/ui` | UI components (navigation, cards) | Yes (FND-05, FND-06) |
| `@nuxt/image` | Image optimization (for later phases) | Defer to Phase 2 |
| `@nuxtjs/tailwindcss` | Styling (required by @nuxt/ui) | Yes (for styling) |

### Project Initialization Command

```bash
npx nuxi@latest init campaign-site
cd campaign-site
npm install
npm install @nuxt/ui @nuxtjs/seo
```

---

## 2. DigitalOcean App Platform Deployment

### What You Need to Know

DigitalOcean App Platform supports static site deployment with automatic HTTPS/SSL and CDN. For a single-page campaign site, this is the most cost-effective option.

### App Platform Configuration

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run generate` |
| **Output Directory** | `.output/public` |
| **Environment** | Node.js 20.x or higher |
| **Autodeploy** | Yes (GitHub integration) |

### Deployment Steps

1. **Connect GitHub Repository** in DigitalOcean App Platform
2. **Configure Build Settings** with above values
3. **Deploy** - App Platform automatically builds and deploys
4. **Enable Custom Domain** with automatic HTTPS/SSL

### Alternative: Spaces + CDN

If App Platform costs are a concern:
- Upload `.output/public/*` to DigitalOcean Spaces (S3-compatible)
- Enable CDN distribution
- Use `doctl` CLI or GitHub Actions for automated uploads

### Environment Variables

```bash
NUXT_PUBLIC_SITE_URL=https://armstrong-for-houston-ga.com
NUXT_PUBLIC_ANALYTICS_ID=your-plausible-id # If using analytics
```

---

## 3. Legal Compliance: FEC & Georgia GTCFC Disclaimers

### What You Need to Know

**CRITICAL:** Legal disclaimers are required on EVERY page of a campaign website. This is not optional—failure to comply results in fines and legal action.

### FEC Requirements (11 CFR 110.11)

**Which communications require disclaimers:**
- All websites and internet applications of political committees available to the general public
- All public communications that solicit contributions

**Disclaimer content requirements:**

**For candidate committees (authorized):**
```
Paid for by [Committee Name]
```

**Example:**
```
Paid for by Armstrong for Houston County Committee
```

**For independent committees (not authorized):**
```
Paid for by [Committee Name], not authorized by any candidate or candidate's committee
```

### Georgia GTCFC Requirements

**Key thresholds:**
- Registration required upon raising or spending **$500+**
- Contributions over **$100** require reporting of: donor name, address, occupation, employer
- All reports must be filed electronically

**Enforcement context:**
- Georgia GTCFC actively enforces disclosure requirements
- Example: New Georgia Project fined $300,000 for disclosure failures
- Contact: ethics.ga.gov, 404-463-1980

### Footer Implementation Pattern

```vue
<!-- components/AppFooter.vue -->
<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-4">
      <!-- Legal disclaimers - MUST be on every page -->
      <div class="text-sm text-gray-400 mb-4">
        <p class="mb-2">
          Paid for by Armstrong for Houston County Committee
        </p>
        <p>
          Contributions or gifts to Armstrong for Houston County Committee are not tax deductible.
        </p>
      </div>

      <!-- Contact info -->
      <!-- Social links -->
    </div>
  </footer>
</template>
```

### Placement Requirements

- **Location:** Footer of every page
- **Visibility:** "Clear and conspicuous" - easily readable without taking action
- **Size:** At least as large as majority of other text on page
- **Contrast:** Reasonable contrast between background and text

### Donation-Specific Requirements

When linking to external donation platforms (ActBlue, Anedot):
- Ensure external platform handles FEC compliance for payment processing
- Still include committee disclaimer on site
- No deceptive dark patterns (pre-checked recurring boxes, hidden fees)

---

## 4. WCAG 2.1 AA Color Contrast Requirements

### What You Need to Know

Color contrast is a non-negotiable accessibility requirement. Failing to meet contrast standards excludes voters with disabilities and exposes the campaign to ADA lawsuits.

### Contrast Ratios

| Content Type | Minimum Ratio (AA) | Enhanced (AAA) |
|--------------|-------------------|----------------|
| **Normal text** | 4.5:1 | 7:1 |
| **Large text** (18pt+ or 14pt bold+) | 3:1 | 4.5:1 |
| **UI components / graphics** | 3:1 | - |

**Text size definitions:**
- **Normal text:** 18pt or smaller, OR 14pt or smaller when bold
- **Large text:** 18pt or larger, OR 14pt or larger when bold

### Campaign Color Palette Considerations

The campaign uses teal/gold colors. Each combination MUST be validated:

**Recommended testing approach:**
1. Use browser DevTools (Lighthouse accessibility audit)
2. Use online contrast checker: WebAIM Contrast Checker
3. Test all combinations: text on background, buttons, links

**Example contrast requirements:**
| Element | Background | Text | Required Ratio |
|---------|------------|------|----------------|
| Body text | Light/white | Dark teal/gold | 4.5:1 |
| Headings | Dark teal | White/gold | 4.5:1 |
| Button primary | Teal | White | 4.5:1 |
| Button secondary | Gold | Dark | 4.5:1 |

### Testing Tools

- **Chrome DevTools:** Lighthouse accessibility audit
- **axe DevTools:** Browser extension for WCAG scanning
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Contrast-ratio() CSS function:** For Sass/SCSS validation

---

## 5. Sticky Navigation & Smooth Scroll

### What You Need to Know

Sticky navigation keeps the menu visible while scrolling. Smooth scroll provides animated navigation to sections. Mobile requires a hamburger menu.

### Implementation Pattern

**Approach 1: CSS position:sticky (Recommended for performance)**

```css
/* components/Navigation.vue - <style> */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  transition: box-shadow 0.3s ease;
}

.sticky-nav.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

**Approach 2: JavaScript scroll tracking (for active section highlighting)**

```vue
<!-- components/Navigation.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const activeSection = ref('hero')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Update active section based on scroll position
  const sections = ['hero', 'about', 'platform', 'gallery', 'contact']
  for (const section of sections) {
    const el = document.getElementById(section)
    if (el && window.scrollY >= el.offsetTop - 100) {
      activeSection.value = section
    }
  }
}

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  isMobileMenuOpen.value = false // Close mobile menu after click
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['sticky-nav', { scrolled: isScrolled }]">
    <!-- Desktop menu -->
    <div class="hidden md:flex">
      <a v-for="section in sections" :key="section.id"
         :class="{ active: activeSection === section.id }"
         @click="scrollToSection(section.id)">
        {{ section.name }}
      </a>
    </div>

    <!-- Mobile hamburger -->
    <button class="md:hidden" @click="isMobileMenuOpen = !isMobileMenuOpen">
      <!-- Hamburger icon -->
    </button>
  </nav>

  <!-- Mobile menu panel -->
  <div v-if="isMobileMenuOpen" class="md:hidden mobile-menu">
    <!-- Mobile navigation items -->
  </div>
</template>
```

### Smooth Scroll CSS Alternative

For better performance, use CSS smooth scroll:

```css
/* In global styles */
html {
  scroll-behavior: smooth;
}
```

### Mobile Hamburger Menu

**Key requirements:**
- Triggered on screens below `md` breakpoint (768px)
- Full-width or slide-out panel
- Close menu when navigation link is clicked
- Accessible with keyboard (Enter/Space to toggle)

**Responsive breakpoints (Tailwind default):**
- `sm:` 640px and up
- `md:` 768px and up (desktop menu threshold)
- `lg:` 1024px and up

---

## 6. SEO: Meta Tags, Sitemap, Robots.txt

### What You Need to Know

The `@nuxtjs/seo` module handles all SEO requirements automatically. Configure once, and meta tags, sitemap.xml, and robots.txt are generated.

### @nuxtjs/seo Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://armstrong-for-houston-ga.com',
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA. Learn about Xzandria Armstrong\'s platform, vision, and campaign.',
    defaultLocale: 'en',
    indexable: true
  },

  // Sitemap configuration
  sitemap: {
    enabled: true,
    autoLastmod: true,
    sortEntries: true
  },

  // Robots.txt configuration
  robots: {
    disallow: ['/admin/**'], // If any admin routes exist
    sitemap: 'https://armstrong-for-houston-ga.com/sitemap.xml'
  }
})
```

### Per-Page Meta Tags

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
useHead({
  title: 'Xzandria Armstrong for Houston County - Leadership for Our Community',
  meta: [
    { name: 'description', content: 'Support Xzandria Armstrong for Houston County. Learn about her platform, vision, and how to get involved.' },
    { property: 'og:title', content: 'Xzandria Armstrong for Houston County' },
    { property: 'og:description', content: 'Leadership for Houston County, GA' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og-image.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://armstrong-for-houston-ga.com/' }
  ]
})
</script>
```

### Generated Outputs

After deployment, these files are automatically available:
- `/sitemap.xml` - XML sitemap for search engines
- `/robots.txt` - Search engine crawler instructions
- Meta tags on every page - Title, description, Open Graph

---

## Planning Checklist for Phase 1

Use this checklist when creating implementation plans:

### Setup (FND-01)
- [ ] Initialize Nuxt 4 project with `npx nuxi@latest init`
- [ ] Configure `nitro.preset: 'static'` for SSG
- [ ] Install `@nuxt/ui` and `@nuxtjs/seo` modules
- [ ] Verify `npm run generate` produces `.output/public/`

### Navigation (FND-05, FND-06)
- [ ] Create `components/Navigation.vue` with sticky positioning
- [ ] Implement smooth scroll to sections
- [ ] Add scroll spy for active section highlighting
- [ ] Implement mobile hamburger menu with slide-out panel
- [ ] Test on mobile devices (iOS Safari and Android)

### Legal Compliance (LEGAL-01, FND-07)
- [ ] Confirm exact committee name for disclaimers
- [ ] Create footer component with FEC-compliant disclaimer text
- [ ] Include disclaimer in footer of every page
- [ ] Verify disclaimer is visible "above the fold" (or in footer as required)
- [ ] Research Georgia GTCFC requirements for any state-specific additions

### Accessibility (FND-03, VIS-05)
- [ ] Define exact color palette with hex values
- [ ] Test ALL color combinations for WCAG 2.1 AA compliance
- [ ] Document pass/fail for each combination
- [ ] Adjust colors if needed to meet 4.5:1 contrast minimum
- [ ] Set up accessibility testing tool (axe DevTools or Lighthouse)

### SEO (PERF-03, PERF-04)
- [ ] Configure `@nuxtjs/seo` with site URL, name, description
- [ ] Add meta tags to homepage
- [ ] Verify sitemap.xml will be generated
- [ ] Verify robots.txt will be generated
- [ ] Add Open Graph tags for social sharing

### Deployment (FND-02)
- [ ] Set up DigitalOcean App Platform account
- [ ] Configure GitHub repository connection
- [ ] Set build command to `npm run generate`
- [ ] Set output directory to `.output/public`
- [ ] Configure custom domain with HTTPS/SSL
- [ ] Test deployment pipeline

---

## Dependencies & Blockers

### Internal Dependencies (None)
Phase 1 has no dependencies on other phases—it can start immediately.

### External Dependencies
| Dependency | Type | Required For | Notes |
|------------|------|--------------|-------|
| Exact committee name | Legal | Footer disclaimer | Must obtain from campaign/treasurer |
| Campaign logo/brand assets | Design | Navigation, favicon | User mentioned logo exists |
| Domain name | Infrastructure | Site URL, SEO config | May already be owned |
| DigitalOcean account | Infrastructure | Deployment | User preference confirmed |

### Potential Blockers
1. **Committee name not confirmed** - Cannot create legal disclaimers without exact committee name
2. **Color palette not finalized** - Cannot validate contrast without exact hex values
3. **Domain not registered** - Cannot configure SEO without production URL

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Legal disclaimer non-compliance | HIGH (fines, legal action) | LOW (templates available) | Use FEC examples, get legal review before launch |
| Color contrast failures | HIGH (ADA liability, exclusion) | MEDIUM | Test early with online tools, adjust palette |
| DigitalOcean deployment issues | MEDIUM (launch delay) | LOW (static deployment is simple) | Test deployment early, document process |
| Mobile menu bugs | MEDIUM (poor UX, lost donations) | MEDIUM | Test on real devices, not just browser emulation |

---

## Open Questions for Planning

1. **What is the exact committee name** for FEC disclaimers? (e.g., "Armstrong for Houston County Committee")
2. **What are the exact hex color values** for the campaign teal and gold?
3. **Has the domain been registered?** If so, what is it?
4. **Are there any Georgia-specific disclaimers** beyond FEC requirements for Houston County campaigns?
5. **Who will review the site for legal compliance** before launch?

---

## Sources

### Official Documentation (HIGH Confidence)
- Nuxt 4 Documentation - https://nuxt.com (framework core, SSG configuration)
- @nuxtjs/seo Documentation - https://nuxtseo.com (sitemap, robots.txt, meta tags)
- DigitalOcean App Platform - https://docs.digitalocean.com/products/app-platform (static site deployment)
- WCAG 2.1 Guidelines - https://www.w3.org/WAI/WCAG21/Understanding/ (contrast requirements)

### Legal & Compliance (MEDIUM Confidence)
- FEC Regulations 11 CFR 110.11 - Digital disclaimers for political communications
- Georgia Government Transparency and Campaign Finance Commission - https://ethics.ga.gov
- FEC Disclaimer Requirements - Various FEC resources on campaign website compliance

### Technical Implementation (MEDIUM Confidence)
- Nuxt UI v4 Documentation - https://ui.nuxt.com (navigation components)
- WebAIM Contrast Checker - https://webaim.org/resources/contrastchecker/
- Vue 3 Composition API - Reactive state management for navigation

### Unverified / Needs Validation (LOW Confidence)
- Specific Georgia GTCFC digital communication requirements - Limited official documentation found online; recommend direct contact with commission
- DigitalOcean App Platform + Nuxt 4 specific guide - Standard static deployment assumed

---

*Research completed: 2026-02-23*
*Next step: Create implementation plans based on this research*
