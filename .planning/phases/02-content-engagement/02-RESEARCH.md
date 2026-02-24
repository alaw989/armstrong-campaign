# Phase 2 Research: Content & Engagement

**Phase:** 2 - Content & Engagement
**Research Date:** 2026-02-24
**Objective:** What do I need to know to PLAN this phase well?

**Design Reference:** https://diijondacosta.com/ — Use this site as major influence for all areas

---

## Executive Summary

Phase 2 implements all visible campaign content sections—the "above the fold" experience that voters see. This phase focuses on six content areas (Hero, About, Platform, Gallery, Members, Endorsements), visual design with campaign colors (teals/golds), donation CTA placement with legal compliance, and a photo gallery with lightbox modal.

**Key Finding:** Donation CTA placement and legal compliance are critical. The FEC has specific requirements about donation links and dark patterns (pre-checked recurring boxes are being targeted for bans). Photo gallery implementation needs SSR-compatible components in Nuxt 4.

**Timeline Context:** Hard deadline of March 7 (~2 weeks from Feb 23). Phase 1 is 80% complete with 4 plans averaging 11.8 minutes each. At this rate, Phase 2's estimated 5 plans could be completed in ~60-90 minutes of focused work, but content gathering and design decisions will take additional time.

---

## 1. Hero Section Implementation

### What You Need to Know

The hero section is the first thing visitors see and the primary driver of donations. It must display candidate name, photo, tagline, and a prominent donate CTA.

### Component Structure

```vue
<!-- components/HeroSection.vue -->
<template>
  <section id="hero" class="min-h-screen flex items-center">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Left: Content -->
        <div class="text-center md:text-left">
          <h1 class="text-4xl md:text-6xl font-bold">
            Xzandria Armstrong
          </h1>
          <p class="text-2xl md:text-3xl mt-4">
            For Houston County
          </p>
          <p class="text-xl mt-6">
            Leadership. Integrity. Progress.
          </p>
          <DonateButton size="large" class="mt-8" />
        </div>

        <!-- Right: Photo -->
        <div class="relative">
          <NuxtImg
            src="/images/candidate-portrait.jpg"
            alt="Xzandria Armstrong, candidate for Houston County"
            width="600"
            height="800"
            loading="eager"
            fetch-priority="high"
            class="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>
```

### Key Implementation Points

1. **Image Loading Strategy:**
   - Hero image is LCP (Largest Contentful Paint) - use `loading="eager"` and `fetch-priority="high"`
   - Other images use `loading="lazy"`
   - Use @nuxt/image with proper dimensions to prevent layout shift

2. **Hero Photo Requirements:**
   - Candidate portrait (professional headshot or full-body)
   - Recommended aspect ratio: 3:4 or 4:5
   - Alt text mandatory: "Xzandria Armstrong, candidate for Houston County"
   - Background color should complement campaign palette

3. **Tagline Considerations:**
   - Keep it short (3-5 words)
   - Reflect campaign values
   - Examples: "Leadership for Houston County," "A Fresh Voice for Houston County," "Progress We Can Believe In"

### Accessibility Requirements

- Hero text must have 4.5:1 contrast with background
- Hero image must have descriptive alt text
- Donate button must be keyboard accessible with visible focus state
- Skip link from navigation should target the hero section

---

## 2. About/Bio Section

### What You Need to Know

The About section explains who Xzandria is, why she's running, and her vision for Houston County. This builds trust and connection with voters.

### Content Structure

```vue
<!-- components/AboutSection.vue -->
<template>
  <section id="about" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        About Xzandria
      </h2>

      <div class="max-w-4xl mx-auto">
        <!-- Who she is -->
        <div class="mb-10">
          <h3 class="text-2xl font-semibold mb-4">Who I Am</h3>
          <p class="text-lg leading-relaxed">
            Xzandria Armstrong is a lifelong Houston County resident...
          </p>
        </div>

        <!-- Why she's running -->
        <div class="mb-10">
          <h3 class="text-2xl font-semibold mb-4">Why I'm Running</h3>
          <p class="text-lg leading-relaxed">
            I'm running for Houston County because...
          </p>
        </div>

        <!-- Vision -->
        <div>
          <h3 class="text-2xl font-semibold mb-4">My Vision</h3>
          <p class="text-lg leading-relaxed">
            Together, we can build a Houston County that...
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
```

### Content Requirements (To Be Provided by Campaign)

