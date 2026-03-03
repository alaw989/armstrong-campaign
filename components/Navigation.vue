<script setup lang="ts">
/**
 * Navigation Component
 *
 * Features:
 * - Sticky positioning (stays at top while scrolling)
 * - Smooth scroll to sections
 * - Scroll spy (highlights active section based on scroll position)
 * - Mobile hamburger menu
 * - Backdrop blur when scrolled
 * - Keyboard accessible
 */

// Navigation sections - will be used to generate links and scroll spy
const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'why-running', name: "Why I'm Running" },
  { id: 'platform', name: 'Platform' },
  { id: 'gallery', name: 'Photos & Community' },
  { id: 'team', name: 'Team' },
  { id: 'endorsements', name: 'Endorsements' },
  { id: 'contact', name: 'Contact' }
]

// Reactive state
const isScrolled = ref(false)
const activeSection = ref('')
const isMobileMenuOpen = ref(false)

// Cache section positions to avoid layout thrashing
const sectionPositions = ref<Map<string, number>>(new Map())

// Scroll to section with smooth behavior
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Close mobile menu after navigation
    isMobileMenuOpen.value = false
  }
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Cache section positions once on mount to avoid reading offsetTop during scroll
const cacheSectionPositions = () => {
  const positions = new Map<string, number>()
  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element) {
      positions.set(section.id, element.offsetTop)
    }
  }
  sectionPositions.value = positions
}

// Update scroll state and active section using cached positions
const updateScrollState = () => {
  // Update isScrolled state for shadow effect
  isScrolled.value = window.scrollY > 50

  // Update active section using cached positions (no layout thrashing)
  const scrollPosition = window.scrollY + 100 // Offset for nav height

  for (const section of sections) {
    const top = sectionPositions.value.get(section.id) ?? 0
    const element = document.getElementById(section.id)
    const bottom = element ? top + element.offsetHeight : top + 1000

    if (scrollPosition >= top && scrollPosition < bottom) {
      activeSection.value = section.id
      break
    }
  }
}

onMounted(() => {
  // Cache section positions once
  cacheSectionPositions()
  // Add scroll event listener with passive option for better INP
  window.addEventListener('scroll', updateScrollState, { passive: true })
  // Initial call to set active section on page load
  updateScrollState()
})

onBeforeUnmount(() => {
  // Cleanup scroll event listener
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full"
    :class="{
      'bg-transparent': !isScrolled,
      'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100': isScrolled
    }"
  >
    <div class="flex items-center justify-between gap-2 md:gap-8 transition-all duration-300 w-full px-4 md:px-4"
      :class="{
        'py-4 min-h-[140px]': !isScrolled,
        'py-2 min-h-[70px]': isScrolled
      }"
    >
      <!-- Logo -->
      <div class="flex-shrink-0">
        <NuxtLink
          to="#hero"
          @click="scrollToSection('hero')"
          class="block hover:opacity-90 transition-opacity"
          aria-label="Armstrong for Houston - Home"
        >
          <!-- Use plain img for LCP to avoid JavaScript hydration delay -->
          <picture>
            <source srcset="/images/campaign-150.webp" type="image/webp">
            <img
              src="/images/campaign.jpg"
              alt="Armstrong for Houston"
              width="150"
              height="150"
              fetchpriority="high"
              class="w-auto object-cover object-top transition-all duration-300"
              :class="{
                'h-28 md:h-32': !isScrolled,
                'h-14 md:h-16': isScrolled
              }"
            />
          </picture>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="scrollToSection(section.id)"
          class="text-sm font-medium transition-colors relative cursor-pointer flex items-center justify-center min-w-[44px] min-h-[48px] px-4"
          :class="{
            'text-white font-semibold': !isScrolled && activeSection === section.id,
            'text-white/80 hover:text-white': !isScrolled && activeSection !== section.id,
            'text-gray-900 font-semibold': isScrolled && activeSection === section.id,
            'text-gray-600 hover:text-gray-900': isScrolled && activeSection !== section.id
          }"
        >
          {{ section.name }}
          <!-- Active indicator underline -->
          <span
            v-if="activeSection === section.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700"
          />
        </button>

        <!-- Donate CTA Button -->
        <div class="ml-2">
          <DonateButton
            size="small"
            variant="primary"
            text="Donate"
          />
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center">
        <button
          type="button"
          class="inline-flex items-center justify-center p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 min-h-[44px] min-w-[44px]"
          :class="{
            'text-white hover:bg-white/10': !isScrolled,
            'text-gray-700 hover:text-gray-900 hover:bg-gray-100': isScrolled
          }"
          aria-label="Toggle navigation menu"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <svg
            class="h-6 w-6"
            :class="{ 'hidden': isMobileMenuOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg
            class="h-6 w-6"
            :class="{ 'hidden': !isMobileMenuOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden absolute left-0 right-0 w-full bg-white border-t border-gray-200 shadow-lg"
    >
      <div class="px-4 py-4 space-y-4">
        <!-- Donate CTA (mobile) - moved to top for prominence -->
        <div class="pb-4 border-b border-gray-100 mb-2">
          <DonateButton
            size="medium"
            variant="primary"
            text="Donate"
            class="w-full"
          />
        </div>

        <button
          v-for="section in sections"
          :key="section.id"
          @click="scrollToSection(section.id)"
          class="block w-full text-left px-4 py-4 rounded-md text-base font-medium transition-colors cursor-pointer min-h-[48px] my-1"
          :class="{
            'bg-gray-100 text-gray-900': activeSection === section.id,
            'text-gray-700 hover:bg-gray-50 hover:text-gray-900': activeSection !== section.id
          }"
        >
          {{ section.name }}
        </button>
      </div>
    </div>
  </header>
</template>
