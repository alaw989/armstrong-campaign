<script setup lang="ts">
/**
 * HeroSection Component
 *
 * Main hero section with image background and centered content.
 *
 * Features:
 * - Full-screen image background
 * - Centered text content
 * - Dark overlay for readability
 * - Prominent donate CTA with secondary volunteer option
 */

const config = useAppConfig()

// Hero content from config
const heroContent = computed(() => (config as any).hero || {
  badge: 'District 4',
  name: 'Xzandria Armstrong',
  title: 'Houston County Board of Education',
  tagline: 'Leadership. Integrity. Progress.',
})

// Background image
const backgroundImage = '/images/gallery/IMG_0020.jpeg'
</script>

<template>
  <section
    id="hero"
    class="relative flex items-center justify-center overflow-hidden bg-black -mt-32"
    style="height: 100vh; min-height: 600px;"
  >
    <!-- Image Background -->
    <img
      :src="backgroundImage"
      alt=""
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
      style="object-fit: cover; margin-top: -200px;"
    />

    <!-- Dark overlay for text readability -->
    <div class="absolute inset-0 bg-black/40" />

    <!-- Gradient overlay for depth -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

    <!-- Content - Centered -->
    <div class="relative z-10 container mx-auto px-4 text-center">
      <!-- Geographic badge -->
      <p
        v-if="heroContent.badge"
        class="text-teal-300 font-semibold text-sm tracking-widest uppercase mb-6 animate-fade-in"
      >
        {{ heroContent.badge }}
      </p>

      <!-- Candidate name (h1 for SEO) -->
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
        {{ heroContent.name }}
      </h1>

      <!-- Position title -->
      <p class="text-2xl md:text-4xl text-teal-200 font-medium mb-6 drop-shadow-lg">
        {{ heroContent.title }}
      </p>

      <!-- Tagline/slogan -->
      <p class="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow">
        {{ heroContent.tagline }}
      </p>

      <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <!-- Primary donate button -->
        <DonateButton
          variant="primary"
          size="large"
          text="Donate Now"
        />

        <!-- Secondary volunteer button -->
        <DonateButton
          variant="outline"
          size="large"
          text="Volunteer"
          class="border-white text-white hover:bg-white/10"
        />
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg
        class="w-6 h-6 text-white/70"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth scrolling when navigating to hero section */
#hero {
  scroll-margin-top: 128px;
}

/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