1. **Biographical Information:**
   - Background (birthplace, education, career)
   - Community involvement
   - Family (optional, if campaign chooses to include)
   - Years lived in Houston County

2. **Motivation:**
   - Why run for office now?
   - What problems need solving?
   - What strengths does she bring?

3. **Vision Statement:**
   - 3-5 sentence vision for Houston County
   - Should be inspiring but specific
   - Connect to platform positions

---

## 3. Platform/Issues Section (Card-Based Layout)

### What You Need to Know

The Platform section displays 3-5 key positions on Houston County priorities. A card-based layout works best for responsiveness and scannability.

### Card Layout Pattern

```vue
<!-- components/PlatformSection.vue -->
<template>
  <section id="platform" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
        My Platform
      </h2>
      <p class="text-center text-lg mb-12 max-w-2xl mx-auto">
        Here's where I stand on the issues that matter most to Houston County.
      </p>

      <!-- Card Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlatformCard
          v-for="position in positions"
          :key="position.id"
          :title="position.title"
          :description="position.description"
          :icon="position.icon"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PlatformPosition {
  id: string
  title: string
  description: string
  icon: string
}

const positions: PlatformPosition[] = [
  {
    id: 'education',
    title: 'Education',
    description: 'Investing in our schools and ensuring every child has access to quality education.',
    icon: 'academic-cap'
  },
  {
    id: 'economy',
    title: 'Economic Growth',
    description: 'Supporting local businesses and creating good-paying jobs for Houston County families.',
    icon: 'briefcase'
  },
  {
    id: 'public-safety',
    title: 'Public Safety',
    description: 'Ensuring our neighborhoods are safe and supporting our first responders.',
    icon: 'shield'
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Improving roads, bridges, and broadband access for all communities.',
    icon: 'building'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Access',
    description: 'Expanding access to quality healthcare and reducing costs for families.',
    icon: 'heart'
  }
]
</script>
```

### Card Component

```vue
<!-- components/PlatformCard.vue -->
<template>
  <article class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
        <!-- Icon or emoji -->
        <span class="text-white text-xl">{{ iconChar }}</span>
      </div>
      <h3 class="text-xl font-semibold ml-4">{{ title }}</h3>
    </div>
    <p class="text-gray-700">{{ description }}</p>
  </article>
</template>
```

### Responsive Breakpoints

- Mobile (default): 1 column, full width
- md (768px+): 2 columns
- lg (1024px+): 3 columns (if 5 positions, last row has 2)

### Card Layout Best Practices

1. **Visual Hierarchy:**
   - Title: Bold, larger font
   - Description: Readable body text
   - Icon/Emoji: Visual anchor for scanning

2. **Spacing:**
   - Gap of 6 (1.5rem) between cards
   - Padding of 6 inside cards
   - Margin bottom of 12 (3rem) for section spacing

3. **Hover Effects:**
   - Subtle shadow transition
   - Optional: slight lift effect
   - Avoid animation that could cause motion sickness

---

## 4. Photo Gallery with Lightbox Modal

### What You Need to Know

The gallery displays campaign photos (candidate, team, community events) with a lightbox modal for full-size viewing. ALL images must include alt text for accessibility.

### SSR-Compatible Lightbox Options

**Challenge:** Many lightbox libraries rely on browser APIs that don't work with server-side rendering. For Nuxt 4, use one of these approaches:

#### Option 1: vue-easy-lightbox (Recommended)

```bash
npm install vue-easy-lightbox
```

Create client-side plugin:

```js
// plugins/lightbox.client.js
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueEasyLightbox)
})
```

Usage in component:

```vue
<template>
  <section id="gallery" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Campaign Photos
      </h2>

      <!-- Photo Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button
          v-for="(photo, index) in photos"
          :key="photo.id"
          @click="showLightbox(index)"
          class="aspect-square overflow-hidden rounded-lg"
        >
          <NuxtImg
            :src="photo.thumb"
            :alt="photo.alt"
            width="400"
            height="400"
            loading="lazy"
            class="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <vue-easy-lightbox
      :visible="visible"
      :imgs="lightboxImages"
      :index="currentIndex"
      @hide="visible = false"
    />
  </section>
</template>

<script setup lang="ts">
const visible = ref(false)
const currentIndex = ref(0)

const photos = [
  { id: 1, thumb: '/photos/thumb-1.jpg', full: '/photos/full-1.jpg', alt: 'Xzandria speaking at town hall' },
  { id: 2, thumb: '/photos/thumb-2.jpg', full: '/photos/full-2.jpg', alt: 'Campaign volunteers canvassing' },
  // ... more photos
]

const lightboxImages = photos.map(p => ({ src: p.full, alt: p.alt }))

const showLightbox = (index: number) => {
  currentIndex.value = index
  visible.value = true
}
</script>
```

