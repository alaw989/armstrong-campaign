<script setup lang="ts">
/**
 * PlatformCard Component
 *
 * Reusable card component for displaying platform/issue positions.
 * Follows diijondacosta.com pattern with numbered cards and hover effects.
 *
 * Features:
 * - Article element for semantics
 * - Hover lift effect with shadow transition
 * - Optional number display (01, 02, etc.)
 * - Optional icon display (emoji)
 * - Keyboard accessible with focus styles
 */

interface Props {
  title: string
  description: string
  icon?: string
  number?: string
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  number: undefined
})
</script>

<template>
  <article
    class="platform-card bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1"
    tabindex="0"
  >
    <!-- Optional number display (top right) -->
    <span
      v-if="number"
      class="number-display block text-right text-5xl font-bold text-gray-200 -mt-4 -mr-2 mb-2"
      aria-hidden="true"
    >
      {{ number }}
    </span>

    <!-- Optional icon -->
    <div
      v-if="icon"
      class="icon-circle w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-4"
      aria-hidden="true"
    >
      <span class="text-xl text-teal-800">{{ icon }}</span>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-teal-900 mb-3">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-gray-700 leading-relaxed">
      {{ description }}
    </p>
  </article>
</template>

<style scoped>
/* Focus styles for keyboard navigation */
.platform-card:focus {
  outline: 2px solid #0f766e;
  outline-offset: 2px;
}

.platform-card:focus:not(:focus-visible) {
  outline: none;
}

.platform-card:focus-visible {
  outline: 2px solid #0f766e;
  outline-offset: 2px;
}
</style>
