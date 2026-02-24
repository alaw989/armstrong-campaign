<script setup lang="ts">
/**
 * PlatformSection Component
 *
 * Platform/Issues section displaying candidate positions in card grid.
 * Follows diijondacosta.com pattern with responsive card layout.
 *
 * Features:
 * - Section ID for Navigation scroll spy
 * - 5 platform position cards
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
 * - Alternating background (gray-50)
 */

interface PlatformPosition {
  id: string
  title: string
  description: string
  icon: string
}

// Platform positions data
// TODO: Move to app.config.ts when final content is available
const positions: PlatformPosition[] = [
  {
    id: 'education',
    title: 'Education',
    description: 'Investing in our schools and ensuring every child has access to quality education.',
    icon: '📚'
  },
  {
    id: 'economy',
    title: 'Economic Growth',
    description: 'Supporting local businesses and creating good-paying jobs for Houston County families.',
    icon: '💼'
  },
  {
    id: 'public-safety',
    title: 'Public Safety',
    description: 'Ensuring our neighborhoods are safe and supporting our first responders.',
    icon: '🛡️'
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Improving roads, bridges, and broadband access for all communities.',
    icon: '🏗️'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Access',
    description: 'Expanding access to quality healthcare and reducing costs for families.',
    icon: '🏥'
  }
]
</script>

<template>
  <section
    id="platform"
    class="py-20 bg-gray-50 scroll-mt-20"
    aria-label="Platform positions"
  >
    <div class="container mx-auto px-4">
      <!-- Section heading -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
        My Platform
      </h2>

      <!-- Section subheading -->
      <p class="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Here's where I stand on the issues that matter most to Houston County.
      </p>

      <!-- Card grid -->
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Platform positions"
      >
        <PlatformCard
          v-for="position in positions"
          :key="position.id"
          :title="position.title"
          :description="position.description"
          :icon="position.icon"
          role="listitem"
        />
      </div>
    </div>
  </section>
</template>