#### Option 2: Custom Lightbox with Dialog Element

For full control, build a custom lightbox using the native HTML `<dialog>` element:

```vue
<script setup lang="ts">
const dialog = ref<HTMLDialogElement>()
const currentImage = ref<{ src: string; alt: string } | null>(null)

const openLightbox = (image: { src: string; alt: string }) => {
  currentImage.value = image
  dialog.value?.showModal()
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  dialog.value?.close()
  document.body.style.overflow = ''
}

// Close on escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <dialog ref="dialog" class="backdrop:bg-black/80 rounded-lg p-0">
    <div v-if="currentImage" class="relative">
      <img :src="currentImage.src" :alt="currentImage.alt" class="max-w-[90vw] max-h-[90vh]" />
      <button @click="closeLightbox" class="absolute top-4 right-4 text-white text-4xl">
        &times;
      </button>
    </div>
  </dialog>
</template>
```

### Image Alt Text Requirements

**CRITICAL:** All images MUST have descriptive alt text per VIS-04 and WCAG 2.1 AA.

| Photo Type | Good Alt Text Example | Bad Alt Text |
|------------|----------------------|--------------|
| Candidate portrait | "Xzandria Armstrong smiling at campaign rally" | "photo", "image", "candidate" |
| Team photo | "Campaign volunteers holding Armstrong signs at Houston County Fair" | "team", "volunteers" |
| Event | "Xzandria speaking with local business owners" | "event", "meeting" |
| Group shot | "Supporters posing with Xzandria after town hall" | "crowd", "group" |

### Image Optimization with @nuxt/image

Configure in nuxt.config.ts:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/image'],

  image: {
    // Build-in image processing
    quality: 80,
    formats: ['webp', 'avif', 'jpeg'],

    // Screens for responsive sizing
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },

    // Presets for gallery thumbnails
    presets: {
      gallery: {
        width: 400,
        height: 400,
        fit: 'cover',
        quality: 75
      },
      galleryFull: {
        width: 1200,
        quality: 85
      }
    }
  }
})
```

Usage:

```vue
<!-- Thumbnail with preset -->
<NuxtImg
  src="/photos/rally-1.jpg"
  alt="Xzandria speaking at campaign rally"
  preset="gallery"
  loading="lazy"
/>

<!-- Full-size for lightbox -->
<NuxtImg
  src="/photos/rally-1.jpg"
  alt="Xzandria speaking at campaign rally"
  preset="galleryFull"
/>
```

---

## 5. Campaign Members & Endorsements Sections

### What You Need to Know

These sections highlight team members/volunteers and community endorsements. They build social proof and community connection.

### Members Section Pattern

```vue
<!-- components/MembersSection.vue -->
<template>
  <section id="team" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Meet the Team
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="member in members"
          :key="member.id"
          class="bg-white rounded-lg p-6 text-center shadow-md"
        >
          <NuxtImg
            :src="member.photo"
            :alt="member.name"
            width="200"
            height="200"
            class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="font-semibold text-lg">{{ member.name }}</h3>
          <p class="text-gray-600">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
```

### Endorsements Section Pattern

```vue
<!-- components/EndorsementsSection.vue -->
<template>
  <section id="endorsements" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Endorsements
      </h2>

      <div class="max-w-4xl mx-auto space-y-6">
        <blockquote
          v-for="endorsement in endorsements"
          :key="endorsement.id"
          class="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-600"
        >
          <p class="text-lg italic mb-4">"{{ endorsement.quote }}"</p>
          <footer class="flex items-center">
            <cite class="not-italic">
              <strong>{{ endorsement.name }}</strong>
              <span class="text-gray-600 block text-sm">{{ endorsement.title }}</span>
            </cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>
