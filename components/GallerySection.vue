<script setup lang="ts">
/**
 * GallerySection Component
 *
 * Displays campaign photos in a responsive grid layout with lightbox functionality.
 *
 * Features:
 * - Responsive grid: 2 columns mobile, 3 columns tablet, 4 columns desktop
 * - Scroll-triggered fade-in animation
 * - Square aspect ratio thumbnails with object-cover
 * - Lightbox modal for full-size viewing
 * - Keyboard accessible (click and keyboard navigation)
 * - Descriptive alt text for all images (WCAG 2.1 AA)
 * - Lazy loading for performance
 * - Hover effects for interaction feedback
 * - "Coming soon" state when no photos available
 */

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

interface GalleryPhoto {
  id: string
  thumb: string
  full: string
  alt: string
}

// Reactive state
const lightboxVisible = ref(false)
const currentPhotoIndex = ref(0)
const visibleCount = ref(24) // Show 24 images initially
const increment = 24 // Load 24 more each time

// Photo data from composable
const allPhotos = useGalleryImages()

// Paginated photos - show only visibleCount at a time
const photos = computed(() => allPhotos.slice(0, visibleCount.value))

// Check if there are more photos to load
const hasMorePhotos = computed(() => visibleCount.value < allPhotos.length)

// Check if gallery has photos
const hasPhotos = computed(() => allPhotos.length > 0)

// Load more photos
const loadMore = () => {
  visibleCount.value = Math.min(visibleCount.value + increment, allPhotos.length)
}

// Reset to show fewer photos
const showLess = () => {
  visibleCount.value = increment
}


// Open lightbox at specific photo index
const openLightbox = (index: number) => {
  currentPhotoIndex.value = index
  lightboxVisible.value = true
}

// Close lightbox
const closeLightbox = () => {
  lightboxVisible.value = false
}

// Navigate to previous photo
const previousPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

// Navigate to next photo
const nextPhoto = () => {
  if (currentPhotoIndex.value < allPhotos.length - 1) {
    currentPhotoIndex.value++
  }
}

// Prepare images for lightbox (use all photos, not just visible)
const lightboxImages = computed(() => {
  return allPhotos.map(photo => ({
    src: photo.full,
    alt: photo.alt,
  }))
})
</script>

<template>
  <section
    id="gallery"
    ref="sectionTarget"
    class="py-24 md:py-32 bg-gray-50 transition-all duration-700"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
  >
    <div class="container mx-auto px-4">
      <!-- Section Heading -->
      <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
        Photos & Community
      </h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        See Xzandria in action across Houston County — from community events to volunteer activities.
      </p>

      <!-- Empty State -->
      <div
        v-if="!hasPhotos"
        class="text-center py-16 px-4 bg-white rounded-lg shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16 mx-auto text-gray-300 mb-4"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Gallery Coming Soon
        </h3>
        <p class="text-gray-500 max-w-md mx-auto">
          Check back soon for photos from campaign events, community outreach, and volunteer activities.
        </p>
      </div>

      <template v-else>
        <!-- Photo Count -->
        <div class="text-center text-gray-500 mb-6">
          Showing {{ photos.length }} of {{ allPhotos.length }} photos
        </div>

        <!-- Photo Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <button
          v-for="(photo, index) in photos"
          :key="photo.id"
          @click="openLightbox(index)"
          class="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2 cursor-pointer"
          :aria-label="`View full-size image: ${photo.alt}`"
        >
          <img
            :src="photo.thumb"
            :alt="photo.alt"
            loading="lazy"
            class="w-full h-full object-cover"
          >
        </button>
        </div>

        <!-- Load More Button -->
        <div class="text-center">
          <button
            v-if="hasMorePhotos"
            @click="loadMore"
            class="inline-flex items-center justify-center px-8 py-3 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Load More Photos
          </button>
          <button
            v-else-if="photos.length > increment"
            @click="showLess"
            class="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
            </svg>
            Show Less
          </button>
        </div>
      </template>

      <!-- Lightbox -->
      <GalleryLightbox
        :visible="lightboxVisible"
        :images="lightboxImages"
        :current-index="currentPhotoIndex"
        @close="closeLightbox"
        @previous="previousPhoto"
        @next="nextPhoto"
      />
    </div>
  </section>
</template>
