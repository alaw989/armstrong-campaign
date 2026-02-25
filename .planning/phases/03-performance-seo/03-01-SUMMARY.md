---
phase: 03-performance-seo
plan: 01
title: Image Optimization with NuxtImg
oneLiner: "WebP/AVIF format conversion with NuxtImg for LCP optimization - hero eager loading, team/gallery lazy loading"
subsystem: Image Optimization
tags: [performance, seo, images, nuxt-image, webp, lcp, cls]
completedDate: 2026-02-25
duration: 1 minute
tasksCompleted: 4
filesChanged: 4
---

# Phase 03 Plan 01: Image Optimization with NuxtImg Summary

## Objective

Convert all standard `<img>` tags to `<NuxtImg>` component for automatic format conversion (WebP/AVIF), lazy loading, and responsive sizing to achieve Core Web Vitals passing scores.

## Implementation Summary

Successfully converted all image components to use NuxtImg with proper presets, lazy loading configuration, and dimension attributes for optimal Core Web Vitals.

### Components Modified

| Component | Changes | Optimization Strategy |
|-----------|---------|----------------------|
| `components/HeroSection.vue` | Standard img -> NuxtImg | LCP element: eager loading + high fetch priority |
| `components/MembersSection.vue` | Standard img -> NuxtImg | Below-fold: lazy loading + explicit dimensions |
| `components/GalleryLightbox.client.vue` | Standard img -> NuxtImg | On-demand: eager loading + galleryFull preset |
| `nuxt.config.ts` | Added hero preset | 3:4 aspect ratio (800x1067) with WebP format |

### Image Configuration

```typescript
// New hero preset in nuxt.config.ts
presets: {
  hero: {
    width: 800,
    height: 1067,
    fit: 'cover',
    quality: 85,
    format: 'webp',
  },
  // galleryThumb and galleryFull already existed
}
```

### Loading Strategy

| Content Type | Loading | Priority | Rationale |
|--------------|---------|----------|-----------|
| Hero photo | `eager` | `high` | LCP-critical element - must load immediately |
| Team photos | `lazy` | default | Below-fold content - defer until needed |
| Lightbox full | `eager` | default | On-demand viewing - load when opened |

## Deviations from Plan

### Auto-fixed Issues

None - plan executed exactly as written.

## Technical Notes

### SVG Handling

Current images are SVG placeholders (`/images/candidate-portrait.svg`, `team/*.svg`). SVGs are passed through NuxtImg but don't benefit from format conversion (WebP/AVIF applies to raster images only). This is expected behavior - real campaign photos (JPG/PNG) will automatically benefit from NuxtImg when provided.

The build log confirms NuxtImg is processing images:
```
[nitro]   ├─ /_ipx/f_webp&q_80&s_800x1067/images/candidate-portrait.svg
[nitro]   ├─ /_ipx/f_webp&q_80&s_128x128/images/team/jane-smith.svg
```

### CLS Prevention

All NuxtImg instances have explicit width/height dimensions:
- Hero: 800x1067 (3:4 aspect ratio)
- Team: 128x128 (circular avatars)
- Lightbox: 1200x900 (4:3 gallery ratio)

## Key Decisions

1. **Hero dimensions (800x1067)**: Matched original hero photo aspect ratio (3:4) while providing adequate resolution for desktop displays.

2. **Eager loading for lightbox**: Despite full-size images, eager loading is appropriate since the lightbox is user-initiated and images should load immediately when opened.

3. **Format explicit specification**: Added `format="webp"` explicitly to all NuxtImg instances for consistent behavior across all images.

## Performance Impact

Expected improvements when real photos are deployed:
- **LCP**: Hero photo with eager loading + WebP format + high fetch priority
- **CLS**: Explicit dimensions on all images prevent layout shift
- **Bundle size**: Automatic WebP/AVIF conversion reduces image payload by 20-40% vs JPEG

## Files Modified

1. `nuxt.config.ts` - Added hero preset to image.presets
2. `components/HeroSection.vue` - Converted to NuxtImg with hero preset
3. `components/MembersSection.vue` - Converted to NuxtImg with lazy loading
4. `components/GalleryLightbox.client.vue` - Converted to NuxtImg with galleryFull preset

## Commits

| Hash | Message |
|------|---------|
| a21cc41 | feat(03-01): add hero image preset to nuxt.config.ts |
| 77f600a | feat(03-01): convert HeroSection to use NuxtImg for LCP optimization |
| 026787f | feat(03-01): convert MembersSection team photos to NuxtImg with lazy loading |
| 5a02698 | feat(03-01): convert GalleryLightbox to use NuxtImg for full-size images |

## Verification

- [x] Build completed successfully: `npm run generate`
- [x] HeroSection.vue uses NuxtImg with preset="hero", loading="eager", fetchpriority="high"
- [x] MembersSection.vue uses NuxtImg with loading="lazy", explicit dimensions
- [x] GalleryLightbox.client.vue uses NuxtImg with preset="galleryFull"
- [x] nuxt.config.ts contains hero preset with width, height, fit, quality, format
- [x] All images have explicit width/height to prevent CLS
- [x] All images maintain descriptive alt text

## Next Steps

Remaining performance/SEO tasks in Phase 03:
- 03-02: Bundle Size Analysis & Optimization
- 03-03: Core Web Vitals Verification & Tuning

## Dependencies

- Requires: @nuxt/image module (already installed in Phase 01)
- Enables: PERF-01, PERF-02, FND-04 requirements fulfillment

## Self-Check: PASSED

- [x] All commits exist in git log
- [x] All modified files contain expected changes
- [x] Build verification passed
- [x] SUMMARY.md created in plan directory