```

### Content Requirements

**Members:**
- Name, photo, role (e.g., "Volunteer Coordinator", "Houston County Chair")
- 4-8 members to start
- Round headshots work best

**Endorsements:**
- Quote, name, title/organization
- Start with 3-5 endorsements
- Include community leaders, organizations, officials

---

## 6. Contact Section & Social Media Links

### What You Need to Know

The contact section provides ways to get involved: volunteer inquiries, email, phone, mailing address. Social media links appear in footer and/or contact section.

### Contact Section Pattern

```vue
<!-- components/ContactSection.vue -->
<template>
  <section id="contact" class="py-20 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
        Get Involved
      </h2>
      <p class="text-center text-lg mb-12 max-w-2xl mx-auto text-gray-300">
        Want to volunteer or have questions? We'd love to hear from you.
      </p>

      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <!-- Email -->
        <div class="text-center">
          <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="font-semibold mb-2">Email</h3>
          <a :href="`mailto:${contact.email}`" class="text-teal-400 hover:text-teal-300">
            {{ contact.email }}
          </a>
        </div>

        <!-- Phone -->
        <div class="text-center">
          <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 class="font-semibold mb-2">Phone</h3>
          <a :href="`tel:${contact.phone}`" class="text-teal-400 hover:text-teal-300">
            {{ contact.phone }}
          </a>
        </div>

        <!-- Social -->
        <div class="text-center">
          <h3 class="font-semibold mb-4">Follow Us</h3>
          <div class="flex justify-center space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              :aria-label="`Follow us on ${social.platform}`"
              class="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
            >
              <!-- Social icon -->
              <span class="text-white font-bold">{{ social.platform[0] }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Contact info from app.config.ts (to be filled by campaign)
const contact = {
  email: 'info@armstrongforhouston.com',
  phone: '(478) 555-0123',
  address: '123 Main Street, Warner Robins, GA 31088'
}

const socialLinks = [
  { platform: 'Facebook', url: 'https://facebook.com/armstrongforhouston' },
  { platform: 'Instagram', url: 'https://instagram.com/armstrongforhouston' }
  // Add X/Twitter, etc. as needed
]
</script>
```

### Social Media Links

Add to AppFooter component for site-wide access:

```vue
<!-- In AppFooter.vue -->
<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Social links -->
      <div class="flex justify-center space-x-6 mb-6">
        <a
          v-for="social in socialLinks"
          :key="social.platform"
          :href="social.url"
          :aria-label="`Follow us on ${social.platform}`"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <!-- SVG icons or heroicons -->
        </a>
      </div>

      <!-- Legal disclaimers (already implemented) -->
    </div>
  </footer>
</template>
```

---

## 7. Donation CTA Placement & Legal Compliance

### What You Need to Know

Donate buttons must appear in hero and at least 2 additional locations. Legal compliance includes transparent donation options (no pre-checked recurring boxes, clear fees).

### FEC Requirements for Donation Links

**Critical:** The FEC actively scrutinizes donation practices. Pre-checked recurring donation boxes are being targeted for bans.

### Donation Button Locations

| Location | Visibility | Purpose |
|----------|------------|---------|
| Hero section | Primary (above fold) | Immediate conversion opportunity |
| After Platform | Secondary | After learning positions |
| Before Footer | Tertiary | Final reminder before leaving site |
| Navigation | Always visible | Quick access from anywhere |

### Donate Button Component

```vue
<!-- components/DonateButton.vue -->
<template>
  <a
    :href="donationUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
    :class="variantClasses"
    :aria-label="`Donate to support ${committeeName}`"
  >
    <span>{{ buttonText }}</span>
    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </a>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  text: 'Donate'
})

const config = useAppConfig()
const committeeName = config.site?.name || 'the campaign'
const donationUrl = 'https://secure.actblue.com/donate/placeholder' // To be updated

const buttonText = computed(() => props.text)

