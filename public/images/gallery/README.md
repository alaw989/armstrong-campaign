# Campaign Photo Gallery

Place campaign photos in this directory.

## Naming Convention

- **Thumbnails**: `{name}.jpg` (400x400px recommended)
- **Full-size**: `{name}-full.jpg` (1200px width recommended)

Example:
- `rally-1.jpg` (thumbnail, 400x400px)
- `rally-1-full.jpg` (full-size, 1200px width)

## Alt Text Requirements

All photos MUST have descriptive alt text. Update `components/GallerySection.vue` with photo information:

```typescript
const photos: GalleryPhoto[] = [
  {
    id: '1',
    thumb: '/images/gallery/rally-1.jpg',
    full: '/images/gallery/rally-1-full.jpg',
    alt: 'Xzandria speaking at campaign rally in Warner Robins'
  },
  // ... more photos
]
```

**Alt text guidelines:**
- Describe the people, setting, and action
- Be specific: "Xzandria speaking at campaign rally" not "Photo of candidate"
- Include location when relevant: "in Warner Robins", "at Houston High School"
- Describe key elements: "with volunteers", "at town hall meeting"

## Photo Categories

Suggested categories for campaign photos:

1. **Candidate portraits and events**
   - Campaign rallies
   - Town hall meetings
   - Public speaking engagements

2. **Team/volunteer activities**
   - Door knocking
   - Phone banking
   - Volunteer training sessions

3. **Community engagement**
   - School visits
   - Local business visits
   - Community events

4. **Endorsements and supporters**
   - Endorsement announcements
   - Supporter gatherings
   - Community leader meetings

## Image Format

- **JPG format** preferred for photos (better compression for photographs)
- **WebP conversion** handled automatically by @nuxt/image
- Maintain square aspect ratio for thumbnails (400x400px)
- Full-size images: 1200px width (height can vary)

## Adding Photos

1. Place images in `public/images/gallery/`
2. Update `components/GallerySection.vue` photos array
3. Add descriptive alt text for each photo
4. Test lightbox functionality

## Accessibility Reminder

Per WCAG 2.1 AA guidelines (VIS-04 requirement):
- All images MUST have alt text
- Alt text should be descriptive and meaningful
- Decorative images should have empty alt: `alt=""`
- Complex images may need long descriptions
