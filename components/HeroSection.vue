<script setup lang="ts">
/**
 * HeroSection Component
 *
 * Main hero section displaying candidate information and CTAs.
 * Follows diijondacosta.com pattern with split layout.
 *
 * Features:
 * - Full-width hero with min-h-screen
 * - Split layout: content left (desktop), photo right (desktop)
 * - Mobile: photo first, content second
 * - Prominent donate CTA with secondary volunteer option
 */

const config = useAppConfig()

// Hero content from config
const heroContent = computed(() => (config as any).hero || {
  badge: 'For Houston County',
  name: 'Xzandria Armstrong',
  title: 'For Houston County, GA',
  tagline: 'Leadership. Integrity. Progress.',
  photo: '/images/candidate-portrait.jpg',
  photoAlt: 'Xzandria Armstrong, candidate for Houston County'
})

// Use placeholder if no actual photo exists yet
const showPlaceholder = ref(true)
const imageError = ref(false)

const handleImageLoad = () => {
  showPlaceholder.value = false
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <section
    id="hero"
    class="min-h-screen bg-gradient-to-br from-white to-teal-50 py-12 md:py-20 scroll-mt-20"
  >
    <div class="container mx-auto px-4">
      <!-- Grid layout: split on desktop -->
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Left column: Content (order-2 on mobile, order-1 on desktop) -->
        <div class="text-center md:text-left order-2 md:order-1">
          <!-- Geographic badge -->
          <p
            v-if="heroContent.badge"
            class="text-teal-800 font-semibold text-xs tracking-wider uppercase mb-4"
          >
            {{ heroContent.badge }}
          </p>

          <!-- Candidate name (h1 for SEO) -->
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            {{ heroContent.name }}
          </h1>

          <!-- Position title -->
          <p class="text-2xl md:text-3xl text-gray-700 font-medium mt-2">
            {{ heroContent.title }}
          </p>

          <!-- Tagline/slogan -->
          <p class="text-xl text-gray-600 mt-4 max-w-lg mx-auto md:mx-0">
            {{ heroContent.tagline }}
          </p>

          <!-- CTA buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <!-- Primary donate button -->
            <DonateButton
              variant="primary"
              size="large"
              text="Donate Now"
            />

            <!-- Secondary volunteer button (placeholder link) -->
            <DonateButton
              variant="outline"
              size="large"
              text="Volunteer"
            />
          </div>
        </div>

        <!-- Right column: Candidate photo (order-1 on mobile, order-2 on desktop) -->
        <div class="order-1 md:order-2 flex justify-center">
          <div class="relative">
            <!-- Decorative background shape -->
            <div class="absolute inset-0 bg-gradient-to-br from-teal-200 to-yellow-200 rounded-2xl transform rotate-3 opacity-50" />

            <!-- Candidate photo -->
            <div class="relative">
              <img
                :src="heroContent.photo"
                :alt="heroContent.photoAlt"
                width="600"
                height="800"
                loading="eager"
                fetchpriority="high"
                class="rounded-2xl shadow-2xl max-w-xs md:max-w-md lg:max-w-lg w-full h-auto object-cover"
                :class="{ 'hidden': imageError }"
                @load="handleImageLoad"
                @error="handleImageError"
              >

              <!-- Placeholder when image not available -->
              <div
                v-if="imageError || showPlaceholder"
                class="rounded-2xl shadow-2xl max-w-xs md:max-w-md lg:max-w-lg w-full aspect-[3/4] bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center"
              >
                <div class="text-center p-8">
                  <svg
                    class="w-24 h-24 mx-auto text-teal-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <p class="mt-4 text-teal-700 font-medium">Candidate Photo</p>
                  <p class="text-sm text-teal-600">Image coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth scrolling when navigating to hero section */
#hero {
  scroll-margin-top: 80px;
}
</style>