const variantClasses = computed(() => {
  const base = 'text-white'
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }

  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-700',
    secondary: 'bg-yellow-600 hover:bg-yellow-700 text-gray-900',
    outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
  }

  return `${base} ${sizes[props.size]} ${variants[props.variant]}`
})
</script>
```

### Legal Compliance Requirements (LEGAL-02, LEGAL-03)

**Prohibited Dark Patterns:**
1. No pre-checked recurring donation boxes
2. No hidden fees or misleading statements
3. Clear indication of one-time vs recurring options
4. Easy cancellation information

**Best Practices:**
1. Link to external platform (ActBlue, Anedot, etc.) - they handle FEC compliance for payment processing
2. Include disclaimer: "Contributions are not tax deductible" near donation button
3. Be transparent about how funds will be used

**External Platform Options:**
- ActBlue (Democratic-leaning campaigns)
- Anedot (Republican-leaning campaigns)
- WinRed (Republican campaigns)
- Stripe (neutral, requires more setup)

---

## 8. Visual Design with Campaign Colors

### What You Need to Know

Campaign uses teal/gold colors from provided reference. Each combination MUST be validated for WCAG 2.1 AA compliance (4.5:1 for normal text).

### Color Palette Planning

From Phase 1 contrast verification document, the brand colors to verify:

```typescript
// app.config.ts - add brand colors
export default defineAppConfig({
  brand: {
    // Primary teals (Tailwind-based hex values)
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // teal-500
      600: '#0d9488', // teal-600
      700: '#0f766e', // teal-700
      800: '#115e59',
      900: '#134e4a'
    },
    // Accent golds/yellows
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308', // yellow-500
      600: '#ca8a04', // yellow-600
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12'
    }
  }
})
```

### Contrast Verification for Brand Colors

Before applying, verify these combinations meet 4.5:1:

| Foreground | Hex | Background | Hex | Expected Ratio | Status |
|------------|-----|------------|-----|----------------|--------|
| White text | #ffffff | Teal-600 | #0d9488 | ~3.2:1 | FAIL (too low) |
| White text | #ffffff | Teal-700 | #0f766e | ~4.0:1 | FAIL (too low) |
| White text | #ffffff | Teal-800 | #115e59 | ~5.2:1 | PASS |
| Teal-700 | #0f766e | White | #ffffff | ~4.0:1 | FAIL (too low) |
| Teal-800 | #115e59 | White | #ffffff | ~5.2:1 | PASS |
| Teal-900 | #134e4a | White | #ffffff | ~6.8:1 | PASS |

**Solution:** Use darker teal (teal-800 or teal-900) for buttons with white text, OR use white/light background with dark teal text.

### Recommended Color Combinations

**Buttons:**
- Primary: teal-800 background + white text (5.2:1)
- Secondary: yellow-500 background + gray-900 text (~10:1)

**Text:**
- Headings: teal-900 on white/light background
- Body text: gray-900 on white
- Links: teal-700 on white (needs verification)

**Backgrounds:**
- Hero: White or very light teal-50
- Sections alternating: white and gray-50 or teal-50

### Color Application Strategy

```css
/* Create brand color utilities in Tailwind config or component styles */

