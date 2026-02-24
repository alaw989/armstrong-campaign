# Stack Research

**Domain:** Political Campaign Landing Page (Single-Page Site)
**Researched:** 2025-02-23
**Confidence:** HIGH

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Nuxt 4** | 4.0+ | Core framework | Latest stable (July 2025), improved performance (43% faster data loading), better TypeScript, Nuxt 3 support until Jan 2026 provides migration safety net |
| **Vue 3** | 3.5+ | UI framework | Required by Nuxt 4, Composition API for reactive components |
| **Nitro** | (bundled) | Server engine | Built into Nuxt 4, powers static site generation with `preset: 'static'` |
| **Node.js** | 20.10+ | Runtime | Minimum requirement for Nuxt 4 production deployments |
| **TypeScript** | 5.x | Type safety | Zero-config in Nuxt 4, multi-project structure prevents server types leaking to client |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **@nuxt/ui** | 4.x | UI component library | Primary UI for campaign site. As of Nov 2025, ALL Pro components are now free and open-source. 110+ components including forms, modals, navigation. Built on Tailwind CSS, WCAG accessible, dark mode ready. |
| **@nuxt/image** | 1.x | Image optimization | REQUIRED for photo gallery. Automatic WebP/AVIF conversion, lazy loading, responsive sizes. 60% file size reduction, prevents layout shifts. |
| **@nuxtjs/seo** | 2.x | SEO toolkit | REQUIRED for campaign visibility. Automatic sitemap.xml, robots.txt, structured data (JSON-LD), Open Graph tags. Political campaigns need strong local SEO. |
| **@nuxtjs/tailwindcss** | 6.x | Styling foundation | REQUIRED if using @nuxt/ui. Tailwind CSS v4 support built into Nuxt 4. Zero-config module installation. |
| **@nuxt/scripts** | 1.x | Third-party script management | For analytics embeds. Fine-grained control over script loading to maintain Core Web Vitals. |

### Analytics (Privacy-Compliant for Political Campaigns)

| Solution | Type | Why Recommended for Campaigns |
|----------|------|-------------------------------|
| **Plausible Analytics** | Self-hosted or Cloud ($9/mo) | Cookie-free, GDPR/CCPA compliant, no consent banner required. Political campaigns face heightened privacy scrutiny. |
| **Umami** | Self-hosted (free) | Open source, lightweight, owned data. Good for budget-conscious campaigns with technical resources. |
| **Microsoft Clarity** | Free | Heatmaps and session recordings. Privacy-focused aggregation. Good supplement to page-view analytics. |

**Avoid:** Google Analytics 4 — requires consent banners, data privacy concerns for political campaigns, invasive tracking can damage candidate trust.

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Nuxt DevTools** | Development debugging | Built into Nuxt 4, visual inspector for components, routes, and modules |
| **ESLint + @nuxt/eslint** | Code quality | Project-aware ESLint, catches common Nuxt antipatterns |
| **Vite 6** | Build tool | Default in Nuxt 4, faster HMR and production builds |

## Installation

```bash
# Create new Nuxt 4 project
npx nuxi@latest init campaign-site

# Navigate to project
cd campaign-site

# Core modules (Nuxt 4 compatible)
npm install @nuxt/ui@latest
npm install @nuxt/image
npm install @nuxtjs/seo
npm install @nuxtjs/tailwindcss
npm install @nuxt/scripts

# Development dependencies
npm install -D @nuxt/eslint
```

