# Roadmap: Armstrong for Houston County

## Overview

This roadmap delivers a single-page political campaign website for Xzandria Armstrong's Houston County, GA campaign. The journey begins with foundation and compliance infrastructure—legal disclaimers, accessibility architecture, and Nuxt 4 setup on DigitalOcean—then builds all core campaign content sections (hero, about, platform, photo gallery, donation CTAs), and concludes with performance optimization and SEO enhancements. Each phase delivers a verifiable capability that moves the site closer to launch by the March 7 deadline.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Compliance** - Infrastructure, legal disclaimers, accessibility architecture, and deployment pipeline
- [ ] **Phase 2: Content & Engagement** - All campaign sections, donation integration, and visual design implementation
- [ ] **Phase 3: Performance & SEO** - Optimization, meta tags, sitemap, and Core Web Vitals tuning

## Phase Details

### Phase 1: Foundation & Compliance

**Goal**: Site infrastructure with legal compliance, accessibility foundation, and deployment pipeline in place

**Depends on**: Nothing (first phase)

**Requirements**: FND-01, FND-02, FND-03, FND-05, FND-06, FND-07, LEGAL-01, PERF-03, PERF-04, VIS-05

**Success Criteria** (what must be TRUE):
1. Nuxt 4 site with static generation is deployed to DigitalOcean App Platform with HTTPS/SSL
2. Sticky navigation bar with smooth-scroll works on desktop and mobile hamburger menu functions on small screens
3. FEC and Georgia GTCFC legal disclaimers appear in footer on every page
4. All color combinations meet WCAG 2.1 AA contrast standards (minimum 4.5:1 for text)
5. Site has proper meta tags, sitemap.xml, and robots.txt for SEO

**Plans**: 4 plans in 4 waves

Plans:
- [x] 01-01-PLAN.md — Nuxt 4 project setup with SSG configuration, TypeScript, and module installation (Wave 1) ✅ Completed 2026-02-24
- [ ] 01-02-PLAN.md — Layout shell with sticky navigation, scroll spy, and mobile hamburger menu (Wave 2)
- [ ] 01-03-PLAN.md — Legal disclaimer components, footer with FEC/Georgia compliance, and WCAG 2.1 AA contrast verification (Wave 3)
- [ ] 01-04-PLAN.md — DigitalOcean App Platform deployment pipeline with GitHub integration (Wave 4)

### Phase 2: Content & Engagement

**Goal**: All campaign content sections and donation functionality visible and interactive

**Depends on**: Phase 1

**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, ENG-01, ENG-02, ENG-03, ENG-04, FND-04, LEGAL-02, LEGAL-03, VIS-01, VIS-02, VIS-03, VIS-04

**Success Criteria** (what must be TRUE):
1. Hero section displays candidate name, photo, tagline, and prominent donate CTA
2. About section explains who Xzandria is, why she's running, and her vision for Houston County
3. Platform/Issues section displays 3-5 key positions with card-based layout
4. Photo gallery displays campaign photos with lightbox modal and all images include alt text
5. Donate CTA appears in hero and at least 2 additional locations, linking to external platform with transparent options

**Plans**: 5 plans in 4 waves

Plans:
- [ ] 02-01-PLAN.md — Hero section with candidate photo, tagline, and primary donate CTA (Wave 1)
- [ ] 02-02-PLAN.md — About/Bio section and Platform/Issues section with card-based layout (Wave 2)
- [ ] 02-03-PLAN.md — Photo gallery with @nuxt/image optimization and lightbox modal (Wave 3)
- [ ] 02-04-PLAN.md — Campaign members, Endorsements, and Contact sections (Wave 3)
- [ ] 02-05-PLAN.md — Donation CTA placement, brand colors, WCAG 2.1 AA verification (Wave 4)

### Phase 3: Performance & SEO

**Goal**: Site achieves Core Web Vitals passing scores and is optimized for search engines

**Depends on**: Phase 2

**Requirements**: PERF-01, PERF-02

**Success Criteria** (what must be TRUE):
1. Site loads in under 3 seconds on 4G mobile connection
2. Core Web Vitals passing scores (LCP < 2.5s, INP < 200ms, CLS < 0.1)
3. All images are optimized with WebP/AVIF conversion and lazy loading
4. Site is fully mobile-responsive and passes WCAG 2.1 Level AA accessibility standards

**Plans**: TBD (estimated 2-3 plans)

Plans:
- [ ] 03-01: Image optimization with @nuxt/image (WebP/AVIF, lazy loading, responsive sizes)
- [ ] 03-02: Performance tuning (bundle splitting, script optimization, Core Web Vitals)
- [ ] 03-03: Final accessibility audit and mobile responsiveness testing

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Compliance | 1/4 | In progress | 2026-02-24 |
| 2. Content & Engagement | 0/5 | Not started | - |
| 3. Performance & SEO | 0/3 | Not started | - |

**Overall Progress**: 1/12 plans complete (8%)
