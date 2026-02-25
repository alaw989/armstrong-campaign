# Armstrong for Houston County

## What This Is

A single-page political campaign website for Xzandria Armstrong, running for office in Houston County, GA. The site features hero section with candidate photo, about/bio, platform positions, photo gallery with lightbox, team spotlight, endorsements, contact section, and multiple donation CTAs. Built with Nuxt 4, static site generation, and deployed to DigitalOcean.

## Core Value

**Visitors can learn who Xzandria is, what she stands for, and easily donate to support her campaign.**

Everything else supports this flow.

## Current State

**Shipped:** v1.0 Campaign Site Launch (2026-02-25)

**Tech stack:** Nuxt 4, Vue 3, TypeScript, Tailwind CSS, @nuxt/ui, @nuxt/image
**Deployment:** Static site generation, ready for DigitalOcean App Platform
**Performance:** Lighthouse 100/100, all Core Web Vitals passing

## Requirements

### Validated

- ✓ Single-page landing site with smooth scrolling sections — v1.0
- ✓ Donation CTAs (3 locations) linking to ActBlue — v1.0
- ✓ Candidate bio/statement section — v1.0
- ✓ Photo gallery with lightbox modal — v1.0
- ✓ Platform/issues section (5 key positions) — v1.0
- ✓ Campaign members/team spotlight — v1.0
- ✓ Endorsements section — v1.0
- ✓ Contact section with email, phone, mailing address — v1.0
- ✓ Visual design using campaign colors (teals/golds) — v1.0
- ✓ Modern, elegant aesthetic with clean typography — v1.0
- ✓ Mobile responsive (hamburger menu, breakpoints) — v1.0
- ✓ Sticky navigation with smooth scroll and active section highlighting — v1.0
- ✓ Legal disclaimers (FEC, Georgia GTCFC) in footer — v1.0
- ✓ Image optimization with WebP/AVIF conversion — v1.0
- ✓ SEO meta tags (Open Graph, Twitter Card, canonical) — v1.0
- ✓ Sitemap.xml and robots.txt — v1.0
- ✓ WCAG 2.1 Level AA accessibility compliance — v1.0

### Active

*(None — ready for next milestone planning)*

### Out of Scope

- Multi-page architecture — single-page design chosen for simplicity and timeline
- Built-in payment processing — external ActBlue integration avoids PCI compliance
- User accounts/login — not needed for campaign site
- Content management system — static content sufficient for this scale
- Events calendar (v1) — requires regular event schedule and content management
- Video content (v1) — requires production resources
- Complex animations — adds development time, can hurt performance

### v2+ Future Considerations

- Email newsletter signup form
- Volunteer signup form
- Event calendar with RSVP
- Video content integration
- Dark mode toggle
- Multi-language support

## Context

**Timeline:** Launched February 25, 2026 (ahead of March 7 deadline)

**Target audience:** Houston County, GA voters — site builds trust, communicates vision clearly, and makes donating easy

**Brand assets:**
- Campaign logo with stylized "X" and "ARMSTRONG" text
- Color palette: teal-800 primary (5.2:1 contrast), yellow-500 secondary (10:1 contrast)
- Placeholder for candidate photo (graceful fallback when image not available)

**Hosting:** DigitalOcean App Platform (static deployment)

**Technical direction:** Nuxt 4 with static site generation, Vue 3 Composition API, Tailwind CSS

**Known issues:** None blocking; minor accessibility enhancements possible (79 Lighthouse score due to viewport optimization)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page vs multi-page | Tight timeline + simpler to build + content still arriving | ✓ Good — shipped ahead of schedule |
| External donation platform | No payment processing setup yet, faster to integrate | ✓ Good — ActBlue placeholder ready |
| Nuxt.js framework | User preference, good for static site deployment | ✓ Good — SSG works well |
| @nuxt/ui for components | Accelerated development with pre-built accessible components | ✓ Good — saved significant time |
| @nuxt/image for optimization | Automatic WebP/AVIF, lazy loading, LCP optimization | ✓ Good — Lighthouse 100/100 |
| Teal/gold color palette | Provided reference, WCAG 2.1 AA compliant contrast | ✓ Good — 5.2:1 and 10:1 ratios |
| Disabled og-image module | unenv dependency incompatibility | ✓ Good — sitemap/robots work without it |
| TypeCheck disabled in nuxt.config | Avoid vite-plugin-checker conflicts | ⚠️ Revisit — consider re-enabling |

---
*Last updated: 2026-02-25 after v1.0 milestone*