**nuxt.config.ts configuration:**
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@nuxt/scripts',
  ],

  // Static site generation for DigitalOcean deployment
  nitro: {
    preset: 'static'
  },

  // SEO configuration for political campaign
  site: {
    url: 'https://armstrong-for-houston-ga.com', // Replace with actual domain
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA. Learn about Xzandria Armstrong\'s platform, vision, and campaign.',
    defaultLocale: 'en'
  },

  // Image optimization
  image: {
    quality: 80,
    formats: ['webp', 'avif', 'jpeg'],
    screens: {
      xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536
    }
  },

  // App compatibility for smooth Nuxt 3 -> 4 transition
  compatibilityDate: '2024-11-01'
})
```

## Deployment: DigitalOcean

### Recommended Approach: App Platform (Static Site)

DigitalOcean App Platform supports static site deployment with automatic CDN. For a single-page campaign site, this is the most cost-effective and simplest option.

**Configuration in App Platform:**

| Setting | Value |
|---------|-------|
| Build Command | `npm run generate` |
| Output Directory | `.output/public` |
| Environment | Node.js 20.x or higher |

**Build Command:**
```bash
# Generates static site to .output/public
npm run generate
```

**Why App Platform over Droplet:**
- Zero server management (campaign volunteers may not be sysadmins)
- Automatic HTTPS/SSL
- Built-in CDN for fast loading across Georgia
- Free tier covers small sites (576 build minutes/month)
- GitHub integration for automatic deploys

**Alternative: DigitalOcean Spaces + CDN**
- Upload `.output/public` to Spaces (S3-compatible object storage)
- Enable CDN distribution
- Use `doctl` or GitHub Actions for automated uploads
- More cost-effective at scale, but requires CI/CD setup

### Environment Variables

```bash
NUXT_PUBLIC_SITE_URL=https://armstrong-for-houston-ga.com
NUXT_PUBLIC_ANALYTICS_ID=your-plausible-id
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Nuxt 4 | Nuxt 3 | Only if critical module incompatibility discovered. Nuxt 3 supported until Jan 2026. |
| DigitalOcean App Platform | Vercel | If team prefers Vercel's DX. Vercel has excellent Nuxt integration but higher cost at scale. |
| @nuxt/ui | Headless UI + custom Tailwind | If campaign needs highly custom design system. @nuxt/ui is faster for 2-week deadline. |
| Plausible Analytics | Google Analytics 4 | NEVER recommended for political campaigns due to privacy concerns and consent requirements. |
| Static SSG | SSR | This is a single-page landing site. SSG is faster, cheaper, and sufficient. No need for server rendering complexity. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Nuxt 2** | End-of-life, no security updates after 2024 | Nuxt 4 (or Nuxt 3 with migration path) |
| **Bootstrap** | Dated aesthetic, heavier than Tailwind | @nuxt/ui (Tailwind-based) |
| **Vuetify** | Material Design looks "app-like" not "campaign-trustworthy" | @nuxt/ui (cleaner, more professional) |
| **Element Plus** | Enterprise-focused, overkill for landing page | @nuxt/ui |
| **Google Analytics 4** | Privacy concerns, consent banners reduce donations, political scrutiny | Plausible, Umami, or Microsoft Clarity |
| **jQuery** | Legacy, unnecessary with Vue 3 | Vue 3 Composition API |
| **Custom Docker setup** | Adds complexity, 2-week deadline is too tight for container debugging | DigitalOcean App Platform direct deployment |
| **Strapi/Headless CMS** | Overkill for single-page site with static content | @nuxt/content or hardcoded JSON data |
| **server-side donation processing** | PCI compliance burden, security risk, deadline pressure | External donation platform (ActBlue, WinRed, Anedot) link only |

## Stack Patterns by Variant

**If deadline extends beyond March 7:**
- Consider adding @nuxt/content for easier platform/issues page management via Markdown files
- Add @nuxt/fonts for optimized web font loading (eliminates FOUT/FOIT)

**If photo gallery grows beyond 20 images:**
- Consider Cloudinary or Imgix provider for @nuxt/image
- Add lazy loading pagination for gallery

**If adding volunteer signup form:**
- Use Formspree or Netlify Forms (no backend needed)
- Or use Nuxt server routes with email service (SendGrid/Mailgun)

**If multilingual support needed:**
- Add @nuxt/i18n module for Houston County's diverse communities

## Version Compatibility

