<script setup lang="ts">
/**
 * HeroSection Component
 *
 * Main hero section displaying candidate information and CTAs.
 *
 * Features:
 * - Full-width hero with min-h-screen
 * - Split layout: content left (desktop), photo right (desktop)
 * - Auto-rotating photo carousel with smooth fade transitions
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

// Get photos array or fall back to single photo
const photos = computed(() => {
  if (heroContent.value.photos && Array.isArray(heroContent.value.photos) && heroContent.value.photos.length > 0) {
    return heroContent.value.photos
  }
  return heroContent.value.photo ? [heroContent.value.photo] : []
})

// Carousel state
const currentIndex = ref(0)
const intervalTime = 5000 // 5 seconds per slide

// Auto-rotate carousel
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % photos.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + photos.value.length) % photos.value.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

// Auto-advance on mount
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (photos.value.length > 1) {
    interval = setInterval(nextSlide, intervalTime)
  }
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

// Current photo for display
const currentPhoto = computed(() => photos.value[currentIndex.value] || '')

// Placeholder handling
const showPlaceholder = ref(false)
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
          <p class="text-2xl md:text-3xl text-teal-700 font-medium mt-2">
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

            <!-- Secondary volunteer button -->
            <DonateButton
              variant="outline"
              size="large"
              text="Volunteer"
            />
          </div>
        </div>

        <!-- Right column: Photo carousel (order-1 on mobile, order-2 on desktop) -->
        <div class="order-1 md:order-2 flex justify-center">
          <div class="relative">
            <!-- Decorative background shape -->
            <div class="absolute inset-0 bg-gradient-to-br from-teal-200 to-yellow-200 rounded-2xl transform rotate-3 opacity-50" />

            <!-- Photo carousel -->
            <div class="relative">
              <!-- Transition container -->
              <div class="relative rounded-2xl shadow-2xl max-w-xs md:max-w-md lg:max-w-lg w-full overflow-hidden">
                <Transition
                  :name="'carousel'"
                  mode="out-in"
                >
                  <NuxtImg
                    :key="currentPhoto"
                    :src="currentPhoto"
                    :alt="heroContent.photoAlt"
                    :width="800"
                    :height="1067"
                    loading="eager"
                    fetchpriority="high"
                    preset="hero"
                    format="webp"
                    class="w-full h-auto object-cover carousel-image"
                    :class="{ 'hidden': imageError }"
                    @load="handleImageLoad"
                    @error="handleImageError"
                  />
                </Transition>
              </div>

              <!-- Placeholder when image not available -->
              <div
                v-if="imageError || showPlaceholder"
                class="rounded-2xl shadow-2xl max-w-xs md:max-w-md lg:max-w-lg w-full aspect-[3/4] bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center absolute inset-0"
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

              <!-- Carousel indicators (only show if multiple photos) -->
              <div
                v-if="photos.length > 1"
                class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
              >
                <button
                  v-for="(_, index) in photos"
                  :key="index"
                  @click="goToSlide(index)"
                  class="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-800"
                  :class="index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'"
                  :aria-label="`Go to slide ${index + 1}`"
                />
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

/* Carousel fade transition */
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 800ms ease-in-out;
}

.carousel-enter-from {
  opacity: 0;
}

.carousel-leave-to {
  opacity: 0;
}

/* Image aspect ratio container */
.carousel-image {
  aspect-ratio: 3 / 4;
}
</style>