/* Primary brand color - verified PASS */
.bg-brand-primary { background-color: #115e59; } /* teal-800 */
.text-brand-primary { color: #115e59; }

/* Secondary brand color */
.bg-brand-accent { background-color: #eab308; } /* yellow-500 */
.text-brand-accent { color: #a16207; } /* yellow-700 for better contrast */

/* Light brand backgrounds */
.bg-brand-light { background-color: #f0fdfa; } /* teal-50 */
```

---

## 9. Mobile Responsiveness for All Sections

### What You Need to Know

All sections must be mobile-responsive. Use Tailwind breakpoints and test on real devices (iOS Safari, Android Chrome).

### Responsive Strategy

**Tailwind Breakpoints:**
- `default`: < 640px (mobile)
- `sm`: 640px+ (large phones, small tablets)
- `md`: 768px+ (tablets, small laptops)
- `lg`: 1024px+ (desktops)
- `xl`: 1280px+ (large desktops)

### Section-by-Section Responsive Patterns

**Hero Section:**
```vue
<div class="grid md:grid-cols-2 gap-8 items-center">
  <!-- Content -->
  <div class="text-center md:text-left order-2 md:order-1">
    <!-- Text sizes -->
    <h1 class="text-4xl md:text-6xl font-bold"> <!-- Smaller on mobile -->
  </div>
  <!-- Image -->
  <div class="order-1 md:order-2">
    <!-- Image appears first on mobile -->
  </div>
</div>
```

**Platform Cards:**
```vue
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 col mobile, 2 col tablet, 3 col desktop -->
</div>
```

**Gallery:**
```vue
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <!-- 2 col mobile, 3 col tablet, 4 col desktop -->
</div>
```

### Mobile Testing Checklist

- [ ] Hero text readable without horizontal scroll
- [ ] Images don't overflow or cause horizontal scroll
- [ ] Navigation hamburger works on mobile
- [ ] Donate buttons are large enough for touch (min 44x44px)
- [ ] Gallery images are appropriately sized on mobile
- [ ] Forms (if any) have adequate input field height
- [ ] Tap targets are spaced to avoid accidental clicks
- [ ] Test on iOS Safari (webkit-specific issues)
- [ ] Test on Android Chrome

---

## 10. Accessibility Considerations

### What You Need to Know

All sections must meet WCAG 2.1 AA standards. Key areas: alt text, ARIA labels, keyboard navigation, focus visible.

### Accessibility Checklist by Section

**Hero Section:**
- [ ] Hero image has descriptive alt text
- [ ] Hero text has 4.5:1 contrast with background
- [ ] Donate button has visible focus state
- [ ] h1 is used for main heading
- [ ] Skip link targets hero or main content

**About Section:**
- [ ] All images have alt text
- [ ] Text contrast meets 4.5:1
- [ ] h2/h3 headings properly nested
- [ ] Content is readable with screen reader

**Platform Section:**
- [ ] Each card is accessible via keyboard
- [ ] Cards have semantic markup (article or div with role)
- [ ] Icons have aria-label or are decorative (aria-hidden)
- [ ] Grid is understandable on screen reader

**Gallery:**
- [ ] All images have descriptive alt text
- [ ] Lightbox is keyboard accessible (Escape to close)
- [ ] Gallery buttons have focus-visible styles
- [ ] Lightbox trap focus when open
- [ ] Image count or position is announced

**Contact Section:**
- [ ] Email links use mailto: properly
- [ ] Phone links use tel: properly
- [ ] Social links have aria-label with platform name
- [ ] Form inputs have associated labels (if forms added)

**General:**
- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical
- [ ] :focus-visible styles are defined
- [ ] Color is not the only means of conveying information
- [ ] Motion is respectful of prefers-reduced-motion

### Focus Visible Implementation

```css
/* Already in main.css from Phase 1 */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* For better visibility on dark backgrounds */
button:focus-visible,
a:focus-visible {
  outline-width: 3px;
  outline-offset: 4px;
}
```

---

## Planning Checklist for Phase 2

Use this checklist when creating implementation plans:

### Hero Section (CONT-01)
- [ ] Obtain candidate photo (professional portrait)
- [ ] Finalize tagline/positioning statement
- [ ] Configure @nuxt/image for hero optimization
- [ ] Set hero image as LCP priority (loading="eager")
- [ ] Verify hero text contrast meets 4.5:1
- [ ] Create HeroSection.vue component
- [ ] Add primary donate button

### About Section (CONT-02)
- [ ] Gather biographical content from campaign
- [ ] Draft "Who I Am", "Why I'm Running", "Vision" text
- [ ] Create AboutSection.vue component
- [ ] Verify text contrast and readability

### Platform Section (CONT-03)
- [ ] Finalize 3-5 platform positions
- [ ] Write descriptions for each position (1-2 sentences)
- [ ] Create PlatformSection.vue component
- [ ] Create PlatformCard.vue component
- [ ] Configure responsive grid (1/2/3 columns)
- [ ] Verify card accessibility

### Gallery Section (CONT-04)
- [ ] Gather campaign photos (candidate, team, events)
- [ ] Prepare/crop images for consistent aspect ratio
- [ ] Write alt text for EACH image
- [ ] Choose and install lightbox library (vue-easy-lightbox recommended)
- [ ] Create client-side plugin for lightbox
- [ ] Create GallerySection.vue component
- [ ] Configure @nuxt/image presets for thumbnails
- [ ] Test lightbox keyboard accessibility (Escape to close)

### Members Section (CONT-05)
- [ ] Gather team member photos and names/roles
- [ ] Create MembersSection.vue component
- [ ] Configure responsive grid layout

### Endorsements Section (CONT-06)
- [ ] Gather endorsement quotes and sources
- [ ] Create EndorsementsSection.vue component
- [ ] Use blockquote semantic element

### Contact Section & Social (ENG-03, ENG-04)
- [ ] Obtain contact email, phone, address
- [ ] Obtain social media URLs (Facebook, Instagram)
- [ ] Create ContactSection.vue component
- [ ] Add social links to AppFooter component
- [ ] Verify mailto: and tel: links work

### Donation CTAs (ENG-01, ENG-02)
- [ ] Configure donation URL (ActBlue/Anedot/etc.)
- [ ] Create DonateButton.vue component with variants
- [ ] Place donate in hero section
- [ ] Place donate after platform section
- [ ] Place donate in or before footer (3rd location)
- [ ] Verify no dark patterns (transparent options)

### Visual Design (VIS-01, VIS-02, VIS-03, VIS-04)
- [ ] Obtain exact hex values for campaign colors
- [ ] Verify ALL color combinations for WCAG 2.1 AA (4.5:1)
- [ ] Document contrast ratios in 02-CONTRAST-VERIFICATION.md
- [ ] Apply brand colors to all components
- [ ] Choose typography (font family) if not using default
- [ ] Verify design conveys professionalism and trust

### Image Optimization (FND-04)
- [ ] Install @nuxt/image module (if not installed)
- [ ] Configure image presets in nuxt.config.ts
- [ ] Set up WebP/AVIF format conversion
- [ ] Configure lazy loading for non-critical images
- [ ] Add width/height to all images to prevent layout shift

### Mobile Responsiveness (FND-03)
- [ ] Test all sections on mobile (320px width)
- [ ] Test on tablet (768px width)
- [ ] Verify no horizontal scroll
- [ ] Test on real devices (iOS Safari, Android Chrome)
- [ ] Verify tap targets are minimum 44x44px

---

## Dependencies & Blockers

### Internal Dependencies

Phase 2 depends on Phase 1 completion:
- [x] Navigation component exists (01-02)
- [x] Footer with legal disclaimers exists (01-03)
- [x] Default layout exists (01-02)
- [x] Skip link exists (01-02)
- [x] Project configured for Nuxt 4 (01-01)

### External Dependencies

| Dependency | Type | Required For | Notes |
|------------|------|--------------|-------|
| Candidate photo | Content | Hero section | Professional headshot needed |
| Biographical text | Content | About section | Need from campaign/treasurer |
| Platform positions | Content | Platform section | 3-5 positions with descriptions |
| Campaign photos | Content | Gallery section | Multiple photos, all need alt text |
| Team member info | Content | Members section | Names, roles, photos |
| Endorsement quotes | Content | Endorsements section | Quotes + names + titles |
| Contact information | Content | Contact section | Email, phone, address |
| Social media URLs | Content | Social links | Facebook, Instagram, etc. |
| Donation platform URL | External | Donate buttons | ActBlue, Anedot, or similar |
| Exact color hex values | Design | Brand colors | Need from reference image |

### Potential Blockers

1. **Content not provided** - Cannot build sections without text/photos
2. **Color palette not finalized** - Cannot verify contrast without exact hex values
3. **Donation platform not chosen** - Need URL for donate buttons
4. **Photos not ready** - Gallery cannot be built without images
5. **Lightbox SSR issues** - Some libraries don't work with Nuxt SSR

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Color contrast failures | HIGH (ADA liability) | MEDIUM | Test ALL combinations before applying |
| Missing alt text | HIGH (ADA violation) | MEDIUM | Make alt text required in content workflow |
| Lightbox doesn't work with SSR | MEDIUM (broken feature) | LOW | Use .client plugin or native <dialog> |
| Content delays | HIGH (timeline slip) | HIGH | Build with placeholder content, swap later |
| Mobile layout issues | MEDIUM (poor UX) | MEDIUM | Test on real devices early |
| Donation link not ready | HIGH (no conversion) | LOW | Use placeholder URL, document swap needed |

---

## Open Questions for Planning

1. **What are the exact hex values** for the campaign teal and gold colors?
2. **What donation platform** will be used (ActBlue, Anedot, WinRed, etc.)?
3. **What is the donation URL** for the external platform?
4. **When will campaign photos** be provided for the gallery?
5. **What are the 3-5 platform positions** to highlight?
6. **Who should be listed** in team members section?
7. **What endorsements** are available to display?
8. **What are the social media URLs** (Facebook, Instagram, etc.)?
9. **What contact information** should be displayed (email, phone, address)?
10. **Is there preferred typography** or should we use default?

---

## Sources

### Official Documentation (HIGH Confidence)
- Nuxt 4 Documentation - https://nuxt.com (framework core, component patterns)
- @nuxt/image Documentation - https://image.nuxt.com (image optimization, presets)
- @nuxt/ui Documentation - https://ui.nuxt.com (UI components)
- WCAG 2.1 Guidelines - https://www.w3.org/WAI/WCAG21/Understanding/ (contrast requirements)

### Technical Implementation (MEDIUM Confidence)
- vue-easy-lightbox - SSR-compatible Vue 3 lightbox component
- Nuxt 4 Integration Guides - Various 2025-2026 articles on Nuxt 4 + Vue 3 Composition API
- Tailwind CSS - https://tailwindcss.com (utility-first CSS framework)
- WebAIM Contrast Checker - https://webaim.org/resources/contrastchecker/

### Design & Best Practices (MEDIUM Confidence)
- Campaign website best practices - Political donation UX research
- Card layout design principles - Campaign platform display patterns
- Mobile-first responsive design - Tailwind breakpoint strategies

### Legal & Compliance (MEDIUM Confidence)
- FEC Regulations 11 CFR 110.11 - Digital disclaimers for political communications
- FEC Donation Button Requirements - Campaign website donation compliance
- Dark Patterns Regulations - Growing bans on pre-checked recurring donations

## 11. Design Reference: Diijon DaCosta Campaign Site

**Source:** https://diijondacosta.com/

The Armstrong campaign site should follow this design pattern closely. This is the primary influence for all Phase 2 design decisions.

### Hero Section (Reference Pattern)

**Structure from diijondacosta.com:**
- Full-width hero with centered or split layout
- "Re-Elect" or campaign badge above name
- Large candidate name (h1)
- Position title with district/county info
- Tagline: "Keeping Our Scholars First" (equivalent: Armstrong's campaign slogan)
- Dual CTA buttons: "Donate Now" (primary) + "Volunteer" (secondary)
- Candidate photo on right or center

**Key Design Elements:**
- Clean, professional typography
- Blue/navy primary color with red accent (adapt to teal/gold for Armstrong)
- Strong visual hierarchy
- Immediate donate button visibility

### Navigation Structure

**Top Bar (above navigation):**
- Contact info: email + phone
- Social media icons

**Main Navigation:**
- Sticky on scroll
- CTA buttons in nav: "Volunteer" + "Donate Now"
- Mobile hamburger menu

### Section Patterns

**1. Meet DaCosta / About (Tabbed Interface)**
- Tab navigation: BIO | EDUCATION | ADVOCACY
- Bio content with professional photo
- Vision/Mission side cards
- Clean typography for readability

**2. Leadership Section (Numbered Cards)**
- Numbered cards (01, 02, 03...) with hover effects
- Leadership roles presented in grid
- Clean, spacious layout

**3. Key Governance & Policy Focus**
- Bullet list format
- Checkmark or icon for each item
- Grouped by category

**4. Major Accomplishments**
- Bullet list with checkmarks
- Grouped sections (Governance, Professional, Impact, etc.)

**5. Awards & Recognition**
- List format with award names
- Associated organizations noted

**6. District Schools / Accolades**
- Tabbed or categorized display
- School listings by level (Elementary, Middle, High)
- Visual badges for achievements

**7. Get Involved / Contact**
- Three-column layout:
  - Volunteer (with form/signup)
  - Donate (with CTA)
  - Stay Informed (email signup)
- Social media links prominent

**8. Photos and Community**
- Category tabs: School visits, Athletics, Graduations, etc.
- Gallery grid layout
- Lightbox modal for viewing

### Color Scheme Adaptation

| Diijon DaCosta | Armstrong Campaign |
|----------------|-------------------|
| Navy/Blue primary | Teal primary |
| Red accent | Gold accent |
| White backgrounds | White/light gray backgrounds |
| Dark footer | Dark footer |

### Component Patterns to Replicate

1. **Numbered Cards** - Leadership, Platform sections
2. **Tabbed Navigation** - Bio sections, Gallery categories
3. **Bullet Lists with Icons** - Policy positions, accomplishments
4. **Three-Column Get Involved** - Volunteer, Donate, Newsletter
5. **Social Media Footer** - Full-width with icons
6. **Event Promo Banner** - Fundraiser/RSVP (when needed)

### Typography Hierarchy

```
h1 (60px): Candidate Name
h2 (48px): Section Titles
h3 (32px): Card/Block Titles
body (18px): Main content
```

### Spacing Patterns

- Hero: Full viewport height (min-h-screen)
- Section padding: py-20 to py-24 (80-96px)
- Card gaps: gap-6 to gap-8 (24-32px)
- Container max-width: 1280px (max-w-7xl)

---

### Unverified / Needs Validation (LOW Confidence)
- Specific Georgia GTCFC digital communication requirements - Limited official documentation; recommend direct contact with commission
- Exact campaign color hex values - To be extracted from provided reference image

---

*Research completed: 2026-02-24*
*Design reference added: Diijon DaCosta campaign site*
*Next step: Create implementation plans based on this research*