| Package | Compatible With | Notes |
|-----------|-----------------|-------|
| Nuxt 4.x | Vue 3.5+, Node 20.10+, Nitro 2.x | Current stable release |
| @nuxt/ui 4.x | Nuxt 4, Tailwind CSS 4.x | All Pro features now free |
| @nuxt/image 1.x | Nuxt 3 & 4 | Drop-in compatible |
| @nuxtjs/seo 2.x | Nuxt 3 & 4 | Verified Nuxt 4 compatible |
| @nuxtjs/tailwindcss 6.x | Tailwind CSS 4.x, Nuxt 4 | Zero-config installation |

## Photo Gallery Implementation

For campaign photo gallery using @nuxt/image:

```vue
<script setup lang="ts">
// Gallery component for campaign events
const images = [
  { src: '/photos/rally-1.jpg', alt: 'Xzandria at Houston County Rally', caption: 'Speaking with voters in Warner Robins' },
  { src: '/photos/door-knocking.jpg', alt: 'Door knocking in precinct 12', caption: 'Neighbors talking with neighbors' },
  // ... more images
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="img in images" :key="img.src" class="relative group">
      <NuxtImg
        :src="img.src"
        :alt="img.alt"
        width="400"
        height="300"
        format="webp"
        loading="lazy"
        class="rounded-lg shadow-md transition-transform group-hover:scale-105"
      />
      <p class="mt-2 text-sm text-gray-600">{{ img.caption }}</p>
    </div>
  </div>
</template>
```

## Donation Integration Pattern

**CRITICAL:** Do NOT build donation processing. Use external platform link pattern:

```vue
<template>
  <!-- Donation section -->
  <section id="donate" class="bg-primary-900 text-white py-16">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Support the Campaign</h2>
      <p class="mb-8">Every contribution helps us reach more voters in Houston County.</p>
      <a
        href="https://anedot.com/xyz-armstrong/campaign"
        target="_blank"
        rel="noopener"
        class="inline-block bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors"
      >
        Donate Now
      </a>
      <p class="mt-4 text-sm opacity-75">
        Secure donations processed by Anedot
      </p>
    </div>
  </section>
</template>
```

**Recommended platforms for Georgia Democratic campaigns:**
- Anedot (popular in Georgia politics)
- ActBlue (Democratic standard)
- WinRed (Republican — NOT applicable for this campaign)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Nuxt 4 as framework | HIGH | Official stable release (July 2025), verified documentation |
| @nuxt/ui for UI | HIGH | v4 released Nov 2025, all Pro features free, verified Nuxt 4 compatible |
| @nuxt/image for gallery | HIGH | Core Nuxt module, verified 60% performance improvement |
| DigitalOcean App Platform | MEDIUM | Static hosting verified, but no official Nuxt 4-specific guide found. Standard static site deployment applies. |
| Plausible for analytics | HIGH | Verified privacy-compliant, popular for political campaigns |
| Tailwind CSS v4 | HIGH | Built into Nuxt 4, verified compatibility |

## Sources

### Official Documentation (HIGH Confidence)
- Nuxt 4 Documentation - https://nuxt.com (framework core, SSG configuration)
- @nuxt/ui Documentation - https://ui.nuxt.com (110+ components, v4 release Nov 2025)
- @nuxt/image Documentation - https://image.nuxt.com (image optimization, providers)
- @nuxtjs/seo Documentation - https://nuxtseo.com (sitemap, robots.txt, structured data)
- DigitalOcean App Platform - https://docs.digitalocean.com/products/app-platform (static site deployment)

### Verified Web Sources (MEDIUM Confidence)
- "Nuxt 4 Static Site Generation" - Various technical articles confirming July 2025 release, SSG configuration with `nitro.preset: 'static'`
- "Nuxt UI v4 Released November 2025" - Multiple sources confirming Pro features now free/open-source
- "Privacy-Compliant Analytics 2025" - Comparisons of Plausible, Umami, Fathom, Matomo for political use cases
- "Nuxt 3 to Nuxt 4 Migration Guide 2025" - Breaking changes, new app/ directory structure (optional), backward compatibility

### Unverified / Needs Validation (LOW Confidence)
- Specific DigitalOcean App Platform + Nuxt 4 deployment guide — No official guide found, standard static site deployment assumed

---

*Stack research for: Political Campaign Landing Page*
*Researched: 2025-02-23*
